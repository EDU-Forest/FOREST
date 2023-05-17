import useRecentClassIdQuery from "@/apis/class/useRecentClassIdQuery";
import TeacherNav from "@/components/Nav/TeacherNav";
import {
  StyledDashboardContainer,
  StyledDashboardSectionFlexBox,
} from "@/features/dashboard/Dashboard.style";
import DashboardBanner from "@/features/dashboard/DashboardBanner";
import Schedule from "@/features/dashboard/Schedule";
import Memo from "@/features/dashboard/teacher/Memo";
import { RootState } from "@/stores/store";
import { FullScreen } from "@/styles/container";
import withAuth from "@/utils/auth/withAuth";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function TeacherDashBoard() {
  useRecentClassIdQuery();
  const { nowClassId } = useSelector((state: RootState) => state.class);
  useEffect(() => {
    console.log(nowClassId, typeof nowClassId);
  }, []);

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
