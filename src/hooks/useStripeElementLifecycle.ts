import { useCallback, useEffect, useRef, useState } from "react";

interface UseStripeElementLifecycleOptions {
  enabled: boolean;
  timeoutMs?: number;
  resetKeys?: readonly unknown[];
}

export function useStripeElementLifecycle({
  enabled,
  timeoutMs = 12000,
  resetKeys = [],
}: UseStripeElementLifecycleOptions) {
  const readyRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [mountKey, setMountKey] = useState(0);

  useEffect(() => {
    if (!enabled) {
      readyRef.current = false;
      setIsReady(false);
      setTimedOut(false);
      return;
    }

    readyRef.current = false;
    setIsReady(false);
    setTimedOut(false);

    const frame = window.requestAnimationFrame(() => {
      setMountKey((current) => current + 1);
    });

    const timeout = window.setTimeout(() => {
      if (!readyRef.current) {
        setTimedOut(true);
      }
    }, timeoutMs);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [enabled, timeoutMs, ...resetKeys]);

  const handleReady = useCallback(() => {
    readyRef.current = true;
    setIsReady(true);
    setTimedOut(false);
  }, []);

  const retry = useCallback(() => {
    readyRef.current = false;
    setIsReady(false);
    setTimedOut(false);
    setMountKey((current) => current + 1);
  }, []);

  return {
    isReady,
    timedOut,
    mountKey,
    handleReady,
    retry,
  };
}

export default useStripeElementLifecycle;
