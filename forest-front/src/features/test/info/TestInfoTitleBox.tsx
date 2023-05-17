import { useSelector } from "react-redux";
import { StyledTestInfoTitleBox } from "./TestInfo.style";
import { RootState } from "@/stores/store";

export default function TestInfoTitleBox() {
  const { studyName } = useSelector((state: RootState) => state.exam);

  return <StyledTestInfoTitleBox>{studyName}</StyledTestInfoTitleBox>;
}
