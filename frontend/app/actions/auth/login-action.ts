"use server";

import { redirect } from "next/navigation";
import { FormState } from "@/types/form.types";
import { createSession } from "@/lib/session.lib";
import { AuthService } from "@/services/auth.service";
import { INITIAL_FORM_STATE, authSchema } from "@/schemas/auth.schema";

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

  // Variable para manejar la redirección fuera del catch
  let success = false;

  try {
    const res = await AuthService.login(result.data);
    await createSession(res.token);
    success = true;
  } catch (error) {
    console.error("Login error:", error);
    return {
      ...INITIAL_FORM_STATE,
      message: Array.isArray(error.message) ? error.message[0] : error.message,
    };
  }

  if (success) {
    redirect("/messages");
  }

  return INITIAL_FORM_STATE;
}
