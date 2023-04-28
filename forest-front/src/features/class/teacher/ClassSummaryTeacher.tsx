import { useRouter } from "next/router";
import {
  ClassSummaryDeadline,
  ClassSummaryItemWrapper,
  ClassSummaryText,
  ClassSummaryTextItem,
  ClassSummaryTextWrapper,
  ClassSummaryTitle,
  ClassSummaryWrapper,
} from "../ClassSummary.style";
import WorkbookStatus from "@/components/Status/WorkbookStatus";
import { AiOutlineRight } from "react-icons/ai";
import ClassWorkbookInfo from "../ClassWorkbookInfo";
import TotalResult from "../TotalResult";
import TakeRateChart from "../TakeRateChart";

const examResult: TeacherExamResult = {
  studyId: 1,
  title: "킹규림의 수능 100제",
  startTime: "2023-04-27",
  endTime: "2023-04-28",
  userName: "킹규림",
  studyType: "SELF",
  scheduleType: "ONGOING",
  studyCreatedDate: "2023.04.27", // 출제일
  workbookCreatedDate: "2023.04.27", // 출판일
  volume: 10, // 문항 수
  isPublic: false,
  average: 80,
  standardDeviation: 8.5, //표준편차
  averageSolvingTime: 25,
  totalStudent: 20,
  participantStudent: 15,
  takeRate: 80,
};

export default function ClassSummaryTeacher() {
  const router = useRouter();

  const goToDetail = (studyId: number) => {
    router.push(`/teacher/class/study/${studyId}`);
  };

  return (
    <ClassSummaryWrapper>
      <ClassSummaryTextWrapper>
        <ClassSummaryTextItem>
          <ClassSummaryTitle>{examResult.title}</ClassSummaryTitle>
          <WorkbookStatus status="progress" />
        </ClassSummaryTextItem>
        <ClassSummaryText
          isGray
          style={{ cursor: "pointer", margin: "0px" }}
          onClick={() => goToDetail(examResult.studyId)}
        >
          자세히 보기
          <AiOutlineRight className="icon" />
        </ClassSummaryText>
      </ClassSummaryTextWrapper>
      <ClassSummaryDeadline>{examResult.endTime}</ClassSummaryDeadline>
      <ClassSummaryItemWrapper>
        <ClassWorkbookInfo
          studyCreatedDate={examResult.studyCreatedDate}
          studyType={examResult.studyType}
          volume={examResult.volume}
          isPublic={examResult.isPublic}
        />
        <TotalResult
          average={examResult.average}
          standardDeviation={examResult.standardDeviation}
          averageSolvingTime={examResult.averageSolvingTime}
        />
        <TakeRateChart
          totalStudent={examResult.totalStudent}
          participantStudent={examResult.participantStudent}
          takeRate={examResult.takeRate}
        />
      </ClassSummaryItemWrapper>
    </ClassSummaryWrapper>
  );
}
