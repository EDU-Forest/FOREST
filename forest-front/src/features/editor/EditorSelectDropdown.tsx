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
import { setSelectWorkbook, setWorkbookBySelf } from "@/stores/editor/editorWorkbook";
import { openAddWorkBookModal } from "@/stores/editor/editorModal";
import { useEffect } from "react";
import useEditorSave from "@/hooks/editor/useEditorSave";

interface Iprops {
  setControlDropdown: (controlDropdown: boolean) => void;
}

export default function EditorSelectDropdown({ setControlDropdown }: Iprops) {
  const dispatch = useDispatch();
  const { editorSave } = useEditorSave();
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
      <ClassSelectDropdownAdd onClick={addWorkbookHandler}>+ 새 문제집 추가</ClassSelectDropdownAdd>
    </ClassSelectDropdownContainer>
  );
}
