import { StyledSmallBtn } from "./Btn.style";

interface Iprops {
  children: string;
  colored?: boolean;
  onClick: () => void;
}

export default function SmallBtn({ children, colored, onClick }: Iprops) {
  return (
    <StyledSmallBtn colored={colored} onClick={onClick}>
      {children}
    </StyledSmallBtn>
  );
}
