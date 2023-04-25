import { MdClose } from "react-icons/md";
import {
  StudentInfoCardInner,
  StudentInfoCardName,
  StudentInfoCardText,
  StyledStudentInfoCard,
} from "./Card.style";

interface Iprops {
  studentInfo: Student;
}

export default function StudentInfoCard({ studentInfo }: Iprops) {
  return (
    <StyledStudentInfoCard>
      <StudentInfoCardInner>
        <div>
          <StudentInfoCardName>{studentInfo.name}</StudentInfoCardName>
          <StudentInfoCardText>{studentInfo.age}세</StudentInfoCardText>
        </div>
        <MdClose className="close-icon" />
      </StudentInfoCardInner>
      <div>
        <StudentInfoCardText>{studentInfo.email}</StudentInfoCardText>
        <StudentInfoCardText>|</StudentInfoCardText>
        <StudentInfoCardText>{studentInfo.phone}</StudentInfoCardText>
      </div>
    </StyledStudentInfoCard>
  );
}
