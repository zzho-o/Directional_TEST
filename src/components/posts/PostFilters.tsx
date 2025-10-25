import styled from 'styled-components';
import Input from '@/components/common/ui/Input';
import Button from '@/components/common/ui/Button';

const Bar = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
`;

type Props = {
  search: string;
  setSearch: (v: string) => void;
  category: 'NOTICE' | 'QNA' | 'FREE' | '';
  setCategory: (v: any) => void;
  sort: 'createdAt' | 'title';
  setSort: (v: any) => void;
  order: 'asc' | 'desc';
  setOrder: (v: any) => void;
  onNew: () => void;
  onClearAll: () => void;
};

export default function PostFilters(p: Props) {
  return (
    <Bar>
      <Input placeholder="제목/본문 검색" value={p.search} onChange={e => p.setSearch(e.target.value)} />
      <select value={p.category} onChange={e => p.setCategory(e.target.value as any)}>
        <option value="">전체</option>
        <option value="NOTICE">NOTICE</option>
        <option value="QNA">QNA</option>
        <option value="FREE">FREE</option>
      </select>
      <select value={p.sort} onChange={e => p.setSort(e.target.value as any)}>
        <option value="createdAt">작성일</option>
        <option value="title">제목</option>
      </select>
      <select value={p.order} onChange={e => p.setOrder(e.target.value as any)}>
        <option value="desc">내림차순</option>
        <option value="asc">오름차순</option>
      </select>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <Button variant="ghost" onClick={p.onClearAll}>
          전체 삭제
        </Button>
        <Button variant="primary" onClick={p.onNew}>
          새 글
        </Button>
      </div>
    </Bar>
  );
}
