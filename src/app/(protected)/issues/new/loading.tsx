import Skeleton from '@/components/Skeleton';
import {Box} from '@radix-ui/themes';

const LoadingNewIssuePage = () => {
  return (
    <Box className="mt-5 max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="24rem" className="mt-3" />

      <Skeleton width="9rem" height="1.9rem" className="mt-8" />
    </Box>
  );
};

export default LoadingNewIssuePage;
