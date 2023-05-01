import { useRouter } from "next/router";
import { AiFillPicture, AiOutlinePicLeft } from "react-icons/ai";
import {
  MdOutlineFormatListNumbered,
  MdOutlineLineStyle,
  MdOutlinePowerInput,
} from "react-icons/md";
import ArrowLeft from "../Arrow/ArrowLeft";
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

  const goToDashboard = () => {
    router.push("/teacher/dashboard");
  };

  const handleClickQuestionType = (type: string) => {
    setSelectQuestionType(type);
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
        <EditorNavDivInner>
          <AiFillPicture className="object" />
          이미지
        </EditorNavDivInner>
        <EditorNavDivInner>
          <AiOutlinePicLeft className="object" />
          지문
        </EditorNavDivInner>
      </EditorNavDiv>
    </StyledEditorNav>
  );
}
