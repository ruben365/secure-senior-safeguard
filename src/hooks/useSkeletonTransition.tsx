import { useState, useEffect, useRef } from 'react';

interface UseSkeletonTransitionProps {
  isLoading: boolean;
  minDisplayTime?: number; // Minimum time to show skeleton (default: 300ms)
  skipThreshold?: number;   // Skip skeleton if loads faster than this (default: 200ms)
}

export const useSkeletonTransition = ({
  isLoading,
  minDisplayTime = 300,
  skipThreshold = 200,
}: UseSkeletonTransitionProps) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const loadStartTime = useRef<number>(Date.now());
  const skeletonShownTime = useRef<number | null>(null);

  useEffect(() => {
    if (isLoading) {
      // Reset state when loading starts
      loadStartTime.current = Date.now();
      skeletonShownTime.current = null;
      setShowContent(false);
      setShowSkeleton(true);
    } else {
      // Content has loaded
      const loadDuration = Date.now() - loadStartTime.current;

      // If content loaded very quickly, skip skeleton entirely
      if (loadDuration < skipThreshold && !skeletonShownTime.current) {
        setShowSkeleton(false);
        setShowContent(true);
        return;
      }

      // Mark when skeleton was first shown
      if (!skeletonShownTime.current) {
        skeletonShownTime.current = Date.now();
      }

      // Calculate how long skeleton has been visible
      const skeletonDisplayTime = Date.now() - skeletonShownTime.current;
      const remainingTime = Math.max(0, minDisplayTime - skeletonDisplayTime);

      // Wait for minimum display time before transitioning
      setTimeout(() => {
        setShowSkeleton(false);
        // Small delay for fade-out animation to complete
        setTimeout(() => {
          setShowContent(true);
        }, 200);
      }, remainingTime);
    }
  }, [isLoading, minDisplayTime, skipThreshold]);

  return { showSkeleton, showContent };
};
