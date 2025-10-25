import styled from 'styled-components';
import TopBrands from '@/components/charts/TopBrands';
import WeeklyMood from '@/components/charts/WeeklyMood';
import CoffeeMultiLine from '@/components/charts/CoffeMultiLine';

const Wrap = styled.div`
  max-width: 1080px;
  margin: 24px auto;
  padding: 0 16px;
  display: grid;
  gap: 16px;

  .grid2 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (min-width: 960px) {
    .grid2 {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export default function ChartsPage() {
  return (
    <Wrap>
      <div className="grid2">
        <TopBrands />
        <WeeklyMood />
      </div>
      <CoffeeMultiLine />
    </Wrap>
  );
}
