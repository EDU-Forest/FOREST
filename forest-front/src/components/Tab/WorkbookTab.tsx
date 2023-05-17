import { StyledWorkbookTab } from "./Tab.style";

interface Iprops {
  children: string;
  selected?: boolean;
  space: number;
  onClick: (type: string) => void;
  type: string;
}

export default function WorkbookTab({ children, selected, space, onClick, type }: Iprops) {
  return (
    <StyledWorkbookTab selected={selected} space={space} onClick={() => onClick(type)}>
      {children}
    </StyledWorkbookTab>
  );
}
