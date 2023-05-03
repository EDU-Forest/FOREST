import TeacherNav from "@/components/Nav/TeacherNav";
import ClassSelect from "@/features/class/ClassSelect";
import ClassWorkbook from "@/features/class/ClassWorkbook";
import NoClass from "@/features/class/NoClass";
import ClassStudentList from "@/features/class/teacher/ClassStudentList";
import ClassSummaryTeacher from "@/features/class/teacher/ClassSummaryTeacher";
import { closeAllModal } from "@/stores/class/classModal";
import { RootState } from "@/stores/store";
import { Container, FullScreen } from "@/styles/container";
import { Title } from "@/styles/text";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TeacherClass() {
  const dispatch = useDispatch();
  const { nowClassId } = useSelector((state: RootState) => state.class);

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
            <ClassSummaryTeacher />
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
