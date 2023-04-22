import styled from "styled-components";

interface Iprops {
  status: string;
}

const StyledWorkbookStatus = styled.div<{ status: string }>`
  display: inline-block;
  color: ${({ status, theme }) => {
    if (status === "progress") return theme.colors.Lime[600];
    else if (status === "loading") return theme.colors.Orange[500];
    else return theme.colors.Gray[500];
  }};

  background-color: ${({ status, theme }) => {
    if (status === "progress") return theme.colors.Lime[50];
    else if (status === "loading") return theme.colors.Orange[100];
    else return theme.colors.Gray[200];
  }};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 700;
  font-size: 0.75rem;
`;

export default function WorkbookStatus({ status }: Iprops) {
  const statusText = (status: string) => {
    if (status === "progress") return "진행 중인 문제집";
    else if (status === "loading") return "대기 중인 문제집";
    else return "완료된 문제집";
  };
  return <StyledWorkbookStatus status={status}>{statusText(status)}</StyledWorkbookStatus>;
}
