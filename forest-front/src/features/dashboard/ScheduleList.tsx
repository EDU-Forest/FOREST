import ClassLabel from "@/features/dashboard/ScheduleClassLabel";
import {
  StyledScheduleItem,
  StyledScheduleItemTop,
  StyledScheduleListBox,
  StyledScheduleStatusCircle,
} from "./Schedule.style";
import useScheduleQuery from "@/apis/dashboard/useScheduleQuery";
import { ClassSummaryItemWrapperNoResult } from "../class/ClassSummary.style";
import Loading from "@/components/Loading/Loading";
import arrangeDate from "@/utils/arrangeDate";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useRouter } from "next/router";

function ScheduleList() {
  const { data: studyList, isLoading } = useScheduleQuery();
  const { role } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const isClickable = (scheduleType: string) => {
    if (role === "STUDENT" && scheduleType === "ONGOING") {
      return true;
    } else {
      return false;
    }
  };

  const goToTest = (studyId: number, scheduleType: string) => {
    if (!isClickable(scheduleType)) {
      return;
    }
    router.push(`/test/${studyId}/info`);
  };

  return (
    <StyledScheduleListBox>
      {isLoading ? (
        <Loading width={10} height={10} />
      ) : (
        <>
          {studyList && studyList?.length > 0 ? (
            <>
              {studyList?.map((item, idx) => {
                return (
                  <StyledScheduleItem
                    key={item.studyId}
                    isLast={idx === studyList.length - 1 ? true : false}
                    clickable={isClickable(item.scheduleType)}
                    onClick={() => goToTest(item.studyId, item.scheduleType)}
                  >
                    <StyledScheduleItemTop>
                      <div>
                        <StyledScheduleStatusCircle status={item.scheduleType} />
                        <span>{item.title}</span>
                      </div>
                      <ClassLabel classTitle={item.className} />
                    </StyledScheduleItemTop>
                    <span>
                      {arrangeDate(item.startTime)} ~ {arrangeDate(item.endTime)}
                    </span>
                  </StyledScheduleItem>
                );
              })}
            </>
          ) : (
            <ClassSummaryItemWrapperNoResult>
              <p style={{ marginBottom: "1rem" }}>등록된 스케줄이 없습니다</p>
            </ClassSummaryItemWrapperNoResult>
          )}
        </>
      )}
    </StyledScheduleListBox>
  );
}

export default ScheduleList;
