import React from "react";
import { Composition } from "remotion";
import { Promo, TOTAL_FRAMES, FPS } from "./Promo";
export const Root: React.FC = () => <>
  <Composition id="Promo" component={Promo} width={1920} height={1080} fps={FPS} durationInFrames={TOTAL_FRAMES} defaultProps={{ lang: "en" as const }} />
  <Composition id="PromoZh" component={Promo} width={1920} height={1080} fps={FPS} durationInFrames={TOTAL_FRAMES} defaultProps={{ lang: "zh" as const }} />
</>;
