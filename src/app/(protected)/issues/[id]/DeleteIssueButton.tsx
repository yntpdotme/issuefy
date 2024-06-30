'use client';
import {Button} from '@radix-ui/themes';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteIssue = async () => {
    setError(true);
  };

  return (
    <Button color="red" onClick={deleteIssue}>
      Delete Issue
    </Button>
  );
};

export default DeleteIssueButton;
