import { Title } from "@/styles/text";
import {
  ClassStudentAddDropdown,
  ClassStudentAddDropdownEach,
  ClassStudentAddDropdownEachItem,
  ClassStudentAddInput,
  ClassStudentAddModalContainer,
  ClassStudentAddName,
  ClassStudentAddEmail,
  ClassStudentAddList,
  ClassStudentAddBtnWrapper,
} from "./AddStudentModal.style";
import SmallBtn from "@/components/Button/SmallBtn";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeAddStudentModal } from "@/stores/class/classModal";

const searchList: Student[] = [
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
];

export default function AddStudentModal() {
  const dispatch = useDispatch();
  const confirm = () => {
    //확인버튼
  };

  const [studentList, setStudentList] = useState<number[]>([]);

  const addStudent = (id: number) => {
    setStudentList([...studentList, id]);
    console.log(studentList);
  };

  return (
    <ClassStudentAddModalContainer>
      <Title>클래스에 추가할 학생을 선택해주세요.</Title>
      <ClassStudentAddInput />
      <ClassStudentAddDropdown>
        <ClassStudentAddDropdownEach>
          {searchList.map((item) => (
            <ClassStudentAddDropdownEachItem onClick={() => addStudent(item.userId)}>
              <ClassStudentAddName>{item.name}</ClassStudentAddName>
              <ClassStudentAddEmail>{item.email}</ClassStudentAddEmail>
            </ClassStudentAddDropdownEachItem>
          ))}
        </ClassStudentAddDropdownEach>
      </ClassStudentAddDropdown>
      <ClassStudentAddList />
      <ClassStudentAddBtnWrapper>
        <SmallBtn children="취소" onClick={() => dispatch(closeAddStudentModal())} />
        <SmallBtn children="확인" colored onClick={confirm} />
      </ClassStudentAddBtnWrapper>
    </ClassStudentAddModalContainer>
  );
}
