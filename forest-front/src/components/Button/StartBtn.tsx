import { StyledStartBtn } from "./Btn.style";

interface Iprops {
  children: string;
  onClick: () => void;
}

export default function StartBtn({ children, onClick }: Iprops) {
  return <StyledStartBtn onClick={onClick}>{children}</StyledStartBtn>;
}
