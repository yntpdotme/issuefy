import {getIssues} from '@/server/db/issues';
import {Status} from '@prisma/client';
import {Button, Flex} from '@radix-ui/themes';
import {Metadata} from 'next';
import Link from 'next/link';
import {IssueStatusFilter} from './IssueStatusFilter';
import {columnNames, IssueQuery, IssueTable} from './IssueTable';

type Props = {
  searchParams: IssueQuery;
};

const IssuesPage = async ({searchParams}: Props) => {
  const queryParams = await searchParams;

  const status = Object.values(Status).includes(queryParams.status)
    ? queryParams.status
    : undefined;

  const orderBy = columnNames.includes(queryParams.orderBy)
    ? queryParams.orderBy
    : undefined;

  const page = parseInt(queryParams.page) || 1;
  const pageSize = 10;

  const issues = await getIssues({status, orderBy, page, pageSize});

  return (
    <Flex direction="column" gap="5" mt="20px">
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

export const metadata: Metadata = {
  title: 'Issuefy · Issue list',
  description: 'View all project issues',
};

export default IssuesPage;
