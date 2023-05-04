import { useRouter } from "next/router";
import {
  ClassSummaryDeadline,
  ClassSummaryItemWrapper,
  ClassSummaryItemWrapperNoResult,
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
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useStudyResultQuery from "@/apis/class/teacher/useStudyResultQuery";
import arrangeDate from "@/utils/arrangeDate";

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
  const { nowStudyId } = useSelector((state: RootState) => state.class);

  const examResult = useStudyResultQuery(nowStudyId).data;
  console.log("data", examResult);

  const goToDetail = (studyId: number) => {
    router.push(`/teacher/class/study/${studyId}`);
  };

  return (
    <ClassSummaryWrapper small={examResult?.scheduleType === "AFTER" ? false : true}>
      <ClassSummaryTextWrapper>
        <ClassSummaryTextItem>
          <ClassSummaryTitle>{examResult?.title}</ClassSummaryTitle>
          <WorkbookStatus status={examResult?.scheduleType} />
        </ClassSummaryTextItem>
        {examResult?.scheduleType === "AFTER" && (
          <ClassSummaryText
            isGray
            style={{ cursor: "pointer", margin: "0px" }}
            onClick={() => goToDetail(examResult?.studyId)}
          >
            자세히 보기
            <AiOutlineRight className="icon" />
          </ClassSummaryText>
        )}
      </ClassSummaryTextWrapper>
      <ClassSummaryDeadline>~ {arrangeDate(examResult?.endTime)}</ClassSummaryDeadline>

      {examResult?.scheduleType === "AFTER" ? (
        <ClassSummaryItemWrapper>
          <ClassWorkbookInfo
            studyCreatedDate={examResult?.studyCreatedDate}
            studyType={examResult?.studyType}
            volume={examResult?.volume}
            isPublic={examResult?.isPublic}
          />
          <TotalResult
            average={examResult?.average}
            standardDeviation={examResult?.standardDeviation}
            averageSolvingTime={examResult?.averageSolvingTime}
          />
          <TakeRateChart
            totalStudent={examResult?.totalStudent}
            participantStudent={examResult?.participantStudent}
            takeRate={examResult?.takeRate}
          />
        </ClassSummaryItemWrapper>
      ) : (
        <ClassSummaryItemWrapperNoResult>
          시험 결과가 등록되지 않았습니다.
        </ClassSummaryItemWrapperNoResult>
      )}
    </ClassSummaryWrapper>
  );
}
