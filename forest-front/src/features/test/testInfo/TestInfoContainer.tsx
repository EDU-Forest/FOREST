import TestInfoBox from "./TestInfoBox";
import { StyledTestInfoContainer, TestStartImg } from "./TestInfo.style";
import TestInfoTitleBox from "./TestInfoTitleBox";
import TestInfoBtn from "./TestInfoBtn";

export default function TestInfoContainer() {
  return (
    <StyledTestInfoContainer>
      <TestStartImg src={"/images/Test_Start_Image.png"} />
      <TestInfoTitleBox />
      <TestInfoBox />
      <TestInfoBtn />
    </StyledTestInfoContainer>
  );
}
