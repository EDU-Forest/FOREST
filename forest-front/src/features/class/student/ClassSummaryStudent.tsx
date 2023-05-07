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
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import Loading from "@/components/Loading/Loading";
import useStudentScoreQuery from "@/apis/class/student/useStudentScoreQuery";

export default function ClassSummaryStudent() {
  const router = useRouter();
  const { nowStudyId } = useSelector((state: RootState) => state.class);
  const { data, isLoading } = useStudentScoreQuery(nowStudyId);

  const goToDetail = (studyId: number) => {
    router.push(`/student/class/study/${studyId}`);
  };

  return (
    <>
      {isLoading ? (
        <ClassSummaryWrapper small={true} style={{ display: "flex", alignItems: "center" }}>
          <Loading width={10} height={10} />
        </ClassSummaryWrapper>
      ) : (
        <ClassSummaryWrapper small={data?.scheduleType === "AFTER" ? false : true}>
          <ClassSummaryTextWrapper>
            <ClassSummaryTextItem>
              <ClassSummaryTitle>{data?.title}</ClassSummaryTitle>
              <WorkbookStatus status={data?.scheduleType} />
            </ClassSummaryTextItem>
            {data?.scheduleType === "AFTER" && (
              <ClassSummaryText
                isGray
                style={{ cursor: "pointer", margin: "0px" }}
                onClick={() => goToDetail(data?.studyId)}
              >
                자세히 보기
                <AiOutlineRight className="icon" />
              </ClassSummaryText>
            )}
          </ClassSummaryTextWrapper>
          <ClassSummaryDeadline>~ {data?.endTime}</ClassSummaryDeadline>
          {data?.scheduleType === "AFTER" ? (
            <ClassSummaryItemWrapper>
              <ClassScoreChart
                myScore={data?.studentResult.studentScore}
                totalScore={data?.studentResult.totalScore}
              />
              <ClassMyResult
                percentage={data?.studentResult.percentage}
                correctNum={data?.studentResult.correctNum}
                solvingTime={data?.studentResult.solvingTime}
              />
              <TotalResult
                average={data?.classResult.average}
                standardDeviation={data?.classResult.standardDeviation}
                averageSolvingTime={data?.classResult.averageSolvingTime}
              />
            </ClassSummaryItemWrapper>
          ) : (
            <ClassSummaryItemWrapperNoResult>
              문제 풀이가 종료되지 않았습니다.
            </ClassSummaryItemWrapperNoResult>
          )}
        </ClassSummaryWrapper>
      )}
    </>
  );
}
