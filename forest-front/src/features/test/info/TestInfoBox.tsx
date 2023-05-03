import {
  StyledTestInfoBox,
  StyledTestInfoContent,
  StyledTestInfoLabel,
  StyledTestInfoText,
} from "./TestInfo.style";
// import TestInfoLabel from "./TestInfoLabel";

interface Iprops {
  presenter: string;
  volume: number;
  timeLimit: number;
}

export default function TestInfoBox({ presenter, volume, timeLimit }: Iprops) {
  const labels = ["출제자", "문항 수", "제한시간"];
  const testInfoData = [
    presenter,
    `${volume} 문항`,
    timeLimit ? `${timeLimit} 분` : "제한시간 없음",
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
