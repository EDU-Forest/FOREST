import { Title } from "@/styles/text";
import {
  ClassSummaryDeadline,
  ClassSummaryWrapper,
  SummarySubWrapper,
  SummaryItemWrapper,
  ClassSummarySubTitle,
  WorkbookInfo,
  ResultInfoItem,
  ClassSummaryTitle,
} from "./teacher/ClassSummary.style";
import WorkbookStatus from "@/components/Status/WorkbookStatus";
import ClassSummaryWorkbook from "./teacher/ClassSummaryWorkbook";
import ClassSummaryResult from "./ClassSummaryResult";
import ClassSummaryChart from "./ClassSummaryChart";

export default function ClassSummary() {
  return (
    <ClassSummaryWrapper>
      <ClassSummaryTitle>킹규림의 수능 100제</ClassSummaryTitle>
      <WorkbookStatus status="progress" />
      <ClassSummaryDeadline>~ 2023.04.16 16:00</ClassSummaryDeadline>
      <SummarySubWrapper>
        <ClassSummaryWorkbook />
        <ClassSummaryResult />
        <ClassSummaryChart />
      </SummarySubWrapper>
    </ClassSummaryWrapper>
  );
}
