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
import { initCurQuestion, initQuestions, setQuestions } from "@/stores/editor/editorQuestions";
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

export default function Editor() {
  const dispatch = useDispatch();

  const { isOpenModal } = useSelector((state: RootState) => state.editorModal);

  // 새 출제집
  const [workbooksBySelf, setWorkbooksBySelf] = useState<IWorkbookBySelf[]>();
  const [selectQuestionType, setSelectQuestionType] = useState("");
  const { isOpenAddWorkbookModal } = useSelector((state: RootState) => state.editorModal);

  // const [questions, setQuestions] = useState<QuestionType[]>([]);

  useGetWorkbooksBySelf();

  // 현재 문제집 id가 dummy. 추후 수정
  const {} = useWorkbookDetailQuery(Number(1));

  useEffect(() => {
    dispatch(initCurQuestion());
    dispatch(setQuestions);
  }, []);

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
