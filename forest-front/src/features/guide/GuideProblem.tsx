import {
  GuideContentBox,
  GuideHorizonContentWrapper,
  GuideSectionContentWrapper,
  GuideSubContentWrapper,
} from "./Guide.style";
import {
  GuideGrayText,
  GuideGreenText,
  GuideNormalText,
  GuideSectionTitle,
  GuideTitle,
} from "./GuideText.style";

export default function GuideProblem() {
  return (
    <GuideContentBox>
      <GuideSectionTitle>문제</GuideSectionTitle>
      <div style={{ textAlign: "center", marginTop: "36px" }}>
        <img src="/guide/problem.png" alt="" style={{ width: "90%" }} />
      </div>
      <GuideSectionContentWrapper>
        <div className="marginBtm-div">
          <GuideTitle>문항 수정</GuideTitle>
          <GuideNormalText>
            문제집에 속한 각 문항들의 순서를 드래그 앤 드롭으로 변경하거나, 삭제할 수 있습니다.
          </GuideNormalText>
        </div>
        <div className="marginBtm-div">
          <GuideTitle>사본</GuideTitle>
          <GuideNormalText>
            다른 선생님이 만든 문제집을 복사하여 사용할 수 있습니다.
          </GuideNormalText>
        </div>
        <GuideHorizonContentWrapper wrapReverse>
          <div className="problem-text-div">
            <div>
              <GuideTitle>내보내기</GuideTitle>
              <GuideNormalText>문제집을 PDF 다운로드, 출제, 배포할 수 있습니다.</GuideNormalText>
            </div>
            <div>
              <GuideGreenText>PDF</GuideGreenText>
              <GuideGrayText>
                문제집을 PDF로 다운받을 수 있습니다. 다운로드 받은 PDF 파일을 소장할 수 있고,
                프린트할 수 있어 용이합니다.
              </GuideGrayText>
            </div>
            <div>
              <GuideGreenText>출제</GuideGreenText>
              <GuideGrayText>내 클래스에 문제집을 출제할 수 있습니다.</GuideGrayText>
              <GuideGrayText>
                시험, 과제, 자습 중에서 원하시는 유형을 골라 유형에 따라 시작 시간과 종료 시간을
                설정할 수 있습니다.
              </GuideGrayText>
            </div>
            <div>
              <GuideGreenText>배포</GuideGreenText>
              <GuideGrayText>내가 만든 문제집을 다른 선생님들과 공유할 수 있습니다.</GuideGrayText>
              <GuideGrayText>
                자료 내용을 참고하여 더 좋은 자료를 만들 수도 있고, 내 문제집이 다른 클래스에
                출제되어 유의미하게 쓰일 수 있습니다.
              </GuideGrayText>
            </div>
          </div>
          <div className="problem-img-div">
            <img src="/guide/problem_sub1.png" alt="" className="problem-sub1" />
            <img src="/guide/problem_sub2.png" alt="" className="problem-sub2" />
          </div>
        </GuideHorizonContentWrapper>
      </GuideSectionContentWrapper>
    </GuideContentBox>
  );
}
