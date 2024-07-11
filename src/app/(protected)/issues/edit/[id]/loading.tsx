import Skeleton from '@/components/Skeleton';
import {Box, Flex} from '@radix-ui/themes';

const EditIssueSkeleton = () => {
  return (
    <Box className="mt-5 max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="24rem" className="mt-3" />
      <Flex gap="4" mt="5">
        <Skeleton width="5rem" height="1.9rem" />
        <Skeleton width="7rem" height="1.9rem" />
      </Flex>
    </Box>
  );
};

export default EditIssueSkeleton;
