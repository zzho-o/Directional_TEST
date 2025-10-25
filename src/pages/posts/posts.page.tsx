import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { apiPosts } from '@/net/api';
import PostFilters from '@/components/posts/PostFilters';
import PostCard from '@/components/posts/PostCard';
import Button from '@/components/common/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useRemoveAllPosts, useRemovePost } from '@/hooks/usePosts';

const Grid = styled.div`
  display: grid;
  gap: 12px;
`;

export default function PostsPage() {
  const nav = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'' | 'NOTICE' | 'QNA' | 'FREE'>('');
  const [sort, setSort] = useState<'createdAt' | 'title'>('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const baseParams = useMemo(
    () => ({
      search: search.trim() || undefined,
      category: (category || undefined) as any,
      sort,
      order,
      limit: 10,
    }),
    [search, category, sort, order],
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isLoading } = useInfiniteQuery({
    queryKey: ['posts', baseParams],
    queryFn: ({ pageParam }) => apiPosts.list({ ...baseParams, nextCursor: pageParam }),
    getNextPageParam: last => last.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
  });

  const { mutate: removeAll, isPending: removingAll } = useRemoveAllPosts();
  const { mutate: removeOne, isPending: removingOne } = useRemovePost();

  const items = data?.pages.flatMap(p => p.items) ?? [];

  return (
    <div style={{ maxWidth: 760, margin: '24px auto' }}>
      <h2>게시글</h2>

      <PostFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        onNew={() => nav('/posts/new')}
        onClearAll={() => removeAll(undefined, { onSuccess: () => refetch() })}
      />

      {isLoading ? (
        <p>불러오는 중…</p>
      ) : (
        <Grid>
          {items.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onRemove={id =>
                removeOne(id, {
                  onSuccess: () => refetch(),
                })
              }
            />
          ))}
        </Grid>
      )}

      <div style={{ marginTop: 12 }}>
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? '로딩…' : '더 보기'}
          </Button>
        )}
      </div>
    </div>
  );
}
