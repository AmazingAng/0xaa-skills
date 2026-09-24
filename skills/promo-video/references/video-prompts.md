# Structured video prompts

Use labelled sections when visual consistency and beat timing matter. Adapt the level of detail to the scene; simple inserts do not need a long specification.

```text
[GENERATION GOAL]
Film summary, duration, central action, and ending.

[GLOBAL STYLE]
Genre, color grade, lens language, realism, and relevant exclusions.
Generate captions in Remotion rather than asking the footage model for readable text.

[CHARACTERS]
Identity and wardrobe locks. State when important props may first appear.

[LOCATIONS]
Concrete locations and which shots use them.

[CONSISTENCY LOCK]
Elements that must remain identical across shots.

[FIRST FRAME]
Opening composition and the viewer's first focus.

[TIMELINE]
0–3 s: establish the situation.
3–7 s: the action or complication.
7–10 s: resolution or reveal.
Specify hard cuts only where wanted. Adapt all ranges to the selected duration.

[CAMERA / OPTICS]
Movement, framing, depth of field.

[PHYSICS / LIGHTING]
Contact, weight, motion, shadows, and light continuity.

[AUDIO]
Whether footage should include sound. If music and narration are added later,
state the intended treatment rather than assuming generated dialogue is usable.
```

For a hero scene spread across the final film, record actual cue points only after inspecting the generated clip. Character actions may occur earlier or later than requested. Avoid relying on a reveal before it is visibly present.

Keep a small shot list with local IDs, prompts, intended durations, and aspect ratios. Model-specific request fields belong in the current API schema, not in this generic format. Never reuse client-specific prompts without reviewing their content for publication.
