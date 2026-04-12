import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      duration={3200}
      visibleToasts={4}
      closeButton
      expand
      offset={{ right: 18, bottom: 18 }}
      mobileOffset={{ right: 8, left: 8, bottom: 8 }}
      toastOptions={{
        classNames: {
          toast:
            "group toast min-h-[72px] backdrop-blur-2xl border rounded-[1.35rem] px-5 py-4 " +
            "bg-[linear-gradient(155deg,rgba(64,42,30,0.8),rgba(30,22,28,0.74)_55%,rgba(217,108,74,0.12))] " +
            "text-white border-white/22 " +
            "shadow-[0_24px_60px_-20px_rgba(0,0,0,0.42),0_8px_24px_-12px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.24)]",
          content:
            "group-[.toast]:gap-1",
          title:
            "group-[.toast]:text-white group-[.toast]:font-semibold group-[.toast]:text-[15px] group-[.toast]:leading-tight group-[.toast]:tracking-tight",
          description:
            "group-[.toast]:text-white/85 group-[.toast]:text-[13px] group-[.toast]:leading-snug group-[.toast]:mt-0.5",
          actionButton:
            "group-[.toast]:bg-[linear-gradient(135deg,#c2410c,#9a3412)] group-[.toast]:text-white group-[.toast]:font-semibold group-[.toast]:rounded-full group-[.toast]:px-4 group-[.toast]:h-9 group-[.toast]:border group-[.toast]:border-[#7c2d12] group-[.toast]:shadow-[0_4px_14px_rgba(194,65,12,0.35)]",
          cancelButton:
            "group-[.toast]:bg-white/15 group-[.toast]:text-white group-[.toast]:border group-[.toast]:border-white/25 group-[.toast]:rounded-full group-[.toast]:px-4 group-[.toast]:h-9",
          closeButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-white group-[.toast]:border-white/16 group-[.toast]:hover:bg-white/20",
          success:
            "group-[.toast]:[&>svg]:text-emerald-300 group-[.toast]:border-emerald-400/30 " +
            "group-[.toast]:bg-[rgba(6,18,12,0.65)]",
          error:
            "group-[.toast]:[&>svg]:text-red-300 group-[.toast]:border-red-400/30 " +
            "group-[.toast]:bg-[rgba(18,6,8,0.65)]",
          warning:
            "group-[.toast]:[&>svg]:text-amber-300 group-[.toast]:border-amber-400/30 " +
            "group-[.toast]:bg-[rgba(20,14,4,0.65)]",
          info:
            "group-[.toast]:[&>svg]:text-sky-300 group-[.toast]:border-sky-400/30 " +
            "group-[.toast]:bg-[rgba(6,14,22,0.65)]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
