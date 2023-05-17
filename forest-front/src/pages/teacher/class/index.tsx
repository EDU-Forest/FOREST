import useRecentClassIdQuery from "@/apis/class/useRecentClassIdQuery";
import useRecentStudyIdQuery from "@/apis/class/useRecentStudyIdQuery";
import TeacherNav from "@/components/Nav/TeacherNav";
import ClassSelect from "@/features/class/ClassSelect";
import {
  ClassSummaryItemWrapperNoResult,
  ClassSummaryWrapper,
} from "@/features/class/ClassSummary.style";
import ClassWorkbook from "@/features/class/ClassWorkbook";
import NoClass from "@/features/class/NoClass";
import AddClassModal from "@/features/class/teacher/AddClassModal";
import AddStudentModal from "@/features/class/teacher/AddStudentModal";
import ClassStudentList from "@/features/class/teacher/ClassStudentList";
import ClassSummaryTeacher from "@/features/class/teacher/ClassSummaryTeacher";
import DeleteStudentModal from "@/features/class/teacher/DeleteStudentModal";
import { closeAllModal, hideClassDropdown } from "@/stores/class/classModal";
import { RootState } from "@/stores/store";
import { Container, FullScreen } from "@/styles/container";
import { Title } from "@/styles/text";
import withAuth from "@/utils/auth/withAuth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function TeacherClass() {
  const dispatch = useDispatch();
  const { nowClassId } = useSelector((state: RootState) => state.class);
  const { data } = useRecentStudyIdQuery(nowClassId);

  // 모달 분리
  const { isOpenAddClassModal, isOpenAddStudentModal, isOpenDeleteStudentModal } = useSelector(
    (state: RootState) => state.classModal,
  );

  useEffect(() => {
    dispatch(closeAllModal());
  }, []);

  const hideDropdownHandler = () => {
    dispatch(hideClassDropdown());
  };

  return (
    // 모달 수정 시 필요
    <FullScreen onClick={hideDropdownHandler}>
      {isOpenAddClassModal && <AddClassModal />}
      {isOpenAddStudentModal && <AddStudentModal />}
      {isOpenDeleteStudentModal && <DeleteStudentModal />}

      <TeacherNav nowLocation={"class"} />
      <Container padding={3}>
        {nowClassId !== -1 ? (
          <>
            <ClassSelect />
            {!data ? (
              <ClassSummaryWrapper small>
                <ClassSummaryItemWrapperNoResult>
                  최근 진행한 스터디가 없습니다.
                </ClassSummaryItemWrapperNoResult>
              </ClassSummaryWrapper>
            ) : (
              <ClassSummaryTeacher />
            )}
            <Title>문제집</Title>
            <ClassWorkbook />
            <ClassStudentList />
          </>
        ) : (
          <NoClass />
        )}
      </Container>
    </FullScreen>
  );
}

export default withAuth(TeacherClass);
