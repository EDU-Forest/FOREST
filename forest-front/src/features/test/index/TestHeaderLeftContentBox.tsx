import { Title } from "@/styles/text";
import { StyledTestHeaderContentBox, StyledTestHeaderTitle } from "./TextIndex.style";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

export default function TestHeaderLeftContentBox() {
  const { examTitle } = useSelector((state: RootState) => state.exam);
  const router = useRouter();

  const clickHandler = () => {
    router.push("/test/info");
  };

  return (
    <StyledTestHeaderContentBox>
      {/* 시험일 경우 경고 모달, 자습일 경우 저장 모달? */}
      <AiOutlineArrowLeft className="icon" onClick={clickHandler} />
      <StyledTestHeaderTitle>{examTitle}</StyledTestHeaderTitle>
    </StyledTestHeaderContentBox>
  );
}
