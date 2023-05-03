import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import {
  ClassSelectDropdownContainer,
  ClassSelectDropdownEach,
  ClassSelectDropdownEachItem,
  ClassSelectDropdownAdd,
  ClassSelectCircle,
  ClassSelectNoClass,
} from "../class/ClassSelect.style";
import { setClass } from "@/stores/class/classInfo";
import { openAddClassModal } from "@/stores/class/classModal";
import useClassListQuery from "@/apis/class/useClassListQuery";
import AddClassModal from "../class/teacher/AddClassModal";
import { IWorkbookBySelf } from "@/types/Workbook";

interface Iprops {
  nowClassId: number;
  isStudent?: boolean;
}

export default function EditorSelectDropdown({ nowClassId, isStudent }: Iprops) {
  const dispatch = useDispatch();
  const { isOpenAddClassModal } = useSelector((state: RootState) => state.classModal);

  const classList: ClassList[] = useClassListQuery().data;

  return (
    <ClassSelectDropdownContainer>
      {classList?.length > 0 ? (
        <>
          <ClassSelectDropdownEach>
            {classList?.map((item) => (
              <ClassSelectDropdownEachItem
                key={item.classId}
                onClick={() => dispatch(setClass(item))}
              >
                {item.classId === nowClassId && <ClassSelectCircle />} {item.className}
              </ClassSelectDropdownEachItem>
            ))}
          </ClassSelectDropdownEach>
        </>
      ) : (
        <ClassSelectNoClass>존재하는 클래스가 없습니다</ClassSelectNoClass>
      )}
      {!isStudent && (
        <ClassSelectDropdownAdd onClick={() => dispatch(openAddClassModal())}>
          + 새 클래스 추가
        </ClassSelectDropdownAdd>
      )}
      {isOpenAddClassModal && <AddClassModal />}
    </ClassSelectDropdownContainer>
  );
}
