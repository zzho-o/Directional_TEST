import styled, { css } from 'styled-components';

export const typo = {
  /** 12px */
  caption: css`
    font-size: 12px;
    line-height: 1.45;
    letter-spacing: -0.01em;
    font-weight: 400;
  `,
  /** 14px */
  bodySm: css`
    font-size: 14px;
    line-height: 1.55;
    letter-spacing: -0.01em;
    font-weight: 400;
  `,
  /** 15px */
  body: css`
    font-size: 15px;
    line-height: 1.6;
    letter-spacing: -0.01em;
    font-weight: 400;
  `,
  /** 16px */
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
