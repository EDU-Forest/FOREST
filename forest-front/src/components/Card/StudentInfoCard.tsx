import { MdClose } from "react-icons/md";
import {
  StudentInfoCardInner,
  StudentInfoCardName,
  StudentInfoCardText,
  StyledStudentInfoCard,
} from "./Card.style";

interface Iprops {
  children: string;
}

export default function StudentInfoCard() {
  return (
    <StyledStudentInfoCard>
      <StudentInfoCardInner>
        <div>
          <StudentInfoCardName>양희제</StudentInfoCardName>
          <StudentInfoCardText>27세</StudentInfoCardText>
        </div>
        <MdClose className="close-icon" />
      </StudentInfoCardInner>
      <div>
        <StudentInfoCardText>abc@gmail.com</StudentInfoCardText>
        <StudentInfoCardText>|</StudentInfoCardText>
        <StudentInfoCardText>010-1234-5678</StudentInfoCardText>
      </div>
    </StyledStudentInfoCard>
  );
}
