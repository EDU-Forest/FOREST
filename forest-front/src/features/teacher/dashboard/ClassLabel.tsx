import { StyledClassLabel } from "./Schedule.style";

interface PropsType {
  classTitle: string;
}

function ClassLabel({ classTitle }: PropsType) {
  return (
    <StyledClassLabel>
      <span>{classTitle}</span>
    </StyledClassLabel>
  );
}

export default ClassLabel;
