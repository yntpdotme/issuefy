import {Status} from '@prisma/client';
import {Select} from '@radix-ui/themes';

const statuses: {label: string; value: Status}[] = [
  {label: 'Open', value: 'OPEN'},
  {label: 'In Progress', value: 'IN_PROGRESS'},
  {label: 'Closed', value: 'CLOSED'},
];

type Props = {
  value: Status;
  onChange: (value: Status) => void;
};

const StatusSelect = ({value, onChange}: Props) => {
  return (
    <Select.Root defaultValue={value} onValueChange={onChange}>
      <Select.Trigger variant="soft" />
      <Select.Content variant="soft" position="popper">
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {statuses.map((status, index) => (
            <Select.Item key={index} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusSelect;
