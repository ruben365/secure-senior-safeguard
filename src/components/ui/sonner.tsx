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
            "group toast backdrop-blur-xl border rounded-lg " +
            "bg-[rgba(15,15,25,0.92)] text-white border-white/10 " +
            "dark:bg-[rgba(15,15,25,0.92)] dark:text-white dark:border-white/10",
          description:
            "group-[.toast]:text-white/70",
          actionButton:
            "group-[.toast]:bg-white/15 group-[.toast]:text-white group-[.toast]:border group-[.toast]:border-white/20",
          cancelButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-white/70 group-[.toast]:border group-[.toast]:border-white/15",
          success:
            "group-[.toast]:[&>svg]:text-emerald-400",
          error:
            "group-[.toast]:[&>svg]:text-red-400",
          warning:
            "group-[.toast]:[&>svg]:text-amber-400",
          info:
            "group-[.toast]:[&>svg]:text-blue-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
