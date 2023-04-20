import styled, { css } from "styled-components";
import logo from "@/assets/Forest_Logo.png";
import {
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineBook,
  AiOutlineEdit,
  AiOutlineSearch,
} from "react-icons/ai";
import { flexBox } from "@/styles/theme";
import { useRouter } from "next/router";

const StyledTeacherNav = styled.div`
  display: inline-block;
  position: relative;
  width: 14rem;
  height: 100vh;
  background-color: white;

  @media ${({ theme }) => theme.desktop} {
    .logo-img {
      width: 6rem;
    }
  }

  @media ${({ theme }) => theme.tablet} {
    width: 5rem;
    .logo-img {
      width: 5rem;
    }
  }
`;

const TeacherNavDiv = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  cursor: pointer;
`;

const TeacherNavInner = styled.div<{ selected: boolean }>`
  color:  ${({ theme }) => theme.colors.Gray[500]}}
  ${flexBox("row", "center", "start")}
  width: 14rem;
  height: 5rem;

  .icon {
    font-size: 2.5rem;
    margin: 1.25rem 1.75rem 1.25rem 2rem;
  }

  @media ${({ theme }) => theme.tablet} {
    ${flexBox("column", "center", "center")}
    width: 5rem;
    height: 4.5rem;
    font-size: .8125rem;

    .icon {
      font-size: 1.75rem;
      margin: .5rem;
    }
  }

  ${({ selected }) =>
    selected &&
    css`
    font-weight: 700;
    color: ${({ theme }) => theme.colors.Lime[900]}};
    background-color: ${({ theme }) => theme.colors.Lime[50]}};
    border-left: 3px solid  ${({ theme }) => theme.colors.Lime[900]}};
    `} 
`;

interface Iprops {
  nowLocation: string;
}

export default function TeacherNav({ nowLocation }: Iprops) {
  const router = useRouter();
  const movePage = (path: string) => {
    router.push(`/${path}`);
  };

  const checkSelection = (path: string) => {
    if (nowLocation === path) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <StyledTeacherNav>
      <img src={logo.src} className="logo-img" />
      <TeacherNavDiv>
        <TeacherNavInner
          selected={checkSelection("dashboard")}
          onClick={() => movePage("dashboard")}
        >
          <AiOutlineHome className="icon" />
          대시보드
        </TeacherNavInner>
        <TeacherNavInner selected={checkSelection("class")} onClick={() => movePage("class")}>
          <AiOutlineTeam className="icon" />
          클래스
        </TeacherNavInner>
        <TeacherNavInner selected={checkSelection("workbook")} onClick={() => movePage("workbook")}>
          <AiOutlineBook className="icon" />
          문제
        </TeacherNavInner>
        <TeacherNavInner selected={checkSelection("editor")} onClick={() => movePage("editor")}>
          <AiOutlineEdit className="icon" />
          에디터
        </TeacherNavInner>
        <TeacherNavInner selected={checkSelection("search")} onClick={() => movePage("search")}>
          <AiOutlineSearch className="icon" />
          탐색
        </TeacherNavInner>
      </TeacherNavDiv>
    </StyledTeacherNav>
  );
}
