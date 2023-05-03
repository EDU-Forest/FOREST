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
import ClassScoreChart from "./ClassScoreChart";
import ClassMyResult from "./ClassMyResult";
import TotalResult from "../TotalResult";
import useRecentStudyIdQuery from "@/apis/class/useRecentStudyIdQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const examResult: StudentExamList = {
  studyId: 1,
  title: "킹규림의 수능 100제",
  startTime: "2023.04.27",
  endTime: "2023.04.28",
  userName: "킹규림",
  studyType: "SELF",
  scheduleType: "ONGOING",
  studentResult: {
    totalScore: 50,
    studentScore: 20,
    percentage: 80,
    correctNum: 15,
    solvingTime: 30,
  },
  classResult: {
    average: 80,
    standardDeviation: 8.5,
    averageSolvingTime: 25,
  },
};

export default function ClassSummaryStudent() {
  const router = useRouter();
  const { nowClassId } = useSelector((state: RootState) => state.class);
  const studyId = useRecentStudyIdQuery(nowClassId).data;

  const goToDetail = (studyId: number) => {
    router.push(`/student/class/study/${studyId}`);
  };

  return (
    <ClassSummaryWrapper small={examResult.scheduleType === "AFTER" ? false : true}>
      <ClassSummaryTextWrapper>
        <ClassSummaryTextItem>
          <ClassSummaryTitle>{examResult.title}</ClassSummaryTitle>
          <WorkbookStatus status={examResult.scheduleType} />
        </ClassSummaryTextItem>
        {examResult.scheduleType === "AFTER" && (
          <ClassSummaryText
            isGray
            style={{ cursor: "pointer", margin: "0px" }}
            onClick={() => goToDetail(examResult.studyId)}
          >
            자세히 보기
            <AiOutlineRight className="icon" />
          </ClassSummaryText>
        )}
      </ClassSummaryTextWrapper>
      <ClassSummaryDeadline>~ {examResult.endTime}</ClassSummaryDeadline>
      {examResult.scheduleType === "AFTER" ? (
        <ClassSummaryItemWrapper>
          <ClassScoreChart
            myScore={examResult.studentResult.studentScore}
            totalScore={examResult.studentResult.totalScore}
          />
          <ClassMyResult
            percentage={examResult.studentResult.percentage}
            correctNum={examResult.studentResult.correctNum}
            solvingTime={examResult.studentResult.solvingTime}
          />
          <TotalResult
            average={examResult.classResult.average}
            standardDeviation={examResult.classResult.standardDeviation}
            averageSolvingTime={examResult.classResult.averageSolvingTime}
          />
        </ClassSummaryItemWrapper>
      ) : (
        <ClassSummaryItemWrapperNoResult>
          문제 풀이가 종료되지 않았습니다.
        </ClassSummaryItemWrapperNoResult>
      )}
    </ClassSummaryWrapper>
  );
}
