interface Window {
  SpeechRecognition?: new () => SpeechRecognition;
  webkitSpeechRecognition?: new () => SpeechRecognition;
  requestIdleCallback?: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number;
  cancelIdleCallback?: (id: number) => void;
  __prerenderReadyFired?: boolean;
}
