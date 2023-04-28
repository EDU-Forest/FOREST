import { StyledWorkbookStatus } from "./Status.style";

interface Iprops {
  status: string;
}

export default function WorkbookStatus({ status }: Iprops) {
  const statusText = (status: string) => {
    if (status === "ONGOING") return "진행 중인 문제집";
    else if (status === "BEFORE") return "대기 중인 문제집";
    else return "완료된 문제집";
  };
  return <StyledWorkbookStatus status={status}>{statusText(status)}</StyledWorkbookStatus>;
}
