import {auth} from '@/auth';
import {getIssue} from '@/server/db/issues';
import {getUserNames} from '@/server/db/users';
import {Box, Flex, Grid} from '@radix-ui/themes';
import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
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

  const users = await getUserNames();

  return (
    <Grid columns={{initial: '1', sm: '5'}} gap="5" mt="20px">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} users={users} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
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
