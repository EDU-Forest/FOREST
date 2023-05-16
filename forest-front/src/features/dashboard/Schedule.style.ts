import { flexBox } from "@/styles/theme";
import styled, { css } from "styled-components";

export const StyledScheduleTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0rem 0.5rem;
`;

export const StyledScheduleStatus = styled.div`
  display: flex;
`;

export const StyledScheduleStatusCircle = styled.div<{ status: string }>`
  width: 0.875rem;
  height: 0.875rem;
  margin-top: 0.125rem;

  margin-right: 0.5rem;

  background-color: ${({ status, theme }) =>
    status === "ONGOING"
      ? theme.colors.Lime[700]
      : status === "BEFORE"
      ? theme.colors.Orange[700]
      : status === "AFTER" && theme.colors.Gray[400]};
  border-radius: 50%;
`;

export const StyledStatusNotification = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  align-items: flex-end;
  gap: 1rem;

  color: ${({ theme }) => theme.colors.Gray[700]};
  font-size: 0.875rem;

  // 상태 레이블
  > div {
    display: flex;
    gap: 1rem;
  }

  p {
    color: ${({ theme }) => theme.colors.Gray[500]};
  }
`;

export const StyledScheduleItem = styled.div<{ isLast?: boolean; clickable?: boolean }>`
  padding: 1rem;
  /* padding: 1rem 0.5rem; */
  cursor: ${({ clickable }) => clickable && "pointer"};
  ${({ isLast }) =>
    !isLast &&
    css`
      border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.Gray[400]};
      padding-bottom: 1rem;
    `}
  // 기간
    > span {
    color: ${({ theme }) => theme.colors.Gray[500]};
  }

  &:hover {
    background-color: ${({ clickable, theme }) => clickable && theme.colors.Gray[100]};
  }
`;

export const StyledScheduleItemTop = styled.div`
  display: flex;
  justify-content: space-between;

  /* margin-bottom: 0.5rem; */
  align-items: center;

  > div:first-child {
    display: flex;
  }

  span {
    font-weight: 600;
  }
`;

export const ScheduleLabelsBox = styled.div`
  ${flexBox("row", "center", "center")};

  gap: 0.5rem;

  /* study 유형 */
  > div:nth-child(1) {
    background-color: ${({ theme }) => theme.colors.Lime[50]};
    color: ${({ theme }) => theme.colors.Lime[600]};
  }
`;

export const StyledScheduleListBox = styled.div`
  margin-top: 2rem;

  hr {
    height: 0.0313rem;

    margin: 1rem 0;

    border: none;
    background-color: ${({ theme }) => theme.colors.Gray[400]};
  }

  hr:last-child {
    display: none;
  }
`;

export const StyledClassLabel = styled.div`
  padding: 0.25rem 0.5rem;

  background-color: ${({ theme }) => theme.colors.Orange[50]};
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.Orange[600]};
  font-size: 0.875rem;
  font-weight: 600;
`;

export const ScheduleProgressBar = styled.progress`
  appearance: none;
  inline-size: 10em;
  block-size: 0.5rem;

  ::-webkit-progress-bar {
    background: #f0f0f0;
    border-radius: 10px;
    box-shadow: inset 3px 3px 10px #ccc;
  }

  ::-webkit-progress-value {
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.Lime[600]};
    /* background: -webkit-linear-gradient(to right, #93f9b9, #1d976c);
    background: linear-gradient(to right, #93f9b9, #1d976c); */
  }
`;
