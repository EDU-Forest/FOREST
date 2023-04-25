import {
  ClassSummaryIcon,
  ClassSummarySubTitle,
  ResultInfoItem,
  SummaryItemWrapper,
} from "./teacher/ClassSummary.style";
import { MdFormatListNumbered, MdOutlineAutoGraph, MdAccessTime } from "react-icons/md";

export default function ClassSummaryResult() {
  return (
    <SummaryItemWrapper>
      <ClassSummarySubTitle>요약</ClassSummarySubTitle>
      <ResultInfoItem>
        <ClassSummaryIcon>
          <MdFormatListNumbered className="icon" />
        </ClassSummaryIcon>
      </ResultInfoItem>
      <ResultInfoItem>
        <ClassSummaryIcon>
          <MdOutlineAutoGraph className="icon" />
        </ClassSummaryIcon>
      </ResultInfoItem>
      <ResultInfoItem>
        <ClassSummaryIcon>
          <MdAccessTime className="icon" />
        </ClassSummaryIcon>
      </ResultInfoItem>
    </SummaryItemWrapper>
  );
}
