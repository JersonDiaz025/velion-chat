import data from "@/data/auth/data.json";
import AuthLayout from '@/layouts/AuthLayout';
import { ROUTES } from '@/constants/routes.constants';
import FormContent from '@/components/auth/FormContent';
import { loginAction } from "@/app/actions/auth.actions";

export default function LoginPage() {

  const commonTexts = data.common;
  const loginTexts = data.auth.login;

  const { title, footerActionText, alreadyHaveAccount } = loginTexts;

  return (
    <AuthLayout
      title={title}
      footerActionText={footerActionText}
      footerLinkText={alreadyHaveAccount}
      footerHref={ROUTES.REGISTER}
    >
      <FormContent
        action={loginAction}
        texts={{
          ...loginTexts,
          ...commonTexts,
        }}
      />
    </AuthLayout>
  );
}
