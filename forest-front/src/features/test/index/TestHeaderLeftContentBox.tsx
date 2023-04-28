import { Title } from "@/styles/text";
import { StyledTestHeaderContentBox, StyledTestHeaderTitle } from "./TextIndex.style";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";

export default function TestHeaderLeftContentBox() {
  const router = useRouter();

  const clickHandler = () => {
    router.push("/test/info");
  };

  return (
    <StyledTestHeaderContentBox>
      {/* 시험일 경우 경고 모달, 자습일 경우 저장 모달? */}
      <AiOutlineArrowLeft className="icon" onClick={clickHandler} />
      <StyledTestHeaderTitle>킹규림쌤의 수능특강 수학 완성편</StyledTestHeaderTitle>
    </StyledTestHeaderContentBox>
  );
}
