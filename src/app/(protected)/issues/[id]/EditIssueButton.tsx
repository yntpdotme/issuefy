import {Button} from '@radix-ui/themes';
import Link from 'next/link';
import {LiaEditSolid} from 'react-icons/lia';

export const EditIssueButton = ({issueId}: {issueId: number}) => {
  return (
    <Button className="cursor-pointer">
      <Link href={`/issues/edit/${issueId}`} className="w-full">
        <LiaEditSolid className="mb-[3px] mr-2 inline-flex" />
        Edit Issue
      </Link>
    </Button>
  );
};
