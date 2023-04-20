import {
  StyledEditorNav,
  ArrowDiv,
  EditorNavDivTitle,
  EditorNavDiv,
  EditorNavDivInner,
} from "./NavStyle";
import { AiOutlineArrowLeft, AiFillPicture, AiOutlinePicLeft } from "react-icons/ai";
import {
  MdOutlineFormatListNumbered,
  MdOutlinePowerInput,
  MdOutlineLineStyle,
} from "react-icons/md";

export default function EditorNav() {
  return (
    <StyledEditorNav>
      <ArrowDiv>
        <AiOutlineArrowLeft />
      </ArrowDiv>
      <EditorNavDivTitle isObject={false}>새로 만들기</EditorNavDivTitle>
      <EditorNavDiv>
        <EditorNavDivInner>
          <MdOutlineFormatListNumbered className="icon" />
          객관식
        </EditorNavDivInner>
        <EditorNavDivInner>
          <div className="ox-div">
            <span>O</span>
            <span>X</span>
          </div>
          OX 선택
        </EditorNavDivInner>
        <EditorNavDivInner>
          <MdOutlinePowerInput className="icon" />
          주관식
        </EditorNavDivInner>
        <EditorNavDivInner>
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
