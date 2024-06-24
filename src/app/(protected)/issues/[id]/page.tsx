type Props = {
  params: Promise<{id: string}>;
};

const IssueDetailPage = async ({params}: Props) => {
  const issueId = (await params).id;

  return <div>Issue: {issueId}</div>;
};

export const metadata = {
  title: 'Issue Page',
  description: 'Details of issue',
};

export default IssueDetailPage;
