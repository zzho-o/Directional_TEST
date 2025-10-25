import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/utils/i18n';
import { useAuthStore } from '@/stores/store.auth';
import { useNavigate } from 'react-router-dom';
import { useHealth } from '@/hooks/useHealth';
import { useEffect, useState } from 'react';
import { Bar, Btn, Group, Pill } from '@/styles/app.header';

const Header = () => {
  const { t, i18n } = useTranslation('common');
  const cur = (i18n.resolvedLanguage || i18n.language) as 'ko' | 'en';
  const nav = useNavigate();
  const { isAuthed, user, logout } = useAuthStore();

  const { data, isLoading, isFetching, isError } = useHealth();
  const ok = !!data?.ok && !isError;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <Bar $scrolled={scrolled}>
      {isAuthed ? <Btn onClick={() => nav('/home')}>{t('Home')}</Btn> : <div>{t('brand')}</div>}

      <Group>
        <Pill ok={ok}>{isLoading || isFetching ? 'Health: 체크 중…' : ok ? 'Health: OK' : 'Health: FAIL'}</Pill>
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
};

export default Header;
