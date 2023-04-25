import TeacherNav from "@/components/Nav/TeacherNav";
import { StyledDashboardContainer, StyledDashboardSectionFlexBox } from "@/features/teacher/dashboard/Dashboard.style";
import DashboardBanner from "@/features/teacher/dashboard/DashboardBanner";
import Memo from "@/features/teacher/dashboard/Memo";
import Schedule from "@/features/teacher/dashboard/Schedule";
import { Container, FullScreen } from "@/styles/container";

export default function TeacherDashBoard() {
  return (
    <FullScreen>
      <TeacherNav nowLocation={"dashboard"} />
      <StyledDashboardContainer padding={2}>
        <DashboardBanner />
        <StyledDashboardSectionFlexBox>
          <Schedule />
          <Memo />
        </StyledDashboardSectionFlexBox>
      </StyledDashboardContainer>
    </FullScreen>
  );
}
