import TeacherNav from "@/components/Nav/TeacherNav";
import {
  StyledDashboardContainer,
  StyledDashboardSectionFlexBox,
} from "@/features/dashboard/Dashboard.style";
import DashboardBanner from "@/features/dashboard/DashboardBanner";
import Schedule from "@/features/dashboard/Schedule";
import Memo from "@/features/dashboard/teacher/Memo";
import { FullScreen } from "@/styles/container";

export default function TeacherDashBoard() {
  return (
    <FullScreen>
      <TeacherNav nowLocation={"dashboard"} />
      <StyledDashboardContainer padding={2}>
      <DashboardBanner role="선생님" />
        <StyledDashboardSectionFlexBox>
          <Schedule />
          <Memo />
        </StyledDashboardSectionFlexBox>
      </StyledDashboardContainer>
    </FullScreen>
  );
}
