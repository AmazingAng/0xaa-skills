#!/usr/bin/env python3
"""Create a labelled contact sheet from a video using FFmpeg and FFprobe."""
import argparse
import json
import math
import shutil
import subprocess
import tempfile
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("video", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--times", help="Comma-separated timestamps in seconds; default: nine samples")
    parser.add_argument("--width", type=int, default=640, help="Width of each tile")
    parser.add_argument("--columns", type=int, default=3)
    args = parser.parse_args()
    if not shutil.which("ffmpeg") or not shutil.which("ffprobe"):
        parser.error("FFmpeg and FFprobe must be installed and available on PATH.")
    if not args.video.is_file():
        parser.error("Input video does not exist.")
    if args.output.exists() or args.output.is_symlink():
        parser.error("Output already exists; choose a new filename.")
    if args.output.suffix.lower() not in (".png", ".jpg", ".jpeg"):
        parser.error("Output must be a PNG or JPEG.")
    if args.width < 160 or args.columns < 1:
        parser.error("Width must be at least 160 and columns at least 1.")
    probe = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "json", str(args.video.resolve())], capture_output=True, text=True, check=True)
    duration = float(json.loads(probe.stdout)["format"]["duration"])
    if not math.isfinite(duration) or duration <= 0:
        parser.error("Input must have a finite, positive duration.")
    try:
        times = [float(t) for t in args.times.split(",")] if args.times else [duration * (i + 0.5) / 9 for i in range(9)]
    except ValueError:
        parser.error("Timestamps must be comma-separated numbers.")
    if not times or len(times) > 60 or any(not math.isfinite(t) or t < 0 or t >= duration for t in times):
        parser.error("Provide 1–60 finite timestamps within the video duration.")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="promo-frames-") as temp:
        for i, time in enumerate(times):
            subprocess.run(["ffmpeg", "-v", "error", "-ss", str(time), "-i", str(args.video.resolve()), "-frames:v", "1", "-vf", f"scale={args.width}:-2,pad=iw:ih+34:0:34:color=black,drawtext=text='{time:.2f}s':x=12:y=6:fontsize=22:fontcolor=white", "-update", "1", str(Path(temp) / f"{i:03d}.png")], check=True)
        rows = math.ceil(len(times) / args.columns)
        subprocess.run(["ffmpeg", "-v", "error", "-framerate", "1", "-i", str(Path(temp) / "%03d.png"), "-vf", f"tile={args.columns}x{rows}:nb_frames={len(times)}:padding=8:margin=8:color=black", "-frames:v", "1", "-update", "1", "-n", str(args.output.resolve())], check=True)
    print(args.output.resolve())


if __name__ == "__main__":
    main()
