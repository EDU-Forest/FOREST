import { StyledTestHeaderContentBox, StyledTestHeaderText } from "./index.style";

export default function TestHeaderRightContentBox() {
  return (
    <StyledTestHeaderContentBox>
      <StyledTestHeaderText>총 10문항</StyledTestHeaderText>
      <StyledTestHeaderText>|</StyledTestHeaderText>
      <StyledTestHeaderText>제한시간 없음</StyledTestHeaderText>
    </StyledTestHeaderContentBox>
  );
}
