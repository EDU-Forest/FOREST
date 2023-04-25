import { Title } from "@/styles/text";
import {
  StyledScheduleStatus,
  StyledScheduleStatusCircle,
  StyledScheduleTop,
  StyledStatusNotification,
} from "./Schedule.style";

function ScheduleTop() {
  // 오늘 날짜
  const getToday = (): string => {
    const date = new Date();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();
    const weeks: string[] = ["일", "월", "화", "수", "목", "금", "토"];
    const week: string = weeks[date.getDay()];

    return `${month}월 ${day}일 (${week})`;
  };

  return (
    <StyledScheduleTop>
      <Title>{getToday()}</Title>
      <StyledStatusNotification>
        <div>
          <StyledScheduleStatus>
            <StyledScheduleStatusCircle status="중" />
            진행 중
          </StyledScheduleStatus>
          <StyledScheduleStatus>
            <StyledScheduleStatusCircle status="예정" />
            진행 예정
          </StyledScheduleStatus>
          <StyledScheduleStatus>
            <StyledScheduleStatusCircle status="완료" />
            진행 완료
          </StyledScheduleStatus>
        </div>
        <p>3일 이내에 완료된 시험입니다</p>
      </StyledStatusNotification>
    </StyledScheduleTop>
  );
}

export default ScheduleTop;
