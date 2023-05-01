import { StyledCommonBtn } from "./Btn.style";

interface Iprops {
  children: string;
  colored?: boolean;
  onClick: () => void;
  disabled: boolean;
}

export default function CommonBtn({ children, colored, onClick, disabled }: Iprops) {
  return (
    <StyledCommonBtn colored={colored} onClick={onClick} disabled={disabled}>
      {children}
    </StyledCommonBtn>
  );
}
