import { useSelector } from "react-redux";
import { TestResultContentBox, TestResultQuestionBtn } from "./TextResult.style";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { setCurProblemNum } from "@/stores/exam/exam";
import { useRouter } from "next/router";

export default function TestResultContent() {
  const { problem } = useSelector((state: RootState) => state.exam);
  const dispatch = useDispatch();
  const router = useRouter();
  const goToProblem = (idx: number) => {
    dispatch(setCurProblemNum({ curProblemNum: idx }));
    router.push(`/test/${router.query.studyId}`);
  };

  return (
    <TestResultContentBox>
      {problem.map((data, idx) => (
        <TestResultQuestionBtn
          key={`question-${idx}`}
          isCorrect={data.userAnswer === data.problemAnswer}
          onClick={() => goToProblem(idx + 1)}
        >
          {idx + 1}
        </TestResultQuestionBtn>
      ))}
    </TestResultContentBox>
  );
}
