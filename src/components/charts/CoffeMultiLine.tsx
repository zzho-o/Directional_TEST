import { useQuery } from '@tanstack/react-query';
import { apiCoffeeConsumption } from '@/net/api';
import { ChartBox } from './ChartBox';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { flattenCoffeeTeams } from '@/utils/chart';

export default function CoffeeMultiLine() {
  const { data } = useQuery({ queryKey: ['coffee-consumption'], queryFn: apiCoffeeConsumption });
  if (!data) return null;

  const flat = flattenCoffeeTeams(data); // 편의 헬퍼(없어도 됨)
  // 팀별로 데이터 분리
  const teams = [...new Set(flat.map(d => d.team))];
  const xDomain = [...new Set(flat.map(d => d.cups))].sort((a, b) => a - b);
  const rows = xDomain.map(cups => {
    const row: any = { cups };
    teams.forEach(t => {
      const hit = flat.find(d => d.cups === cups && d.team === t);
      if (hit) {
        row[`${t}_bugs`] = hit.bugs;
        row[`${t}_prod`] = hit.productivity;
      }
    });
    return row;
  });

  return (
    <ChartBox>
      <h3>커피 섭취량 vs 버그/생산성 (팀별)</h3>
      <div style={{ height: 320 }}>
        <ResponsiveContainer>
          <LineChart data={rows}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cups" label={{ value: '잔/일', position: 'insideBottom', offset: -5 }} />
            <YAxis yAxisId="left" label={{ value: 'Bugs', angle: -90, position: 'insideLeft' }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: 'Productivity', angle: -90, position: 'insideRight' }}
            />
            <Tooltip />
            <Legend />

            {teams.map((t, i) => (
              <>
                <Line
                  key={`${t}-bugs`}
                  yAxisId="left"
                  type="monotone"
                  dataKey={`${t}_bugs`}
                  name={`${t} Bugs`}
                  dot={{ r: 4 }}
                />
                <Line
                  key={`${t}-prod`}
                  yAxisId="right"
                  type="monotone"
                  dataKey={`${t}_prod`}
                  name={`${t} Productivity`}
                  strokeDasharray="5 5"
                  dot={{ r: 0, strokeWidth: 0 }}
                  activeDot={{ r: 4, width: 4, height: 4, fill: '#000', strokeWidth: 0, className: 'square-dot' }}
                />
              </>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartBox>
  );
}
