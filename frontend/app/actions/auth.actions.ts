"use server";

import { INITIAL_FORM_STATE, authSchema } from "@/schemas/auth.schema";
import { FormState } from "@/types/form.types";

// ==================== LOGIN ====================

export async function loginAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = Object.fromEntries(formData);

  const result = authSchema.safeParse(data);

  if (!result.success) {
    return {
      ...INITIAL_FORM_STATE,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  try {
    console.log("LOGIN:", email, password);
    return {
      ...INITIAL_FORM_STATE,
      success: true,
      message: "Login exitoso",
    };
  } catch (error) {
    return {
      ...INITIAL_FORM_STATE,
      message: "Error en login",
    };
  }
}

// ==================== REGISTER ====================

export async function registerAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = Object.fromEntries(formData);

  const result = authSchema.safeParse(data);

  if (!result.success) {
    return {
      ...INITIAL_FORM_STATE,
      errors: result.error.flatten().fieldErrors,
      message: "Errores en el formulario",
    };
  }

  const { email, password } = result.data;

  try {
    // 🔌 backend call (NestJS)
    console.log("REGISTER:", email, password);

    return {
      ...INITIAL_FORM_STATE,
      success: true,
      message: "Cuenta creada correctamente",
    };
  } catch (error) {
    return {
      ...INITIAL_FORM_STATE,
      message: "Error en registro",
    };
  }
}
