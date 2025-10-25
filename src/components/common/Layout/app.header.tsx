// src/components/common/Layout/app.header.tsx
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/utils/i18n';
import { useAuthStore } from '@/stores/store.auth';

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

export default function Header() {
  const { t, i18n } = useTranslation('common');
  const cur = (i18n.resolvedLanguage || i18n.language) as 'ko' | 'en';

  const { isAuthed, user, logout } = useAuthStore();

  return (
    <Bar>
      <div>{t('brand')}</div>

      <Group>
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
