import { useDispatch } from "react-redux";
import {
  ClassSelectDropdownContainer,
  ClassSelectDropdownEach,
  ClassSelectDropdownEachItem,
  ClassSelectDropdownAdd,
  ClassSelectCircle,
} from "./ClassSelect.style";
import { setClass } from "@/stores/teacher/teacherClass";
import { useState } from "react";
import ClassAddModal from "./teacher/ClassAddModal";

interface ClassList {
  classId: number;
  className: string;
}
interface Iprops {
  classList: ClassList[];
  nowClassId: number;
  isStudent?: boolean;
}

export default function ClassSelectDropdown({ classList, nowClassId, isStudent }: Iprops) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const changeClass = (item: ClassList) => {
    dispatch(setClass(item));
  };
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <ClassSelectDropdownContainer>
      <ClassSelectDropdownEach>
        {classList?.map((item) => (
          <ClassSelectDropdownEachItem key={item.classId} onClick={() => changeClass(item)}>
            {item.classId === nowClassId && <ClassSelectCircle />} {item.className}
          </ClassSelectDropdownEachItem>
        ))}
      </ClassSelectDropdownEach>
      {!isStudent && (
        <>
          <ClassSelectDropdownAdd onClick={handleModal}>+ 새 클래스 추가</ClassSelectDropdownAdd>
          {isOpen && <ClassAddModal handleModal={handleModal} />}
        </>
      )}
    </ClassSelectDropdownContainer>
  );
}
