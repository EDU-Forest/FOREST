import { MdOutlineCheckCircleOutline } from "react-icons/md";
import {
  GuideCheckIcon,
  GuideContentBox,
  GuideHorizonContentWrapper,
  GuideHorizonNoWrap,
  GuideSectionContentWrapper,
} from "./Guide.style";
import { GuideNormalText, GuideSectionTitle, GuideTitle } from "./GuideText.style";

export default function GuideRole() {
  return (
    <GuideContentBox>
      <GuideSectionTitle>역할</GuideSectionTitle>
      <GuideSectionContentWrapper>
        <GuideHorizonNoWrap>
          <img src="/images/Banner_Teacher.png" alt="" className="role-img" />
          <div className="role-text-div">
            <GuideTitle>선생님</GuideTitle>

            <div className="role-text-sub">
              <GuideCheckIcon>
                <MdOutlineCheckCircleOutline />
              </GuideCheckIcon>
              <GuideNormalText>클래스를 만들고 학생을 관리할 수 있습니다.</GuideNormalText>
            </div>
            <div className="role-text-sub">
              <GuideCheckIcon>
                <MdOutlineCheckCircleOutline />
              </GuideCheckIcon>
              <GuideNormalText>직접 문제집을 만들어 출제할 수 있습니다.</GuideNormalText>
            </div>
            <div className="role-text-sub">
              <GuideCheckIcon>
                <MdOutlineCheckCircleOutline />
              </GuideCheckIcon>
              <GuideNormalText>
                PDF 또는 이미지로 문제를 불러와 온라인 문서화할 수 있습니다.
              </GuideNormalText>
            </div>
            <div className="role-text-sub">
              <GuideCheckIcon>
                <MdOutlineCheckCircleOutline />
              </GuideCheckIcon>
              <GuideNormalText>배포된 문제집을 활용하여 시험을 출제할 수 있습니다.</GuideNormalText>
            </div>
            <div className="role-text-sub">
              <GuideCheckIcon>
                <MdOutlineCheckCircleOutline />
              </GuideCheckIcon>
              <GuideNormalText>
                시험 자동 채점 및 클래스 성적 분석 기능을 활용할 수 있습니다.
              </GuideNormalText>
            </div>
          </div>
        </GuideHorizonNoWrap>
        <GuideHorizonNoWrap style={{ marginTop: "120px" }}>
          <div className="role-text-div">
            <GuideTitle>학생</GuideTitle>

            <div className="role-text-sub">
              <GuideCheckIcon>
                <MdOutlineCheckCircleOutline />
              </GuideCheckIcon>
              <GuideNormalText>
                문제집 상태별 최신 스케줄을 한눈에 확인할 수 있습니다.
              </GuideNormalText>
            </div>
            <div className="role-text-sub">
              <GuideCheckIcon>
                <MdOutlineCheckCircleOutline />
              </GuideCheckIcon>
              <GuideNormalText>클래스별로 학업을 분류 및 관리할 수 있습니다. </GuideNormalText>
            </div>
            <div className="role-text-sub">
              <GuideCheckIcon>
                <MdOutlineCheckCircleOutline />
              </GuideCheckIcon>
              <GuideNormalText>
                저장 가능한 캔버스 기능을 이용하여 편리하게 문제를 풀 수 있습니다.
              </GuideNormalText>
            </div>
          </div>
          <img src="/images/Banner_Student.png" alt="" className="role-img" />
        </GuideHorizonNoWrap>
      </GuideSectionContentWrapper>
    </GuideContentBox>
  );
}
