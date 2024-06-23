import {useSession} from 'next-auth/react';

export const useCurrentUser = () => {
  const session = useSession();

  return {status: session.status, user: session.data?.user};
};
