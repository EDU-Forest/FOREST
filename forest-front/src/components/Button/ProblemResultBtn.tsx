import { StyledProblemResultBtn } from "./Btn.style";

interface Iprops {
  value: string;
  isCorrect: boolean;
}

export default function ProblemResultBtn({ value, isCorrect }: Iprops) {
  const goToProblem = (value: string) => {
    // 해당 문제로 이동
  };
  return (
    <StyledProblemResultBtn isCorrect={isCorrect} onClick={() => goToProblem(value)}>
      {value}
    </StyledProblemResultBtn>
  );
}
