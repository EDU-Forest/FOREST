import ClassLabel from "@/features/dashboard/ScheduleClassLabel";
import {
  StyledScheduleItem,
  StyledScheduleItemTop,
  StyledScheduleListBox,
  StyledScheduleStatusCircle,
} from "./Schedule.style";
import useScheduleQuery from "@/apis/dashboard/useScheduleQuery";
import { ClassSummaryItemWrapperNoResult } from "../class/ClassSummary.style";

function ScheduleList() {
  const ScheduleList: ScheduleList[] = useScheduleQuery().data?.studyList;

  // 더미 데이터
  const list: ScheduleList[] = [
    {
      studyId: 1,
      title: "모의고사",
      startTime: "23.04.16 09:00",
      endTime: "23.04.21 18:00",
      className: "싸피 고등학교 3반",
      studyType: "ONGOING",
      scheduleType: "EXAM",
    },
    {
      studyId: 2,
      title: "모의고사",
      startTime: "23.04.16 09:00",
      endTime: "23.04.21 18:00",
      className: "싸피중 1반",
      studyType: "AFTER",
      scheduleType: "SELF",
    },
    {
      studyId: 3,
      title: "모의고사",
      startTime: "23.04.16 09:00",
      endTime: "23.04.21 18:00",
      className: "싸피 고등학교 3반",
      studyType: "BEFORE",
      scheduleType: "HOMEWORK",
    },
  ];

  return (
    <StyledScheduleListBox>
      {ScheduleList?.length > 0 ? (
        <>
          {ScheduleList?.map((item) => {
            return (
              <>
                <StyledScheduleItem>
                  <StyledScheduleItemTop>
                    <div>
                      <StyledScheduleStatusCircle status={item.studyType} />
                      <span>{item.title}</span>
                    </div>
                    <ClassLabel classTitle={item.className} />
                  </StyledScheduleItemTop>
                  <span>
                    {item.startTime} ~ {item.endTime}
                  </span>
                </StyledScheduleItem>
                <hr />
              </>
            );
          })}
        </>
      ) : (
        <ClassSummaryItemWrapperNoResult>
          <p style={{ marginBottom: "1rem" }}>등록된 스케줄이 없습니다</p>
        </ClassSummaryItemWrapperNoResult>
      )}
    </StyledScheduleListBox>
  );
}

export default ScheduleList;
