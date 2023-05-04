import TestHeaderLeftContentBox from "./TestHeaderLeftContentBox";
import TestHeaderRightContentBox from "./TestHeaderRightContentBox";
import { StyledTestHeader } from "./TextIndex.style";

interface Iprops {
  page: string;
  setToggleModal?: (toggleModal: boolean) => void;
}

export default function TestHeader({ page, setToggleModal }: Iprops) {
  return (
    <StyledTestHeader>
      <TestHeaderLeftContentBox page={page} setToggleModal={setToggleModal} />
      <TestHeaderRightContentBox />
    </StyledTestHeader>
  );
}
