---
name: promo-video
description: Create or refine product promo videos with Remotion, optional AI footage via xAPI, and Jitter/Lottie motion assets. Use for marketing or launch videos, branded films, and promo-video copy or storyboard reviews.
---

# Promo video: Remotion + AI footage + optional Lottie

Use Remotion for composition, typography, product demonstrations, transitions, sound, and language variants. Use generated or supplied footage for cinematic scenes. Optional Jitter exports can supply Lottie animations with a code fallback.

## Match the requested work

- For a copy or storyboard review, inspect the actual captions, timeline, and available rendered frames; deliver recommendations. A review does not imply editing or rendering.
- For edits, start from the user's existing film and preserve the choices outside the requested scope. When a separate version is requested, create a distinct project/output and keep the original intact.
- For a new film, choose its story and visual approach before writing scenes. The bundled template is a technical starting point, not a mandatory look, length, or scene sequence.

## Resources

Paths below are relative to this skill's directory, not to the current working directory.

- [Structured prompts](references/video-prompts.md): use when generating cinematic clips.
- [xAPI workflow](references/xapi-workflow.md): use for schema discovery, submission, task recovery, and optional narration.
- [Remotion patterns](references/remotion-patterns.md): use for timing, transitions, fonts, audio, and visual QA.
- `assets/remotion-template/`: standalone bilingual starter; works without API credentials, footage, fonts, logos, or music downloads.
- `scripts/init_project.py`: copies the starter to a new directory; never overwrites an existing project.
- `scripts/contact_sheet.py`: extracts timestamped video frames into a contact sheet using FFmpeg.

## Working sequence

1. Establish the audience, main message, destination, language, and final action from the request and available project. Write the proposed scene list before implementing it. Prefer a clear narrative over a catalogue of features. Use the user's chosen opening; a problem statement can lead into the product's answer when appropriate.
2. Reuse a suitable existing project. Otherwise create a fresh one:

   ```bash
   python3 <skill-dir>/scripts/init_project.py <new-project-dir>
   cd <new-project-dir>
   npm install
   npm run studio
   ```

   Customize `src/content.ts`, `src/Promo.tsx`, and `src/Root.tsx`. Replace example text and adapt scenes to the actual product. Do not copy private account results or publish unverified claims as live demonstrations.
3. If AI footage is useful, read the prompt and xAPI references. A hero clip with timed beats can carry a narrative; short clips can support a montage. Choose duration, model, and number of clips for the task and available budget. Preserve accepted task IDs immediately; recover existing jobs before considering resubmission.
4. Inspect generated footage with a contact sheet before setting cue points. Prompt timestamps describe intent, not guaranteed event timing. Keep previous takes before replacing clips.
5. Compose with one primary reading target per scene. Prefer legible captions, a stable terminal layout, and enough time to read the final command or URL. Keep numerical product claims consistent across captions, demonstrations, and narration.
6. Render and inspect representative frames from every scene, transitions, and the final action. Check audio if included. Iterate on observed problems, then deliver the video and source location with a concise description of changes. Keep outputs in the project, outside this installed skill.

## Render and inspect

The starter supports English and Chinese compositions:

```bash
npm run typecheck
npm run render
npm run render:zh
python3 <skill-dir>/scripts/contact_sheet.py out/promo-zh.mp4 out/review.jpg --times 2,8,14
```

View the resulting image; successful rendering alone does not establish visual quality. Render fresh check frames after changing copy, font sizes, or timing. Remove temporary inspection frames when no longer needed.

## Distribution

Keep credentials in the user's configured CLI or environment. Do not bundle account config, personal paths, task manifests, signed download URLs, production data, or project media with the skill. Required templates and scripts must remain inside this folder so the skill can be installed independently.
