import { MdClose } from "react-icons/md";
import {
  StudentInfoCardInner,
  StudentInfoCardName,
  StudentInfoCardText,
  StyledStudentInfoCard,
} from "./Card.style";

import { useDispatch } from "react-redux";
import { openDeleteStudentModal } from "@/stores/class/classModal";
import { useEffect } from "react";
import { setDeleteStudentNum } from "@/stores/class/classInfo";
import { IStudent } from "@/types/Student";

interface Iprops {
  studentInfo: IStudent;
}

export default function StudentInfoCard({ studentInfo }: Iprops) {
  const dispatch = useDispatch();

  const clickDeleteBtn = () => {
    dispatch(openDeleteStudentModal());
    dispatch(setDeleteStudentNum(studentInfo.userId));
  };

  return (
    <StyledStudentInfoCard>
      <StudentInfoCardInner>
        <div>
          <StudentInfoCardName>{studentInfo?.name}</StudentInfoCardName>
          <StudentInfoCardText>{studentInfo?.age}세</StudentInfoCardText>
        </div>
        <MdClose className="close-icon" onClick={clickDeleteBtn} />
      </StudentInfoCardInner>
      <div>
        <StudentInfoCardText>{studentInfo?.email}</StudentInfoCardText>
        <StudentInfoCardText>|</StudentInfoCardText>
        <StudentInfoCardText>{studentInfo?.phone}</StudentInfoCardText>
      </div>
    </StyledStudentInfoCard>
  );
}
