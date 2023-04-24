import TeacherNav from "@/components/Nav/TeacherNav";
import DashboardBanner from "@/features/teacher/dashboard/DashboardBanner";
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
