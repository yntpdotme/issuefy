import {getIssues} from '@/server/db/issues';
import {Status} from '@prisma/client';
import {Button, Flex} from '@radix-ui/themes';
import Link from 'next/link';
import {IssueStatusFilter} from './IssueStatusFilter';
import {IssueTable} from './IssueTable';

type SearchParams = Promise<{status: Status}>;

const IssuesPage = async ({searchParams}: {searchParams: SearchParams}) => {
  const queryParams = await searchParams;

  const status = Object.values(Status).includes(queryParams.status)
    ? queryParams.status
    : undefined;

  const issues = await getIssues(status);

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
