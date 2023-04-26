import {
  StyledTestNumberBtn,
  StyledTestNumberText,
  StyledTestProblemAnswerNumber,
} from "./index.style";

interface Iprops {
  idx: number;
  text: string;
}

export default function TestProblemAnswerNumber({ idx, text }: Iprops) {
  return (
    <StyledTestProblemAnswerNumber>
      <StyledTestNumberBtn>{idx + 1}</StyledTestNumberBtn>
      <StyledTestNumberText>{text}</StyledTestNumberText>
    </StyledTestProblemAnswerNumber>
  );
}
