import StudentNav from "@/components/Nav/StudentNav";
import { Container, FullScreen } from "@/styles/container";

export default function StudentDashBoard() {
  return (
    <FullScreen>
      <StudentNav nowLocation={"dashboard"} />
      <Container></Container>
    </FullScreen>
  );
}
