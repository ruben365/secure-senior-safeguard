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
            "group toast border rounded-[14px] " +
            "!bg-[rgba(255,255,255,0.92)] !text-[#1E293B] !border-[rgba(0,0,0,0.08)] " +
            "!shadow-[0_4px_24px_rgba(0,0,0,0.08)] " +
            "dark:!bg-[rgba(255,255,255,0.92)] dark:!text-[#1E293B] dark:!border-[rgba(0,0,0,0.08)]",
          description:
            "group-[.toast]:!text-[#475569]",
          actionButton:
            "group-[.toast]:!bg-[#d96c4a]/10 group-[.toast]:!text-[#d96c4a] group-[.toast]:!border group-[.toast]:!border-[#d96c4a]/20",
          cancelButton:
            "group-[.toast]:!bg-slate-100 group-[.toast]:!text-[#64748B] group-[.toast]:!border group-[.toast]:!border-slate-200",
          closeButton:
            "group-[.toast]:!text-[#64748B] group-[.toast]:!bg-slate-100 group-[.toast]:hover:!bg-slate-200",
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
          backdropFilter: "blur(16px) saturate(1.2)",
          WebkitBackdropFilter: "blur(16px) saturate(1.2)",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
