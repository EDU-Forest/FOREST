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
  ClassStudentRemoveIcon,
  ClassStudentCheckIcon,
  ClassStudentDeleteIcon,
} from "./AddStudentModal.style";
import SmallBtn from "@/components/Button/SmallBtn";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeAddStudentModal } from "@/stores/class/classModal";
import useSearchClassStudentQuery from "@/apis/class/teacher/useSearchClassStudentQuery";
import { FiXCircle } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useClassStudentAdd from "@/apis/class/teacher/useClassStudentAdd";
import { IStudent } from "@/types/Student";

export default function AddStudentModal() {
  const dispatch = useDispatch();
  const classId = useSelector((state: RootState) => state.class.nowClassId);
  const [inputValue, setInputValue] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [studentList, setStudentList] = useState<IStudent[]>([]);
  const { mutate } = useClassStudentAdd();

  const searchList: IStudent[] = useSearchClassStudentQuery(inputValue, classId).data;

  useEffect(() => {
    if (studentList.length > 0) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  }, [studentList]);

  const addStudent = (student: IStudent) => {
    if (studentList.includes(student)) {
      return;
    }
    setStudentList([...studentList, student]);
  };

  const deleteStudent = (student: IStudent) => {
    const newList = studentList.filter((item) => item !== student);
    setStudentList(newList);
  };

  const removeInputValue = () => {
    setInputValue("");
  };

  const confirm = () => {
    const newList = studentList.map((student) => {
      return {
        userId: student.userId,
      };
    });

    const payload = {
      classId,
      studentList: newList,
    };

    console.log(payload);
    mutate(payload);
  };

  return (
    <ClassStudentAddModalContainer>
      <Title>클래스에 추가할 학생을 선택해주세요.</Title>
      <div style={{ position: "relative" }}>
        <ClassStudentAddInput value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <ClassStudentDeleteIcon onClick={removeInputValue}>
          <AiOutlineClose />
        </ClassStudentDeleteIcon>
      </div>
      {searchList?.length > 0 && (
        <ClassStudentAddDropdown>
          <ClassStudentAddDropdownEach>
            {searchList?.map((item) => (
              <div key={item.userId}>
                {studentList.includes(item) ? (
                  <ClassStudentAddDropdownEachItem disabled>
                    <ClassStudentCheckIcon>
                      <AiOutlineCheckCircle />
                    </ClassStudentCheckIcon>
                    <ClassStudentAddName>{item.name}</ClassStudentAddName>
                    <ClassStudentAddEmail>{item.email}</ClassStudentAddEmail>
                  </ClassStudentAddDropdownEachItem>
                ) : (
                  <ClassStudentAddDropdownEachItem onClick={() => addStudent(item)}>
                    <ClassStudentAddName>{item.name}</ClassStudentAddName>
                    <ClassStudentAddEmail>{item.email}</ClassStudentAddEmail>
                  </ClassStudentAddDropdownEachItem>
                )}
              </div>
            ))}
          </ClassStudentAddDropdownEach>
        </ClassStudentAddDropdown>
      )}
      <ClassStudentAddList>
        {studentList.map((item) => (
          <ClassStudentAddDropdownEach key={item.userId}>
            <ClassStudentAddDropdownEachItem disabled>
              <ClassStudentAddName>{item.name}</ClassStudentAddName>
              <ClassStudentAddEmail>{item.email}</ClassStudentAddEmail>
              <ClassStudentRemoveIcon>
                <FiXCircle onClick={() => deleteStudent(item)} />
              </ClassStudentRemoveIcon>
            </ClassStudentAddDropdownEachItem>
          </ClassStudentAddDropdownEach>
        ))}
      </ClassStudentAddList>
      <ClassStudentAddBtnWrapper>
        <SmallBtn children="취소" onClick={() => dispatch(closeAddStudentModal())} />
        <SmallBtn children="확인" disabled={!isAvailable} colored onClick={confirm} />
      </ClassStudentAddBtnWrapper>
    </ClassStudentAddModalContainer>
  );
}
