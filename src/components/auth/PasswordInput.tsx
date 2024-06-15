import {Input} from '@/components/ui/Input';
import {useState} from 'react';
import {FieldValues, UseFormRegister} from 'react-hook-form';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

type Props<TFieldValues extends FieldValues> = {
  // field: ControllerRenderProps<TFieldValues>;
  placeholder?: string;
  disabled?: boolean;
  register: ReturnType<UseFormRegister<FieldValues>>;
};

export const PasswordInput = <TFieldValues extends FieldValues>({
  // field,
  register,
  placeholder = '******',
  disabled = false,
}: Props<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-end rounded-md border-[0.5px] border-zinc-400 shadow">
      <Input
        // {...field}
        placeholder={showPassword ? 'password' : placeholder}
        type={showPassword ? 'text' : 'password'}
        disabled={disabled}
        className="border-none shadow-none hover:outline-none dark:shadow"
        register={register}

      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="mx-2 -translate-y-1/3 pb-0.5 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        {showPassword ? (
          <AiOutlineEyeInvisible className="size-5" />
        ) : (
          <AiOutlineEye className="size-5" />
        )}
      </button>
    </div>
  );
};
