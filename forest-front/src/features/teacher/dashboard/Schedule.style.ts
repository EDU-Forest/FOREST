import styled from "styled-components";

export const StyledSchedule = styled.div`
  padding: 1.5rem;

  background: #ffffff;
  box-shadow: 0rem 0rem 1.25rem 0.125rem rgba(0, 0, 0, 0.1);
  border-radius: 1.5rem;
`;

export const StyledScheduleTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledScheduleStatus = styled.div`
  display: flex;
`;

export const StyledScheduleStatusCircle = styled.div<{ status: string }>`
  width: 14px;
  height: 14px;

  margin-right: 8px;

  background-color: ${({ status, theme }) =>
    status === "중"
      ? theme.colors.Lime[700]
      : status === "예정"
      ? theme.colors.Orange[700]
      : status === "완료" && theme.colors.Gray[400]};
  border-radius: 50%;
`;

export const StyledStatusNotification = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  align-items: flex-end;
  gap: 16px;

  color: ${({ theme }) => theme.colors.Gray[700]};
  font-size: 14px;

  // 상태 레이블
  > div {
    display: flex;
    gap: 16px;
  }

  p {
    color: ${({ theme }) => theme.colors.Gray[500]};
  }
`;

export const StyledScheduleItem = styled.div`
  // 기간
  > span {
    color: ${({ theme }) => theme.colors.Gray[500]};
  }
`;

export const StyledScheduleItemTop = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 1rem;

  > div:first-child {
    display: flex;
  }

  // 일정 제목
  > span {
    font-weight: 600;
  }
`;
