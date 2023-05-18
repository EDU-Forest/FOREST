import {
  GuideContentBox,
  GuideHorizonContentWrapper,
  GuideSectionContentWrapper,
  GuideSubContentWrapper,
} from "./Guide.style";
import {
  GuideEditorSubTitle,
  GuideGrayText,
  GuideGreenText,
  GuideNormalText,
  GuideSectionTitle,
  GuideTitle,
} from "./GuideText.style";

export default function GuideClass() {
  return (
    <GuideContentBox>
      <GuideSectionTitle>클래스</GuideSectionTitle>
      <GuideSectionContentWrapper>
        <GuideSubContentWrapper mb>
          <GuideTitle>클래스 관리</GuideTitle>
          <GuideNormalText>
            각각의 클래스 별로 학생을 나누어 관리할 수 있으며, 제출한 문제와 그 결과를 확인할 수
            있습니다.
          </GuideNormalText>
          <GuideNormalText>
            학생의 경우, 속해 있는 클래스의 시험 일정과 결과를 확인할 수 있습니다.
          </GuideNormalText>
        </GuideSubContentWrapper>
        <GuideHorizonContentWrapper wrapReverse style={{ marginBottom: "80px" }}>
          <div className="class-text-div">
            <div>
              <GuideGreenText>클래스 추가</GuideGreenText>
              <GuideGrayText>
                새로운 클래스를 만들어 학생과 문제를 관리할 수 있습니다.
              </GuideGrayText>
            </div>

            <div>
              <GuideGreenText>학생 관리</GuideGreenText>
              <GuideGrayText>클래스에 학생을 추가, 삭제할 수 있습니다. </GuideGrayText>
            </div>
          </div>
          <div className="problem-img-div">
            <img src="/guide/class_make.png" alt="" className="class-make-img" />
          </div>
        </GuideHorizonContentWrapper>
        <GuideSubContentWrapper mb>
          <GuideTitle>시험 관리</GuideTitle>
          <GuideNormalText>
            클래스에 출제한 문제를 시험, 과제, 자습 탭에 따라 구분하여 관리할 수 있습니다.
          </GuideNormalText>
        </GuideSubContentWrapper>
        <GuideHorizonContentWrapper wrapReverse style={{ marginBottom: "64px" }}>
          <div className="class-text-result">
            <GuideGreenText>시험 요약 결과</GuideGreenText>
            <GuideGrayText style={{ marginBottom: "16px" }}>
              문제를 누르면 해당 문제의 클래스 풀이 결과를 볼 수 있습니다.
            </GuideGrayText>
            <GuideGrayText>자세히 보기를 누르면 상세 분석 결과 확인이 가능합니다.</GuideGrayText>
          </div>

          <img src="/guide/class_result.png" alt="" className="class-result-img" />
        </GuideHorizonContentWrapper>
        <GuideEditorSubTitle>결과 상세 분석</GuideEditorSubTitle>
        <GuideGrayText style={{ marginBottom: "36px" }}>
          시험 정보, 전체 성적 분석, 문항별 정답률, 응시자별 성취도, 서술형 채점 기능을 제공합니다.
        </GuideGrayText>
        <img src="/guide/class_summary1.png" alt="" className="class-summary1" />
        <div className="class-summary-img-div">
          <img src="/guide/class_summary2.png" alt="" className="class-summary-half" />
          <img src="/guide/class_summary3.png" alt="" className="class-summary-half" />
        </div>
      </GuideSectionContentWrapper>
    </GuideContentBox>
  );
}
