import { Composition } from "remotion";
import { VideoComposition } from "./VideoComposition";

export const RemotionRoot = () => {
  return (
    <Composition
      id="InVisionIntro"
      component={VideoComposition}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
