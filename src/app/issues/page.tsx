import {getIssues} from '@/server/db/issues';
import {Button, Flex} from '@radix-ui/themes';
import Link from 'next/link';
import {IssueTable} from './IssueTable';

const IssuesPage = async () => {
  const issues = await getIssues();

  return (
    <Flex direction="column" gap="18px">
      <Button className="w-fit">
        <Link href="/issues/new">New Issue</Link>
      </Button>
      <IssueTable issues={issues} />
    </Flex>
  );
};

export default IssuesPage;
