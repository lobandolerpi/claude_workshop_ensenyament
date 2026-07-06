import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const FONT =
  "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

/* -------------------------------------------------------------------------- */
/* Fons decoratiu: cercles difuminats que suren (fa joc amb la landing).      */
/* -------------------------------------------------------------------------- */

type Circle = {
  x: number;
  y: number;
  size: number;
  hue: number;
  sat: number;
  alpha: number;
  drift: number;
  delay: number;
};

const CIRCLES: Circle[] = [
  { x: 8, y: 20, size: 220, hue: 350, sat: 85, alpha: 0.5, drift: -40, delay: 0 },
  { x: 78, y: 12, size: 260, hue: 12, sat: 80, alpha: 0.45, drift: 50, delay: 8 },
  { x: 62, y: 68, size: 300, hue: 0, sat: 88, alpha: 0.4, drift: -60, delay: 16 },
  { x: 20, y: 74, size: 180, hue: 22, sat: 78, alpha: 0.5, drift: 45, delay: 6 },
  { x: 44, y: 30, size: 140, hue: 340, sat: 82, alpha: 0.45, drift: -30, delay: 20 },
  { x: 88, y: 60, size: 160, hue: 8, sat: 84, alpha: 0.4, drift: 35, delay: 12 },
  { x: 33, y: 52, size: 120, hue: 355, sat: 80, alpha: 0.5, drift: -25, delay: 24 },
];

const FloatingCircles: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill>
      {CIRCLES.map((c, i) => {
        const drift = interpolate(frame, [0, durationInFrames], [0, c.drift], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const opacity = interpolate(
          frame,
          [c.delay, c.delay + 24],
          [0, c.alpha],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: c.size,
              height: c.size,
              borderRadius: "50%",
              background: `hsl(${c.hue}, ${c.sat}%, 55%)`,
              opacity,
              filter: "blur(24px)",
              translate: `0px ${drift}px`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/* -------------------------------------------------------------------------- */
/* Escena 1 — Títol + tagline                                                 */
/* -------------------------------------------------------------------------- */

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const titleScale = interpolate(frame, [0, fps], [0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const tagOpacity = interpolate(frame, [fps * 0.7, fps * 1.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const exit = interpolate(
    frame,
    [durationInFrames - fps * 0.5, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 80,
        opacity: exit,
      }}
    >
      <h1
        style={{
          fontFamily: FONT,
          fontSize: 84,
          fontWeight: 800,
          color: "white",
          margin: 0,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          textShadow: "0 6px 30px rgba(0,0,0,0.25)",
          opacity: titleOpacity,
          scale: String(titleScale),
        }}
      >
        Reserva de Sessions
        <br />
        de Treball
      </h1>
      <p
        style={{
          fontFamily: FONT,
          fontSize: 34,
          fontWeight: 500,
          color: "rgba(255,255,255,0.92)",
          marginTop: 28,
          maxWidth: 900,
          opacity: tagOpacity,
        }}
      >
        Sessions 1-a-1 amb els professors interns, en pocs clics.
      </p>
    </AbsoluteFill>
  );
};

/* -------------------------------------------------------------------------- */
/* Escena 2 — Els 3 passos                                                    */
/* -------------------------------------------------------------------------- */

const STEPS = [
  { n: "1", t: "Tria el professor", d: "Explora els professors i la seva especialitat." },
  { n: "2", t: "Mira els seus buits", d: "Només les franges lliures per a la data." },
  { n: "3", t: "Confirma la sessió", d: "Reserva i gestiona-la des del teu dashboard." },
];

const StepRow: React.FC<{ index: number; step: (typeof STEPS)[number] }> = ({
  index,
  step,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = index * fps * 0.5;

  const opacity = interpolate(frame, [start, start + fps * 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const y = interpolate(frame, [start, start + fps * 0.6], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.25)",
        borderRadius: 20,
        padding: "24px 34px",
        width: 820,
        opacity,
        translate: `0px ${y}px`,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          flex: "0 0 auto",
          width: 68,
          height: 68,
          borderRadius: "50%",
          background: "white",
          color: "#dc2626",
          fontFamily: FONT,
          fontSize: 34,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {step.n}
      </div>
      <div style={{ textAlign: "left" }}>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 32,
            fontWeight: 700,
            color: "white",
          }}
        >
          {step.t}
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 22,
            color: "rgba(255,255,255,0.85)",
            marginTop: 4,
          }}
        >
          {step.d}
        </div>
      </div>
    </div>
  );
};

const StepsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const exit = interpolate(
    frame,
    [durationInFrames - fps * 0.5, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 22,
        opacity: exit,
      }}
    >
      {STEPS.map((step, i) => (
        <StepRow key={step.n} index={i} step={step} />
      ))}
    </AbsoluteFill>
  );
};

/* -------------------------------------------------------------------------- */
/* Escena 3 — Crida a l'acció                                                 */
/* -------------------------------------------------------------------------- */

const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const scale = interpolate(frame, [0, fps], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        opacity,
        scale: String(scale),
      }}
    >
      <h2
        style={{
          fontFamily: FONT,
          fontSize: 64,
          fontWeight: 800,
          color: "white",
          margin: 0,
          letterSpacing: "-0.02em",
          textShadow: "0 6px 30px rgba(0,0,0,0.25)",
        }}
      >
        Reserva la teva sessió avui
      </h2>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 28,
          fontWeight: 600,
          color: "#dc2626",
          background: "white",
          borderRadius: 999,
          padding: "16px 44px",
          marginTop: 36,
        }}
      >
        Comença ara →
      </div>
    </AbsoluteFill>
  );
};

/* -------------------------------------------------------------------------- */
/* Composició principal                                                       */
/* -------------------------------------------------------------------------- */

export const MyComposition: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #7f1d1d 0%, #dc2626 45%, #ea580c 100%)",
      }}
    >
      <FloatingCircles />

      <Sequence durationInFrames={Math.round(fps * 3.5)} layout="none">
        <IntroScene />
      </Sequence>

      <Sequence
        from={Math.round(fps * 3.5)}
        durationInFrames={Math.round(fps * 4)}
        layout="none"
      >
        <StepsScene />
      </Sequence>

      <Sequence from={Math.round(fps * 7.5)} layout="none">
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
