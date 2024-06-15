import {BsExclamationTriangle} from 'react-icons/bs';

type FormErrorProps = {
  message?: string;
};

export const FormError = ({message}: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 text-destructive flex items-center gap-x-2 rounded-md p-3 text-sm">
      <BsExclamationTriangle className="size-4" />
      <p>{message}</p>
    </div>
  );
};
