import {IssueStatusBadge} from '@/components/IssueStatusBadge';
import {Issue} from '@prisma/client';
import {Card, Flex, Heading, Text} from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

type Props = {
  issue: Issue;
};

export const IssueDetails = ({issue}: Props) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="2" align="center">
        <IssueStatusBadge status={issue.status} />
        <Text>
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
        </Text>
      </Flex>
      <Card mt="4">
        <ReactMarkdown className="prose max-w-full">
          {issue.description}
        </ReactMarkdown>
      </Card>
    </>
  );
};
