// @/lib/notifications.ts
import { showToast } from "nextjs-toast-notify";

/**
 * Singleton de Notificaciones
 * Diseñado para ser llamado desde cualquier parte del lado del cliente.
 */
export const notify = {
  success: (message: string, title: string = "Éxito") => {
    // Verificamos que estemos en el navegador
    if (typeof window !== "undefined") {
      showToast.success(message, {
        title,
        duration: 5000,
        position: "top-right",
        transition: "topBounce",
        sonido: true,
      });
    }
  },
  error: (message: string, title: string = "Error") => {
    if (typeof window !== "undefined") {
      showToast.error(message, {
        title,
        duration: 5000,
        position: "top-right",
        transition: "topBounce",
        sonido: true,
      });
    }
  },
};
