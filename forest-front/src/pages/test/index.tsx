import AnswerBox from "@/features/test/index/TestAnswerBox";
import TestContent from "@/features/test/index/TestContent";
import TestHeader from "@/features/test/index/TestHeader";
import { StyledTestContainer } from "@/features/test/index/index.style";
import { FullScreen } from "@/styles/container";

export default function Test() {
  return (
    <StyledTestContainer>
      <TestHeader />
      <TestContent />
    </StyledTestContainer>
  );
}
