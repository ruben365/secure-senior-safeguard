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
            "group toast border rounded-xl " +
            "bg-white text-slate-900 border-slate-200/80 " +
            "shadow-[0_4px_12px_-2px_rgba(80,40,80,0.1),0_2px_4px_rgba(80,40,80,0.06)] " +
            "dark:bg-white dark:text-slate-900 dark:border-slate-200/80",
          description:
            "group-[.toast]:text-slate-600",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-white group-[.toast]:border group-[.toast]:border-primary/60",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-700 group-[.toast]:border group-[.toast]:border-slate-200",
          success:
            "group-[.toast]:[&>svg]:text-emerald-500",
          error:
            "group-[.toast]:[&>svg]:text-red-500",
          warning:
            "group-[.toast]:[&>svg]:text-amber-500",
          info:
            "group-[.toast]:[&>svg]:text-blue-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
