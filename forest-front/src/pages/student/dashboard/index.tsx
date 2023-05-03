import StudentNav from "@/components/Nav/StudentNav";
import { FullScreen } from "@/styles/container";
import {
  StyledDashboardContainer,
  StyledDashboardSectionFlexBox,
} from "@/features/dashboard/Dashboard.style";
import DashboardBanner from "@/features/dashboard/DashboardBanner";
import Schedule from "@/features/dashboard/Schedule";
import DashboardClass from "@/features/dashboard/student/DashboardClass";

export default function StudentDashBoard() {
  return (
    <FullScreen>
      <StudentNav nowLocation={"dashboard"} />
      <StyledDashboardContainer padding={2}>
        <DashboardBanner />
        <StyledDashboardSectionFlexBox>
          <Schedule />
          <DashboardClass />
        </StyledDashboardSectionFlexBox>
      </StyledDashboardContainer>
    </FullScreen>
  );
}
