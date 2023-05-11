import useGetWorkbooksBySelf from "@/apis/editor/useGetWorkbooksBySelfQuery";
import useWorkbookDetailQuery from "@/apis/workbookDetail/useWorkbookDetailQuery";
import EditorNav from "@/components/Nav/EditorNav";
import Toast from "@/components/Toast/Toast";
import AddWorkbookModal from "@/features/editor/AddWorkbookModal";
import {
  EditorBtnsAndListBox,
  EditorContainer,
  EditorFullScreen,
  EditorTitleAndQuestionBox,
} from "@/features/editor/Editor.style";
import EditorBtns from "@/features/editor/EditorBtns";
import EditorQuestionList from "@/features/editor/EditorQuestionList";
import EditorTitle from "@/features/editor/EditorTitle";
import ImportingPartModal from "@/features/editor/ImportingPartModal";
import ImportingWholeModal from "@/features/editor/ImportingWholeModal";
import QuestionEditArea from "@/features/editor/QuestionEditArea";
import useEditorSave from "@/hooks/editor/useEditorSave";
import { setCloseEditor } from "@/stores/editor/editorModal";
import { initCurQuestion, initDeleteAnswers, initQuestions } from "@/stores/editor/editorQuestions";
import { setSelectWorkbook } from "@/stores/editor/editorWorkbook";
import { RootState } from "@/stores/store";
import withAuth from "@/utils/auth/withAuth";
import { useEffect, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { MdSave } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function Editor() {
  const dispatch = useDispatch();

  const { isOpenWholePdfModal, isOpenPartPdfModal } = useSelector(
    (state: RootState) => state.editorModal,
  );
  const { curWorkbookId } = useSelector((state: RootState) => state.editorWorkbook);
  const { workbook } = useSelector((state: RootState) => state.workbookDetail);

  // 새 출제집
  const [selectQuestionType, setSelectQuestionType] = useState("");
  const { isOpenAddWorkbookModal } = useSelector((state: RootState) => state.editorModal);
  const { isMoveToEditor } = useSelector((state: RootState) => state.workbookDetail);
  const {} = useSelector((state: RootState) => state.editorWorkbook);
  const { editorSave, isLoading, isSuccess } = useEditorSave();
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);
  const [isWorkbookSwitchFail, setIsWorkbookSwitchFail] = useState(false);
  const { curQuestion } = useSelector((state: RootState) => state.editorQuestions);

  const [controlDropdown, setControlDropdown] = useState<boolean>(false);

  useGetWorkbooksBySelf();

  const { refetch: getWorkbookApi } = useWorkbookDetailQuery(
    isMoveToEditor ? workbook.workbookId : curWorkbookId,
  );

  useEffect(() => {
    const workbookId = workbook.workbookId;
    const title = workbook.title;
    isMoveToEditor && dispatch(setSelectWorkbook({ workbookId, title }));

    return () => {
      dispatch(setCloseEditor());
    };
  }, []);

  useEffect(() => {
    if (!isMoveToEditor) {
      dispatch(initCurQuestion());
      dispatch(initDeleteAnswers());
      dispatch(initQuestions());
      // dispatch(resetSelectWorkbook());
    }
    console.log("??");
    getWorkbookApi();
  }, [curWorkbookId, workbook.workbookId]);

  useEffect(() => {
    setIsSaveSuccess(isSuccess);
  }, [isSuccess]);

  const hideDropdownHandler = () => {
    setControlDropdown(false);
  };

  return (
    <>
      <EditorFullScreen onClick={hideDropdownHandler}>
        <EditorNav setSelectQuestionType={setSelectQuestionType} />
        {isOpenAddWorkbookModal && <AddWorkbookModal />}
        <EditorContainer isEditor>
          <EditorTitleAndQuestionBox>
            <EditorTitle
              editorSave={editorSave}
              isSuccess={isSuccess}
              controlDropdown={controlDropdown}
              setControlDropdown={setControlDropdown}
              setIsWorkbookSwitchFail={setIsWorkbookSwitchFail}
            />
            <QuestionEditArea selectQuestionType={selectQuestionType} />
          </EditorTitleAndQuestionBox>
          <EditorBtnsAndListBox>
            <EditorBtns editorSave={editorSave} isLoading={isLoading} />
            <EditorQuestionList />
          </EditorBtnsAndListBox>
          {isOpenWholePdfModal && <ImportingWholeModal />}
          {isOpenPartPdfModal && <ImportingPartModal />}
        </EditorContainer>
      </EditorFullScreen>
      {isSaveSuccess && (
        <Toast
          icon={<MdSave />}
          title="저장되었습니다"
          isOpen={isSaveSuccess}
          setIsOpen={setIsSaveSuccess}
        />
      )}
      {isWorkbookSwitchFail && (
        <Toast
          icon={<IoIosWarning />}
          subtitle="문제집 전환 불가"
          title="문항 수정을 완료해주세요"
          isOpen={isWorkbookSwitchFail}
          setIsOpen={setIsWorkbookSwitchFail}
        />
      )}
    </>
  );
}

export default withAuth(Editor);
