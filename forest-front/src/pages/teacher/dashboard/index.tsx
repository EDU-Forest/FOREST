import TeacherNav from "@/components/Nav/TeacherNav";
import {
  StyledDashboardContainer,
  StyledDashboardSectionFlexBox,
} from "@/features/dashboard/Dashboard.style";
import DashboardBanner from "@/features/dashboard/DashboardBanner";
import Schedule from "@/features/dashboard/Schedule";
import Memo from "@/features/dashboard/teacher/Memo";
import { FullScreen } from "@/styles/container";
import withAuth from "@/utils/auth/withAuth";
import { useEffect } from "react";

function TeacherDashBoard() {
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

export default withAuth(TeacherDashBoard);
