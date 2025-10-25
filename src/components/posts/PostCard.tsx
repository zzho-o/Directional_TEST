import styled from 'styled-components';
import Button from '@/components/common/ui/Button';
import { Link } from 'react-router-dom';
import type { Post } from '@/net/type';

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.panel};
  padding: 12px;
  display: grid;
  gap: 6px;
`;

export default function PostCard({ post, onRemove }: { post: Post; onRemove: (id: string) => void }) {
  return (
    <Card>
      <h3 style={{ margin: 0 }}>{post.title}</h3>
      <p style={{ margin: 0, color: '#A6A9B2' }}>
        {post.category} · {new Date(post.createdAt).toLocaleString()}
      </p>
      <p style={{ margin: '4px 0 0' }}>{post.body}</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <Link to={`/posts/${post.id}`}>
          <Button size="sm" variant="ghost">
            수정
          </Button>
        </Link>
        <Button size="sm" variant="danger" onClick={() => onRemove(post.id)}>
          삭제
        </Button>
      </div>
    </Card>
  );
}
