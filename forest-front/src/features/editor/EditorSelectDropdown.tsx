import { openAddWorkBookModal } from "@/stores/editor/editorModal";
import { setSelectWorkbook } from "@/stores/editor/editorWorkbook";
import { RootState } from "@/stores/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ClassSelectCircle,
  ClassSelectDropdownAdd,
  ClassSelectDropdownContainer,
  ClassSelectDropdownEach,
  ClassSelectDropdownEachItem,
  ClassSelectNoClass,
} from "../class/ClassSelect.style";
import { textFormatter } from "@/utils";

interface Iprops {
  setControlDropdown: (controlDropdown: boolean) => void;
  editorSave: () => void;
  isSuccess: boolean;
  setIsWorkbookSwitchFail: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditorSelectDropdown({
  setControlDropdown,
  editorSave,
  isSuccess,
  setIsWorkbookSwitchFail,
}: Iprops) {
  const dispatch = useDispatch();
  const { curWorkbookId, workbooksBySelf } = useSelector(
    (state: RootState) => state.editorWorkbook,
  );

  const { isPointValidConfirm } = useSelector((state: RootState) => state.editorQuestions);
  const { isTitleValidConfirm } = useSelector((state: RootState) => state.editorQuestions);
  const { isAnswerValidConfirm } = useSelector((state: RootState) => state.editorQuestions);

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
    if (isPointValidConfirm && isTitleValidConfirm && isAnswerValidConfirm) {
      saveData(() => {
        selectWorkbook(workbookId, title);
      });
      setControlDropdown(false);
    } else {
      setIsWorkbookSwitchFail(true);
    }
  };

  useEffect(() => {
    setIsWorkbookSwitchFail(false);
  }, []);

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
                  {item.workbookId === curWorkbookId && <ClassSelectCircle />}{" "}
                  {textFormatter(item.title)}
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
