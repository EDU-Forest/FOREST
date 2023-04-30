import TestInfoBox from "./TestInfoBox";
import { StyledTestInfoContainer, TestStartImg } from "./TestInfo.style";
import TestInfoTitleBox from "./TestInfoTitleBox";
import TestInfoBtn from "../common/TestCommonBtn";
import { useState } from "react";

export default function TestInfoContainer() {
  // const [testInfoData, setTestInfoData] = useState({
  //   title: "",
  //   presenter: "",
  //   timeLimit: 0,
  // });

  // dummyData
  const [testInfoData, setTestInfoData] = useState({
    title: "킹규림 쌤의 수능특강 수학 완성편",
    presenter: "킹규림쌤",
    volume: 10,
    timeLimit: 0,
  });

  const { title, presenter, volume, timeLimit } = testInfoData;

  return (
    <StyledTestInfoContainer>
      <TestStartImg src={"/images/Test_Start_Image.png"} />
      <TestInfoTitleBox title={title} />
      <TestInfoBox presenter={presenter} volume={volume} timeLimit={timeLimit} />
      <TestInfoBtn />
    </StyledTestInfoContainer>
  );
}
