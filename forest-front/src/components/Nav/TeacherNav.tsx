// import logo from "@/assets/Forest_Logo.png";
import {
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineBook,
  AiOutlineEdit,
  AiOutlineSearch,
} from "react-icons/ai";
import { useRouter } from "next/router";
import { StyledNav, TeacherNavDiv, NavInner, LogoutParagraph } from "./Nav.style";
import { useDispatch } from "react-redux";
import { setLogout } from "@/stores/user/user";
import { removeItemLocalStorage } from "@/utils/localStorage";

interface Iprops {
  nowLocation: string;
}

export default function TeacherNav({ nowLocation }: Iprops) {
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

  const logoutHandler = () => {
    dispatch(setLogout());
    removeItemLocalStorage("forest_access_token");
    router.push("/");
  };

  return (
    <StyledNav>
      <img src={"/images/Forest_Logo.png"} className="logo-img" />
      <TeacherNavDiv>
        <NavInner
          selected={checkSelection("dashboard")}
          onClick={() => movePage("teacher/dashboard")}
        >
          <AiOutlineHome className="icon" />
          대시보드
        </NavInner>
        <NavInner selected={checkSelection("class")} onClick={() => movePage("teacher/class")}>
          <AiOutlineTeam className="icon" />
          클래스
        </NavInner>
        <NavInner selected={checkSelection("workbook")} onClick={() => movePage("workbook")}>
          <AiOutlineBook className="icon" />
          문제
        </NavInner>
        <NavInner selected={checkSelection("editor")} onClick={() => movePage("editor")}>
          <AiOutlineEdit className="icon" />
          에디터
        </NavInner>
        <NavInner selected={checkSelection("search")} onClick={() => movePage("search")}>
          <AiOutlineSearch className="icon" />
          탐색
        </NavInner>
      </TeacherNavDiv>
      <LogoutParagraph onClick={logoutHandler}>로그아웃</LogoutParagraph>
    </StyledNav>
  );
}
