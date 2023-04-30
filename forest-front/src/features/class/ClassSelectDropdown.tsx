import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import {
  ClassSelectDropdownContainer,
  ClassSelectDropdownEach,
  ClassSelectDropdownEachItem,
  ClassSelectDropdownAdd,
  ClassSelectCircle,
} from "./ClassSelect.style";
import { setClass } from "@/stores/class/classInfo";
import AddClassModal from "./teacher/AddClassModal";
import { openAddClassModal } from "@/stores/class/classModal";

interface Iprops {
  classList: ClassList[];
  nowClassId: number;
  isStudent?: boolean;
}

export default function ClassSelectDropdown({ classList, nowClassId, isStudent }: Iprops) {
  const dispatch = useDispatch();
  const { isOpenAddClassModal } = useSelector((state: RootState) => state.classModal);

  return (
    <ClassSelectDropdownContainer>
      <ClassSelectDropdownEach>
        {classList?.map((item) => (
          <ClassSelectDropdownEachItem key={item.classId} onClick={() => dispatch(setClass(item))}>
            {item.classId === nowClassId && <ClassSelectCircle />} {item.name}
          </ClassSelectDropdownEachItem>
        ))}
      </ClassSelectDropdownEach>
      {!isStudent && (
        <ClassSelectDropdownAdd onClick={() => dispatch(openAddClassModal())}>
          + 새 클래스 추가
        </ClassSelectDropdownAdd>
      )}
      {isOpenAddClassModal && <AddClassModal />}
    </ClassSelectDropdownContainer>
  );
}
