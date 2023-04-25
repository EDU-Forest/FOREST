import { StyledClassLabel } from "./Schedule.style";

interface PropsType {
  classTitle: string;
}

function ScheduleClassLabel({ classTitle }: PropsType) {
  return (
    <StyledClassLabel>
      <span>{classTitle}</span>
    </StyledClassLabel>
  );
}

export default ScheduleClassLabel;
