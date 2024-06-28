import {auth} from '@/auth';
import {getIssue} from '@/server/db/issues';
import {Box, Grid} from '@radix-ui/themes';
import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {EditIssueButton} from './EditIssueButton';
import {IssueDetails} from './IssueDetails';

type Props = {
  params: Promise<{id: string}>;
};

const IssueDetailPage = async ({params}: Props) => {
  const session = await auth();

  const issueId = parseInt((await params).id);
  if (!isFinite(issueId)) notFound();

  const issue = await getIssue(issueId);
  if (!issue) notFound();

  return (
    <Grid columns={{initial: '1', sm: '5'}}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <EditIssueButton issueId={issue.id} />
        </Box>
      )}
    </Grid>
  );
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
