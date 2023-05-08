import { useSelector } from "react-redux";
import {
  TestResultContentBox,
  TestResultNotOpenBox,
  TestResultQuestionBtn,
} from "./TextResult.style";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { setCurProblemNum } from "@/stores/exam/exam";
import { useRouter } from "next/router";

interface Iprops {
  studyResult: IStudyResult;
}

export default function TestResultContent({ studyResult }: Iprops) {
  const { problem } = useSelector((state: RootState) => state.exam);
  const dispatch = useDispatch();
  const router = useRouter();
  const goToProblem = (idx: number) => {
    dispatch(setCurProblemNum({ curProblemNum: idx }));
    router.push(`/test/${router.query.studyId}`);
  };

  return (
    <TestResultContentBox>
      {studyResult.isGraded && studyResult.isSubmitted ? (
        problem.map((data, idx) => (
          <TestResultQuestionBtn
            key={`question-${idx}`}
            isCorrect={data.userAnswer === data.problemAnswer}
            onClick={() => goToProblem(idx + 1)}
          >
            {idx + 1}
          </TestResultQuestionBtn>
        ))
      ) : (
        <TestResultNotOpenBox>종료 시간 이후 공개됩니다.</TestResultNotOpenBox>
      )}
    </TestResultContentBox>
  );
}
