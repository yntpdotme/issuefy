import {getIssues} from '@/server/db/issues';
import {Button, Flex} from '@radix-ui/themes';
import Link from 'next/link';
import {IssueStatusFilter} from './IssueStatusFilter';
import {IssueTable} from './IssueTable';

const IssuesPage = async () => {
  const issues = await getIssues();

  return (
    <Flex direction="column" gap="18px">
      <Flex justify="between">
        <IssueStatusFilter />
        
        <Button className="w-fit">
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>

      <IssueTable issues={issues} />
    </Flex>
  );
};

export default IssuesPage;
