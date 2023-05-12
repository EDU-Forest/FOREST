import useEditor from "@/hooks/editor/useEditor";
import { openPartPdfModal, openWholePdfModal } from "@/stores/editor/editorModal";
import { setCurQuestion, setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillPicture, AiOutlinePicLeft } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import {
  MdOutlineFormatListNumbered,
  MdOutlineLineStyle,
  MdOutlinePowerInput,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ArrowLeft from "../Arrow/ArrowLeft";
import Toast from "../Toast/Toast";
import {
  ArrowDiv,
  EditorNavDiv,
  EditorNavDivInner,
  EditorNavDivTitle,
  StyledEditorNav,
} from "./Nav.style";

interface IProps {
  setSelectQuestionType: React.Dispatch<React.SetStateAction<string>>;
}

export default function EditorNav({ setSelectQuestionType }: IProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { questions } = useSelector((state: RootState) => state.editorQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editorQuestions);
  const { toChangeQuestions } = useEditor();
  const { isPointValidConfirm } = useSelector((state: RootState) => state.editorQuestions);
  const { isTitleValidConfirm } = useSelector((state: RootState) => state.editorQuestions);
  const { isAnswerValidConfirm } = useSelector((state: RootState) => state.editorQuestions);
  const [isAddFail, setIsAddFail] = useState(false);

  const goToDashboard = () => {
    router.push("/teacher/dashboard");
  };

  const questionInit = {
    withItems: {
      problemId: 0,
      problemNum: 0,
      type: "MULTIPLE",
      title: "",
      text: "",
      answer: "",
      point: 0,
      problemImgPath: "",
      imgIsEmpty: true,
      textIsEmpty: true,
      itemList: [
        {
          itemId: 0,
          no: 1,
          content: "",
          isImage: false,
        },
        {
          itemId: 0,
          no: 2,
          content: "",
          isImage: false,
        },
        {
          itemId: 0,
          no: 3,
          content: "",
          isImage: false,
        },
        {
          itemId: 0,
          no: 4,
          content: "",
          isImage: false,
        },
      ],
    },
    withoutItems: {
      problemId: 0,
      problemNum: 0,
      type: "",
      title: "",
      text: "",
      answer: "",
      point: 0,
      problemImgPath: "",
      imgIsEmpty: true,
      textIsEmpty: true,
      itemList: [],
    },
  };

  const handleClickQuestionType = (type: string) => {
    questions.length !== 0 &&
      setIsAddFail(!isPointValidConfirm || !isTitleValidConfirm || !isAnswerValidConfirm);

    if (
      questions.length === 0 ||
      (isPointValidConfirm && isTitleValidConfirm && isAnswerValidConfirm)
    ) {
      type === "MULTIPLE"
        ? dispatch(setQuestions([...questions, { ...questionInit.withItems }]))
        : dispatch(setQuestions([...questions, { ...questionInit.withoutItems, type: type }]));
      dispatch(setCurQuestion(questions.length + 1));
    }
  };

  const handleClickObjectType = (type: string) => {
    if (type === "text") {
      const copyArr = [...questions];
      copyArr.splice(curQuestion - 1, 1, { ...questions[curQuestion - 1], textIsEmpty: false });
      dispatch(setQuestions([...copyArr]));
    } else if (type === "image") {
      toChangeQuestions("imgIsEmpty", false);
    }
  };

  const handleClickImport = (type: string) => {
    questions.length !== 0 &&
      setIsAddFail(!isPointValidConfirm || !isTitleValidConfirm || !isAnswerValidConfirm);

    if (
      questions.length === 0 ||
      (isPointValidConfirm && isTitleValidConfirm && isAnswerValidConfirm)
    ) {
      if (type === "whole") {
        dispatch(openWholePdfModal());
      } else if (type === "part") {
        dispatch(openPartPdfModal());
      }
    }
  };

  // MULTIPLE, SUBJECTIVE(주관식, 단답식), DESCRIPT(서술형), OX
  return (
    <>
      <StyledEditorNav>
        <ArrowDiv>
          <ArrowLeft onClick={goToDashboard} />
        </ArrowDiv>
        <EditorNavDivTitle isObject={false}>새로 만들기</EditorNavDivTitle>
        <EditorNavDiv>
          <EditorNavDivInner onClick={() => handleClickQuestionType("MULTIPLE")}>
            <MdOutlineFormatListNumbered className="icon" />
            <span>객관식</span>
          </EditorNavDivInner>
          <EditorNavDivInner onClick={() => handleClickQuestionType("OX")}>
            <div className="ox-div">
              <span>O</span>
              <span>X</span>
            </div>
            OX 선택
          </EditorNavDivInner>
          <EditorNavDivInner onClick={() => handleClickQuestionType("SUBJECTIVE")}>
            <MdOutlinePowerInput className="icon" />
            단답식
          </EditorNavDivInner>
          <EditorNavDivInner onClick={() => handleClickQuestionType("DESCRIPT")}>
            <MdOutlineLineStyle className="icon" />
            서술형
          </EditorNavDivInner>
        </EditorNavDiv>
        <EditorNavDivTitle isObject={false}>문제 가져오기</EditorNavDivTitle>
        <EditorNavDiv className="upload-problem">
          <p onClick={() => handleClickImport("whole")}>전체 영역</p>
          <p onClick={() => handleClickImport("part")}>일부 영역</p>
        </EditorNavDiv>
        <EditorNavDivTitle isObject>오브젝트</EditorNavDivTitle>
        <EditorNavDiv>
          <EditorNavDivInner onClick={() => handleClickObjectType("image")}>
            <AiFillPicture className="object" />
            이미지
          </EditorNavDivInner>
          <EditorNavDivInner onClick={() => handleClickObjectType("text")}>
            <AiOutlinePicLeft className="object" />
            지문
          </EditorNavDivInner>
        </EditorNavDiv>
      </StyledEditorNav>
      {isAddFail && (
        <Toast
          icon={<IoIosWarning />}
          subtitle="추가 불가"
          title="문항 수정을 완료해주세요"
          isOpen={isAddFail}
          setIsOpen={setIsAddFail}
        />
      )}
    </>
  );
}
