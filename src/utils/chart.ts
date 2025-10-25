import { CoffeeConsumptionResponse } from '@/net/type';

// 라인차트 편의: 팀별 데이터를 평탄화
export type CoffeePointFlat = {
  team: string;
  cups: number;
  bugs: number;
  productivity: number;
};
export const flattenCoffeeTeams = (data: CoffeeConsumptionResponse): CoffeePointFlat[] =>
  data.teams.flatMap(t => t.series.map(s => ({ team: t.team, ...s })));
