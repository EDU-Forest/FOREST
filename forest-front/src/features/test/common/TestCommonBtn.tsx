import { useRouter } from "next/router";
import { StyledTestCommonBtn } from "./TextCommon.style";
import useStartStudy from "@/apis/study/useStartStudyQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { isEnded } from "@/utils/date";
import { useDispatch } from "react-redux";
import { setResult } from "@/stores/exam/exam";

export default function TestInfoBtn() {
  const router = useRouter();
  const dispatch = useDispatch();
  const studyId = router.query?.studyId;
  const { mutate } = useStartStudy();
  const { startTime, endTime, isSubmitted } = useSelector((state: RootState) => state.exam);

  const startTestHandler = () => {
    if (!endTime || new Date(endTime).getTime() >= new Date().getTime()) {
      mutate(typeof studyId === "string" ? parseInt(studyId) : -1);
      router.push(`/test/${studyId}`, undefined, { shallow: true });
      dispatch(setResult({ isSubmitted: false, isGraded: false }));
    } else {
      alert("종료된 시험입니다.");
      goToResultHandler();
    }
  };

  const goToResultHandler = () => {
    router.push(`/test/${studyId}/result`, undefined, { shallow: true });
  };

  return (
    <>
      {isSubmitted ? (
        <StyledTestCommonBtn onClick={goToResultHandler}>결과 보기</StyledTestCommonBtn>
      ) : !isSubmitted && endTime && isEnded(endTime) ? (
        <StyledTestCommonBtn disabled>종료된 시험입니다.</StyledTestCommonBtn>
      ) : (
        <StyledTestCommonBtn onClick={startTestHandler}>시작하기</StyledTestCommonBtn>
      )}
    </>
  );
}
