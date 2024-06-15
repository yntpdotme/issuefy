import {CiCircleCheck} from 'react-icons/ci';

type FormSuccessProps = {
  message?: string;
};

export const FormSuccess = ({message}: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <CiCircleCheck className="size-4" />
      <p>{message}</p>
    </div>
  );
};
