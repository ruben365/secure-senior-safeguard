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
            "!bg-[rgba(250,247,242,0.88)] !text-[#3B2519] !border-[rgba(60,40,20,0.10)] " +
            "!shadow-[0_4px_24px_rgba(40,25,10,0.10)] " +
            "dark:!bg-[rgba(45,30,20,0.88)] dark:!text-[#ECE8E4] dark:!border-[rgba(200,150,100,0.12)]",
          description:
            "group-[.toast]:!text-[#786A5E] dark:group-[.toast]:!text-[#9A8E82]",
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
