import { setCurQuestion, setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { useRouter } from "next/router";
import { AiFillPicture, AiOutlinePicLeft } from "react-icons/ai";
import {
  MdOutlineFormatListNumbered,
  MdOutlineLineStyle,
  MdOutlinePowerInput,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ArrowLeft from "../Arrow/ArrowLeft";
import {
  ArrowDiv,
  EditorNavDiv,
  EditorNavDivInner,
  EditorNavDivTitle,
  StyledEditorNav,
} from "./Nav.style";
import useEditor from "@/hooks/editor/useEditor";

interface IProps {
  setSelectQuestionType: React.Dispatch<React.SetStateAction<string>>;
}

export default function EditorNav({ setSelectQuestionType }: IProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { questions } = useSelector((state: RootState) => state.editQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editQuestions);
  const [toChangeQuestions] = useEditor();

  const goToDashboard = () => {
    router.push("/teacher/dashboard");
  };

  const questionInit = {
    withItems: {
      id: 0,
      problemNum: 0,
      type: "multipleChoice",
      title: "",
      text: "",
      point: 0,
      image: "",
      items: [
        {
          id: 0,
          no: 1,
          content: "",
          isImage: false,
        },
        {
          id: 0,
          no: 2,
          content: "",
          isImage: false,
        },
        {
          id: 0,
          no: 3,
          content: "",
          isImage: false,
        },
        {
          id: 0,
          no: 4,
          content: "",
          isImage: false,
        },
      ],
    },
    withoutItems: {
      id: 0,
      problemNum: 0,
      type: "",
      title: "",
      text: "",
      point: 0,
      image: "",
      items: [],
    },
  };

  const handleClickQuestionType = (type: string) => {
    type === "multipleChoice"
      ? dispatch(setQuestions([...questions, { ...questionInit.withItems }]))
      : dispatch(setQuestions([...questions, { ...questionInit.withoutItems, type: type }]));
    dispatch(setCurQuestion(questions.length + 1));
  };

  const handleClickObjectType = (type: string) => {
    if (type === "text") {
      const copyArr = [...questions];
      copyArr.splice(curQuestion - 1, 1, { ...questions[curQuestion - 1], textIsEmpty: true });
      dispatch(setQuestions([...copyArr]));
    } else if (type === "image") {
      toChangeQuestions('imgIsEmpty', true);
    }
  };

  return (
    <StyledEditorNav>
      <ArrowDiv>
        <ArrowLeft onClick={goToDashboard} />
      </ArrowDiv>
      <EditorNavDivTitle isObject={false}>새로 만들기</EditorNavDivTitle>
      <EditorNavDiv>
        <EditorNavDivInner onClick={() => handleClickQuestionType("multipleChoice")}>
          <MdOutlineFormatListNumbered className="icon" />
          객관식
        </EditorNavDivInner>
        <EditorNavDivInner onClick={() => handleClickQuestionType("oxChoice")}>
          <div className="ox-div">
            <span>O</span>
            <span>X</span>
          </div>
          OX 선택
        </EditorNavDivInner>
        <EditorNavDivInner onClick={() => handleClickQuestionType("shortAnswer")}>
          <MdOutlinePowerInput className="icon" />
          단답식
        </EditorNavDivInner>
        <EditorNavDivInner onClick={() => handleClickQuestionType("essay")}>
          <MdOutlineLineStyle className="icon" />
          서술형
        </EditorNavDivInner>
      </EditorNavDiv>
      <EditorNavDivTitle isObject={false}>문제 가져오기</EditorNavDivTitle>
      <EditorNavDiv>
        <p>전체 영역</p>
        <p>일부 영역</p>
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
  );
}
