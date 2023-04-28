import { changeStudyType } from "@/utils/changeStudyType";
import {
  SummaryItemWrapper,
  ClassSummarySubTitle,
  WorkbookInfo,
  ClassSummaryTextWrapper,
  ClassSummaryText,
} from "./ClassSummary.style";

interface Iprops {
  noMargin?: boolean;
  studyCreatedDate: string;
  studyType: string;
  volume: number;
  isPublic: boolean;
}

// 문제집 정보 - 클래스(T), 분석
export default function ClassWorkbookInfo({
  noMargin,
  studyCreatedDate,
  studyType,
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
          <ClassSummaryText isGray>출제일</ClassSummaryText>
          {studyCreatedDate}
        </ClassSummaryTextWrapper>
        <ClassSummaryTextWrapper>
          <ClassSummaryText isGray>속성</ClassSummaryText>
          {changeStudyType(studyType)}
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
