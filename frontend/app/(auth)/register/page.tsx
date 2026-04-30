import data from '@/data/auth/data.json';
import Title from '@/components/shared/Title';
import AuthLayout from '@/layouts/AuthLayout';
import { registerAction } from '@/app/actions';
import { ROUTES } from '@/constants/routes.constants';
import FormContent from '@/features/auth/FormContent';

export default function RegisterPage() {
  const commonTexts = data.common;
  const registerTexts = data.auth.register;

  const { title, footerActionText, alreadyHaveAccount } = registerTexts;

  return (
    <AuthLayout
      title={title}
      footerActionText={footerActionText}
      footerLinkText={alreadyHaveAccount}
      footerHref={ROUTES.LOGIN}
    >
      <Title as='h1' className='text-3xl font-extrabold tracking-tighter text-center mb-8'>
        {title}
      </Title>
      <FormContent
        isRegister
        action={registerAction}
        texts={{
          ...registerTexts,
          ...commonTexts,
        }}
      />
    </AuthLayout>
  );
}
