// Layout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from './app.header';
import Footer from './app.footer';
import styled from 'styled-components';
import { useLenis } from '@/hooks/useLenis';
import { useEffect, useRef } from 'react';

const Shell = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1 0 auto;
  min-height: 0; /* overflow 계산에 중요 */
`;

export default function Layout() {
  const lenisRef = useLenis(); // 전역 싱글톤 Lenis를 반환하는 훅
  const loc = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // ① 라우트 변경 시, 다음 프레임에 맨 위로 이동 (데이터 페칭으로 인한 레이아웃 쉬프트 대비)
  useEffect(() => {
    const lenis = lenisRef.current;
    const id = requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo({ top: 0 });
    });
    return () => cancelAnimationFrame(id);
  }, [loc.pathname, lenisRef]);

  // ② 메인 영역 높이가 변할 때마다 Lenis에 resize 알리기
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis || !mainRef.current) return;

    const ro = new ResizeObserver(() => {
      lenis.resize(); // 내부 스크롤 길이 재계산
    });
    ro.observe(mainRef.current);
    return () => ro.disconnect();
  }, [lenisRef]);

  return (
    <Shell>
      <Header />
      <Main ref={mainRef}>
        <Outlet />
      </Main>
      <Footer />
    </Shell>
  );
}
