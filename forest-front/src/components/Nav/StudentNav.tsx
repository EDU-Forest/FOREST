import styled, { css } from "styled-components";
import logo from "@/assets/Forest_Logo.png";
import { AiOutlineHome, AiOutlineTeam } from "react-icons/ai";
import { flexBox } from "@/styles/theme";
import { useRouter } from "next/router";
import { StyledNav, StudentNavDiv, NavInner } from "./NavStyle";

interface Iprops {
  nowLocation: string;
}

export default function StudentNav({ nowLocation }: Iprops) {
  const router = useRouter();

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

  return (
    <StyledNav>
      <img src={logo.src} className="logo-img" />
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
    </StyledNav>
  );
}
