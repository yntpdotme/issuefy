import {getIssuesWithUsers} from '@/server/db/issues';
import {Status} from '@prisma/client';
import {
  Avatar,
  Badge,
  Card,
  Flex,
  Heading,
  Text,
  Tooltip,
} from '@radix-ui/themes';
import Link from 'next/link';

const STATUS_COLORS: Record<Status, 'red' | 'purple' | 'green'> = {
  OPEN: 'red',
  IN_PROGRESS: 'purple',
  CLOSED: 'green',
};

const StatusBadge = ({status}: {status: Status}) => (
  <Tooltip content={status.toLowerCase().replace('_', ' ')}>
    <Badge
      color={STATUS_COLORS[status]}
      variant="solid"
      radius="full"
      className="scale-75 py-1.5"
    />
  </Tooltip>
);

export const LatestIssues = async () => {
  const {data: issues} = await getIssuesWithUsers({
    pageSize: 10,
    includeUser: true,
  });

  return (
    <Card>
      <Heading size="5" m="3">
        Latest Issues
      </Heading>
      <Flex direction="column" gap="4" m="4" mt="5">
        {issues?.map(issue => (
          <Flex key={issue.id} gap="2" align="center" justify="between">
            <Flex gap="3" align="center" className="w-[90%] flex-1">
              <StatusBadge status={issue.status} />
              <Text truncate className="max-w-[95%]">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </Text>
            </Flex>
            {issue.assignedToUser && (
              <Avatar
                src={issue.assignedToUser.image!}
                fallback={issue.assignedToUser?.name?.charAt(0) || 'U'}
                size="1"
                radius="small"
              />
            )}
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};
