import TeacherNav from "@/components/Nav/TeacherNav";
import ClassSelect from "@/features/teacher/class/ClassSelect";
import { Container, FullScreen } from "@/styles/container";

export default function TeacherClass() {
  return (
    <FullScreen>
      <TeacherNav nowLocation={"class"} />
      <Container padding={3}>
        <ClassSelect />
      </Container>
    </FullScreen>
  );
}
