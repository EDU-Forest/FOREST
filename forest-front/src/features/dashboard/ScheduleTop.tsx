import { Title } from "@/styles/text";
import { useEffect, useState } from "react";
import {
  StyledScheduleStatus,
  StyledScheduleStatusCircle,
  StyledScheduleTop,
  StyledStatusNotification,
} from "./Schedule.style";

function ScheduleTop() {
  const [day, setDay] = useState(1);

  // 오늘 날짜
  const getToday = (): string => {
    const date = new Date();
    const month: number = date.getMonth() + 1;
    const weeks: string[] = ["일", "월", "화", "수", "목", "금", "토"];
    const week: string = weeks[date.getDay()];

    return `${month}월 ${day}일 (${week})`;
  };

  const dateCount = (): number => {
    const day: number = new Date().getDate();

    let count: number = 1;

    let counting = setInterval(function () {
      if (count == day) {
        clearInterval(counting);
        return false;
      }
      count += 1;
      setDay(count + 1);
    }, 40);

    return count;
  };

  useEffect(() => {
    dateCount();
  }, []);

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
