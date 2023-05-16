import {
  GuideContentBox,
  GuideHorizonContentWrapper,
  GuideHorizonNoWrap,
  GuideSectionContentWrapper,
} from "./Guide.style";
import {
  GuideEditorSubTitle,
  GuideGrayText,
  GuideGreenText,
  GuideNormalText,
  GuideSectionTitle,
  GuideTitle,
} from "./GuideText.style";

export default function GuideEditor() {
  return (
    <GuideContentBox>
      <GuideSectionTitle>에디터</GuideSectionTitle>
      <GuideSectionContentWrapper>
        <div>
          <GuideTitle>문제 만들기</GuideTitle>
          <GuideNormalText>
            문제집에 새로운 문항을 만들 수 있습니다. 여러 문제 유형을 고르고 이미지와 지문을
            삽입하거나 배점을 지정하는 등 문항들을 커스텀할 수 있습니다.
          </GuideNormalText>
        </div>
        <GuideHorizonNoWrap>
          <img src="/guide/editor_new.png" alt="" className="editor-new" />
          <div style={{ width: "calc(80% - 48px)" }}>
            <GuideEditorSubTitle>새로 만들기</GuideEditorSubTitle>
            <GuideGrayText>다음 네 가지 유형의 문항을 추가할 수 있습니다. </GuideGrayText>
          </div>
        </GuideHorizonNoWrap>
        <GuideHorizonContentWrapper wrapReverse>
          <div className="editor-text-div">
            <div>
              <GuideGreenText>객관식</GuideGreenText>
              <GuideGrayText>
                객관식의 보기를 추가하거나 삭제할 수 있으며, 각 보기의 토글 버튼으로 텍스트와
                이미지를 선택하여 편집할 수 있습니다.
              </GuideGrayText>
            </div>
            <div>
              <GuideGreenText>O/X 선택</GuideGreenText>
              <GuideGrayText>O와 X 두 보기 중 하나를 답으로 지정할 수 있습니다.</GuideGrayText>
            </div>
          </div>
          <img src="/guide/editor_make1.png" alt="" className="editor_make" />
        </GuideHorizonContentWrapper>
        <GuideHorizonContentWrapper>
          <img src="/guide/editor_make2.png" alt="" className="editor_make" />
          <div className="editor-text-div">
            <div>
              <GuideGreenText>단답식</GuideGreenText>
              <GuideGrayText>한 개의 단답을 지정할 수 있습니다.</GuideGrayText>
            </div>
            <div>
              <GuideGreenText>서술형</GuideGreenText>
              <GuideGrayText>
                여러 개의 채점 핵심 단어를 지정할 수 있습니다. 학생이 입력한 답에서 핵심 단어의 포함
                여부를 따져 정답과의 유사도가 계산됩니다.
              </GuideGrayText>
            </div>
          </div>
        </GuideHorizonContentWrapper>
        <GuideHorizonNoWrap>
          <img src="/guide/editor_file.png" alt="" className="editor-new" />
          <div style={{ width: "calc(80% - 48px)" }}>
            <GuideEditorSubTitle>문제 가져오기</GuideEditorSubTitle>
            <GuideGrayText>
              PDF나 이미지 형태의 시험 문제를 업로드하면 텍스트로 변환되어 새 문항으로 삽입됩니다.
            </GuideGrayText>
            <GuideGrayText>
              전체 영역은 파일을 선택하여 업로드하는 방식이며, 일부 영역은 선택한 파일에서 원하는
              문항을 크롭하는 방식입니다.
            </GuideGrayText>
          </div>
        </GuideHorizonNoWrap>
        <GuideHorizonNoWrap>
          <div className="editor-object">
            <GuideEditorSubTitle>오브젝트</GuideEditorSubTitle>
            <GuideGrayText>문항에 이미지와 지문을 삽입할 수 있습니다</GuideGrayText>
          </div>
          <img src="/guide/editor_object.png" alt="" style={{ width: "40%" }} />
        </GuideHorizonNoWrap>
      </GuideSectionContentWrapper>
    </GuideContentBox>
  );
}
