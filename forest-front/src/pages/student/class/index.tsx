import StudentNav from "@/components/Nav/StudentNav";
import { Container, FullScreen } from "@/styles/container";

export default function StudentClass() {
  return (
    <FullScreen>
      <StudentNav nowLocation={"class"} />
      <Container></Container>
    </FullScreen>
  );
}
