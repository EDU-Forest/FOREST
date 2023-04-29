import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import ClassSelectDropdown from "./ClassSelectDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { ClassSelectWrapper, ClassSelectedTitle } from "./ClassSelect.style";

const classList: ClassList[] = [
  {
    classId: 1,
    name: "싸피 고등학교 1반",
  },
  {
    classId: 2,
    name: "싸피 고등학교 2반",
  },
  {
    classId: 3,
    name: "싸피 고등학교 3반",
  },
  {
    classId: 4,
    name: "싸피중 1반",
  },
  {
    classId: 5,
    name: "싸피중 2반",
  },
  {
    classId: 6,
    name: "싸피중 3반",
  },
];

interface Iprops {
  isStudent?: boolean;
}

export default function ClassSelect({ isStudent }: Iprops) {
  // 모든 클래스 받아오기 -> classList
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const { nowClassName, nowClassId } = useSelector((state: RootState) => state.teacherClass);

  return (
    <ClassSelectWrapper>
      <ClassSelectedTitle>
        {nowClassName}
        <AiFillCaretDown onClick={handleDropdown} className="icon" />
      </ClassSelectedTitle>
      {isOpen && (
        <ClassSelectDropdown classList={classList} nowClassId={nowClassId} isStudent={isStudent} />
      )}
    </ClassSelectWrapper>
  );
}
