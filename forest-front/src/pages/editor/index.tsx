import EditorNav from "@/components/Nav/EditorNav";
import {
  EditorBtnsAndListBox,
  EditorContainer,
  EditorTitleAndQuestionBox,
} from "@/features/editor/Editor.style";
import EditorBtns from "@/features/editor/EditorBtns";
import EditorQuestionList from "@/features/editor/EditorQuestionList";
import EditorTitle from "@/features/editor/EditorTitle";
import QuestionEditArea from "@/features/editor/QuestionEditArea";
import {
  initCurQuestion,
  initDeleteAnswers,
  initQuestions,
  setQuestions,
} from "@/stores/editor/editorQuestions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ImportingPartModal from "@/features/editor/ImportingPartModal";
import { RootState } from "@/stores/store";
import { FullScreen } from "@/styles/container";
import { useSelector } from "react-redux";
import useGetWorkbooksBySelf from "@/apis/editor/useGetWorkbooksBySelfQuery";
import useWorkbookDetailQuery from "@/apis/workbookDetail/useWorkbookDetailQuery";
import AddWorkbookModal from "@/features/editor/AddWorkbookModal";
import { resetSelectWorkbook, setSelectWorkbook } from "@/stores/editor/editorWorkbook";
import { resetIsMoveToEditor } from "@/stores/workbookDetail/workbookDetail";
import withAuth from "@/utils/auth/withAuth";
import ImportingWholeModal from "@/features/editor/ImportingWholeModal";
import useEditorSave from "@/hooks/editor/useEditorSave";

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

  useGetWorkbooksBySelf();

  const { refetch: getWorkbookApi } = useWorkbookDetailQuery(
    isMoveToEditor ? workbook.workbookId : curWorkbookId,
  );

  useEffect(() => {
    const workbookId = workbook.workbookId;
    const title = workbook.title;
    isMoveToEditor && dispatch(setSelectWorkbook({ workbookId, title }));
  }, []);

  useEffect(() => {
    if (!isMoveToEditor) {
      dispatch(initCurQuestion());
      dispatch(initDeleteAnswers());
      dispatch(initQuestions());
      // dispatch(resetSelectWorkbook());
    }
    getWorkbookApi();
  }, [curWorkbookId, workbook.workbookId]);

  return (
    <FullScreen>
      <EditorNav setSelectQuestionType={setSelectQuestionType} />
      {isOpenAddWorkbookModal && <AddWorkbookModal />}
      <EditorContainer isEditor>
        <EditorTitleAndQuestionBox>
          <EditorTitle editorSave={editorSave} isSuccess={isSuccess} />
          <QuestionEditArea selectQuestionType={selectQuestionType} />
        </EditorTitleAndQuestionBox>
        <EditorBtnsAndListBox>
          <EditorBtns editorSave={editorSave} isLoading={isLoading} />
          <EditorQuestionList />
        </EditorBtnsAndListBox>
        {isOpenWholePdfModal && <ImportingWholeModal />}
        {isOpenPartPdfModal && <ImportingPartModal />}
      </EditorContainer>
    </FullScreen>
  );
}

export default withAuth(Editor);
