import { StyledClassLabel } from "./Schedule.style";

interface PropsType {
  classTitle: string;
}

function ScheduleLabel({ classTitle }: PropsType) {
  return (
    <StyledClassLabel>
      <span>{classTitle}</span>
    </StyledClassLabel>
  );
}

export default ScheduleLabel;
