import {Grid} from '@radix-ui/themes';
import {IssueSummary} from './IssueSummary';
import {LatestIssues} from './LatestIssues';

const DashboardPage = () => {
  return (
    <Grid columns={{initial: '1', md: '2'}} gap="5">
      <IssueSummary open={10} inProgress={5} closed={7} />
      <LatestIssues />
    </Grid>
  );
};

export default DashboardPage;
