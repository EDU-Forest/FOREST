import TestInfoBox from "./TestInfoBox";
import { StyledTestInfoContainer, TestStartImg } from "./TestInfo.style";
import TestInfoTitleBox from "./TestInfoTitleBox";
import TestInfoBtn from "../common/TestCommonBtn";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";

export default function TestInfoContainer() {
  const router = useRouter();

  const exitStudy = () => {
    router.back();
  };
  return (
    <StyledTestInfoContainer>
      <IoMdClose className="close-study" onClick={exitStudy} />
      <TestStartImg src={"/images/Test_Start_Image.png"} />
      <TestInfoTitleBox />
      <TestInfoBox />
      <TestInfoBtn />
    </StyledTestInfoContainer>
  );
}
