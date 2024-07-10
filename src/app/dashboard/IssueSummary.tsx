import {Status} from '@prisma/client';
import {Card, Flex, Text} from '@radix-ui/themes';
import Link from 'next/link';

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

export const IssueSummary = ({open, inProgress, closed}: Props) => {
  const container: {label: string; value: number; status: Status}[] = [
    {label: 'Open Issues', value: open, status: 'OPEN'},
    {label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS'},
    {label: 'Closed Issues', value: closed, status: 'CLOSED'},
  ];

  return (
    <Flex gap="4">
      {container.map(container => (
        <Card
          key={container.label}
          className={`${container.status === 'IN_PROGRESS' && 'flex-grow'} h-fit sm:w-full`}
        >
          <Flex direction="column" gap="1">
            <Link
              href={`/issues?status=${container.status}`}
              className="text-sm font-medium"
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};
