'use client';

import {Issue} from '@prisma/client';
import {ScrollArea, Select} from '@radix-ui/themes';

type Props = {
  issue: Issue;
  users: {id: string; name: string | null}[] | null;
};

const AssigneeSelect = ({issue, users}: Props) => {
  const assignIssue = async (userId: string) => {
    console.log(userId);
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'unassign'}
        onValueChange={assignIssue}
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
    </>
  );
};

export default AssigneeSelect;
