"use server";

import { createSession } from "@/lib/session.lib";
import { INITIAL_FORM_STATE, authSchema } from "@/schemas/auth.schema";
import { AuthService } from "@/services/auth.service";
import { FormState } from "@/types/form.types";
import { redirect } from "next/navigation";



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
