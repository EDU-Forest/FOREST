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
import useGetQuestionAnswer from "@/apis/study/useGetQuestionAnswerQuery";
import { useState } from "react";
import { IQuestionResult } from "@/types/Exam";
import { IStudyResult } from "@/types/Study";

interface Iprops {
  studyResult: IStudyResult;
}

export default function TestResultContent({ studyResult }: Iprops) {
  const dispatch = useDispatch();
  const router = useRouter();
  const studyId = router.query.studyId;
  const [questionResult, setQuestionResult] = useState<IQuestionResult[]>([]);
  useGetQuestionAnswer({
    studyId: typeof studyId === "string" ? parseInt(studyId) : -1,
    setQuestionResult,
  });

  const goToProblem = (idx: number) => {
    dispatch(setCurProblemNum({ curProblemNum: idx }));
    router.push(`/test/${router.query.studyId}`);
  };

  return (
    <TestResultContentBox>
<<<<<<< forest-front/src/features/test/result/TestResultContent.tsx
      {!studyResult.isGraded && studyResult.isSubmitted ? (
        <TestResultNotOpenBox>채점 후 공개됩니다.</TestResultNotOpenBox>
      ) : !studyResult.isSubmitted ? (
        <TestResultNotOpenBox>유효하지 않은 접근입니다.</TestResultNotOpenBox>
      ) : (
        questionResult.map((data, idx) => (
=======
      {studyResult.isSubmitted ? (
        problem.map((data, idx) => (
>>>>>>> forest-front/src/features/test/result/TestResultContent.tsx
          <TestResultQuestionBtn
            key={`question-${idx}`}
            isCorrect={data.isCorrected}
            onClick={() => goToProblem(idx + 1)}
          >
            {data.problemNum}
          </TestResultQuestionBtn>
        ))
      )}
    </TestResultContentBox>
  );
}
