import TestInfoBox from "./TestInfoBox";
import { StyledTestInfoContainer, TestStartImg } from "./TestInfo.style";
import TestInfoTitleBox from "./TestInfoTitleBox";
import TestInfoBtn from "../common/TestCommonBtn";
import { useState } from "react";
import { useRouter } from "next/router";
import useGetStudyInfo from "@/apis/study/useGetStudyInfoQuery";

export default function TestInfoContainer() {
  const router = useRouter();

  const [studyInfoData, setStudyInfoData] = useState({
    studyTitle: "",
    studyPresenter: "",
    studyVolume: 0,
    studyTimeLimit: 0,
  });

  const studyId = router.query?.studyId;
  useGetStudyInfo({
    studyId: typeof studyId === "string" ? parseInt(studyId) : -1,
    setStudyInfoData,
  });

  const { studyTitle, studyPresenter, studyVolume, studyTimeLimit } = studyInfoData;

  return (
    <StyledTestInfoContainer>
      <TestStartImg src={"/images/Test_Start_Image.png"} />
      <TestInfoTitleBox title={studyTitle} />
      <TestInfoBox presenter={studyPresenter} volume={studyVolume} timeLimit={studyTimeLimit} />
      <TestInfoBtn />
    </StyledTestInfoContainer>
  );
}
