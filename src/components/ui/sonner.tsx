import { useTheme } from "next-themes";
import { Toaster as Sonner, toast as sonnerToast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * Deduplicated toast — prevents the same message from stacking.
 * Uses the message text as an implicit ID so Sonner replaces instead of stacking.
 */
const toast = Object.assign(
  (message: string, opts?: Parameters<typeof sonnerToast>[1]) =>
    sonnerToast(message, { id: message, ...opts }),
  {
    success: (message: string, opts?: Parameters<typeof sonnerToast.success>[1]) =>
      sonnerToast.success(message, { id: message, ...opts }),
    error: (message: string, opts?: Parameters<typeof sonnerToast.error>[1]) =>
      sonnerToast.error(message, { id: message, ...opts }),
    warning: (message: string, opts?: Parameters<typeof sonnerToast.warning>[1]) =>
      sonnerToast.warning(message, { id: message, ...opts }),
    info: (message: string, opts?: Parameters<typeof sonnerToast.info>[1]) =>
      sonnerToast.info(message, { id: message, ...opts }),
    loading: (message: string, opts?: Parameters<typeof sonnerToast.loading>[1]) =>
      sonnerToast.loading(message, { id: message, ...opts }),
    dismiss: sonnerToast.dismiss,
    promise: sonnerToast.promise,
    custom: sonnerToast.custom,
  },
);

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      duration={2500}
      style={{ "--z-index": "99999" } as React.CSSProperties}
      toastOptions={{
        classNames: {
          toast:
            "group toast border rounded-[14px] " +
            "!bg-[rgba(255,255,255,0.75)] !text-[#1A2332] !border-[rgba(255,255,255,0.25)] " +
            "!shadow-[0_8px_32px_rgba(0,0,0,0.10),0_0_0_1px_rgba(255,255,255,0.05)] " +
            "dark:!bg-[rgba(20,24,36,0.70)] dark:!text-[#E8ECF0] dark:!border-[rgba(255,255,255,0.08)]",
          description:
            "group-[.toast]:!text-[#6B7280] dark:group-[.toast]:!text-[#9CA3AF]",
          actionButton:
            "group-[.toast]:!bg-[#d96c4a]/10 group-[.toast]:!text-[#d96c4a] group-[.toast]:!border group-[.toast]:!border-[#d96c4a]/20",
          cancelButton:
            "group-[.toast]:!bg-white/50 group-[.toast]:!text-[#64748B] group-[.toast]:!border group-[.toast]:!border-white/20",
          closeButton:
            "group-[.toast]:!text-[#64748B] group-[.toast]:!bg-white/50 group-[.toast]:hover:!bg-white/70",
          success:
            "group-[.toast]:[&>svg]:!text-[#16a34a]",
          error:
            "group-[.toast]:[&>svg]:!text-[#dc2626]",
          warning:
            "group-[.toast]:[&>svg]:!text-[#d96c4a]",
          info:
            "group-[.toast]:[&>svg]:!text-[#d96c4a]",
        },
        style: {
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
