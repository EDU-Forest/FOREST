import TestHeaderLeftContentBox from "./TestHeaderLeftContentBox";
import TestHeaderRightContentBox from "./TestHeaderRightContentBox";
import { StyledTestHeader } from "./TextIndex.style";

interface Iprops {
  setToggleModal: (toggleModal: boolean) => void;
}

export default function TestHeader({ setToggleModal }: Iprops) {
  return (
    <StyledTestHeader>
      <TestHeaderLeftContentBox setToggleModal={setToggleModal} />
      <TestHeaderRightContentBox />
    </StyledTestHeader>
  );
}
