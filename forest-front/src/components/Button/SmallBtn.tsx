import { StyledSmallBtn } from "./Btn.style";

interface Iprops {
  children: string;
  colored: boolean;
}

export default function SmallBtn({ children, colored }: Iprops) {
  return <StyledSmallBtn colored={colored}>{children}</StyledSmallBtn>;
}
