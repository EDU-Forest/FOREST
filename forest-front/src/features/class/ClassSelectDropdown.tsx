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
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { openAddClassModal } from "@/stores/teacher/teacherModalControl";

interface Iprops {
  classList: ClassList[];
  nowClassId: number;
  isStudent?: boolean;
}

export default function ClassSelectDropdown({ classList, nowClassId, isStudent }: Iprops) {
  const dispatch = useDispatch();
  const { isOpenAddClassModal } = useSelector((state: RootState) => state.teacherModalControl);
  const changeClass = (item: ClassList) => {
    dispatch(setClass(item));
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
          <ClassSelectDropdownAdd onClick={() => dispatch(openAddClassModal())}>
            + 새 클래스 추가
          </ClassSelectDropdownAdd>
          {isOpenAddClassModal && <AddClassModal />}
        </>
      )}
    </ClassSelectDropdownContainer>
  );
}
