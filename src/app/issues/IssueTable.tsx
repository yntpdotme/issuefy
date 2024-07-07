import {IssueStatusBadge} from '@/components/IssueStatusBadge';
import {Pagination} from '@/components/Pagination';
import {Issue, Status} from '@prisma/client';
import {Table} from '@radix-ui/themes';
import NextLink from 'next/link';
import {RxCaretSort} from 'react-icons/rx';
import {IssueLink} from './IssueLink';

export type IssueQuery = Promise<{
  status: Status;
  orderBy: keyof Pick<Issue, 'title' | 'status' | 'createdAt'>;
}>;

type Props = {
  searchParmas: IssueQuery;
  issues: Issue[];
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

export const columnNames = columns.map(column => column.value);

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
        {issues?.map(issue => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <IssueLink href={`/issues/${issue.id}`}>{issue.title}</IssueLink>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
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
          <Pagination itemCount={100} pageSize={10} currentPage={1} />
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};
