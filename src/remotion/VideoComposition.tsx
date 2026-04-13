import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const VideoComposition = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const translateY = interpolate(frame, [0, 30], [20, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #080b11 0%, #1a0800 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          InVision Network
        </h1>
        <p
          style={{
            fontSize: 28,
            opacity: 0.75,
            marginTop: 20,
            fontWeight: 400,
            letterSpacing: "0.01em",
          }}
        >
          AI Protection for Families &amp; Business
        </p>
        <div
          style={{
            marginTop: 32,
            width: 48,
            height: 3,
            background: "#d96c4a",
            borderRadius: 2,
            margin: "32px auto 0",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
