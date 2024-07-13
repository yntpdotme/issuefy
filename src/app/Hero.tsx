import {Button, Flex, Heading, Text} from '@radix-ui/themes';
import Link from 'next/link';

export const Hero = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="mx-auto mt-10 max-w-3xl text-center"
    >
      <Heading
        as="h1"
        weight="bold"
        className="mb-6 mt-10 text-3xl min-[450px]:text-4xl md:text-5xl xl:text-6xl"
      >
        Simplify Your Project Management with Issuefy
      </Heading>

      <Text as="p" className="mb-8 text-lg sm:text-xl">
        A modern, easy-to-use issue tracker designed to streamline your workflow
        and boost productivity.
      </Text>

      <Flex gap="3" justify="center">
        <Button size="3">
          <Link href="/issues">Explore All Issues</Link>
        </Button>

        <Button size="3" variant="surface">
          <Link href="/dashboard">Dashboard View</Link>
        </Button>
      </Flex>
    </Flex>
  );
};
