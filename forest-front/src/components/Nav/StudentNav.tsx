import { AiOutlineHome, AiOutlineTeam } from "react-icons/ai";
import { useRouter } from "next/router";
import { StyledNav, StudentNavDiv, NavInner, LogoutParagraph, NavBottom } from "./Nav.style";
import useAuth from "@/hooks/useAuth";
import { BsQuestionCircle } from "react-icons/bs";
import GuideIcon from "@/features/guide/GuideIcon";

interface Iprops {
  nowLocation: string;
}

export default function StudentNav({ nowLocation }: Iprops) {
  const router = useRouter();
  const { logout } = useAuth();

  // 페이지 이동
  const movePage = (path: string) => {
    router.push(`/${path}`, undefined, { shallow: true });
  };

  // 현재 위치 네비바 css 스타일 true
  const checkSelection = (path: string) => {
    if (nowLocation === path) {
      return true;
    } else {
      return false;
    }
  };

  // 로그아웃
  const logoutHandler = () => {
    logout();
  };

  // 홈으로 이동
  const goToDashBoard = () => {
    router.push(`/student/dashboard`, undefined, { shallow: true });
  };

  return (
    <StyledNav>
      <img src={"/images/Forest_Logo.png"} className="logo-img" onClick={goToDashBoard} />
      <StudentNavDiv>
        <NavInner
          selected={checkSelection("dashboard")}
          onClick={() => movePage("student/dashboard")}
        >
          <AiOutlineHome className="icon" />
          대시보드
        </NavInner>
        <NavInner selected={checkSelection("class")} onClick={() => movePage("student/class")}>
          <AiOutlineTeam className="icon" />
          클래스
        </NavInner>
      </StudentNavDiv>

      <NavBottom>
        <GuideIcon />
        <LogoutParagraph onClick={logoutHandler}>로그아웃</LogoutParagraph>
      </NavBottom>
    </StyledNav>
  );
}
