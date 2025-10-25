import styled from 'styled-components';
import { useState } from 'react';
import Button from '@/components/common/ui/Button';
import Input from '@/components/common/ui/Input';
import { typo } from '@/components/common/ui/Typo';
import { hasForbiddenWords, normalizeTags } from '@/utils/post';
import type { PostCreateRequest, PostUpdateRequest, Post } from '@/net/type';

const Wrap = styled.form`
  display: grid;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.panel};
  padding: 16px;
`;
const Label = styled.label`
  ${typo.bodySm};
  color: ${({ theme }) => theme.colors.textMuted};
`;
const Row = styled.div`
  display: grid;
  gap: 6px;
`;
const Textarea = styled.textarea`
  width: 100%;
  height: 140px;
  resize: vertical;
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.line};
  color: ${({ theme }) => theme.colors.text};
  background: #0e1014;
`;

type Props =
  | { mode: 'create'; initial?: Partial<Post>; onSubmit: (payload: PostCreateRequest) => void; pending?: boolean }
  | { mode: 'edit'; initial: Post; onSubmit: (patch: PostUpdateRequest) => void; pending?: boolean };

export default function PostForm(props: Props) {
  const isEdit = props.mode === 'edit';
  const init = props.initial ?? {};
  const [title, setTitle] = useState(init.title ?? '');
  const [body, setBody] = useState(init.body ?? '');
  const [category, setCategory] = useState<'NOTICE' | 'QNA' | 'FREE'>((init as any).category ?? 'FREE');
  const [tagsInput, setTagsInput] = useState((init as any).tags?.join(', ') ?? '');

  const [err, setErr] = useState<string>('');

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();
    setErr('');

    if (!title.trim()) return setErr('제목을 입력하세요.');
    if (title.length > 80) return setErr('제목은 최대 80자입니다.');
    if (!body.trim()) return setErr('본문을 입력하세요.');
    if (body.length > 2000) return setErr('본문은 최대 2000자입니다.');
    if (hasForbiddenWords(body))
      return setErr('금칙어(캄보디아/프놈펜/불법체류/텔레그램)가 포함되어 등록할 수 없습니다.');

    const tags = normalizeTags(tagsInput);
    if (props.mode === 'create') {
      props.onSubmit({ title, body, category, tags });
    } else {
      const patch: PostUpdateRequest = {};
      if (title !== init.title) patch.title = title;
      if (body !== init.body) patch.body = body;
      if (category !== (init as any).category) patch.category = category;
      if (JSON.stringify(tags) !== JSON.stringify((init as any).tags ?? [])) patch.tags = tags;
      if (Object.keys(patch).length === 0) return setErr('변경된 내용이 없습니다.');
      props.onSubmit(patch);
    }
  };

  return (
    <Wrap onSubmit={handleSubmit}>
      <Row>
        <Label>제목 (최대 80자)</Label>
        <Input value={title} onChange={e => setTitle(e.target.value)} maxLength={80} />
      </Row>

      <Row>
        <Label>본문 (최대 2000자, 금칙어 필터 적용)</Label>
        <Textarea value={body} onChange={e => setBody(e.target.value)} maxLength={2000} />
      </Row>

      <Row>
        <Label>카테고리</Label>
        <select value={category} onChange={e => setCategory(e.target.value as any)}>
          <option value="NOTICE">NOTICE</option>
          <option value="QNA">QNA</option>
          <option value="FREE">FREE</option>
        </select>
      </Row>

      <Row>
        <Label>태그 (쉼표 구분, 최대 5개 · 각 24자)</Label>
        <Input value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="react, ts" />
      </Row>

      {err && <p style={{ color: '#EF4444', marginTop: 4 }}>{err}</p>}

      <Button type="submit" size="lg" variant="primary" disabled={props.pending}>
        {props.pending ? '처리 중…' : isEdit ? '수정' : '등록'}
      </Button>
    </Wrap>
  );
}
