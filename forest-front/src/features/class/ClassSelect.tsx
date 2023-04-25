import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import ClassSelectModal from "./ClassSelectModal";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { ClassSelectedTitle } from "./ClassSelect.style";

const classList = [
  {
    classId: 1,
    className: "싸피 고등학교 1반",
  },
  {
    classId: 2,
    className: "싸피 고등학교 2반",
  },
  {
    classId: 3,
    className: "싸피 고등학교 3반",
  },
  {
    classId: 4,
    className: "싸피중 1반",
  },
  {
    classId: 5,
    className: "싸피중 2반",
  },
  {
    classId: 6,
    className: "싸피중 3반",
  },
];

export default function ClassSelect() {
  // 모든 클래스 받아오기 -> classList
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const { nowClassName, nowClassId } = useSelector((state: RootState) => state.teacherClass);

  return (
    <>
      <ClassSelectedTitle>
        {nowClassName}
        <AiFillCaretDown onClick={handleDropdown} className="icon" />
      </ClassSelectedTitle>
      {isOpen && <ClassSelectModal classList={classList} nowClassId={nowClassId} />}
    </>
  );
}
