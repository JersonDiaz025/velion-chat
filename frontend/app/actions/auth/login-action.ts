'use server';

import { redirect } from 'next/navigation';
import { ApiError } from '@/types/auth.types';
import { FormState } from '@/types/form.types';
import { createSession } from '@/lib/session.lib';
import { AuthService } from '@/services/auth.service';
import { ROUTES } from '@/constants/routes.constants';
import { INITIAL_FORM_STATE, authSchema } from '@/schemas/auth.schema';

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {
  let successData = false;
  const data = Object.fromEntries(formData);
  const result = authSchema.safeParse(data);

  if (!result.success) {
    return {
      ...INITIAL_FORM_STATE,
      data: data as Record<string, string>,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await AuthService.login(result.data);
    await createSession(res.token);
    console.log('Exit login', res);
    successData = true;
  } catch (error) {
    const apiError = error as ApiError;
    return {
      ...INITIAL_FORM_STATE,
      data: data as Record<string, string>,
      message: apiError.message as string,
    };
  }

  if (successData) {
    redirect(ROUTES.MESSAGES.ROOT);
  }

  return INITIAL_FORM_STATE;
}
