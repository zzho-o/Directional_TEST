import styled from 'styled-components';

export const Bar = styled.header<{ $scrolled?: boolean }>`
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;

  background: ${({ theme }) => theme.colors.bg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  backdrop-filter: saturate(180%) blur(8px);
  box-shadow: ${({ $scrolled }) => ($scrolled ? '0 6px 20px rgba(0,0,0,0.06)' : 'none')};
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Btn = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.text)};
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
`;

export const Pill = styled.span<{ ok?: boolean }>`
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
