import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      duration={2500}
      toastOptions={{
        classNames: {
          toast:
            "group toast backdrop-blur-2xl border-2 rounded-2xl px-5 py-4 " +
            "bg-[linear-gradient(155deg,rgba(20,16,14,0.92),rgba(8,11,18,0.88)_55%,rgba(217,108,74,0.18))] " +
            "text-white border-white/20 " +
            "shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6),0_8px_24px_-12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.22)]",
          title:
            "group-[.toast]:text-white group-[.toast]:font-semibold group-[.toast]:text-[15px] group-[.toast]:leading-tight group-[.toast]:tracking-tight",
          description:
            "group-[.toast]:text-white/85 group-[.toast]:text-[13px] group-[.toast]:leading-snug group-[.toast]:mt-0.5",
          actionButton:
            "group-[.toast]:bg-[linear-gradient(135deg,#c2410c,#9a3412)] group-[.toast]:text-white group-[.toast]:font-semibold group-[.toast]:rounded-full group-[.toast]:px-4 group-[.toast]:h-9 group-[.toast]:border group-[.toast]:border-[#7c2d12] group-[.toast]:shadow-[0_4px_14px_rgba(194,65,12,0.35)]",
          cancelButton:
            "group-[.toast]:bg-white/15 group-[.toast]:text-white group-[.toast]:border group-[.toast]:border-white/25 group-[.toast]:rounded-full group-[.toast]:px-4 group-[.toast]:h-9",
          closeButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-white group-[.toast]:border-white/20 group-[.toast]:hover:bg-white/20",
          success:
            "group-[.toast]:[&>svg]:text-emerald-300 group-[.toast]:border-emerald-400/40 " +
            "group-[.toast]:bg-[linear-gradient(155deg,rgba(8,20,14,0.92),rgba(4,15,10,0.88)_55%,rgba(16,185,129,0.22))]",
          error:
            "group-[.toast]:[&>svg]:text-red-300 group-[.toast]:border-red-400/40 " +
            "group-[.toast]:bg-[linear-gradient(155deg,rgba(20,8,10,0.95),rgba(15,4,6,0.92)_55%,rgba(220,38,38,0.24))]",
          warning:
            "group-[.toast]:[&>svg]:text-amber-300 group-[.toast]:border-amber-400/40 " +
            "group-[.toast]:bg-[linear-gradient(155deg,rgba(22,14,4,0.95),rgba(18,10,2,0.92)_55%,rgba(245,158,11,0.22))]",
          info:
            "group-[.toast]:[&>svg]:text-sky-300 group-[.toast]:border-sky-400/40 " +
            "group-[.toast]:bg-[linear-gradient(155deg,rgba(8,16,24,0.92),rgba(4,12,22,0.88)_55%,rgba(56,189,248,0.22))]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
