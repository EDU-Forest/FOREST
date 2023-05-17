import StudentInfoCard from "@/components/Card/StudentInfoCard";
import {
  StudentListText,
  StudentListTextWrapper,
  StudentListTitle,
  StudentListWrapper,
  StudentAddText,
} from "./ClassStudentList.style";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { openAddStudentModal } from "@/stores/class/classModal";
import useClassStudentListQuery from "@/apis/class/teacher/useClassStudentListQuery";
import Loading from "@/components/Loading/Loading";

export default function ClassStudentList() {
  const dispatch = useDispatch();
  const classId = useSelector((state: RootState) => state.class.nowClassId);
  const { data: studentList, isLoading } = useClassStudentListQuery(classId);

  return (
    <>
      <StudentListTextWrapper>
        <div>
          <StudentListTitle>학생 리스트 </StudentListTitle>
          <StudentListText>({studentList?.length})</StudentListText>
        </div>
        <StudentAddText onClick={() => dispatch(openAddStudentModal())}>
          <AiOutlineUsergroupAdd className="icon" />
          학생 추가
        </StudentAddText>
      </StudentListTextWrapper>
      {/* {isOpenAddStudentModal && <AddStudentModal />} */}

      <StudentListWrapper>
        {isLoading ? (
          <Loading width={10} height={10} />
        ) : (
          <>
            {studentList?.map((item) => (
              <StudentInfoCard key={item.userId} studentInfo={item} />
            ))}
          </>
        )}
      </StudentListWrapper>
      {/* {isOpenDeleteStudentModal && <DeleteStudentModal />} */}
    </>
  );
}
