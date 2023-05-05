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
import AddClassModal from "../class/teacher/AddClassModal";
import { setSelectWorkbook, setWorkbookBySelf } from "@/stores/editor/editorWorkbook";
import { openAddWorkBookModal } from "@/stores/editor/editorModal";
import AddWorkbookModal from "./AddWorkbookModal";

export default function EditorSelectDropdown() {
  const dispatch = useDispatch();
  const { isOpenAddWorkbookModal } = useSelector((state: RootState) => state.editorModal);
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
        <ClassSelectNoClass>존재하는 문제집이 없습니다</ClassSelectNoClass>
      )}

      <ClassSelectDropdownAdd onClick={() => dispatch(openAddWorkBookModal())}>
        + 새 문제집 추가
      </ClassSelectDropdownAdd>

      {isOpenAddWorkbookModal && <AddWorkbookModal />}
    </ClassSelectDropdownContainer>
  );
}
