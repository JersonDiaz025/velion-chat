export type BaseFormTexts = {
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  submitButton: string;
  loadingButton: string;
};

export type RegisterFormTexts = BaseFormTexts & {
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
};

export type LoginFormTexts = BaseFormTexts;

export type FormState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
  success?: boolean;
};

export type FormAction = (
  prevState: FormState,
  formData: FormData
) => Promise<FormState>;

export interface FormProps<T extends BaseFormTexts> {
  texts: T;
  action: FormAction;
}

export interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorLabel: FormState["errors"] | FormState["message"];
  rightElement?: React.ReactNode;
}

export interface ErrorLabelProps {
  errorLabel: FormFieldProps["errorLabel"] | undefined;
  classes?: string;
}
