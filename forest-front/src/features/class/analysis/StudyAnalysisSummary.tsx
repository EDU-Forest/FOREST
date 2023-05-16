import { useSelector } from "react-redux";
import AllCorrectRate from "./AllCorrectRate";
import { AnalysisSubTitle, AnalysisUpper, AnalysisUpperItem } from "./StudyAnalysis.style";
import { RootState } from "@/stores/store";
import { useRouter } from "next/router";
import useStudyResultQuery from "@/apis/class/teacher/useStudyResultQuery";
import { StudentStudyResultList } from "@/types/StudentStudyResultList";
import Loading from "@/components/Loading/Loading";
import TotalResult from "../TotalResult";
import TakeRateChart from "../TakeRateChart";
import { StyledWorkbookStatus } from "@/components/Status/Status.style";
import ClassWorkbookInfo from "../ClassWorkbookInfo";
import QuestionCorrectRate from "./QuestionCorrectRate";
import EachResult from "./EachResult";

export default function StudyAnalysisSummary() {
  const { nowStudyId } = useSelector((state: RootState) => state.class);
  const router = useRouter();

  const { data: result, isLoading } = useStudyResultQuery(nowStudyId, true);

  const goToGrade = (student: StudentStudyResultList) => {
    // 상세 성적으로 이동
    router.push(
      {
        pathname: `/teacher/class/study/${nowStudyId}/student`,
        query: {
          studentStudyResultId: student.studentStudyResultId,
          name: student.name,
          email: student.email,
          title: result?.data.title,
        },
      },
      `/teacher/class/study/${nowStudyId}/student`,
      { shallow: true },
    );
  };

  return (
    <>
      <AnalysisUpper>
        <AnalysisUpperItem>
          <AllCorrectRate />
        </AnalysisUpperItem>
        <AnalysisUpperItem>
          {isLoading ? (
            <Loading width={5} height={5} />
          ) : (
            <TotalResult
              noMargin
              average={result?.data.average}
              standardDeviation={result?.data.standardDeviation}
              averageSolvingTime={result?.data.averageSolvingTime}
            />
          )}
        </AnalysisUpperItem>
        <AnalysisUpperItem>
          {isLoading ? (
            <Loading width={5} height={5} />
          ) : (
            <>
              <AnalysisSubTitle>응시율</AnalysisSubTitle>
              <TakeRateChart
                noTitle
                totalStudent={result?.data.totalStudent}
                participantStudent={result?.data.participantStudent}
                takeRate={result?.data.takeRate}
              />
              <div style={{ textAlign: "center" }}>
                <StyledWorkbookStatus status="ONGOING">
                  {result?.data.participantStudent}명의 학생이 응시하였습니다
                </StyledWorkbookStatus>
              </div>
            </>
          )}
        </AnalysisUpperItem>
        <AnalysisUpperItem>
          {isLoading ? (
            <Loading width={5} height={5} />
          ) : (
            <ClassWorkbookInfo
              noMargin
              studyCreatedDate={result?.data.studyCreatedDate}
              studyType={result?.data.studyType}
              volume={result?.data.volume}
              isPublic={result?.data.isPublic}
            />
          )}
        </AnalysisUpperItem>
      </AnalysisUpper>
      {/* 문항별 정답률 */}
      <QuestionCorrectRate />
      {/* 응시자별 성취도 */}
      <EachResult goToGrade={goToGrade} />
    </>
  );
}
