import { MdSchool } from "react-icons/md";
import { StyledClassInfoCard } from "./Card.style";

interface Iprops {
  children: string;
}

export default function ClassInfoCard({ children }: Iprops) {
  return (
    <StyledClassInfoCard>
      <MdSchool className="school-icon" />
      {children}
    </StyledClassInfoCard>
  );
}
