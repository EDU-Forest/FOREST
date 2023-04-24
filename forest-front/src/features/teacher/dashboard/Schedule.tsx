import { StyledSchedule } from "./Schedule.style";
import ScheduleList from "./ScheduleList";
import ScheduleTop from "./ScheduleTop";

function Schedule() {
  return (
    <StyledSchedule>
      <ScheduleTop />
      <ScheduleList />
    </StyledSchedule>
  );
}

export default Schedule;
