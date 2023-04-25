import ClassLabel from "@/features/dashboard/ScheduleClassLabel";
import {
  StyledScheduleItem,
  StyledScheduleItemTop,
  StyledScheduleListBox,
  StyledScheduleStatusCircle,
} from "./Schedule.style";

function ScheduleList() {
  interface listType {
    status: string;
    title: string;
    class: string;
    period: string;
  }

  // 더미 데이터
  const list: listType[] = [
    {
      status: "중",
      title: "모의고사",
      class: "A반",
      period: "23.04.16 09:00 ~ 23.04.21 18:00",
    },
    {
      status: "예정",
      title: "모의고사",
      class: "A반",
      period: "23.04.16 09:00 ~ 23.04.21 18:00",
    },
    {
      status: "완료",
      title: "모의고사",
      class: "A반",
      period: "23.04.16 09:00 ~ 23.04.21 18:00",
    },
  ];

  return (
    <StyledScheduleListBox>
      {list.map((item) => {
        return (
          <>
            <StyledScheduleItem>
              <StyledScheduleItemTop>
                <div>
                  <StyledScheduleStatusCircle status={item?.status} />
                  <span>{item?.title}</span>
                </div>
                <ClassLabel classTitle={item.class} />
              </StyledScheduleItemTop>
              <span>{item?.period}</span>
            </StyledScheduleItem>
            <hr />
          </>
        );
      })}
    </StyledScheduleListBox>
  );
}

export default ScheduleList;
