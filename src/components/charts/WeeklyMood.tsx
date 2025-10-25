// src/components/charts/WeeklyMood.tsx
import { useQuery } from '@tanstack/react-query';
import { apiWeeklyMoodTrend } from '@/net/api';
import { ChartBox } from './ChartBox';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

export default function WeeklyMood() {
  const { data } = useQuery({ queryKey: ['weekly-mood'], queryFn: apiWeeklyMoodTrend });
  if (!data) return null;

  return (
    <ChartBox>
      <h3>주간 무드 (스택 면적)</h3>
      <div style={{ height: 260 }}>
        <ResponsiveContainer>
          <AreaChart data={data} stackOffset="expand">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis tickFormatter={v => `${Math.round(v * 100)}%`} />
            <Tooltip formatter={(v: number) => `${Math.round(v * 100)}%`} />
            <Area type="monotone" dataKey="happy" stackId="1" />
            <Area type="monotone" dataKey="tired" stackId="1" />
            <Area type="monotone" dataKey="stressed" stackId="1" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <h3 style={{ marginTop: 16 }}>주간 무드 (스택 바)</h3>
      <div style={{ height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={data} stackOffset="expand">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis tickFormatter={v => `${Math.round(v * 100)}%`} />
            <Tooltip formatter={(v: number) => `${Math.round(v * 100)}%`} />
            <Legend />
            <Bar dataKey="happy" stackId="a" />
            <Bar dataKey="tired" stackId="a" />
            <Bar dataKey="stressed" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartBox>
  );
}
