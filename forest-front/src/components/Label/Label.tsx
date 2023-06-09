import { BsCheckCircleFill } from "react-icons/bs";
import { StyledLabel } from "./Label.style";

interface Iprops {
  children: string;
  status: string;
}

export default function Label({ children, status }: Iprops) {
  return (
    <StyledLabel status={status} className={status === "fail" ? "vibrate-3" : ""}>
      <BsCheckCircleFill className="icon" />
      {children}
    </StyledLabel>
  );
}
