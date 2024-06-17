'use client';

import {useSession} from 'next-auth/react';

const IssuesPage = () => {
  const session = useSession();

  return (
    <>
      <div>Issues Page</div>
      <div>User: {JSON.stringify(session.data?.user)}</div>
    </>
  );
};

export default IssuesPage;
