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

const studentList: Student[] = [
  {
    userId: 1,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 2,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 3,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 4,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 5,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 6,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 7,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 8,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 9,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
];
export default function ClassStudentList() {
  const dispatch = useDispatch();
  const { isOpenAddStudentModal } = useSelector((state: RootState) => state.classModal);
  const { isOpenDeleteStudentModal } = useSelector((state: RootState) => state.classModal);

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
          <>
            <StudentInfoCard key={item.userId} studentInfo={item} />
          </>
        ))}
      </StudentListWrapper>
      {isOpenDeleteStudentModal && <DeleteStudentModal />}
    </>
  );
}
