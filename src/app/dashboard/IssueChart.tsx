'use client';

import {Card} from '@radix-ui/themes';
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

export const IssueChart = ({open, inProgress, closed}: Props) => {
  const data = [
    {label: 'Open', value: open},
    {label: 'In Progress', value: inProgress},
    {label: 'Closed', value: closed},
  ];

  return (
    <Card>
      <ResponsiveContainer height={350} className="mx-auto max-w-[510px]">
        <BarChart
          data={data}
          margin={{
            top: 25,
            bottom: 10,
            right: 30,
          }}
        >
          <XAxis dataKey="label" />

          <YAxis />

          <Bar
            dataKey="value"
            barSize={50}
            style={{fill: 'var(--accent-10)'}}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
