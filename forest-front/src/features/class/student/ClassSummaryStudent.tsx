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
import arrangeDate from "@/utils/arrangeDate";

export default function ClassSummaryStudent() {
  const router = useRouter();
  const { nowStudyId } = useSelector((state: RootState) => state.class);
  const { data, isLoading } = useStudentScoreQuery(nowStudyId);

  const goToDetail = (studyId: number) => {
    router.push(`/test/${studyId}/result`);
  };

  const goToTest = (studyId: number) => {
    router.push(`/test/${studyId}/info`);
  };

  return (
    <>
      {isLoading ? (
        <ClassSummaryWrapper small={true} style={{ display: "flex", alignItems: "center" }}>
          <Loading width={10} height={10} />
        </ClassSummaryWrapper>
      ) : (
        <>
          {data ? (
            <ClassSummaryWrapper small={data?.data.scheduleType === "AFTER" ? false : true}>
              <ClassSummaryTextWrapper>
                <ClassSummaryTextItem>
                  <ClassSummaryTitle>{data?.data.title}</ClassSummaryTitle>
                  <WorkbookStatus status={data?.data.scheduleType} />
                </ClassSummaryTextItem>
                {data?.status === "STUDY_SUCCESS_INFO_AFTER" && (
                  <ClassSummaryText
                    isGray
                    style={{ cursor: "pointer", margin: "0px" }}
                    onClick={() => goToDetail(data?.data.studyId)}
                    className="hyper-text"
                  >
                    결과 보기
                    <AiOutlineRight className="icon" />
                  </ClassSummaryText>
                )}
                {data?.status === "STUDY_ONGOING" && (
                  <ClassSummaryText
                    isGray
                    style={{ cursor: "pointer", margin: "0px" }}
                    onClick={() => goToTest(data?.data.studyId)}
                    className="hyper-text"
                  >
                    문제 풀기
                    <AiOutlineRight className="icon" />
                  </ClassSummaryText>
                )}
              </ClassSummaryTextWrapper>
              {data?.data.studyType !== "SELF" && (
                <>
                  {data?.status === "STUDY_NOT_YET" ? (
                    <ClassSummaryDeadline>
                      {arrangeDate(data?.data.startTime)} ~{" "}
                    </ClassSummaryDeadline>
                  ) : (
                    <ClassSummaryDeadline>~ {arrangeDate(data?.data.endTime)}</ClassSummaryDeadline>
                  )}
                </>
              )}

              {data?.status === "STUDY_SUCCESS_INFO_AFTER" ? (
                <ClassSummaryItemWrapper userRole="STUDENT">
                  <ClassScoreChart
                    myScore={data?.data.studentResult.studentScore}
                    totalScore={data?.data.studentResult.totalScore}
                  />
                  <ClassMyResult
                    percentage={data?.data.studentResult.percentage}
                    correctNum={data?.data.studentResult.correctNum}
                    solvingTime={data?.data.studentResult.solvingTime}
                  />
                  <TotalResult
                    average={data?.data.classResult.average}
                    standardDeviation={data?.data.classResult.standardDeviation}
                    averageSolvingTime={data?.data.classResult.averageSolvingTime}
                  />
                </ClassSummaryItemWrapper>
              ) : (
                <ClassSummaryItemWrapperNoResult>
                  {data?.status === "STUDY_ONGOING" && "아직 문제를 풀지 않았습니다."}
                  {data?.status === "STUDY_SUBMIT_ALREADY" && "채점을 기다리는 중입니다."}
                  {data?.status === "STUDY_NOT_YET" && "시작되지 않은 시험입니다."}
                  {data?.status === "STUDY_NOT_PARTICIPATE" && "응시하지 않은 시험입니다."}
                </ClassSummaryItemWrapperNoResult>
              )}
            </ClassSummaryWrapper>
          ) : (
            <ClassSummaryWrapper small>
              <ClassSummaryItemWrapperNoResult>
                최근 진행한 스터디가 없습니다.
              </ClassSummaryItemWrapperNoResult>
            </ClassSummaryWrapper>
          )}
        </>
      )}
    </>
  );
}
