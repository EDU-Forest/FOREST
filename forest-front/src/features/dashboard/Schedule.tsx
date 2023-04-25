import { StyledSectionBox } from "./Dashboard.style";
import ScheduleList from "./ScheduleList";
import ScheduleTop from "./ScheduleTop";

function Schedule() {
  return (
    <StyledSectionBox>
      <ScheduleTop />
      <ScheduleList />
    </StyledSectionBox>
  );
}

export default Schedule;
