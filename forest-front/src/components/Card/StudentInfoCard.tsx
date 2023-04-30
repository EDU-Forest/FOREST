import { MdClose } from "react-icons/md";
import {
  StudentInfoCardInner,
  StudentInfoCardName,
  StudentInfoCardText,
  StyledStudentInfoCard,
} from "./Card.style";
import { useState } from "react";
import DeleteStudentModal from "@/features/class/teacher/DeleteStudentModal";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { openDeleteStudentModal } from "@/stores/class/classModal";

interface Iprops {
  studentInfo: Student;
}

export default function StudentInfoCard({ studentInfo }: Iprops) {
  const dispatch = useDispatch();
  const { isOpenDeleteStudentModal } = useSelector((state: RootState) => state.classModal);

  return (
    <StyledStudentInfoCard>
      <StudentInfoCardInner>
        <div>
          <StudentInfoCardName>{studentInfo?.name}</StudentInfoCardName>
          <StudentInfoCardText>{studentInfo?.age}세</StudentInfoCardText>
        </div>
        <MdClose className="close-icon" onClick={() => dispatch(openDeleteStudentModal())} />
      </StudentInfoCardInner>
      <div>
        <StudentInfoCardText>{studentInfo?.email}</StudentInfoCardText>
        <StudentInfoCardText>|</StudentInfoCardText>
        <StudentInfoCardText>{studentInfo?.phone}</StudentInfoCardText>
      </div>
      {isOpenDeleteStudentModal && <DeleteStudentModal userId={studentInfo.userId} />}
    </StyledStudentInfoCard>
  );
}
