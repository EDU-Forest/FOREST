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
import { initCurQuestion, setQuestions } from "@/stores/editor/editorQuestions";
import { IWorkbookBySelf, QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ImportingModal from "@/features/editor/ImportingModal";
import { RootState } from "@/stores/store";
import { Container, FullScreen } from "@/styles/container";
import { useSelector } from "react-redux";
import useGetWorkbooksBySelf from "@/apis/editor/useGetWorkbooksBySelfQuery";

export default function Editor() {
  const { isOpenModal } = useSelector((state: RootState) => state.editorModal);

  const [workbooksBySelf, setWorkbooksBySelf] = useState<IWorkbookBySelf[]>();
  const [selectQuestionType, setSelectQuestionType] = useState("");
  // const [questions, setQuestions] = useState<QuestionType[]>([]);

  const dispatch = useDispatch();
  useGetWorkbooksBySelf({ setWorkbooksBySelf });
  // let dummyQuestions: QuestionType[] = [
  //   {
  //     id: 1,
  //     problemNum: 1,
  //     type: "multipleChoice",
  //     title: "다음 글의 제목으로 가장 적절한 것을 고르시오",
  //     text: `It is very unfortunate that I need to be drafting this letter. However, the worsening situation has forced me to submit a formal complaint. I have been renting from you for 0 years and you would agree that there is no doubt that I have paid rent every month either on time or even sometimes early. However, despite this, there has been no effort whatsoever on your part to deal with the noise disturbance of the neighboring unit I have brought to your attention multiple times. The noise which I have to deal with in the wee hours is terrible. I am afraid that I cannot stand the loud music happening at all hours in the next unit any more. Besides this, they leave a pile of garbage at my doorstep almost every other day. I hope you look into this matter at your earliest convenience.`,
  //     answer: "2",
  //     point: 10,
  //     problemImgPath: "",
  //     imgIsEmpty: false,
  //     textIsEmpty: true,
  //     items: [
  //       {
  //         id: 1,
  //         no: 1,
  //         content: "컨텐트",
  //         isImage: false,
  //       },
  //       {
  //         id: 2,
  //         no: 2,
  //         content: "컨텐트",
  //         isImage: true,
  //       },
  //       {
  //         id: 3,
  //         no: 3,
  //         content: "컨텐트",
  //         isImage: false,
  //       },
  //       {
  //         id: 4,
  //         no: 4,
  //         content: "컨텐트",
  //         isImage: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     problemNum: 2,
  //     type: "multipleChoice",
  //     title: "2번 문항",
  //     text: "",
  //     answer: "1",
  //     point: 10,
  //     problemImgPath: "",
  //     imgIsEmpty: false,
  //     textIsEmpty: false,
  //     items: [
  //       {
  //         id: 1,
  //         no: 1,
  //         content: "컨텐트",
  //         isImage: false,
  //       },
  //       {
  //         id: 1,
  //         no: 2,
  //         content: "컨텐트",
  //         isImage: false,
  //       },
  //       {
  //         id: 1,
  //         no: 3,
  //         content: "컨텐트",
  //         isImage: false,
  //       },
  //       {
  //         id: 1,
  //         no: 4,
  //         content: "컨텐트",
  //         isImage: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     problemNum: 3,
  //     type: "multipleChoice",
  //     title: "",
  //     text: "",
  //     answer: "2",
  //     point: 10,
  //     problemImgPath: "",
  //     imgIsEmpty: false,
  //     textIsEmpty: false,
  //     items: [
  //       {
  //         id: 0,
  //         no: 1,
  //         content: "",
  //         isImage: false,
  //       },
  //       {
  //         id: 0,
  //         no: 2,
  //         content: "",
  //         isImage: false,
  //       },
  //       {
  //         id: 0,
  //         no: 3,
  //         content: "",
  //         isImage: false,
  //       },
  //       {
  //         id: 0,
  //         no: 4,
  //         content: "",
  //         isImage: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     problemNum: 4,
  //     type: "essay",
  //     title: "",
  //     text: "",
  //     answer: "이거, 저거, 그거",
  //     point: 10,
  //     problemImgPath: "",
  //     imgIsEmpty: false,
  //     textIsEmpty: false,
  //     items: [],
  //   },
  // ];

  useEffect(() => {
    dispatch(initCurQuestion());
    // dispatch(setQuestions([...dummyQuestions]));
  }, []);

  return (
    <FullScreen>
      <EditorNav setSelectQuestionType={setSelectQuestionType} />
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
