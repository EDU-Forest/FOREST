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
import AddClassModal from "./teacher/AddClassModal";

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
            {item.classId === nowClassId && <ClassSelectCircle />} {item.name}
          </ClassSelectDropdownEachItem>
        ))}
      </ClassSelectDropdownEach>
      {!isStudent && (
        <>
          <ClassSelectDropdownAdd onClick={handleModal}>+ 새 클래스 추가</ClassSelectDropdownAdd>
          {isOpen && <AddClassModal handleModal={handleModal} />}
        </>
      )}
    </ClassSelectDropdownContainer>
  );
}
