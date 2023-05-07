// import logo from "@/assets/Forest_Logo.png";
import { AiOutlineHome, AiOutlineTeam } from "react-icons/ai";
import { useRouter } from "next/router";
import { StyledNav, StudentNavDiv, NavInner, LogoutParagraph } from "./Nav.style";
import { useDispatch } from "react-redux";
import { setLogout } from "@/stores/user/user";
import { removeItemLocalStorage } from "@/utils/localStorage";

interface Iprops {
  nowLocation: string;
}

export default function StudentNav({ nowLocation }: Iprops) {
  const router = useRouter();
  const dispatch = useDispatch();

  // 페이지 이동
  const movePage = (path: string) => {
    router.push(`/${path}`);
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
    dispatch(setLogout());
    removeItemLocalStorage("forest_access_token");
    router.push("/");
  };

  return (
    <StyledNav>
      <img src={"/images/Forest_Logo.png"} className="logo-img" />
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
      <LogoutParagraph onClick={logoutHandler}>로그아웃</LogoutParagraph>
    </StyledNav>
  );
}
