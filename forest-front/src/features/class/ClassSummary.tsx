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
import TakeRateChart from "./TakeRateChart";
import { AiOutlineRight } from "react-icons/ai";
import ClassSummaryScoreChart from "./student/ClassSummaryScoreChart";
import ClassSummaryMyResult from "./student/ClassSummaryMyResult";
import { useRouter } from "next/router";

interface Iprops {
  isStudent?: boolean;
}

const examResult: TeacherExamResult = {
  studyId: 1,
  title: "킹규림의 수능 100제",
  startTime: "2023-04-27",
  endTime: "2023-04-28",
  userName: "킹규림",
  studyType: "SELF",
  scheduleType: "",
  studyCreatedDate: "2023-04-27", // 출제일
  workbookCreatedDate: "2023-04-27", // 출판일
  volume: 10, // 문항 수
  isPublic: true,
  average: 80,
  standardDeviation: 8.5, //표준편차
  averageSolvingTime: 25,
  totalStudent: 20,
  participantStudent: 15,
  takeRate: 80,
};

export default function ClassSummary({ isStudent }: Iprops) {
  const router = useRouter();
  const id = 1; // 임시
  const goToDetail = (studyId: number) => {
    // 분석 페이지로 이동
    if (isStudent) {
      router.push(`/student/class/study/${studyId}`);
    } else {
      router.push(`/teacher/class/study/${studyId}`);
    }
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
        {isStudent ? (
          <>
            <ClassSummaryScoreChart score={10} />
            <ClassSummaryMyResult />
            <ClassSummaryResult
              average={examResult.average}
              standardDeviation={examResult.standardDeviation}
              averageSolvingTime={examResult.averageSolvingTime}
            />
          </>
        ) : (
          <>
            <ClassSummaryWorkbook />
            <ClassSummaryResult
              average={examResult.average}
              standardDeviation={examResult.standardDeviation}
              averageSolvingTime={examResult.averageSolvingTime}
            />
            <TakeRateChart
              totalStudent={examResult.totalStudent}
              participantStudent={examResult.participantStudent}
              takeRate={examResult.takeRate}
            />
          </>
        )}
      </ClassSummaryItemWrapper>
    </ClassSummaryWrapper>
  );
}
