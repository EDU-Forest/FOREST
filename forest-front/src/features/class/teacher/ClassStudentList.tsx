import StudentInfoCard from "@/components/Card/StudentInfoCard";
import {
  StudentListText,
  StudentListTextWrapper,
  StudentListTitle,
  StudentListWrapper,
  StudentAddText,
} from "./ClassStudentList.style";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useState } from "react";
import AddStudentModal from "./AddStudentModal";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { openAddStudentModal } from "@/stores/class/classModal";
import DeleteStudentModal from "./DeleteStudentModal";
import useClassStudentListQuery from "@/apis/class/teacher/useClassStudentListQuery";

export default function ClassStudentList() {
  const dispatch = useDispatch();
  const classId = useSelector((state: RootState) => state.class.nowClassId);
  const { isOpenAddStudentModal } = useSelector((state: RootState) => state.classModal);
  const { isOpenDeleteStudentModal } = useSelector((state: RootState) => state.classModal);
  const studentList: Student[] = useClassStudentListQuery(classId).data;

  return (
    <>
      <StudentListTextWrapper>
        <div>
          <StudentListTitle>학생 리스트 </StudentListTitle>
          <StudentListText>(20)</StudentListText>
        </div>
        <StudentAddText onClick={() => dispatch(openAddStudentModal())}>
          <AiOutlineUsergroupAdd className="icon" />
          학생 추가
        </StudentAddText>
      </StudentListTextWrapper>
      {isOpenAddStudentModal && <AddStudentModal />}

      <StudentListWrapper>
        {studentList?.map((item) => (
          <StudentInfoCard key={item.userId} studentInfo={item} />
        ))}
      </StudentListWrapper>
      {isOpenDeleteStudentModal && <DeleteStudentModal />}
    </>
  );
}
