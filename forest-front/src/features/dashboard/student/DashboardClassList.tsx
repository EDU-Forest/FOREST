import { StyledDashboardClassItem, StyledDashboardClassListBox } from "./DashboardClass.style";
import { MdSchool } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";
import useClassListQuery from "@/apis/class/useClassListQuery";
import { useDispatch } from "react-redux";
import { setClass } from "@/stores/class/classInfo";
import { useRouter } from "next/router";
import { IClassList } from "@/types/ClassList";
import Loading from "@/components/Loading/Loading";

function DashboardClassList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: classList, isLoading } = useClassListQuery();

  const handleClick = (item: IClassList) => {
    dispatch(setClass(item));
    router.push("/student/class");
  };

  return (
    <StyledDashboardClassListBox>
      {isLoading ? (
        <Loading width={10} height={10} />
      ) : (
        <>
          {classList?.map((item) => {
            return (
              <StyledDashboardClassItem key={item.classId} onClick={() => handleClick(item)}>
                <MdSchool />
                <span>{item.className}</span>
                <AiOutlineRight />
              </StyledDashboardClassItem>
            );
          })}
        </>
      )}
    </StyledDashboardClassListBox>
  );
}

export default DashboardClassList;
