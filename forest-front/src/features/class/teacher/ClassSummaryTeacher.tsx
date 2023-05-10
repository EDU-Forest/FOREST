import { useRouter } from "next/router";
import {
  ClassSummaryDeadline,
  ClassSummaryItemSubmitBox,
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
import Loading from "@/components/Loading/Loading";
import CommonBtn from "@/components/Button/CommonBtn";
import useExamFinish from "@/apis/class/analysis/useExamFinish";

export default function ClassSummaryTeacher() {
  const router = useRouter();
  const { nowStudyId } = useSelector((state: RootState) => state.class);
  const { data: result, isLoading } = useStudyResultQuery(nowStudyId);
  const { mutate } = useExamFinish();

  const goToDetail = (studyId: number) => {
    router.push(`/teacher/class/study/${studyId}`);
  };

  const endTestHandler = () => {
    mutate(nowStudyId);
  };

  return (
    <>
      {isLoading ? (
        <ClassSummaryWrapper small={true} style={{ display: "flex", alignItems: "center" }}>
          <Loading width={10} height={10} />
        </ClassSummaryWrapper>
      ) : (
        <ClassSummaryWrapper>
          {!isLoading && !result?.data?.isFinished && (
            <ClassSummaryItemSubmitBox>
              <CommonBtn colored onClick={endTestHandler}>
                시험 종료
              </CommonBtn>
            </ClassSummaryItemSubmitBox>
          )}
          <ClassSummaryTextWrapper>
            <ClassSummaryTextItem>
              <ClassSummaryTitle>{result?.data.title}</ClassSummaryTitle>
              <WorkbookStatus status={result?.data.scheduleType} />
            </ClassSummaryTextItem>
            {result?.data.scheduleType === "AFTER" && result?.data.isFinished && (
              <ClassSummaryText
                isGray
                style={{ cursor: "pointer", margin: "0px" }}
                onClick={() => goToDetail(result?.data.studyId)}
              >
                자세히 보기
                <AiOutlineRight className="icon" />
              </ClassSummaryText>
            )}
          </ClassSummaryTextWrapper>
          {result?.data.studyType !== "SELF" && (
            <ClassSummaryDeadline>~ {arrangeDate(result?.data.endTime)}</ClassSummaryDeadline>
          )}

          <ClassSummaryItemWrapper userRole="TEACHER" isFinished={result?.data.isFinished}>
            <ClassWorkbookInfo
              studyCreatedDate={result?.data.studyCreatedDate}
              studyType={result?.data.studyType}
              volume={result?.data.volume}
              isPublic={result?.data.isPublic}
            />
            <TotalResult
              average={result?.data.average}
              standardDeviation={result?.data.standardDeviation}
              averageSolvingTime={result?.data.averageSolvingTime}
            />
            {result?.status === "STUDY_SUCCESS_INFO_AFTER" ? (
              <TakeRateChart
                totalStudent={result?.data.totalStudent}
                participantStudent={result?.data.participantStudent}
                takeRate={result?.data.takeRate}
              />
            ) : (
              <>
                <TakeRateChart totalStudent={0} participantStudent={0} takeRate={0} />
              </>
            )}
          </ClassSummaryItemWrapper>
        </ClassSummaryWrapper>
      )}
    </>
  );
}
