'use client';

import { Button } from '../../components/ui/Button';
import { useActionState } from 'react';
import { ErrorLabel } from '../../components/ui/ErrorLabel';
import { FormField } from '@/components/shared/FormField';
import { INITIAL_FORM_STATE } from '@/schemas/auth.schema';
import { BaseFormTexts, FormProps } from '@/types/form.types';
import { FORM_TYPES } from '@/constants/form-types.constants';

export default function FormContent<T extends BaseFormTexts>({
  isRegister = false,
  action,
  texts,
}: FormProps<T>) {
  const [state, formAction, pending] = useActionState(action, INITIAL_FORM_STATE);

  return (
    <form action={formAction} className='space-y-6'>
      {isRegister && (
        <>
          <FormField
            label={texts?.nameLabel ?? ''}
            name={FORM_TYPES.NAME}
            type={FORM_TYPES.TEXT}
            defaultValue={state?.data?.name ?? ''}
            errorLabel={state?.errors?.name?.[0]}
            placeholder={texts.namePlaceholder}
          />
          <FormField
            type={FORM_TYPES.TEXT}
            name={FORM_TYPES.USERNAME}
            defaultValue={state?.data?.username}
            label={texts?.usernameLabel ?? ''}
            errorLabel={state?.errors?.username?.[0]}
            placeholder={texts.usernamePlaceholder}
          />
        </>
      )}
      <FormField
        label={texts.emailLabel}
        name={FORM_TYPES.EMAIL}
        type={FORM_TYPES.EMAIL}
        defaultValue={state?.data?.email}
        errorLabel={state?.errors?.email?.[0]}
        placeholder={texts.emailPlaceholder}
      />

      <FormField
        label={texts.passwordLabel}
        name={FORM_TYPES.PASSWORD}
        type={FORM_TYPES.PASSWORD}
        errorLabel={state?.errors?.password?.[0]}
        placeholder={texts.passwordPlaceholder}
      />

      <div className='pt-4'>
        <Button
          type='submit'
          disabled={pending}
          label={pending ? texts.loadingButton : texts.submitButton}
        />
      </div>
      {state?.message && <ErrorLabel errorLabel={state.message} />}
    </form>
  );
}
