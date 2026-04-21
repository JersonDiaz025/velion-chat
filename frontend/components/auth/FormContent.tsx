"use client";

import { Button } from '../ui/Button';
import { useActionState } from 'react';
import { ErrorLabel } from '../ui/ErrorLabel';
import { FormField } from '@/components/shared/FormField';
import { INITIAL_FORM_STATE } from '@/schemas/auth.schema';
import { BaseFormTexts, FormProps } from '@/types/form.types';
import { FORM_TYPES } from '@/constants/form-types.constants';

export default function FormContent<T extends BaseFormTexts>( {
  action,
  texts,
}: FormProps<T> ) {

  const [ state, formAction, pending ] = useActionState( action, INITIAL_FORM_STATE );

  return (
    <form action={formAction} className="space-y-6">
      <FormField
        label={texts.emailLabel}
        name={FORM_TYPES.EMAIL}
        type={FORM_TYPES.EMAIL}
        errorLabel={state?.errors?.email?.[ 0 ]}
        placeholder={texts.emailPlaceholder}
      />

      <FormField
        label={texts.passwordLabel}
        name={FORM_TYPES.PASSWORD}
        type={FORM_TYPES.PASSWORD}
        errorLabel={state?.errors?.password?.[ 0 ]}
        placeholder={texts.passwordPlaceholder}
      />

      <div className="pt-4">
        <Button
          type="submit"
          label={pending ? texts.loadingButton : texts.submitButton}
          disabled={pending}
        />
      </div>
      {state?.message && (
        <ErrorLabel errorLabel={state.message} />
      )}
    </form>
  );
}


