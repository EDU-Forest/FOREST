import { useSelector } from "react-redux";
import { StyledTestHeaderContentBox, StyledTestHeaderText } from "./TextIndex.style";
import { RootState } from "@/stores/store";

export default function TestHeaderRightContentBox() {
  const { volume, timeLimit } = useSelector((state: RootState) => state.exam);
  return (
    <StyledTestHeaderContentBox>
      <StyledTestHeaderText>총 {volume}문항</StyledTestHeaderText>
      <StyledTestHeaderText>|</StyledTestHeaderText>
      <StyledTestHeaderText>{timeLimit ? "타이머 넣기" : "제한시간 없음"}</StyledTestHeaderText>
    </StyledTestHeaderContentBox>
  );
}
