import styled from 'styled-components';

const Wrap = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.colors.panel};
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;

const Row = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px ${({ theme }) => theme.spacing(2)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 88px;

  @media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
    padding: 0 ${({ theme }) => theme.spacing(15)};
    min-height: 220px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
    gap: 0;
  }
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const MobileLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px 0 32px;

  @media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
    display: none;
  }
`;

const Divider = styled.span`
  width: 1px;
  height: 16px;
  background: #878a93; /* 기존 색감 유지 */
  display: inline-block;
`;

const LinkText = styled.a`
  white-space: nowrap;
  color: #dcdcdc;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.203px;
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.091px;
  }
`;

const LogoImg = styled.img`
  width: 104px;
  height: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
    width: 141px;
    height: 28px;
  }
`;

const Copy = styled.p`
  margin-top: 16px;
  color: #9b9b9b;
  white-space: nowrap;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.203px;

  @media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
    margin-top: 16px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.091px;
  }
`;

const Right = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
    display: flex;
    align-items: center;
    height: 41px;
    gap: 24px;
  }
`;

const RightLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export default function Footer() {
  return (
    <Wrap>
      <Row>
        <Left>
          <LeftCol>
            {/* 모바일 전용 약관 링크 */}
            <MobileLinks>
              <LinkText href="#">이용약관</LinkText>
              <Divider />
              <LinkText href="#">개인정보처리방침</LinkText>
            </MobileLinks>
            <Copy>ⓒ 2025. MXLAB INC. ALL RIGHTS RESERVED.</Copy>
          </LeftCol>
        </Left>

        {/* 데스크톱 우측 링크 */}
        <Right>
          <RightLinks>
            <LinkText href="#">이용약관</LinkText>
            <Divider />
            <LinkText href="#">개인정보처리방침</LinkText>
          </RightLinks>
        </Right>
      </Row>
    </Wrap>
  );
}
