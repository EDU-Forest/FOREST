import {
  ClassSummaryIcon,
  ClassSummarySubTitle,
  ClassSummaryText,
  ResultInfoItem,
  SummaryItemWrapper,
  SummaryResultWrapper,
} from "./ClassSummary.style";
import { MdFormatListNumbered, MdOutlineAutoGraph, MdAccessTime } from "react-icons/md";

export default function ClassSummaryResult() {
  return (
    <SummaryItemWrapper>
      <ClassSummarySubTitle>지표</ClassSummarySubTitle>
      <SummaryResultWrapper>
        <ResultInfoItem>
          <div className="wrapper">
            <ClassSummaryIcon>
              <MdFormatListNumbered className="icon" />
            </ClassSummaryIcon>
            <ClassSummaryText>평균 점수</ClassSummaryText>
          </div>
          <div>
            <ClassSummaryText>87.5</ClassSummaryText>
            <ClassSummaryText isGray>점</ClassSummaryText>
          </div>
        </ResultInfoItem>
        <ResultInfoItem>
          <div className="wrapper">
            <ClassSummaryIcon>
              <MdOutlineAutoGraph className="icon" />
            </ClassSummaryIcon>
            <ClassSummaryText>표준 편차</ClassSummaryText>
          </div>
          <div>
            <ClassSummaryText>7.5</ClassSummaryText>
            <ClassSummaryText isGray>점</ClassSummaryText>
          </div>
        </ResultInfoItem>
        <ResultInfoItem>
          <div className="wrapper">
            <ClassSummaryIcon>
              <MdAccessTime className="icon" />
            </ClassSummaryIcon>
            <ClassSummaryText>풀이 시간</ClassSummaryText>
          </div>
          <div>
            <ClassSummaryText>23</ClassSummaryText>
            <ClassSummaryText isGray>분</ClassSummaryText>
            <ClassSummaryText>23</ClassSummaryText>
            <ClassSummaryText isGray>초</ClassSummaryText>
          </div>
        </ResultInfoItem>
      </SummaryResultWrapper>
    </SummaryItemWrapper>
  );
}
