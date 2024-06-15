import {FieldValues, UseFormRegister} from 'react-hook-form';

type Props = {
  placeholder?: string;
  type?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  register: ReturnType<UseFormRegister<FieldValues>>;
};

export const Input = ({
  placeholder = 'Enter value',
  type = 'text',
  id,
  disabled = false,
  className = '',
  register,
}: Readonly<Props>) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      disabled={disabled}
      className={`border-input focus-visible:ring-ring flex h-9 w-full rounded-md border-[0.5px] border-zinc-500 bg-transparent px-3 py-1 text-base shadow ring-zinc-800 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[0] dark:shadow-[inset_0_0_0_0.5px_gray] dark:ring-zinc-300 dark:placeholder:text-zinc-500 md:text-sm ${className}`}
      {...register}
    />
  );
};
