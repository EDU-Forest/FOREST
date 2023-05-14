import { useSelector } from "react-redux";
import { ProblemNumTd, StyledTestAnswerTable } from "./TextIndex.style";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { setCurProblemNum } from "@/stores/exam/exam";
import { closeCanvas } from "@/stores/exam/canvas";

export default function TestAnswerTable() {
  const { curProblemNum, problem, isSubmitted } = useSelector((state: RootState) => state.exam);

  const dispatch = useDispatch();

  const changeCurProblemNum = (idx: number) => {
    dispatch(setCurProblemNum({ curProblemNum: idx }));

    dispatch(closeCanvas());
  };

  return (
    <StyledTestAnswerTable isEnded={isSubmitted}>
      <thead>
        <tr>
          <th colSpan={4}>정답 입력</th>
        </tr>
      </thead>
      <tbody>
        {problem.map((data, idx) => (
          <tr key={`user-answer-${idx}`} onClick={() => changeCurProblemNum(idx + 1)}>
            <ProblemNumTd
              isEnded={isSubmitted}
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
