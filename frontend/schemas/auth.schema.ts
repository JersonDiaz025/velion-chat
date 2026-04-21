import { z } from "zod";
import { FormState } from "@/types/form.types";

export const INITIAL_FORM_STATE: FormState = {
  errors: {},
  message: "",
  success: false,
};

export const authSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es requerido")
    .email("El correo electrónico no es válido"),

  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});
