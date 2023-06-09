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
    const day: number = new Date().getDate();
    const month: number = date.getMonth() + 1;
    const weeks: string[] = ["일", "월", "화", "수", "목", "금", "토"];
    const week: string = weeks[date.getDay()];

    return `${month}월 ${day}일 (${week})`;
  };

  return (
    <StyledScheduleTop>
      <Title id="schedule-date">{getToday()}</Title>
      <StyledStatusNotification>
        <div>
          <StyledScheduleStatus>
            <StyledScheduleStatusCircle status="ONGOING" />
            진행 중
          </StyledScheduleStatus>
          <StyledScheduleStatus>
            <StyledScheduleStatusCircle status="BEFORE" />
            진행 예정
          </StyledScheduleStatus>
          <StyledScheduleStatus>
            <StyledScheduleStatusCircle status="AFTER" />
            진행 완료
          </StyledScheduleStatus>
        </div>
        <p>3일 이내에 완료된 일정입니다</p>
      </StyledStatusNotification>
    </StyledScheduleTop>
  );
}

export default ScheduleTop;
