import TeacherNav from "@/components/Nav/TeacherNav";
import ClassSelect from "@/features/class/ClassSelect";
import ClassSummary from "@/features/class/ClassSummary";
import ClassWorkbook from "@/features/class/ClassWorkbook";
import { Container, FullScreen } from "@/styles/container";
import { Title } from "@/styles/text";

export default function TeacherClass() {
  return (
    <FullScreen>
      <TeacherNav nowLocation={"class"} />
      <Container padding={3}>
        <ClassSelect />
        <ClassSummary />
        <Title>문제집</Title>
        <ClassWorkbook />
      </Container>
    </FullScreen>
  );
}
