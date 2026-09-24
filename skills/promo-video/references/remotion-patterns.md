# Remotion patterns and visual checks

## Timeline

- Keep scene durations and overlap frames in one timeline. Subtract overlap when computing the next scene's start and the total duration.
- Avoid `interpolate` ranges such as `[0, 0]`. Skip the fade-in calculation when its duration is zero.
- For a preview card that expands into fullscreen video, the fullscreen clip's `startFrom` must include the footage already shown in the card.
- When a hero clip appears in several scenes, keep its observed cue points in one shared file. Ensure scene duration does not exceed available footage after `startFrom`.

## Typography and product demonstrations

- The starter uses system fonts so it renders without bundled font files. For consistent typography across machines, supply appropriately licensed fonts. Wait for custom `FontFace` loading with `delayRender` and release it with `continueRender`; parallel browser tabs may require a longer load timeout.
- Check Chinese glyph coverage and English wrapping at actual output dimensions.
- Use a fixed-width, left-aligned typing box; reserve layout space before content animates in. Leave the full command or URL visible long enough to read.
- If using a strike-through, strike the unwanted noun or process rather than a negated phrase such as “no subscription.”
- Simplify product demonstrations around the question, result, and intended proof. Raw JSON is useful only when the audience needs to inspect it. Label recorded data if its value could be confused with a live response.

## Lottie

Jitter can supply a Lottie JSON file in the project under `public/lottie/`. If using it, add the compatible `@remotion/lottie` package and render through its frame-driven component. Make the asset optional and use a built-in animation when it is absent.

When loading JSON asynchronously, hold the render until loading resolves. Release the delay handle on both success and failure. An absent optional asset must not leave a render hanging.

## Audio

Only add audio elements for files that exist. The starter has no music or voiceover. For an actual film, use the user's supplied or properly licensed music, add short volume fades, and duck it under narration. Listen to the output; a valid audio stream does not prove a good mix.

## Verification

Run the project's type check and render the requested composition. Inspect scene midpoints plus moments when text changes, typing completes, clips change, or a transition could obscure content. Use `scripts/contact_sheet.py` for a compact inspection view and full-resolution frames for dense text.

When extracting frames individually, use a distinct `-ss`/`-i` pair per output. Remove temporary checks after review. A deliverable should preserve the user's original when they requested a separate version.
