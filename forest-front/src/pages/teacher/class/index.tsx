import TeacherNav from "@/components/Nav/TeacherNav";
import ClassSelect from "@/features/class/ClassSelect";
import ClassSummary from "@/features/class/ClassSummary";
import { Container, FullScreen } from "@/styles/container";

export default function TeacherClass() {
  return (
    <FullScreen>
      <TeacherNav nowLocation={"class"} />
      <Container padding={3}>
        <ClassSelect />
        <ClassSummary />
      </Container>
    </FullScreen>
  );
}
