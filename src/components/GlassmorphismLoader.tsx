interface GlassmorphismLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export const GlassmorphismLoader = ({
  message = "Reloading",
  fullScreen = true,
}: GlassmorphismLoaderProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center justify-center animate-fade-in ${
        fullScreen
          ? "fixed inset-0 z-[9999] bg-background/60 backdrop-blur-xl"
          : "py-10"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative h-28 w-28 glass-float">
          <div className="absolute -inset-6 rounded-full border border-white/10 glass-orbit-slow" />
          <div className="absolute -inset-3 rounded-full border border-white/20 glass-orbit" />
          <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-2xl border border-white/40 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.6)]" />
          <div
            className="absolute inset-1 rounded-full opacity-80"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.35) 35%, rgba(255,255,255,0.08) 60%, transparent 75%)",
            }}
          />
          <div className="absolute top-4 left-5 h-4 w-4 rounded-full bg-white/70 blur-[1px] glass-pulse" />
          <div className="absolute bottom-5 right-6 h-2.5 w-2.5 rounded-full bg-white/45 blur-[0.5px] glass-pulse" />
          <div className="absolute inset-0 rounded-full border border-white/30" />
        </div>
        {message ? (
          <p className="mt-6 text-sm font-medium tracking-[0.32em] uppercase text-slate-500/80">
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
};
