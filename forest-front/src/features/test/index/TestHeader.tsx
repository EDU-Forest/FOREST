import TestHeaderLeftContentBox from "./TestHeaderLeftContentBox";
import TestHeaderRightContentBox from "./TestHeaderRightContentBox";
import { StyledTestHeader } from "./TextIndex.style";

interface Iprops {
  page: string;
  setToggleModal?: (toggleModal: boolean) => void;
  minutes?: number;
  seconds?: number;
}

export default function TestHeader({ page, minutes, seconds, setToggleModal }: Iprops) {
  return (
    <StyledTestHeader>
      <TestHeaderLeftContentBox
        isEnded={
          typeof minutes !== "undefined" &&
          typeof seconds !== "undefined" &&
          minutes <= 0 &&
          seconds <= 0
        }
        page={page}
        setToggleModal={setToggleModal}
      />
      <TestHeaderRightContentBox
        page={page}
        minutes={minutes ? minutes : -1}
        seconds={seconds ? seconds : -1}
      />
    </StyledTestHeader>
  );
}
