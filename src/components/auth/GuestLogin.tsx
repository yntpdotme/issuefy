'use client';

import {guestLogin} from '@/action/guestLogin';
import {Button} from '@radix-ui/themes';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState, useTransition} from 'react';
import {FormSuccess} from '@/components/FormSuccess';
import {FormError} from '@/components/FormError';

export const GuestLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onGuestLogin = () => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      const res = await guestLogin(callbackUrl);
      console.log(res);

      if (res?.error) {
        setError(res.error);
      }
      if (res?.success) {
        router.push(res.redirect);
        setSuccess(res.success);
      }
    });
  };

  return (
    <div className="w-full space-y-4">
      <FormError message={error} />
      <FormSuccess message={success} />

      <Button
        type="button"
        variant="outline"
        color="gray"
        onClick={onGuestLogin}
        disabled={isPending}
        className="h-9 w-full cursor-pointer text-[13px] font-normal text-inherit shadow-[inset_0_0_0_0.5px_var(--accent-a8)]"
      >
        Continue As Guest
      </Button>
    </div>
  );
};
