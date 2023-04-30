import { useRouter } from "next/router";
import { StyledTestCommonBtn } from "./TextCommon.style";

export default function TestCommonBtn() {
  const router = useRouter();

  const clickHandler = () => {
    router.push("/test");
  };
  return <StyledTestCommonBtn onClick={clickHandler}>시작하기</StyledTestCommonBtn>;
}
