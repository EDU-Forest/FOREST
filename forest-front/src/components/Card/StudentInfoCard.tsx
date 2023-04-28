import { MdClose } from "react-icons/md";
import {
  StudentInfoCardInner,
  StudentInfoCardName,
  StudentInfoCardText,
  StyledStudentInfoCard,
} from "./Card.style";
import { useState } from "react";
import DeleteStudentModal from "@/features/class/teacher/DeleteStudentModal";

interface Iprops {
  studentInfo: Student;
}

export default function StudentInfoCard({ studentInfo }: Iprops) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <StyledStudentInfoCard>
      <StudentInfoCardInner>
        <div>
          <StudentInfoCardName>{studentInfo?.name}</StudentInfoCardName>
          <StudentInfoCardText>{studentInfo?.age}세</StudentInfoCardText>
        </div>
        <MdClose className="close-icon" onClick={handleModal} />
      </StudentInfoCardInner>
      <div>
        <StudentInfoCardText>{studentInfo?.email}</StudentInfoCardText>
        <StudentInfoCardText>|</StudentInfoCardText>
        <StudentInfoCardText>{studentInfo?.phone}</StudentInfoCardText>
      </div>
      {isOpen && <DeleteStudentModal handleModal={handleModal} />}
    </StyledStudentInfoCard>
  );
}
