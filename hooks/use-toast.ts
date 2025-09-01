// hooks/use-toast.ts
import * as React from "react";
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const toast = ({ title, description, variant = "default" }: ToastProps) => {
    sonnerToast(title, {
      description,
      className: variant === "destructive" ? "bg-red-500 text-white" : "",
    });
  };

  return { toast };
}
