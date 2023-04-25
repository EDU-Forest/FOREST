import {
  ClassSummaryDeadline,
  ClassSummaryWrapper,
  ClassSummaryTextWrapper,
  ClassSummaryItemWrapper,
  ClassSummaryTitle,
  ClassSummaryText,
  ClassSummaryTextItem,
} from "./ClassSummary.style";
import WorkbookStatus from "@/components/Status/WorkbookStatus";
import ClassSummaryWorkbook from "./teacher/ClassSummaryWorkbook";
import ClassSummaryResult from "./ClassSummaryResult";
import ClassSummaryChart from "./ClassSummaryChart";
import { AiOutlineRight } from "react-icons/ai";

export default function ClassSummary() {
  return (
    <ClassSummaryWrapper>
      <ClassSummaryTextWrapper>
        <ClassSummaryTextItem>
          <ClassSummaryTitle>킹규림의 수능 100제</ClassSummaryTitle>
          <WorkbookStatus status="progress" />
        </ClassSummaryTextItem>
        <ClassSummaryText isGray style={{ cursor: "pointer" }}>
          자세히 보기
          <AiOutlineRight className="icon" />
        </ClassSummaryText>
      </ClassSummaryTextWrapper>
      <ClassSummaryDeadline>~ 2023.04.16 16:00</ClassSummaryDeadline>
      <ClassSummaryItemWrapper>
        <ClassSummaryWorkbook />
        <ClassSummaryResult />
        <ClassSummaryChart totalStudent={15} participantStudent={12} takeRate={80} />
      </ClassSummaryItemWrapper>
    </ClassSummaryWrapper>
  );
}
