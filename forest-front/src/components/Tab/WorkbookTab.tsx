import { StyledWorkbookTab } from "./Tab.style";

interface Iprops {
  children: string;
  selected: boolean;
  space: number;
}

export default function WorkbookTab({ children, selected, space }: Iprops) {
  return (
    <StyledWorkbookTab selected={selected} space={space}>
      {children}
    </StyledWorkbookTab>
  );
}
