import {
  SummaryItemWrapper,
  ClassSummarySubTitle,
  WorkbookInfo,
  ClassSummaryTextWrapper,
  ClassSummaryText,
} from "../ClassSummary.style";
export default function ClassSummaryWorkbook() {
  return (
    <SummaryItemWrapper>
      <ClassSummarySubTitle>문제집 정보</ClassSummarySubTitle>
      <WorkbookInfo>
        <ClassSummaryTextWrapper>
          <ClassSummaryText isGray>출판</ClassSummaryText>
          2022.12.15
        </ClassSummaryTextWrapper>
        <ClassSummaryTextWrapper>
          <ClassSummaryText isGray>제작일</ClassSummaryText>
          2022.12.15
        </ClassSummaryTextWrapper>
        <ClassSummaryTextWrapper>
          <ClassSummaryText isGray>문항 수</ClassSummaryText>
          15문항
        </ClassSummaryTextWrapper>
        <ClassSummaryTextWrapper>
          <ClassSummaryText isGray>공개여부</ClassSummaryText>
          비공개
        </ClassSummaryTextWrapper>
      </WorkbookInfo>
    </SummaryItemWrapper>
  );
}
