// Layout.tsx
import { Outlet } from 'react-router-dom';
import Header from './app.header';
import Footer from './app.footer';
import styled from 'styled-components';
import { useLenis } from '@/hooks/useLenis';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Shell = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1 0 auto;
  min-height: 0;
`;

export default function Layout() {
  const lenisRef = useLenis();
  const loc = useLocation();

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    if (!lenisRef.current) window.scrollTo({ top: 0 });
  }, [loc.pathname, lenisRef]);

  return (
    <Shell>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Shell>
  );
}
