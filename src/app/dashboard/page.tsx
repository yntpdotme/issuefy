import {Flex, Grid} from '@radix-ui/themes';
import {IssueChart} from './IssueChart';
import {IssueSummary} from './IssueSummary';
import {LatestIssues} from './LatestIssues';

const DashboardPage = () => {
  return (
    <Grid columns={{initial: '1', md: '2'}} gap="5" mt="20px">
      <Flex direction="column" gap="5">
        <IssueSummary open={10} inProgress={5} closed={7} />
        <IssueChart open={10} inProgress={5} closed={7} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default DashboardPage;
