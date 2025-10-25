import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { apiHealth } from '@/net/api';
import { useAuthStore } from '@/stores/store.auth';

// ===== styled =====
const Wrap = styled.div`
  max-width: 960px;
  margin: 40px auto;
  padding: 0 16px;
  display: grid;
  gap: 16px;
`;

const Hero = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.panel};
  border-radius: ${({ theme }) => theme.radius};
  padding: 20px;
  display: grid;
  gap: 8px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Card = styled(Link)`
  flex: 1 1 280px;
  min-height: 120px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius};
  padding: 16px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: transform 0.12s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;

const Toolbar = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const Btn = styled.button<{ tone?: 'primary' | 'ghost' }>`
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ tone, theme }) => (tone === 'primary' ? theme.colors.primary : theme.colors.panel)};
  color: ${({ tone, theme }) => (tone === 'primary' ? theme.colors.white : theme.colors.text)};
`;

export default function HomePage() {
  const navigate = useNavigate();
  const logout = useAuthStore(s => s.logout);
  const user = useAuthStore(s => s.user);

  return (
    <Wrap>
      <Hero>
        <h1 style={{ margin: 0 }}>안녕하세요{user?.email ? `, ${user.email}` : ''} 👋</h1>
        <div style={{ color: '#9aa0a6' }}>과제 실행 패널입니다. 아래에서 게시판과 차트로 바로 이동할 수 있어요.</div>

        <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Toolbar>
            {/* <Btn onClick={() => refetch()}>헬스 재시도</Btn> */}
            <Btn tone="primary" onClick={() => navigate('/posts')}>
              게시판 바로가기
            </Btn>
            <Btn
              onClick={() => {
                logout();
                navigate('/', { replace: true });
              }}
            >
              로그아웃
            </Btn>
          </Toolbar>
        </Row>
      </Hero>

      <Row>
        <Card to="/posts">
          <h3 style={{ margin: 0 }}>게시판(Posts)</h3>
          <p style={{ margin: '6px 0 0', color: '#9aa0a6' }}>
            작성/조회/수정/삭제, 검색, 정렬, 카테고리 필터, 커서 기반 페이지네이션
          </p>
        </Card>

        <Card to="/charts">
          <h3 style={{ margin: 0 }}>데이터 시각화</h3>
          <p style={{ margin: '6px 0 0', color: '#9aa0a6' }}>
            Mock API 기반 바/도넛/스택형/멀티라인 차트 (Recharts 예정)
          </p>
        </Card>
      </Row>
    </Wrap>
  );
}
