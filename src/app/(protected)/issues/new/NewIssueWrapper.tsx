'use client';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(
  () => import('@/app/(protected)/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  },
);

const NewIssueWrapper = () => {
  return <IssueForm />;
};

export default NewIssueWrapper;
