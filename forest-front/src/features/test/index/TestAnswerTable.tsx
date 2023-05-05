import { useSelector } from "react-redux";
import { ProblemNumTd, StyledTestAnswerTable } from "./TextIndex.style";
import { RootState } from "@/stores/store";

interface Iprops {
  minutes: number;
  seconds: number;
}

export default function TestAnswerTable({ minutes, seconds }: Iprops) {
  const { curProblemNum, problem } = useSelector((state: RootState) => state.exam);
  const { userAnswer, problemAnswer } = problem[curProblemNum - 1];
  return (
    <StyledTestAnswerTable>
      <thead>
        <tr>
          <th colSpan={4}>정답 입력</th>
        </tr>
      </thead>
      <tbody>
        {problem.map((data, idx) => (
          <tr key={`user-answer-${idx}`}>
            <ProblemNumTd
              isEnded={minutes <= 0 && seconds <= 0}
              isCorrect={problem[idx].userAnswer === problem[idx].problemAnswer}
            >
              {idx + 1}
            </ProblemNumTd>
            <td colSpan={3}>{data.userAnswer ? data.userAnswer : ""}</td>
          </tr>
        ))}
      </tbody>
    </StyledTestAnswerTable>
  );
}
