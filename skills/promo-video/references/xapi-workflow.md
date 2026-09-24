# Optional AI footage through xAPI

The starter renders without xAPI. Use this workflow only when the user's video calls for generated assets. It does not require another installed skill.

## Discover before submitting

Use the user's existing CLI authentication or `XAPI_KEY` environment variable. Do not print, commit, or embed credentials. Do not create accounts or change credentials merely to render the starter.

```bash
npx xapi-to get ai.video.generate
```

Read the current schema and model options, then construct the request. Model IDs, prices, reservations, duration limits, and output formats can change. The original workflow used Seedance; select a currently supported model rather than relying on an old hard-coded ID or price.

The CLI request shape is:

```bash
npx xapi-to call ai.video.generate --input '{"prompt":"A cinematic paper bird unfolds and takes flight across a sunlit desk."}'
```

This command submits a real generation job and may charge the account. Add model, duration, aspect ratio, or reference images only as supported by the schema and needed for the user's request. Match the existing authorization and budget.

## Preserve and recover tasks

1. Record the returned `task_id` as soon as each submission is accepted, before submitting another shot. Keep the mapping from shot ID to task ID in a local ignored file such as `public/clips/pending.json`.
2. Wait for that existing task:

   ```bash
   npx xapi-to task wait <task-id> --interval 5s --timeout 15m
   ```

3. On timeout or an interrupted process, poll or wait for the same task. An ambiguous submission response may mean the service accepted it; do not blindly submit again. Stop and resolve the task state before a retry that could duplicate a charge.
4. Download only a successful task's actual video result. Check HTTP success and that FFprobe can read the resulting file before marking a shot complete. Treat signed output URLs and raw task responses as private runtime data.
5. Preserve older takes before intentional regeneration. Existing clips should be reused unless the task calls for a new take.

Submitting several clips at once may reserve more balance. Choose concurrency based on current service behavior and the available budget; an insufficient-balance error is a reason to collect accepted tasks, not to resubmit them.

## Optional voiceover

```bash
npx xapi-to get ai.audio.generate
```

Check the current speech schema, language, voice, and response envelope before submitting narration. Write narration that matches the final captions and product. Save the audio in the output project's `public/audio/` directory and reference it from the composition. Confirm pronunciation, duration, and music balance by listening.

## Local asset inspection

```bash
ffprobe -v error -show_entries format=duration -of json public/clips/hero.mp4
python3 <skill-dir>/scripts/contact_sheet.py public/clips/hero.mp4 out/hero-review.jpg
```

Set composition cue points from observed footage, not solely from prompt timestamps. Review private prompts and runtime records before sharing any project.
