import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, content, Lang } from "./content";

export const FPS = 30;
const OVERLAP = 18;
const SCENE_FRAMES = 180;
export const TOTAL_FRAMES = SCENE_FRAMES * 3 - OVERLAP * 2;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const typeface = "Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif";

const Fade: React.FC<{ first?: boolean; children: React.ReactNode }> = ({ first, children }) => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const incoming = first ? 1 : interpolate(f, [0, OVERLAP], [0, 1], clamp);
  const outgoing = interpolate(f, [durationInFrames - OVERLAP, durationInFrames], [1, 0], clamp);
  return <AbsoluteFill style={{ opacity: Math.min(incoming, outgoing) }}>{children}</AbsoluteFill>;
};
const Rise: React.FC<{ delay?: number; children: React.ReactNode }> = ({ delay = 0, children }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - delay, fps, config: { damping: 200, stiffness: 100 } });
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * 35}px)` }}>{children}</div>;
};
const Backdrop: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ overflow: "hidden", background: brand.background }}>
    <div style={{ position: "absolute", width: 1000, height: 1000, right: -200, top: -180, borderRadius: "50%", background: `radial-gradient(circle, ${brand.accent}18, transparent 65%)` }} />
    {[0, 1, 2].map(i => <div key={i} style={{ position: "absolute", width: 480 + i * 140, height: 480 + i * 140, right: -90 - i * 70, top: 150 - i * 70, borderRadius: "38%", border: `1px solid ${brand.accent}30`, transform: `rotate(${f / 7 + i * 25}deg)` }} />)}
  </AbsoluteFill>;
};
const Brand: React.FC = () => <div style={{ position: "absolute", left: 100, top: 74, color: brand.accent, fontSize: 27, letterSpacing: 4 }}>{brand.name}</div>;
const Scene: React.FC<{ lang: Lang; index: number }> = ({ lang, index }) => {
  const copy = content[lang];
  return <Fade first={index === 0}>
    <Backdrop /><Brand />
    <AbsoluteFill style={{ justifyContent: "center", padding: "130px 110px", gap: 44 }}>
      {index === 0 ? <>
        <Rise delay={8}><div style={{ fontSize: 114, lineHeight: 1.2, fontWeight: 700, letterSpacing: -3, whiteSpace: "pre-line" }}>{copy.intro}</div></Rise>
        <Rise delay={28}><div style={{ fontSize: 42, color: brand.accent }}>{copy.detail}</div></Rise>
      </> : index === 1 ? <>
        {copy.features.map((text, i) => <Rise delay={8 + i * 13} key={text}>
          <div style={{ display: "flex", alignItems: "center", gap: 32, padding: "18px 0" }}>
            <span style={{ fontSize: 27, color: brand.accent, fontVariantNumeric: "tabular-nums" }}>0{i + 1}</span>
            <span style={{ fontSize: 78, fontWeight: 600 }}>{text}</span>
          </div>
        </Rise>)}
      </> : <>
        <Rise delay={8}><div style={{ fontSize: 110, lineHeight: 1.2, fontWeight: 700, letterSpacing: -3, whiteSpace: "pre-line" }}>{copy.closing}</div></Rise>
        <Rise delay={24}><div style={{ display: "inline-block", fontSize: 42, color: brand.background, background: brand.accent, padding: "22px 36px", borderRadius: 12 }}>{copy.action}</div></Rise>
      </>}
    </AbsoluteFill>
  </Fade>;
};
export const Promo: React.FC<{ lang: Lang }> = ({ lang }) => (
  <AbsoluteFill style={{ background: brand.background, color: brand.foreground, fontFamily: typeface }}>
    {[0, 1, 2].map(i => <Sequence key={i} from={i * (SCENE_FRAMES - OVERLAP)} durationInFrames={SCENE_FRAMES}><Scene lang={lang} index={i} /></Sequence>)}
  </AbsoluteFill>
);
