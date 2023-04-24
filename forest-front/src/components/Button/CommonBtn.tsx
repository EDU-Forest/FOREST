import { StyledCommonBtn } from "./Btn.style";

interface Iprops {
  children: string;
  colored?: boolean;
  onClick: () => void;
}

export default function CommonBtn({ children, colored, onClick }: Iprops) {
  return (
    <StyledCommonBtn colored={colored} onClick={onClick}>
      {children}
    </StyledCommonBtn>
  );
}
