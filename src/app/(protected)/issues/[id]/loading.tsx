import Skeleton from '@/components/Skeleton';
import {Box, Card, Flex, Grid} from '@radix-ui/themes';

const LoadingIssueDetailPage = () => {
  return (
    <Grid columns={{initial: '1', sm: '5'}} gap="5">
      <Box className="md:col-span-4">
        <Skeleton height="1.5rem" />
        <Flex gap="4" my="2">
          <Skeleton width="4rem" />
          <Skeleton width="6rem" />
        </Flex>
        <Card className="mt-4 w-full">
          <Skeleton count={3} className="w-full" />
        </Card>
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <Skeleton height="1.7rem" />
          <Skeleton height="1.7rem" />
        </Flex>
      </Box>
    </Grid>
  );
};

export default LoadingIssueDetailPage;
