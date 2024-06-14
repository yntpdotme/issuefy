import CardWrapper from '@/components/auth/CardWrapper';

const RegisterForm = () => {
  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account"
      backButtonHref="/auth/login"
      showSocial
    >
      <div className="text-center">RegisterForm</div>
    </CardWrapper>
  );
};

export default RegisterForm;
