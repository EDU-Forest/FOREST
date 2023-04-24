import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import ClassSelectModal from "./ClassSelectModal";

const allClass = [
  "싸피 고등학교 1반",
  "싸피 고등학교 2반",
  "싸피 고등학교 3반",
  "싸피중 1반",
  "싸피중 2반",
  "싸피중 2반",
  "싸피중 2반",
  "싸피중 2반",
];

export default function ClassSelect() {
  // 모든 클래스 받아오기 -> allClass
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <span>싸피 고등학교 3반</span>
      <AiFillCaretDown onClick={handleDropdown} />
      {isOpen && <ClassSelectModal allClass={allClass} />}
    </>
  );
}
