import useGetStudyInfo from "@/apis/study/useGetStudyInfoQuery";
import { useRouter } from "next/router";
import {
  StyledTestInfoBox,
  StyledTestInfoContent,
  StyledTestInfoLabel,
  StyledTestInfoText,
} from "./TestInfo.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { dateToMinute, dateToTime } from "@/utils";

export default function TestInfoBox() {
  const router = useRouter();

  const { userName, startTime, endTime, volume } = useSelector((state: RootState) => state.exam);

  const studyId = router.query?.studyId;
  useGetStudyInfo({
    studyId: typeof studyId === "string" ? parseInt(studyId) : -1,
  });

  const labels = ["출제자", "문항 수", "제한시간"];
  const testInfoData = [
    userName,
    `${volume} 문항`,
    startTime && endTime ? `${dateToTime(startTime, endTime)}` : "제한시간 없음",
  ];

  return (
    <StyledTestInfoBox>
      {testInfoData.map((data, idx) => (
        <StyledTestInfoContent key={`test-info-content-${idx}`}>
          {/* <TestInfoLabel text={labelList[idx]} /> */}
          <StyledTestInfoLabel>{labels[idx]}</StyledTestInfoLabel>
          <StyledTestInfoText>{data}</StyledTestInfoText>
        </StyledTestInfoContent>
      ))}
    </StyledTestInfoBox>
  );
}
