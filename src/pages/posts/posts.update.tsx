import { useParams, useNavigate } from 'react-router-dom';
import { usePost, useUpdatePost } from '@/hooks/usePosts';
import PostForm from '@/components/posts/PostForm';

export default function PostEditPage() {
  const { id = '' } = useParams();
  const nav = useNavigate();
  const { data, isLoading } = usePost(id);
  const { mutate, isPending } = useUpdatePost(id);

  if (isLoading) return <div style={{ maxWidth: 760, margin: '24px auto' }}>불러오는 중…</div>;
  if (!data) return <div style={{ maxWidth: 760, margin: '24px auto' }}>존재하지 않는 글입니다.</div>;

  return (
    <div style={{ maxWidth: 760, margin: '24px auto' }}>
      <h2>글 수정</h2>
      <PostForm
        mode="edit"
        initial={data}
        pending={isPending}
        onSubmit={patch => mutate(patch, { onSuccess: () => nav('/posts') })}
      />
    </div>
  );
}
