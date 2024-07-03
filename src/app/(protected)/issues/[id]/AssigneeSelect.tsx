'use client';

import {Issue} from '@prisma/client';
import {ScrollArea, Select} from '@radix-ui/themes';

type Props = {
  issue: Issue;
};

const AssigneeSelect = ({issue}: Props) => {
  const users = [
    {id: '1', name: 'User 1'},
    {id: '2', name: 'User 2'},
    {id: '3', name: 'User 3'},
    {id: '4', name: 'Cser 4'},
    {id: '5', name: 'User 5'},
    {id: '6', name: 'User 6'},
    {id: '7', name: 'User 7'},
    {id: '8', name: 'User 8'},
    {id: '9', name: 'User 9'},
    {id: '10', name: 'User 10'},
  ];

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
            <ScrollArea type="auto" scrollbars="vertical" style={{height: 180}}>
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
