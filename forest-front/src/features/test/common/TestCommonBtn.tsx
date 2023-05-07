import { useRouter } from "next/router";
import { StyledTestCommonBtn } from "./TextCommon.style";
import useStartStudy from "@/apis/study/useStartStudyQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useEffect } from "react";

export default function TestCommonBtn() {
  const router = useRouter();
  const studyId = router.query?.studyId;
  const { mutate } = useStartStudy();
  const { endTime } = useSelector((state: RootState) => state.exam);
  const startTestHandler = () => {
    if (new Date(endTime).getTime() >= new Date().getTime()) {
      mutate(typeof studyId === "string" ? parseInt(studyId) : -1);
      router.push(`/test/${studyId}`);
    } else {
      alert("종료된 시험입니다.");
      goToResultHandler();
    }
  };

  const goToResultHandler = () => {
    router.push(`/test/${studyId}/result`);
  };

  return (
    <>
      {new Date(endTime).getTime() >= new Date().getTime() ? (
        <StyledTestCommonBtn onClick={startTestHandler}>시작하기</StyledTestCommonBtn>
      ) : (
        <StyledTestCommonBtn onClick={goToResultHandler}>결과 보기</StyledTestCommonBtn>
      )}
    </>
  );
}
