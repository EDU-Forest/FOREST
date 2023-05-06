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
import { IWorkbookBySelf, QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ImportingModal from "@/features/editor/ImportingModal";
import { RootState } from "@/stores/store";
import { Container, FullScreen } from "@/styles/container";
import { useSelector } from "react-redux";
import useGetWorkbooksBySelf from "@/apis/editor/useGetWorkbooksBySelfQuery";
import useWorkbookDetailQuery from "@/apis/workbookDetail/useWorkbookDetailQuery";
import AddWorkbookModal from "@/features/editor/AddWorkbookModal";
import { resetSelectWorkbook, setSelectWorkbook } from "@/stores/editor/editorWorkbook";
import { resetIsMoveToEditor } from "@/stores/workbookDetail/workbookDetail";
import withAuth from "@/utils/withAuth";

function Editor() {
  const dispatch = useDispatch();

  const { isOpenModal } = useSelector((state: RootState) => state.editorModal);
  const { curWorkbookId } = useSelector((state: RootState) => state.editorWorkbook);
  const { workbook } = useSelector((state: RootState) => state.workbookDetail);

  // 새 출제집
  const [selectQuestionType, setSelectQuestionType] = useState("");
  const { isOpenAddWorkbookModal } = useSelector((state: RootState) => state.editorModal);
  const { isMoveToEditor } = useSelector((state: RootState) => state.workbookDetail);
  const {} = useSelector((state: RootState) => state.editorWorkbook);

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
          <EditorTitle />
          <QuestionEditArea selectQuestionType={selectQuestionType} />
        </EditorTitleAndQuestionBox>
        <EditorBtnsAndListBox>
          <EditorBtns />
          <EditorQuestionList />
        </EditorBtnsAndListBox>
        {/* <PdfViewer /> */}
        {isOpenModal && <ImportingModal />}
      </EditorContainer>
    </FullScreen>
  );
}

export default withAuth(Editor);
