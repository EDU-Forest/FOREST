import {
  SummaryItemWrapper,
  ClassSummarySubTitle,
  WorkbookInfo,
  ClassSummaryTextWrapper,
  ClassSummaryText,
} from "./ClassSummary.style";

interface Iprops {
  noMargin?: boolean;
  workbookCreatedDate: string;
  studyCreatedDate: string;
  volume: number;
  isPublic: boolean;
}

// 문제집 정보 - 클래스(T), 분석
export default function ClassWorkbookInfo({
  noMargin,
  workbookCreatedDate,
  studyCreatedDate,
  volume,
  isPublic,
}: Iprops) {
  const disclosure = () => {
    if (isPublic) {
      return "공개";
    } else {
      return "비공개";
    }
  };
  return (
    <SummaryItemWrapper>
      <ClassSummarySubTitle noMargin={noMargin}>문제집 정보</ClassSummarySubTitle>
      <WorkbookInfo>
        <ClassSummaryTextWrapper>
          <ClassSummaryText isGray>출판</ClassSummaryText>
          {workbookCreatedDate}
        </ClassSummaryTextWrapper>
        <ClassSummaryTextWrapper>
          <ClassSummaryText isGray>제작일</ClassSummaryText>
          {studyCreatedDate}
        </ClassSummaryTextWrapper>
        <ClassSummaryTextWrapper>
          <ClassSummaryText isGray>문항 수</ClassSummaryText>
          {volume}
        </ClassSummaryTextWrapper>
        <ClassSummaryTextWrapper>
          <ClassSummaryText isGray>공개여부</ClassSummaryText>
          {disclosure()}
        </ClassSummaryTextWrapper>
      </WorkbookInfo>
    </SummaryItemWrapper>
  );
}
