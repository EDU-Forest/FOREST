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

interface Iprops {
  setControlDropdown: (controlDropdown: boolean) => void;
}

export default function EditorSelectDropdown({ setControlDropdown }: Iprops) {
  const dispatch = useDispatch();
  const { curWorkbookIdx, workbooksBySelf } = useSelector(
    (state: RootState) => state.editorWorkbook,
  );

  useEffect(() => {
    console.log(curWorkbookIdx, workbooksBySelf);
  }, []);

  const addWorkbookHandler = () => {
    dispatch(openAddWorkBookModal());
    setControlDropdown(false);
  };

  const selectWorkbookHandler = (idx: number) => {
    dispatch(setSelectWorkbook(idx));
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
                onClick={() => selectWorkbookHandler(idx)}
              >
                {idx === curWorkbookIdx && <ClassSelectCircle />} {item.title}
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
