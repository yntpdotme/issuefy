'use client';
import {Issue} from '@prisma/client';
import dynamic from 'next/dynamic';
import EditIssueSkeleton from './loading';

const IssueForm = dynamic(
  () => import('@/app/(protected)/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <EditIssueSkeleton />,
  },
);

const EditIssueWrapper = ({issue}: {issue: Issue}) => {
  return <IssueForm issue={issue} />;
};

export default EditIssueWrapper;
