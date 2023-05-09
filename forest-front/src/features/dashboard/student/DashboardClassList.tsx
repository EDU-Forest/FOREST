import { StyledDashboardClassItem, StyledDashboardClassListBox } from "./DashboardClass.style";
import { MdSchool } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";
import useClassListQuery from "@/apis/class/useClassListQuery";
import { useDispatch } from "react-redux";
import { setClass } from "@/stores/class/classInfo";
import { useRouter } from "next/router";
import { IClassList } from "@/types/ClassList";

function DashboardClassList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const classList: IClassList[] = useClassListQuery().data;

  const handleClick = (item: IClassList) => {
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
