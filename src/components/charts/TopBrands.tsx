// src/components/charts/TopBrands.tsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { ChartBox } from './ChartBox';
import { useQuery } from '@tanstack/react-query';
import { apiTopCoffeeBrands } from '@/net/api';

export default function TopBrands() {
  const { data } = useQuery({ queryKey: ['top-brands'], queryFn: apiTopCoffeeBrands });

  const colors = ['#F43F5E', '#FB7185', '#FDA4AF', '#FECACA', '#FEE2E2']; // 자유롭게 테마로 빼도 됨
  if (!data) return null;

  // 도넛
  return (
    <ChartBox>
      <h3>인기 커피 브랜드 (도넛)</h3>
      <div style={{ height: 260 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="popularity" nameKey="brand" innerRadius={60} outerRadius={100}>
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <h3 style={{ marginTop: 16 }}>브랜드 분포 (막대)</h3>
      <div style={{ height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="brand" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="popularity" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartBox>
  );
}
