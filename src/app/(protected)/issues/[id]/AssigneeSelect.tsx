'use client';

import {assignIssue} from '@/server/actions/issues';
import {Issue} from '@prisma/client';
import {ScrollArea, Select} from '@radix-ui/themes';
import toast, {Toaster} from 'react-hot-toast';

type Props = {
  issue: Issue;
  users: {id: string; name: string | null}[] | null;
};

const AssigneeSelect = ({issue, users}: Props) => {
  const assignIssueToUser = async (userId: string) => {
    try {
      await assignIssue(issue.id, userId);
    } catch {
      toast.error('Changes cloud not be saved');
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'unassign'}
        onValueChange={assignIssueToUser}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content
          position="popper"
          className="!relative mr-3 mt-3 2xl:mr-[220px]"
        >
          <Select.Group>
            <ScrollArea
              type="auto"
              scrollbars="vertical"
              style={{maxHeight: 180}}
            >
              <Select.Item value="unassign" className="mr-3.5">
                Unassigned
              </Select.Item>
              {users?.map(user => (
                <Select.Item value={user.id} key={user.id} className="mr-3.5">
                  {user.name}
                </Select.Item>
              ))}
            </ScrollArea>
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          className: 'dark:bg-black dark:text-white',
        }}
      />
    </>
  );
};

export default AssigneeSelect;
