import StudentNav from "@/components/Nav/StudentNav";
import ClassWorkbook from "@/features/class/ClassWorkbook";
import ClassSelectStudent from "@/features/class/student/ClassSelectStudent";
import ClassSummaryStudent from "@/features/class/student/ClassSummaryStudent";
import { Container, FullScreen } from "@/styles/container";
import { Title } from "@/styles/text";

export default function StudentClass() {
  return (
    <FullScreen>
      <StudentNav nowLocation={"class"} />
      <Container padding={3}>
        <ClassSelectStudent />
        <ClassSummaryStudent />
        <Title>문제집</Title>
        <ClassWorkbook />
      </Container>
    </FullScreen>
  );
}
