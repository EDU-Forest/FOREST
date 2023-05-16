import {
  GuideContentBox,
  GuideHorizonContentWrapper,
  GuideSectionContentWrapper,
} from "./Guide.style";
import {
  GuideGrayText,
  GuideGreenText,
  GuideNormalText,
  GuideSectionTitle,
  GuideTitle,
} from "./GuideText.style";

export default function GuideDashboard() {
  return (
    <GuideContentBox>
      <GuideSectionTitle>대시보드</GuideSectionTitle>
      <GuideSectionContentWrapper>
        <GuideHorizonContentWrapper>
          <div className="halt-img-div">
            <img src="/guide/dash_schedule.png" alt="" />
          </div>
          <div className="half-text-div">
            <GuideTitle>일정 관리</GuideTitle>
            <GuideNormalText>
              포함된 모든 클래스의 최근 3일 간의 일정을 모아볼 수 있습니다.
            </GuideNormalText>
          </div>
        </GuideHorizonContentWrapper>
        <GuideHorizonContentWrapper>
          <div className="half-text-div">
            <GuideTitle>선생님</GuideTitle>
            <GuideGreenText>메모</GuideGreenText>
            <GuideGrayText>메모 기능을 통한 간단한 리마인드가 가능합니다. </GuideGrayText>
            <GuideGrayText>
              선생님이 더 효율적으로 클래스와 문제를 관리하도록 도와줍니다.
            </GuideGrayText>
          </div>
          <div className="halt-img-div">
            <img src="/guide/dash_memo.png" alt="" />
          </div>
        </GuideHorizonContentWrapper>
        <GuideHorizonContentWrapper>
          <div className="halt-img-div">
            <img src="/guide/dash_class.png" alt="" />
          </div>
          <div className="half-text-div">
            <GuideTitle>학생</GuideTitle>
            <GuideGreenText>클래스 바로가기</GuideGreenText>
            <GuideGrayText>학생이 속해 있는 클래스에 바로가기 기능을 제공합니다. </GuideGrayText>
          </div>
        </GuideHorizonContentWrapper>
      </GuideSectionContentWrapper>
    </GuideContentBox>
  );
}
