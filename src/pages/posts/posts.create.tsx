import { useNavigate } from 'react-router-dom';
import PostForm from '@/components/posts/PostForm';
import { useCreatePost } from '@/hooks/usePosts';

export default function PostNewPage() {
  const nav = useNavigate();
  const { mutate, isPending } = useCreatePost();

  return (
    <div style={{ maxWidth: 760, margin: '24px auto' }}>
      <h2>새 글</h2>
      <PostForm
        mode="create"
        pending={isPending}
        onSubmit={payload => mutate(payload, { onSuccess: () => nav('/posts') })}
      />
    </div>
  );
}
