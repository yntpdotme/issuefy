import {getIssues} from '@/server/db/issues';
import {Issue, Status} from '@prisma/client';
import {Button, Flex} from '@radix-ui/themes';
import Link from 'next/link';
import {IssueStatusFilter} from './IssueStatusFilter';
import {IssueTable} from './IssueTable';

type SearchParams = Promise<{
  status: Status;
  orderBy: keyof Pick<Issue, 'title' | 'status' | 'createdAt'>;
}>;

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

      <IssueTable searchParmas={searchParams} issues={issues} />
    </Flex>
  );
};

export default IssuesPage;
