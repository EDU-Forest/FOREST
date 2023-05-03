import Image from "next/image";

import { Title } from "@/styles/text";
import { StyledDashboardBanner } from "./DashboardBanner.style";

import StudentImg from "/public/images/Banner_Student.png";
import TeacherImg from "/public/images/Banner_Teacher.png";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useCheerMsgQuery from "@/apis/dashboard/useCheerMsgQuery";

function DashboardBanner() {
  const { username, role } = useSelector((state: RootState) => state.user);
  const cheerMsg = useCheerMsgQuery().data;
  const changeToKorean = (role: string) => {
    if (role === "TEACHER") {
      return "선생님";
    } else {
      return "학생";
    }
  };

  return (
    <div>
      <StyledDashboardBanner>
        <div>
          <Title>
            안녕하세요, {username} {changeToKorean(role)}!
          </Title>
          <span>{cheerMsg?.content}</span>
        </div>
        <Image src={role === "TEACHER" ? TeacherImg : StudentImg} alt="role" />
      </StyledDashboardBanner>
    </div>
  );
}

export default DashboardBanner;
