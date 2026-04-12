import * as React from "react";
import { toast as sonnerToast, type ExternalToast } from "sonner";

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

type ToastInput = Omit<ToastProps, "id"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const mapAction = (action?: ToastActionElement): ExternalToast["action"] => {
  if (!React.isValidElement(action)) return undefined;

  const actionProps = action.props as {
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };

  if (!actionProps.children || !actionProps.onClick) return undefined;

  return {
    label: actionProps.children,
    onClick: actionProps.onClick,
  };
};

const emitToast = (input: ToastInput & { id?: string | number }) => {
  const { title, description, variant, duration, action, id } = input;

  const options: ExternalToast = {
    id,
    description,
    duration,
    action: mapAction(action),
  };

  if (variant === "destructive") {
    return sonnerToast.error(title, options);
  }

  if (variant === "success") {
    return sonnerToast.success(title, options);
  }

  return sonnerToast(title, options);
};

function toast({ ...props }: ToastInput) {
  const id = emitToast(props);

  return {
    id,
    dismiss: () => sonnerToast.dismiss(id),
    update: (next: ToastInput) => emitToast({ ...props, ...next, id }),
  };
}

function useToast() {
  return {
    toasts: [],
    toast,
    dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
  };
}

export { useToast, toast };
