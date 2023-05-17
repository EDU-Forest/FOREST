import { StyledCommonBtn } from "./Btn.style";

interface Iprops {
  children: string;
  disabled?: boolean;
  colored?: boolean;
  isYellowGreen?: boolean;
  onClick: () => void;
}

export default function CommonBtn({ children, disabled, colored, isYellowGreen, onClick }: Iprops) {
  return (
    <StyledCommonBtn
      disabled={disabled}
      colored={colored}
      isYellowGreen={isYellowGreen}
      onClick={onClick}
    >
      {children}
    </StyledCommonBtn>
  );
}
