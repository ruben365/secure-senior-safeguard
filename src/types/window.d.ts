interface Window {
  SpeechRecognition?: new () => SpeechRecognition;
  webkitSpeechRecognition?: new () => SpeechRecognition;
  requestIdleCallback?: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number;
  cancelIdleCallback?: (id: number) => void;
  __prerenderReadyFired?: boolean;
}

// Extend React img to accept fetchpriority (lowercase HTML attribute, React 18 compat)
declare module "react" {
  interface ImgHTMLAttributes<T> {
    fetchpriority?: "high" | "low" | "auto";
  }
}
