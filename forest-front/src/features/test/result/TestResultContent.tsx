import {
  TestResultContentBox,
  TestResultNotOpenBox,
  TestResultQuestionBtn,
} from "./TextResult.style";
import { useDispatch, useSelector } from "react-redux";
import { setCurProblemNum } from "@/stores/exam/exam";
import { useRouter } from "next/router";
import useGetQuestionAnswer from "@/apis/study/useGetQuestionAnswerQuery";
import { RootState } from "@/stores/store";

export default function TestResultContent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { studyId, isSubmitted, isGraded } = useSelector((state: RootState) => state.exam);

  const { data: questionResult } = useGetQuestionAnswer(studyId);

  const goToProblem = (idx: number) => {
    dispatch(setCurProblemNum({ curProblemNum: idx }));
    router.push(`/test/${router.query.studyId}`, undefined, { shallow: true });
  };

  return (
    <TestResultContentBox>
      {!isGraded && isSubmitted ? (
        <TestResultNotOpenBox>채점 후 공개됩니다.</TestResultNotOpenBox>
      ) : !isSubmitted ? (
        <TestResultNotOpenBox>유효하지 않은 접근입니다.</TestResultNotOpenBox>
      ) : (
        questionResult?.map((data, idx) => (
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
