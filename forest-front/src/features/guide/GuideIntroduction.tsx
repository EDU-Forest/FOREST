import Image from "next/image";
import {
  GuideContentBox,
  GuideSectionContentWrapper,
  GuideSubContentWrapper,
  LogoImg,
} from "./Guide.style";
import {
  GuideGrayText,
  GuideGreenText,
  GuideNormalText,
  GuideSectionTitle,
  GuideTitle,
} from "./GuideText.style";

export default function GuideIntroduction() {
  return (
    <GuideContentBox>
      <GuideSectionTitle>포레스트 소개</GuideSectionTitle>
      <LogoImg>
        <Image src="/images/Forest_Logo.png" layout="fill" alt="" />
      </LogoImg>
      <GuideSectionContentWrapper noMarginTop>
        <div style={{ marginBottom: "64px" }}>
          <GuideTitle>포레스트란?</GuideTitle>
          <GuideNormalText>
            For Edu & Study 에서 나온 FOREST는 모든 선생님과 학생을 위한 온라인 학습지 플랫폼입니다.{" "}
          </GuideNormalText>
        </div>
        <GuideTitle>포레스트의 특징</GuideTitle>
        <GuideSubContentWrapper>
          <GuideGreenText>종이 문제집의 디지털화</GuideGreenText>

          <GuideGrayText>에디터를 이용하여 쉽고 간단하게 문제를 생성할 수 있습니다.</GuideGrayText>
          <GuideGrayText>PDF, 이미지 형태의 외부 문제도 간편하게 등록할 수 있습니다.</GuideGrayText>
        </GuideSubContentWrapper>
        <GuideSubContentWrapper>
          <GuideGreenText>손쉬운 클래스 관리</GuideGreenText>
          <GuideGrayText>
            클래스에 학생을 등록하여 시험을 출제하고 성적을 관리할 수 있습니다.
          </GuideGrayText>
        </GuideSubContentWrapper>
        <GuideSubContentWrapper>
          <GuideGreenText>문제 풀이</GuideGreenText>
          <GuideGrayText>클래스에 출제된 문제를 풀 수 있습니다.</GuideGrayText>
          <GuideGrayText>
            캔버스를 통해 풀이를 작성할 수 있으며, 저장된 풀이를 확인할 수 있습니다.
          </GuideGrayText>
        </GuideSubContentWrapper>
        <GuideSubContentWrapper>
          <GuideGreenText>자동 채점</GuideGreenText>
          <GuideGrayText>
            제출된 풀이 결과는 자동 채점되며, 클래스의 성적 통계를 제공합니다.
          </GuideGrayText>
          <GuideGrayText>
            서술형의 경우, 유사도와 핵심 키워드 개수를 제공하여 선생님의 채점을 돕습니다.
          </GuideGrayText>
        </GuideSubContentWrapper>
      </GuideSectionContentWrapper>
    </GuideContentBox>
  );
}
