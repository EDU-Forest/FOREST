import TestHeaderLeftContentBox from "./TestHeaderLeftContentBox";
import TestHeaderRightContentBox from "./TestHeaderRightContentBox";
import { StyledTestHeader } from "./TextIndex.style";

interface Iprops {
  page: string;
  setToggleModal?: (toggleModal: boolean) => void;
  minutes: number;
  seconds: number;
}

export default function TestHeader({ page, minutes, seconds, setToggleModal }: Iprops) {
  return (
    <StyledTestHeader>
      <TestHeaderLeftContentBox page={page} setToggleModal={setToggleModal} />
      <TestHeaderRightContentBox page={page} minutes={minutes} seconds={seconds} />
    </StyledTestHeader>
  );
}
