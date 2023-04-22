import TeacherNav from "@/components/Nav/TeacherNav";
import { Container, FullScreen } from "@/styles/container";

export default function TeacherClass() {
  return (
    <FullScreen>
      <TeacherNav nowLocation={"class"} />
      <Container></Container>
    </FullScreen>
  );
}
