import Skeleton from '@/components/Skeleton';
import {Button, Flex, Select, Table} from '@radix-ui/themes';
import Link from 'next/link';

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <Flex direction="column" gap="5" mt="20px">
      <Flex justify="between">
        <Select.Root defaultValue="ALL">
          <Select.Trigger placeholder="Filter by status..." />
          <Select.Content position="popper">
            <Select.Item value="ALL">All</Select.Item>
          </Select.Content>
        </Select.Root>

        <Button className="w-fit">
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default LoadingIssuesPage;
