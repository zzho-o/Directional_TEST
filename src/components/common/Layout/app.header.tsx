// src/components/common/Layout/app.header.tsx
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/utils/i18n';
import { useAuthStore } from '@/stores/store.auth';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiHealth } from '@/net/api';

const Bar = styled.header`
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Btn = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.text)};
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
`;

const Pill = styled.span<{ ok?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
  background: ${({ ok }) => (ok ? 'rgba(16,185,129,.12)' : 'rgba(239,68,68,.12)')};
  color: ${({ ok }) => (ok ? '#10B981' : '#EF4444')};
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

export default function Header() {
  const { t, i18n } = useTranslation('common');
  const cur = (i18n.resolvedLanguage || i18n.language) as 'ko' | 'en';
  const nav = useNavigate();
  const { isAuthed, user, logout } = useAuthStore();

  // API 헬스 체크
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['health'],
    queryFn: apiHealth.get,
    staleTime: 30_000,
  });
  const ok = !!data?.ok && !isError;

  return (
    <Bar>
      {isAuthed ? <Btn onClick={() => nav('/home')}>{t('Home')}</Btn> : <div>{t('brand')}</div>}

      <Group>
        <Pill ok={ok}>{isLoading ? 'Health: 체크 중…' : ok ? 'Health: OK' : 'Health: FAIL'}</Pill>
        <Btn onClick={() => setLanguage('ko')} $active={cur === 'ko'}>
          {t('lang_ko')}
        </Btn>
        <Btn onClick={() => setLanguage('en')} $active={cur === 'en'}>
          {t('lang_en')}
        </Btn>

        {isAuthed && (
          <Btn onClick={logout} style={{ marginLeft: 12 }}>
            {t('logout')} {user?.email ? `(${user.email})` : ''}
          </Btn>
        )}
      </Group>
    </Bar>
  );
}
