import { useRouter } from "next/router";
import { StyledTestCommonBtn } from "./TextCommon.style";
import useStartStudy from "@/apis/study/useStartStudyQuery";

export default function TestCommonBtn() {
  const router = useRouter();
  const studyId = router.query?.studyId;
  const { mutate } = useStartStudy(typeof studyId === "string" ? parseInt(studyId) : -1);
  const clickHandler = () => {
    mutate(typeof studyId === "string" ? parseInt(studyId) : -1);
  };
  return <StyledTestCommonBtn onClick={clickHandler}>시작하기</StyledTestCommonBtn>;
}
