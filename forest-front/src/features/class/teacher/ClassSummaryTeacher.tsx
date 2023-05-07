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
import Loading from "@/components/Loading/Loading";

export default function ClassSummaryTeacher() {
  const router = useRouter();
  const { nowStudyId } = useSelector((state: RootState) => state.class);
  const { data, isLoading } = useStudyResultQuery(nowStudyId);

  const goToDetail = (studyId: number) => {
    router.push(`/teacher/class/study/${studyId}`);
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
          <ClassSummaryDeadline>~ {arrangeDate(data?.endTime)}</ClassSummaryDeadline>

          {data?.scheduleType === "AFTER" ? (
            <ClassSummaryItemWrapper>
              <ClassWorkbookInfo
                studyCreatedDate={data?.studyCreatedDate}
                studyType={data?.studyType}
                volume={data?.volume}
                isPublic={data?.isPublic}
              />
              <TotalResult
                average={data?.average}
                standardDeviation={data?.standardDeviation}
                averageSolvingTime={data?.averageSolvingTime}
              />
              <TakeRateChart
                totalStudent={data?.totalStudent}
                participantStudent={data?.participantStudent}
                takeRate={data?.takeRate}
              />
            </ClassSummaryItemWrapper>
          ) : (
            <ClassSummaryItemWrapperNoResult>
              시험 결과가 등록되지 않았습니다.
            </ClassSummaryItemWrapperNoResult>
          )}
        </ClassSummaryWrapper>
      )}
    </>
  );
}
