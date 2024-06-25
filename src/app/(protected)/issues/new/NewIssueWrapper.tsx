'use client';
import dynamic from 'next/dynamic';

const IssueForm = dynamic(
  () => import('@/app/(protected)/issues/_components/IssueForm'),
  {
    ssr: false,
  },
);

const NewIssueWrapper = () => {
  return <IssueForm />;
};

export default NewIssueWrapper;
