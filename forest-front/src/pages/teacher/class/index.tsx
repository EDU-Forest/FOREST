import useRecentStudyIdQuery from "@/apis/class/useRecentStudyIdQuery";
import TeacherNav from "@/components/Nav/TeacherNav";
import ClassSelect from "@/features/class/ClassSelect";
import {
  ClassSummaryItemWrapperNoResult,
  ClassSummaryWrapper,
} from "@/features/class/ClassSummary.style";
import ClassWorkbook from "@/features/class/ClassWorkbook";
import NoClass from "@/features/class/NoClass";
import ClassStudentList from "@/features/class/teacher/ClassStudentList";
import ClassSummaryTeacher from "@/features/class/teacher/ClassSummaryTeacher";
import { closeAllModal } from "@/stores/class/classModal";
import { RootState } from "@/stores/store";
import { Container, FullScreen } from "@/styles/container";
import { Title } from "@/styles/text";
import withAuth from "@/utils/withAuth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function TeacherClass() {
  const dispatch = useDispatch();
  const { nowClassId } = useSelector((state: RootState) => state.class);
  const studyId = useRecentStudyIdQuery(nowClassId).data;

  useEffect(() => {
    dispatch(closeAllModal());
  }, []);

  return (
    <FullScreen>
      <TeacherNav nowLocation={"class"} />
      <Container padding={3}>
        {nowClassId !== -1 ? (
          <>
            <ClassSelect />
            {studyId === -1 ? (
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
