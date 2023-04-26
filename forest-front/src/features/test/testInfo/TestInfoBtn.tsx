import { useRouter } from "next/router";
import { StyledTestInfoBtn } from "./TestInfo.style";

export default function TestInfoBtn() {
  const router = useRouter();

  const clickHandler = () => {
    router.push("/test/exam");
  };
  return <StyledTestInfoBtn onClick={clickHandler}>시작하기</StyledTestInfoBtn>;
}
