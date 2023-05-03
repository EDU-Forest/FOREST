import { StyledSmallBtn } from "./Btn.style";

interface Iprops {
  children: string;
  disabled?: boolean;
  colored?: boolean;
  onClick?: () => void;
}

export default function SmallBtn({ children, disabled, colored, onClick }: Iprops) {
  return (
    <StyledSmallBtn colored={colored} onClick={onClick} disabled={disabled}>
      {children}
    </StyledSmallBtn>
  );
}
