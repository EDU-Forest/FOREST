import { StyledTestInfoTitleBox } from "./TestInfo.style";

interface Iprops {
  title: string;
}

export default function TestInfoTitleBox({ title }: Iprops) {
  return <StyledTestInfoTitleBox>{title}</StyledTestInfoTitleBox>;
}
