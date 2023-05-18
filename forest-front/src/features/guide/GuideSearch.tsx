import { GuideContentBox, GuideSearchContentWrapper } from "./Guide.style";
import {
  GuideGrayText,
  GuideGreenText,
  GuideNormalText,
  GuideSectionTitle,
  GuideTitle,
} from "./GuideText.style";

export default function GuideSearch() {
  return (
    <GuideContentBox>
      <GuideSectionTitle>탐색</GuideSectionTitle>
      <GuideSearchContentWrapper>
        <img src="/guide/search.png" alt="" />
        <div>
          <GuideTitle>문제집 탐색</GuideTitle>
          <GuideNormalText>다른 선생님이 배포한 문제집을 찾을 수 있습니다. </GuideNormalText>
          <div className="search-sub-div">
            <GuideGreenText>검색</GuideGreenText>
            <GuideGrayText>
              찾으려는 문제집 제목을 검색하여 더욱 빠른 탐색이 가능합니다.
            </GuideGrayText>
          </div>
          <div className="search-sub-div">
            <GuideGreenText>북마크</GuideGreenText>
            <GuideGrayText>
              북마크를 이용하여 마음에 드는 문제집을 보관할 수 있습니다. 북마크한 문제집은 문제
              탭에서 확인 가능합니다.
            </GuideGrayText>
          </div>
          <div className="search-sub-div">
            <GuideGreenText>스크랩</GuideGreenText>
            <GuideGrayText>해당 문제집을 사용한 선생님의 수를 보여줍니다.</GuideGrayText>
          </div>
        </div>
      </GuideSearchContentWrapper>
    </GuideContentBox>
  );
}
