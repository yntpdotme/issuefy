import {getIssue} from '@/server/db/issues';
import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {IssueDetails} from './IssueDetails';

type Props = {
  params: Promise<{id: string}>;
};

const IssueDetailPage = async ({params}: Props) => {
  const issueId = parseInt((await params).id);
  if (!isFinite(issueId)) notFound();

  const issue = await getIssue(issueId);
  if (!issue) notFound();

  return <IssueDetails issue={issue} />;
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
  const issueId = parseInt((await params).id);

  const issue = await getIssue(issueId);

  return {
    title: `Issuefy · ${issue?.title}`,
    description: 'Details of issue ' + issue?.id,
  };
};

export default IssueDetailPage;
