'use client';
import {Status} from '@prisma/client';
import {Select} from '@radix-ui/themes';
import {useRouter} from 'next/navigation';

type Statuses = {
  label: string;
  value: Status | 'ALL';
}[];

const statuses: Statuses = [
  {label: 'All', value: 'ALL'},
  {label: 'Open', value: 'OPEN'},
  {label: 'In Progress', value: 'IN_PROGRESS'},
  {label: 'Closed', value: 'CLOSED'},
];

export const IssueStatusFilter = () => {
  const router = useRouter();

  const filter = (status: Status | 'ALL') => {
    const parmas = new URLSearchParams();

    if (status && status !== 'ALL') parmas.append('status', status);

    const query = parmas.size ? `?${parmas.toString()}` : '';
    router.push(`/issues${query}`);
  };

  return (
    <Select.Root defaultValue={'ALL'} onValueChange={filter}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content position="popper">
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
