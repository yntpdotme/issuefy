'use client';

import {signOut} from 'next-auth/react';

type LogoutButtonProps = {
  children?: React.ReactNode;
};

export const LogoutButton = ({children}: LogoutButtonProps) => {
  const onClick = () => {
    signOut({callbackUrl: '/auth/login'});
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
