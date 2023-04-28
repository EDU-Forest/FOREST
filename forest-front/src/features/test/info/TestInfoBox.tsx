import {
  StyledTestInfoBox,
  StyledTestInfoContent,
  StyledTestInfoLabel,
  StyledTestInfoText,
} from "./TestInfo.style";
// import TestInfoLabel from "./TestInfoLabel";

export default function TestInfoBox() {
  const labelList = ["출제자", "문항 수", "제한시간"];
  const dummyData = ["킹규림쌤", "10 문항", "제한시간 없음"];

  return (
    <StyledTestInfoBox>
      {dummyData.map((data, idx) => (
        <StyledTestInfoContent>
          {/* <TestInfoLabel text={labelList[idx]} /> */}
          <StyledTestInfoLabel>{labelList[idx]}</StyledTestInfoLabel>
          <StyledTestInfoText>{data}</StyledTestInfoText>
        </StyledTestInfoContent>
      ))}
    </StyledTestInfoBox>
  );
}
