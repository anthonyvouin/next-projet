import { toast } from "sonner";

interface ToastOptions {
  duration?: number;
}

export const useToast = () => {
  const success = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      duration: options?.duration || 5000,
    });
  };

  const error = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      duration: options?.duration || 5000,
    });
  };

  const info = (message: string, options?: ToastOptions) => {
    toast.info(message, {
      duration: options?.duration || 5000,
    });
  };

  const warning = (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      duration: options?.duration || 5000,
    });
  };

  return {
    success,
    error,
    info,
    warning,
  };
}; 