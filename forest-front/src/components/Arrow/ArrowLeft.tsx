import { AiOutlineArrowLeft } from "react-icons/ai";
import { ArrowIcon } from "./Arrow.style";

interface Iprops {
  onClick: () => void;
}

export default function ArrowLeft({ onClick }: Iprops) {
  return (
    <ArrowIcon onClick={onClick}>
      <AiOutlineArrowLeft />
    </ArrowIcon>
  );
}
