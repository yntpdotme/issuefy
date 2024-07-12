import {Button, Flex, Heading, Text} from '@radix-ui/themes';
import Link from 'next/link';

const NotFound = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      className="min-h-[86vh] text-center"
      gap="3"
    >
      <Heading size="8">404</Heading>

      <Text size="5" weight="medium">
        Oops! Page Not Found
      </Text>

      <Text className="mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </Text>

      <Link href="/">
        <Button
          variant="soft"
          className="mt-2 transition-transform duration-200 hover:scale-105"
        >
          Back to Home
        </Button>
      </Link>
    </Flex>
  );
};

export default NotFound;
