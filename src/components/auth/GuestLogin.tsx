'use client';

import {Button} from '@radix-ui/themes';

export const GuestLogin = () => {
  return (
    <div className="w-full space-y-4">
      <Button
        type="button"
        variant="outline"
        color="gray"
        onClick={() => ({})}
        className="h-9 w-full text-[13px] font-normal text-inherit shadow-[inset_0_0_0_0.5px_var(--accent-a8)]"
      >
        Continue As Guest
      </Button>
    </div>
  );
};
