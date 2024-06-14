import CardWrapper from '@/components/auth/CardWrapper';

const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account"
      backButtonHref="/auth/register"
      showSocial
      showGuestLogin
    >
      <div className="text-center">LoginForm</div>
    </CardWrapper>
  );
};

export default LoginForm;
