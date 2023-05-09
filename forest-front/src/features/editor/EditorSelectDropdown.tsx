import useEditorSave from "@/hooks/editor/useEditorSave";
import { openAddWorkBookModal } from "@/stores/editor/editorModal";
import { setSelectWorkbook } from "@/stores/editor/editorWorkbook";
import { RootState } from "@/stores/store";
import { ModalBox } from "@/styles/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  ClassSelectCircle,
  ClassSelectDropdownAdd,
  ClassSelectDropdownContainer,
  ClassSelectDropdownEach,
  ClassSelectDropdownEachItem,
  ClassSelectNoClass,
} from "../class/ClassSelect.style";

interface Iprops {
  setControlDropdown: (controlDropdown: boolean) => void;
  editorSave: () => void;
  isSuccess: boolean;
}

export default function EditorSelectDropdown({
  setControlDropdown,
  editorSave,
  isSuccess,
}: Iprops) {
  const dispatch = useDispatch();
  const { curWorkbookId, workbooksBySelf } = useSelector(
    (state: RootState) => state.editorWorkbook,
  );

  const addWorkbookHandler = () => {
    dispatch(openAddWorkBookModal());
    setControlDropdown(false);
  };

  // 1. 데이터 저장
  const saveData = (callback: Function) => {
    editorSave();
    callback();
  };

  // 2. 현재 문제집 변경
  const selectWorkbook = (workbookId: number, title: string) => {
    dispatch(setSelectWorkbook({ workbookId, title }));
  };

  const selectWorkbookHandler = (workbookId: number, title: string) => {
    saveData(() => {
      selectWorkbook(workbookId, title);
    });
    setControlDropdown(false);
  };

  return (
    <>
      <ClassSelectDropdownContainer>
        {workbooksBySelf?.length > 0 ? (
          <>
            <ClassSelectDropdownEach>
              {workbooksBySelf?.map((item, idx) => (
                <ClassSelectDropdownEachItem
                  key={`workbook-${idx}`}
                  onClick={() => selectWorkbookHandler(item.workbookId, item.title)}
                >
                  {item.workbookId === curWorkbookId && <ClassSelectCircle />} {item.title}
                </ClassSelectDropdownEachItem>
              ))}
            </ClassSelectDropdownEach>
          </>
        ) : (
          <ClassSelectNoClass>존재하는 문제집이 없습니다</ClassSelectNoClass>
        )}

        {/* <ClassSelectDropdownAdd onClick={() => dispatch(openAddWorkBookModal())}> */}
        <ClassSelectDropdownAdd onClick={addWorkbookHandler}>
          + 새 문제집 추가
        </ClassSelectDropdownAdd>
      </ClassSelectDropdownContainer>
    </>
  );
}
