import { useRouter } from "next/router";
import { StyledTestCommonBtn } from "../common/TextCommon.style";
import { TestEndBox, TestEndBtn } from "./TextIndex.style";
import { useDispatch } from "react-redux";
import useEndStudy from "@/apis/study/useEndStudyQuery";

export default function TestEnd() {
  const router = useRouter();
  const { mutate } = useEndStudy();
  const studyId = router.query.studyId;

  const goToResultHandler = () => {
    mutate(typeof studyId === "string" ? parseInt(studyId) : -1);
    router.push(`/test/${router.query.studyId}/result`);
  };

  return (
    <TestEndBox>
      <p>시험이 종료되었습니다.</p>
      <TestEndBtn onClick={goToResultHandler}>결과 보기</TestEndBtn>
    </TestEndBox>
  );
}
