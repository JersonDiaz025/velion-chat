import data from "@/data/auth/data.json";
import AuthLayout from "@/layouts/AuthLayout";
import { ROUTES } from "@/constants/routes.constants";
import FormContent from "@/components/auth/FormContent";
import { registerAction } from "@/app/actions/auth.actions";

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
      <FormContent
        action={registerAction}
        texts={{
          ...registerTexts,
          ...commonTexts,
        }}
      />

    </AuthLayout>
  );
}
