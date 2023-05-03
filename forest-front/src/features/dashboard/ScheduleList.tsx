import ClassLabel from "@/features/dashboard/ScheduleClassLabel";
import {
  StyledScheduleItem,
  StyledScheduleItemTop,
  StyledScheduleListBox,
  StyledScheduleStatusCircle,
} from "./Schedule.style";
import useScheduleQuery from "@/apis/dashboard/useScheduleQuery";

function ScheduleList() {
  const userId = 1;
  const { data } = useScheduleQuery(userId);

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
      {/* {data?.studyList.map((item: ScheduleList) => { */}
      {list?.map((item) => {
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
    </StyledScheduleListBox>
  );
}

export default ScheduleList;
