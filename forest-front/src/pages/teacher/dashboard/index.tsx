import TeacherNav from "@/components/Nav/TeacherNav";
import DashboardBanner from "@/features/teacher/dashboard/DashboardBanner";
import Schedule from "@/features/teacher/dashboard/Schedule";
import { Container, FullScreen } from "@/styles/container";

export default function TeacherDashBoard() {
  return (
    <FullScreen>
      <TeacherNav nowLocation={"dashboard"} />
      <Container padding={2}>
        <DashboardBanner />
        <Schedule />
      </Container>
    </FullScreen>
  );
}
