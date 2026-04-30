import data from '@/data/auth/data.json';
import { loginAction } from '@/app/actions';
import AuthLayout from '@/layouts/AuthLayout';
import Title from '@/components/shared/Title';
import { ROUTES } from '@/constants/routes.constants';
import FormContent from '@/features/auth/FormContent';

export default function LoginPage() {
  const commonTexts = data.common;
  const loginTexts = data.auth.login;
  const { title, footerActionText, alreadyHaveAccount } = loginTexts;

  return (
    <AuthLayout
      title={title}
      footerHref={ROUTES.REGISTER}
      footerActionText={footerActionText}
      footerLinkText={alreadyHaveAccount}
    >
      <Title as='h1' className='text-3xl font-extrabold tracking-tighter text-center mb-8'>
        {title}
      </Title>
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
