import {IssueStatusBadge} from '@/components/IssueStatusBadge';
import {Pagination} from '@/components/Pagination';
import {Issue, Status} from '@prisma/client';
import {Flex, Table} from '@radix-ui/themes';
import NextLink from 'next/link';
import {Suspense} from 'react';
import {RxCaretSort} from 'react-icons/rx';
import {IssueLink} from './IssueLink';

export type IssueQuery = Promise<{
  status: Status;
  orderBy: keyof Pick<Issue, 'title' | 'status' | 'createdAt'>;
  page: string;
}>;

type Props = {
  searchParmas: IssueQuery;
  issues: {
    data: Issue[];
    currentPage: number;
    pageSize: number;
    totalIssues: number;
  };
};

const columns: {
  label: string;
  value: keyof Pick<Issue, 'title' | 'status' | 'createdAt'>;
  className?: string;
}[] = [
  {label: 'Issue', value: 'title'},
  {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
  {label: 'Created', value: 'createdAt', className: 'hidden md:table-cell'},
];

export const IssueTable = async ({searchParmas, issues}: Props) => {
  const queryParams = await searchParmas;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(column => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {...queryParams, orderBy: column.value},
                }}
              >
                {column.label}
                {column.value === queryParams?.orderBy && (
                  <RxCaretSort className="inline" />
                )}
              </NextLink>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.data?.map(issue => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Flex justify="between" gap="3">
                <IssueLink href={`/issues/${issue.id}`}>
                  {issue.title}
                </IssueLink>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Flex>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt
                .toLocaleDateString('en-us', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
                .split(' ')
                .slice(1)
                .join(' ')}
            </Table.Cell>
          </Table.Row>
        ))}

        <Table.Row>
          <Table.Cell>
            <Suspense fallback={null}>
              <Pagination
                pageSize={issues.pageSize}
                currentPage={issues.currentPage}
                itemCount={issues.totalIssues}
              />
            </Suspense>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};

export const columnNames = columns.map(column => column.value);
