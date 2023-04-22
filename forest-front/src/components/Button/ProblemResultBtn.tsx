import styled, { css } from "styled-components";

interface Iprops {
  value: string;
  isCorrect: boolean;
}

const StyledProblemResultBtn = styled.button<{ isCorrect: boolean }>`
  display: inline-block;
  width: 4rem;
  height: 4rem;
  font-size: 1.375rem;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.colors.Lime[700]};
  color: white;

  ${({ isCorrect }) =>
    !isCorrect &&
    css`
      background-color: ${({ theme }) => theme.colors.Orange[700]};
    `}
`;

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
