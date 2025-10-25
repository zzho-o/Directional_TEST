// src/components/common/Layout/app.footer.tsx
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Wrap = styled.footer`
  width: 100%;
  background: #1d1f23;
  color: #ffffff;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
`;

const Inner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 28px 20px 40px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  white-space: pre-line; /* 멀티라인 문자열 줄바꿈 유지 */
`;

const Company = styled.div`
  font-size: 14px;
  line-height: 1.7;
  opacity: 0.9;
`;

const Contact = styled.div`
  text-align: right;
  font-size: 14px;
  line-height: 1.7;
  strong {
    display: block;
    margin-bottom: 8px;
  }
`;

export default function Footer() {
  const { t } = useTranslation('footer');

  return (
    <Wrap>
      <Inner>
        <Company>{t('companyBlock')}</Company>
        <Contact>
          <strong>{t('contact')}</strong>
          <div>{t('email')}</div>
        </Contact>
      </Inner>
    </Wrap>
  );
}
