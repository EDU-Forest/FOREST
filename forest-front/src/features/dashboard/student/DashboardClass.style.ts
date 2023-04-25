import { theme } from "./../../../styles/theme";
import styled from "styled-components";

export const StyledDashboardClassListBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 32px;
  gap: 1.5rem;
`;

export const StyledDashboardClassItem = styled.div`
  display: flex;
  align-items: center;

  padding: 1rem;
  padding-right: 32px;

  background: ${({ theme }) => theme.colors.Lime[100]};
  box-shadow: 0rem 0.125rem 0.625rem 0.0625rem rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.Lime[900]};
  font-weight: bold;

  cursor: pointer;

  // 학사모 아이콘
  svg:first-child {
    width: 32px;
    height: 32px;
  }

  // 클래스 타이틀
  span {
    margin-left: 24px;
    font-size: 1.5rem;
  }

  // 화살표 아이콘
  svg:last-child {
    width: 16px;
    height: 16px;

    margin-left: auto;

    fill: black;
  }

  :hover {
    background: ${({ theme }) => theme.colors.Lime[200]};
  }
  :active {
    background: ${({ theme }) => theme.colors.Lime[300]};
  }
`;
