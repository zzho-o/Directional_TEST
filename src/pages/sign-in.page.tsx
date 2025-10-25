// src/pages/sign-in.page.tsx
import { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '@/components/common/ui/Button';
import Input from '@/components/common/ui/Input';

import { apiAuth } from '@/net/api';
import { useAuthStore } from '@/stores/store.auth';
import { typo } from '@/components/common/ui/Typo';

const Wrap = styled.form`
  max-width: 420px;
  margin: 120px auto;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.panel};
  display: grid;
  gap: 14px;
`;

const Title = styled.h1`
  margin: 0 0 6px;
  font-size: 24px;
`;

const Helper = styled.p`
  ${typo?.bodySm ?? ''};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 10px;
`;

const ErrorText = styled.p`
  ${typo?.bodySm ?? ''};
  color: ${({ theme }) => theme.colors.danger};
  margin: 4px 0 0;
`;

export default function SignInPage() {
  const { t } = useTranslation('auth'); // 🔹 auth 네임스페이스 사용
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const setAuth = useAuthStore(s => s.setAuth);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || '/home';

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => apiAuth.postAuthLogin(email, pw),
    onSuccess: data => {
      setAuth({ token: data?.token, user: data?.user });
      navigate(redirect, { replace: true });
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pw) return;
    mutate();
  };

  return (
    <Wrap onSubmit={onSubmit}>
      <Title>{t('title')}</Title>
      <Helper>{t('helper')}</Helper>

      <Input placeholder={t('emailPlaceholder')} size="md" value={email} onChange={e => setEmail(e.target.value)} />
      <Input
        type="password"
        placeholder={t('passwordPlaceholder')}
        size="md"
        value={pw}
        onChange={e => setPw(e.target.value)}
      />

      {isError && <ErrorText>{t('error', { msg: (error as Error)?.message })}</ErrorText>}

      <Button size="lg" variant="primary" type="submit" disabled={isPending || !email || !pw}>
        {isPending ? t('submitting') : t('login')}
      </Button>
    </Wrap>
  );
}
