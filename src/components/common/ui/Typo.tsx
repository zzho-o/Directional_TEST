import styled, { css } from 'styled-components';

/** 자주 쓰는 폰트 스케일(4종) */
export const typo = {
  /** 12px, 보조 텍스트/캡션 */
  caption: css`
    font-size: 12px;
    line-height: 1.45;
    letter-spacing: -0.01em;
    font-weight: 400;
  `,
  /** 14px, 인풋/라벨/작은 본문 */
  bodySm: css`
    font-size: 14px;
    line-height: 1.55;
    letter-spacing: -0.01em;
    font-weight: 400;
  `,
  /** 15px, 기본 본문(디폴트) */
  body: css`
    font-size: 15px;
    line-height: 1.6;
    letter-spacing: -0.01em;
    font-weight: 400;
  `,
  /** 16px, 버튼/CTA 라벨에 잘 맞음 */
  labelLg: css`
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: -0.01em;
    font-weight: 600;
  `,
} as const;

/** 필요 시 바로 쓰는 텍스트 컴포넌트 */
export const Text = styled.span<{ variant?: keyof typeof typo }>`
  ${({ variant = 'body' }) => typo[variant]}
`;
