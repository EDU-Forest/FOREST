import { useSelector } from "react-redux";
import { ProblemNumTd, ProblemTr, StyledTestAnswerTable } from "./TextIndex.style";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { setCurProblemNum } from "@/stores/exam/exam";
import { closeCanvas } from "@/stores/exam/canvas";
import { useRouter } from "next/router";
import useSaveAnswer from "@/apis/study/useSaveAnswerQuery";

export default function TestAnswerTable() {
  const { curProblemNum, problem, isSubmitted } = useSelector((state: RootState) => state.exam);
  const dispatch = useDispatch();
  const router = useRouter();
  const { mutate } = useSaveAnswer();
  const studyId = router.query?.studyId;
  const { studentStudyProblemId, userAnswer, type } = problem[curProblemNum - 1];

  const payload = {
    studyId: typeof studyId === "string" ? parseInt(studyId) : -1,
    studentStudyProblemId,
    userAnswer,
    type,
  };

  const changeCurProblemNum = (idx: number) => {
    mutate(payload);
    dispatch(setCurProblemNum({ curProblemNum: idx }));
    dispatch(closeCanvas());
  };

  return (
    <StyledTestAnswerTable>
      <thead>
        <tr>
          <th colSpan={4}>정답 입력</th>
        </tr>
      </thead>
      <tbody>
        {problem.map((data, idx) => (
          <ProblemTr
            isEnded={isSubmitted}
            isCorrect={problem[idx].userAnswer === problem[idx].problemAnswer}
            key={`user-answer-${idx}`}
            onClick={() => changeCurProblemNum(idx + 1)}
          >
            <ProblemNumTd
              isEnded={isSubmitted}
              isCorrect={problem[idx].userAnswer === problem[idx].problemAnswer}
            >
              {idx + 1}
            </ProblemNumTd>
            <td colSpan={3}>{data.userAnswer ? data.userAnswer : ""}</td>
          </ProblemTr>
        ))}
      </tbody>
    </StyledTestAnswerTable>
  );
}
