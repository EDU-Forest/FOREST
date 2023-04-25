import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";
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

const MySwal = withReactContent(Swal);

export default function StudentInfoCard({ studentInfo }: Iprops) {
  const deleteStudent = () => {
    // 학생 삭제
    MySwal.fire({
      icon: "question",
      title: "정말 삭제하시겠습니까?",
      showConfirmButton: false,
      showCancelButton: true,
      customClass: {
        title: "text-20 font-medium",
        popup: "w-440 h-260",
      },
    });
  };
  return (
    <StyledStudentInfoCard>
      <StudentInfoCardInner>
        <div>
          <StudentInfoCardName>{studentInfo.name}</StudentInfoCardName>
          <StudentInfoCardText>{studentInfo.age}세</StudentInfoCardText>
        </div>
        <MdClose className="close-icon" onClick={deleteStudent} />
      </StudentInfoCardInner>
      <div>
        <StudentInfoCardText>{studentInfo.email}</StudentInfoCardText>
        <StudentInfoCardText>|</StudentInfoCardText>
        <StudentInfoCardText>{studentInfo.phone}</StudentInfoCardText>
      </div>
    </StyledStudentInfoCard>
  );
}
