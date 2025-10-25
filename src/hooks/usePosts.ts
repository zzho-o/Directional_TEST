import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiPosts } from '@/net/api';
import type {
  PostsQueryReq,
  Post,
  PostCreateRequest,
  PostUpdateRequest,
  DeleteResponse,
  PostsListResp,
} from '@/net/type';

export function usePostList(params: Omit<PostsQueryReq, 'prevCursor' | 'nextCursor'> & { limit?: number }) {
  return useInfiniteQuery({
    queryKey: ['posts', params],
    queryFn: ({ pageParam }) =>
      apiPosts.list({ ...params, limit: params.limit ?? 10, nextCursor: pageParam as string | undefined }),
    getNextPageParam: (lastPage: PostsListResp) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => apiPosts.get(id),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: PostCreateRequest) => apiPosts.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] }),
  });
}

export function useUpdatePost(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: PostUpdateRequest) => apiPosts.update(id, patch),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['post', id] });
      qc.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useRemovePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiPosts.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useRemoveAllPosts() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => apiPosts.removeAll(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] }),
  });
}
