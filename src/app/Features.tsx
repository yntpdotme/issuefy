import {Box, Card, Grid, Heading, Section, Text} from '@radix-ui/themes';
import {AiFillThunderbolt} from 'react-icons/ai';
import {FiCheckCircle} from 'react-icons/fi';
import {HiUsers} from 'react-icons/hi2';
import {IoLockOpen} from 'react-icons/io5';

const features = [
  {
    icon: <FiCheckCircle className="size-6" />,
    title: 'Intuitive Issue Tracking',
    description:
      'Easily create, assign, and manage issues with our user-friendly interface.',
  },
  {
    icon: <AiFillThunderbolt className="size-6" />,
    title: 'Lightning Fast',
    description:
      'Optimized performance for quick access to your issues and data.',
  },
  {
    icon: <HiUsers className="size-6" />,
    title: 'Team Management',
    description:
      'Organize your team, assign issues, and track progress effortlessly.',
  },
  {
    icon: <IoLockOpen className="size-6" />,
    title: 'Secure and Reliable',
    description:
      'Your data is protected with enterprise-grade security measures.',
  },
];

export const Features = () => {
  return (
    <Section id="features" className="py-20">
      <Heading
        align="center"
        weight="bold"
        className="mb-12 text-2xl md:text-3xl"
      >
        Powerful Features to Boost Your Productivity
      </Heading>

      <Grid columns={{initial: '1', md: '2'}} gap="5">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="flex items-start gap-4 rounded-lg p-6 shadow"
          >
            <Box className="shrink-0">{feature.icon}</Box>
            <Box>
              <Heading as="h3" size="4" weight="medium" className="mb-2">
                {feature.title}
              </Heading>
              <Text as="p" size="3">
                {feature.description}
              </Text>
            </Box>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};
