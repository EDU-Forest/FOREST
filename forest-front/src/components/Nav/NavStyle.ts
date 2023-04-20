import styled, { css } from "styled-components";
import { flexBox } from "@/styles/theme";

export const StyledNav = styled.div`
  display: inline-block;
  position: relative;
  width: 14rem;
  height: 100vh;
  background-color: white;
  .logo-img {
    width: 6rem;
  }

  @media ${({ theme }) => theme.tablet} {
    width: 5rem;
    .logo-img {
      width: 5rem;
    }
  }
`;

export const TeacherNavDiv = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  cursor: pointer;
`;

export const StudentNavDiv = styled.div`
  position: absolute;
  top: 40%;
  transform: translate(0%, -40%);
  cursor: pointer;
`;

export const NavInner = styled.div<{ selected: boolean }>`
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
