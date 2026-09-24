#!/usr/bin/env python3
"""Copy the bundled Remotion starter into a new project, without overwriting."""
import argparse
import shutil
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("destination", type=Path)
    args = parser.parse_args()
    destination = args.destination.expanduser().absolute()
    template = Path(__file__).resolve().parents[1] / "assets" / "remotion-template"
    if destination.exists() or destination.is_symlink():
        parser.error("Destination already exists; choose a new directory.")
    shutil.copytree(template, destination)
    print(f"Created {destination}")
    print("Next: install dependencies with npm install, then run npm run studio.")


if __name__ == "__main__":
    main()
