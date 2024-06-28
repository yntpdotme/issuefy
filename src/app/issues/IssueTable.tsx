import {IssueStatusBadge} from '@/components/IssueStatusBadge';
import {Issue} from '@prisma/client';
import {Table} from '@radix-ui/themes';
import {IssueLink} from './IssueLink';

type Props = {
  issues: Issue[];
};

const columns: {label: string; value: keyof Issue; className?: string}[] = [
  {label: 'Issue', value: 'title'},
  {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
  {label: 'Created', value: 'createdAt', className: 'hidden md:table-cell'},
];

export const IssueTable = ({issues}: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(column => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              {column.label}
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
      </Table.Body>
    </Table.Root>
  );
};