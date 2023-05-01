import { useRouter } from "next/router";
import { StyledTestCommonBtn } from "./TextCommon.style";
import { setSessionStorage } from "@/utils/sessionStorage";

export default function TestCommonBtn() {
  const router = useRouter();
  const { testId } = router.query;
  const clickHandler = () => {
    setSessionStorage("cur_problem_num", 1);
    router.push(`/test/${testId}`);
  };
  return <StyledTestCommonBtn onClick={clickHandler}>시작하기</StyledTestCommonBtn>;
}
