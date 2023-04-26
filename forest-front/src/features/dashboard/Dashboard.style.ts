import { Container } from "@/styles/container";
import styled from "styled-components";

export const StyledDashboardContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

export const StyledDashboardSectionFlexBox = styled.div`
  display: flex;
  gap: 1.5rem;
  flex: 1;

  // 각 섹션에 마진 => 마진 관련 반응형 대응 따로 할 필요 X
  > div {
    margin-top: 24px;
  }

  @media (${({ theme }) => theme.tablet}) {
    display: block;

    > div {
      width: 100%;
      box-sizing: border-box;
    }
  }
`;

export const StyledSectionBox = styled.div`
  width: 50%;
  padding: 24px;

  background: #ffffff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
`;
