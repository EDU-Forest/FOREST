import {
  ClassSummaryIcon,
  ClassSummarySubTitle,
  ClassSummaryText,
  ResultInfoItem,
  SummaryItemWrapper,
  SummaryResultWrapper,
} from "../ClassSummary.style";
import { MdFormatListNumbered, MdOutlineAutoGraph, MdAccessTime } from "react-icons/md";

export default function ClassSummaryMyResult() {
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
            <ClassSummaryText>80</ClassSummaryText>
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
            <ClassSummaryText>8</ClassSummaryText>
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
