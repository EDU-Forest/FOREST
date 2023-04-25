import { useDispatch } from "react-redux";
import {
  ClassSelectModalContainer,
  ClassSelectModalEach,
  ClassSelectModalEachItem,
  ClassSelectModalAdd,
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
}

export default function ClassSelectModal({ classList, nowClassId }: Iprops) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const changeClass = (item: ClassList) => {
    dispatch(setClass(item));
  };
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <ClassSelectModalContainer>
        <ClassSelectModalEach>
          {classList?.map((item) => (
            <ClassSelectModalEachItem key={item.classId} onClick={() => changeClass(item)}>
              {item.classId === nowClassId && <ClassSelectCircle />} {item.className}
            </ClassSelectModalEachItem>
          ))}
        </ClassSelectModalEach>
        <ClassSelectModalAdd onClick={handleModal}>+ 새 클래스 추가</ClassSelectModalAdd>
      </ClassSelectModalContainer>
      {isOpen && <ClassAddModal handleModal={handleModal} />}
    </>
  );
}
