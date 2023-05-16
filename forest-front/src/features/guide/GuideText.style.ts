import styled from "styled-components";

const GuideTitle = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 16px;

  @media ${({ theme }) => theme.tablet} {
    font-size: 18px;
  }
`;

const GuideSectionTitle = styled.p`
  display: inline-block;
  font-weight: 500;
  font-size: 22px;
  line-height: 28px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.Gray[400]};
  padding: 0 32px 6px 32px;
`;

const GuideNormalText = styled.p`
  word-break: keep-all;

  @media ${({ theme }) => theme.tablet} {
    font-size: 14px;
  }
`;

const GuideGreenText = styled.p`
  font-weight: 800;
  color: ${({ theme }) => theme.colors.Lime[600]};
  margin-bottom: 16px;
  line-height: 19px;
  @media ${({ theme }) => theme.tablet} {
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

const GuideGrayText = styled.p`
  line-height: 24px;
  color: ${({ theme }) => theme.colors.Gray[600]};
  word-break: keep-all;

  @media ${({ theme }) => theme.tablet} {
    font-size: 14px;
  }
`;

const GuideEditorSubTitle = styled(GuideTitle)`
  font-size: 18px;
  @media ${({ theme }) => theme.tablet} {
    font-size: 16px;
  }
`;

export {
  GuideTitle,
  GuideSectionTitle,
  GuideNormalText,
  GuideGreenText,
  GuideGrayText,
  GuideEditorSubTitle,
};
