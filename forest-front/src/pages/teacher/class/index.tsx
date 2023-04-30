import TeacherNav from "@/components/Nav/TeacherNav";
import ClassSelect from "@/features/class/ClassSelect";
import ClassWorkbook from "@/features/class/ClassWorkbook";
import ClassStudentList from "@/features/class/teacher/ClassStudentList";
import ClassSummaryTeacher from "@/features/class/teacher/ClassSummaryTeacher";
import { Container, FullScreen } from "@/styles/container";
import { Title } from "@/styles/text";

export default function TeacherClass() {
  return (
    <FullScreen>
      <TeacherNav nowLocation={"class"} />
      <Container padding={3}>
        <ClassSelect />
        <ClassSummaryTeacher />
        <Title>문제집</Title>
        <ClassWorkbook />
        <ClassStudentList />
      </Container>
    </FullScreen>
  );
}
