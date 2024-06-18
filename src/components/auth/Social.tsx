'use client';

import {DEFAULT_LOGIN_REDIRECT} from '@/routes';
import {Button, Flex} from '@radix-ui/themes';
import {signIn} from 'next-auth/react';
import {useSearchParams} from 'next/navigation';
import {FaGithub} from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc';

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <Flex align="center" gapX="2" className="w-full">
      <Button
        size="3"
        className="h-9 flex-1 cursor-pointer shadow-[inset_0_0_0_0.5px_var(--accent-a8)]"
        variant="outline"
        color="gray"
        onClick={() => onClick('google')}
      >
        <FcGoogle className="scale-125" />
      </Button>

      <Button
        size="3"
        className="h-9 flex-1 cursor-pointer shadow-[inset_0_0_0_0.5px_var(--accent-a8)]"
        variant="outline"
        color="gray"
        onClick={() => onClick('github')}
      >
        <FaGithub className="scale-125 text-black dark:text-white" />
      </Button>
    </Flex>
  );
};
