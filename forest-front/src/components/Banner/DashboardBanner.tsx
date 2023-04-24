import Image from "next/image";

import { Title } from "@/styles/text";
import { StyledDashboardBanner } from "./Banner.style";

import StudentImg from "/public/images/Banner_Student.png";
import TeacherImg from "/public/images/Banner_Teacher.png";

function DashboardBanner() {
  // 더미
  const name: string = "킹규림";
  const role: string = "선생님";
  const text: string = "오늘도 즐거운 하루!";

  return (
    <div>
      <StyledDashboardBanner>
        <div>
          <Title>
            안녕하세요 {name} {role}
          </Title>
          <span>{text}</span>
        </div>
        <Image src={role === "선생님" ? TeacherImg : StudentImg} alt="role" />
      </StyledDashboardBanner>
    </div>
  );
}

export default DashboardBanner;
