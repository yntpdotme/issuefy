import {CardWrapper} from '@/components/auth/CardWrapper';
import {BsExclamationTriangle} from 'react-icons/bs';

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something Went Wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center pb-6">
        <BsExclamationTriangle className="size-6 text-destructive" />
      </div>
    </CardWrapper>
  );
};
