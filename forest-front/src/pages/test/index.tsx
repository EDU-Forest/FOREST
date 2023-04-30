import AnswerBox from "@/features/test/index/TestAnswerBox";
import TestContent from "@/features/test/index/TestContent";
import TestHeader from "@/features/test/index/TestHeader";
import { StyledTestContainer } from "@/features/test/index/TextIndex.style";
import { RootState } from "@/stores/store";
import { FullScreen } from "@/styles/container";
import { useSelector } from "react-redux";

export default function Test() {
  return (
    <StyledTestContainer>
      <TestHeader />
      <TestContent />
    </StyledTestContainer>
  );
}
