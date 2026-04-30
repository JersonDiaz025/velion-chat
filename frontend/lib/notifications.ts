import { showToast } from 'nextjs-toast-notify';

type ToastOptions = {
  title?: string;
  duration?: number;
  sonido?: boolean;
};

export const notify = {
  success: (message: string, options?: ToastOptions) => {
    if (typeof window !== 'undefined') {
      showToast.success(message, {
        title: options?.title || 'Éxito',
        duration: options?.duration || 5000,
        position: 'top-right',
        transition: 'topBounce',
        sonido: options?.sonido ?? true,
      });
    }
  },
  error: (message: string, options?: ToastOptions) => {
    if (typeof window !== 'undefined') {
      showToast.error(message, {
        title: options?.title || 'Error',
        duration: options?.duration || 5000,
        position: 'top-right',
        transition: 'topBounce',
        sonido: options?.sonido ?? true,
      });
    }
  },
};
