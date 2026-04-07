import { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cache docHeight so scroll handler never triggers a forced reflow.
    // Only recalculate on resize (infrequent).
    let docHeight = document.documentElement.scrollHeight - window.innerHeight;

    const onScroll = () => {
      const p = docHeight > 0 ? window.scrollY / docHeight : 0;
      setProgress(p);
    };
    const onResize = () => {
      docHeight = document.documentElement.scrollHeight - window.innerHeight;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  if (progress < 0.01) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left transition-transform duration-150 ease-out"
      style={{
        transform: `scaleX(${progress})`,
        background: 'linear-gradient(90deg, hsl(var(--primary) / 0.6), hsl(var(--primary)), hsl(var(--gold)))',
      }}
    />
  );
};

export default ScrollProgress;
