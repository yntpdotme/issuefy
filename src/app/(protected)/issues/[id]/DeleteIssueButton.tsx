'use client';
import {Spinner} from '@/components/Spinner';
import {deleteIssue} from '@/server/actions/issues';
import {AlertDialog, Button, Flex} from '@radix-ui/themes';
import {isRedirectError} from 'next/dist/client/components/redirect';
import {useState} from 'react';
import {MdDelete} from 'react-icons/md';

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const onDelete = async () => {
    try {
      setDeleting(true);
      await deleteIssue(issueId);
    } catch (error) {
      if (!isRedirectError(error)) {
        setDeleting(false);
        setError(true);
      }
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting} className="cursor-pointer">
            <MdDelete /> Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>

          <AlertDialog.Description size="2">
            Are you sure you want ot delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={onDelete}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Error</AlertDialog.Title>

          <AlertDialog.Description size="2">
            This issue could not be deleted.
          </AlertDialog.Description>

          <Button
            color="gray"
            variant="soft"
            mt="4"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
