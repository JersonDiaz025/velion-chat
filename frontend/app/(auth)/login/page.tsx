import data from "@/data/auth/data.json";
import AuthLayout from '@/layouts/AuthLayout';
import { ROUTES } from '@/constants/routes.constants';
import FormContent from '@/components/auth/FormContent';
import { loginAction } from "@/app/actions";
import Title from "@/components/shared/Title";

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
      <Title as="h1" className="text-3xl font-extrabold tracking-tighter text-center mb-8">{title}</Title>
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
