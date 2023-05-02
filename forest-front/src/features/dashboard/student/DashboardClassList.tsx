import { StyledDashboardClassItem, StyledDashboardClassListBox } from "./DashboardClass.style";
import { MdSchool } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";
import useClassListQuery from "@/apis/class/useClassListQuery";
import { useDispatch } from "react-redux";
import { setClass } from "@/stores/class/classInfo";
import { useRouter } from "next/router";

interface ListType {
  classId: number;
  className: string;
}

function DashboardClassList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const classList: ClassList[] = useClassListQuery().data;

  const handleClick = (item: ListType) => {
    dispatch(setClass(item));
    router.push("/student/class");
  };

  return (
    <StyledDashboardClassListBox>
      {classList?.map((item) => {
        return (
          <StyledDashboardClassItem key={item.classId} onClick={() => handleClick(item)}>
            <MdSchool />
            <span>{item.className}</span>
            <AiOutlineRight />
          </StyledDashboardClassItem>
        );
      })}
    </StyledDashboardClassListBox>
  );
}

export default DashboardClassList;
