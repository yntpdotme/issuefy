import {getIssue} from '@/server/db/issues';
import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import EditIssueWrapper from './EditIssueWrapper';

interface Props {
  params: Promise<{id: string}>;
}

const EditIssuePage = async ({params}: Props) => {
  const issueId = parseInt((await params).id);
  if (!isFinite(issueId)) notFound();

  const issue = await getIssue(issueId);
  if (!issue) notFound();

  return <EditIssueWrapper issue={issue} />;
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
  const issueId = parseInt((await params).id);

  const issue = await getIssue(issueId);

  return {
    title: 'Issuefy · Edit - ' + issue?.title,
    description: 'Edit issue ' + issue?.id,
  };
};

export default EditIssuePage;
