import DashboardBanner from "@/components/Banner/DashboardBanner";
import TeacherNav from "@/components/Nav/TeacherNav";
import { Container, FullScreen } from "@/styles/container";

export default function TeacherDashBoard() {
  return (
    <FullScreen>
      <TeacherNav nowLocation={"dashboard"} />
      <Container padding={2}>
        <DashboardBanner />
      </Container>
    </FullScreen>
  );
}
