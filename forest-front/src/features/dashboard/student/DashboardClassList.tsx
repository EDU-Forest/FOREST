import { StyledDashboardClassItem, StyledDashboardClassListBox } from "./DashboardClass.style";
import { MdSchool } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";

interface ListType {
  id: number;
  classTitle: string;
}

function DashboardClassList() {
  // 더미
  const list: ListType[] = [
    {
      id: 1,
      classTitle: "A반",
    },
    {
      id: 2,
      classTitle: "A반",
    },
    {
      id: 3,
      classTitle: "A반",
    },
  ];

  const handleClick = (id?: number) => {
    // 클래스 이동
    console.log(id);
  };

  return (
    <StyledDashboardClassListBox>
      {list.map((item) => {
        return (
          <StyledDashboardClassItem key={item?.id} onClick={() => handleClick(item?.id)}>
            <MdSchool />
            <span>{item?.classTitle}</span>
            <AiOutlineRight />
          </StyledDashboardClassItem>
        );
      })}
    </StyledDashboardClassListBox>
  );
}

export default DashboardClassList;
