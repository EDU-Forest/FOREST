import useScheduleQuery from "@/apis/dashboard/useScheduleQuery";
import Loading from "@/components/Loading/Loading";
import ClassLabel from "@/features/dashboard/ScheduleLabel";
import { RootState } from "@/stores/store";
import arrangeDate from "@/utils/arrangeDate";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ClassSummaryItemWrapperNoResult } from "../class/ClassSummary.style";
import {
  ScheduleLabelsBox,
  ScheduleProgressBar,
  StyledScheduleItem,
  StyledScheduleItemTop,
  StyledScheduleListBox,
  StyledScheduleStatusCircle,
} from "./Schedule.style";

interface IStudy {
  [key: string]: string;
}

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
    router.push(`/test/${studyId}/info`, undefined, { shallow: true });
  };

  const STUDY: IStudy = {
    HOMEWORK: "과제",
    EXAM: "시험",
    SELF: "자습",
  };

  const getProgressPercent = (start: string, end: string) => {
    if (start && end) {
      const startTime: number = new Date(start).getTime();
      const endTime: number = new Date(end).getTime();
      const nowTime: number = new Date().getTime();

      const totalGapTime = (endTime - startTime) / 1000 / 60 / 60;
      const progressGapTime = (nowTime - startTime) / 1000 / 60 / 60;

      return (progressGapTime / totalGapTime) * 100;
    }
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
                      <ScheduleLabelsBox>
                        <ClassLabel classTitle={STUDY[item.studyType]} />
                        <ClassLabel classTitle={item.className} />
                      </ScheduleLabelsBox>
                    </StyledScheduleItemTop>
                    {item.scheduleType === "ONGOING" && (
                      <div>
                        <ScheduleProgressBar
                          value={getProgressPercent(item.startTime, item.endTime)}
                          max={100}
                        />
                      </div>
                    )}
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
