export type BaseFormTexts = {
  emailLabel: string;
  defaultValue?: string;
  emailPlaceholder: string;
  nameLabel?: string | undefined;
  namePlaceholder?: string | undefined;
  usernameLabel?: string | undefined;
  usernamePlaceholder?: string;
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
    name?: string[];
    username?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
  success?: boolean;
  data?: Record<string, string>;
};

export type FormAction = (
  prevState: FormState,
  formData: FormData
) => Promise<FormState>;

export interface FormProps<T extends BaseFormTexts> {
  texts: T;
  isRegister?: boolean;
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
