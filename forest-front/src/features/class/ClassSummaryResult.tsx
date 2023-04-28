import {
  ClassSummaryIcon,
  ClassSummarySubTitle,
  ClassSummaryText,
  ResultInfoItem,
  SummaryItemWrapper,
  SummaryResultWrapper,
} from "./ClassSummary.style";
import { MdFormatListNumbered, MdOutlineAutoGraph, MdAccessTime } from "react-icons/md";

interface Iprops {
  noMargin?: boolean;
  average: number;
  standardDeviation: number;
  averageSolvingTime: number;
}

export default function ClassSummaryResult({
  noMargin,
  average,
  standardDeviation,
  averageSolvingTime,
}: Iprops) {
  return (
    <SummaryItemWrapper>
      <ClassSummarySubTitle noMargin={noMargin}>전체 결과</ClassSummarySubTitle>
      <SummaryResultWrapper>
        <ResultInfoItem>
          <div className="wrapper">
            <ClassSummaryIcon>
              <MdFormatListNumbered className="icon" />
            </ClassSummaryIcon>
            <ClassSummaryText>평균 점수</ClassSummaryText>
          </div>
          <div>
            <ClassSummaryText>{average}</ClassSummaryText>
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
            <ClassSummaryText>{standardDeviation}</ClassSummaryText>
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
            <ClassSummaryText>{averageSolvingTime}</ClassSummaryText>
            <ClassSummaryText isGray>분</ClassSummaryText>
          </div>
        </ResultInfoItem>
      </SummaryResultWrapper>
    </SummaryItemWrapper>
  );
}
