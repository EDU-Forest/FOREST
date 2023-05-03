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
import { setSelectWorkbook, setWorkbookBySelf } from "@/stores/editor/editorWorkbook";

export default function EditorSelectDropdown() {
  const dispatch = useDispatch();
  const { isOpenAddClassModal } = useSelector((state: RootState) => state.classModal);
  const { curWorkbookIdx, workbooksBySelf } = useSelector(
    (state: RootState) => state.editorWorkbook,
  );
  return (
    <ClassSelectDropdownContainer>
      {workbooksBySelf?.length > 0 ? (
        <>
          <ClassSelectDropdownEach>
            {workbooksBySelf?.map((item, idx) => (
              <ClassSelectDropdownEachItem
                key={item.workbookId}
                onClick={() => dispatch(setSelectWorkbook(idx))}
              >
                {item.workbookId === curWorkbookIdx && <ClassSelectCircle />} {item.workbookTitle}
              </ClassSelectDropdownEachItem>
            ))}
          </ClassSelectDropdownEach>
        </>
      ) : (
        <ClassSelectNoClass>존재하는 클래스가 없습니다</ClassSelectNoClass>
      )}

      <ClassSelectDropdownAdd onClick={() => dispatch(openAddClassModal())}>
        + 새 클래스 추가
      </ClassSelectDropdownAdd>

      {isOpenAddClassModal && <AddClassModal />}
    </ClassSelectDropdownContainer>
  );
}
