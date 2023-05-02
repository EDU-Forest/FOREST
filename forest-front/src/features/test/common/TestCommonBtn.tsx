import { useRouter } from "next/router";
import { StyledTestCommonBtn } from "./TextCommon.style";

export default function TestCommonBtn() {
  const router = useRouter();
  const { studyId } = router.query;
  const clickHandler = () => {
    router.push(`/test/${studyId}`);
  };
  return <StyledTestCommonBtn onClick={clickHandler}>시작하기</StyledTestCommonBtn>;
}
