import {
  ClassSummaryIcon,
  ClassSummarySubTitle,
  ClassSummaryText,
  ResultInfoItem,
  SummaryItemWrapper,
  SummaryResultWrapper,
} from "../ClassSummary.style";
import { MdFormatListNumbered, MdOutlineAutoGraph, MdAccessTime } from "react-icons/md";

interface Iprops {
  percentage: number;
  correctNum: number;
  solvingTime: number;
}

export default function ClassMyResult({ percentage, correctNum, solvingTime }: Iprops) {
  return (
    <SummaryItemWrapper>
      <ClassSummarySubTitle>나의 결과</ClassSummarySubTitle>
      <SummaryResultWrapper>
        <ResultInfoItem>
          <div className="wrapper">
            <ClassSummaryIcon>
              <MdFormatListNumbered className="icon" />
            </ClassSummaryIcon>
            <ClassSummaryText>백분율 환산</ClassSummaryText>
          </div>
          <div>
            <ClassSummaryText>{percentage}</ClassSummaryText>
            <ClassSummaryText isGray>점</ClassSummaryText>
          </div>
        </ResultInfoItem>
        <ResultInfoItem>
          <div className="wrapper">
            <ClassSummaryIcon>
              <MdOutlineAutoGraph className="icon" />
            </ClassSummaryIcon>
            <ClassSummaryText>정답 문항수</ClassSummaryText>
          </div>
          <div>
            <ClassSummaryText>{correctNum}</ClassSummaryText>
            <ClassSummaryText isGray>개</ClassSummaryText>
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
            <ClassSummaryText>{solvingTime}</ClassSummaryText>
            <ClassSummaryText isGray>분</ClassSummaryText>
          </div>
        </ResultInfoItem>
      </SummaryResultWrapper>
    </SummaryItemWrapper>
  );
}
