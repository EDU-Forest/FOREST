import styled, { css } from "styled-components";
import { flexBox } from "@/styles/theme";

const StyledNav = styled.div`
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

const TeacherNavDiv = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  cursor: pointer;
`;

const StudentNavDiv = styled.div`
  position: absolute;
  top: 40%;
  transform: translate(0%, -40%);
  cursor: pointer;
`;

const NavInner = styled.div<{ selected: boolean }>`
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
    border-left: .1875rem solid  ${({ theme }) => theme.colors.Lime[900]}};
    `} 
`;

const StyledEditorNav = styled.div`
  display: inline-block;
  position: relative;
  width: 10.75rem;
  height: 100vh;
  background-color: white;
`;

const ArrowDiv = styled.div`
  padding: 1rem;
  font-size: 2rem;
  color:  ${({ theme }) => theme.colors.Lime[900]}};
`;

const EditorNavDivTitle = styled.div<{ isObject: boolean }>`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.Lime[700]};
  background-color: ${({ theme }) => theme.colors.Lime[50]};
  padding: 0.5rem 1.5rem;

  ${({ isObject }) =>
    isObject &&
    css`
      color: white;
      background-color: ${({ theme }) => theme.colors.Lime[600]};
    `}
`;

const EditorNavDiv = styled.div`
  ${flexBox("row", "start", "space-between")}
  flex-wrap: wrap;
  padding: 1.5rem;
  font-weight: 600;

  p {
    width: 6rem;
    margin: 0;
    margin-bottom: 1.5rem;
    cursor: pointer;
  }
`;

const EditorNavDivInner = styled.div`
  ${flexBox("column", "center", "center")}
  font-size: .875rem;
  width: 3rem;
  margin-bottom: 1rem;
  cursor: pointer;

  .ox-div {
    height: 2rem;

    span {
      font-weight: 700;
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.Gray[600]};
      line-height: 2rem;
      margin-left: 0.25rem;
      margin-right: 0.25rem;
    }
  }

  .icon {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.Gray[600]};
    margin-bottom: 0.25rem;
  }

  .object {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.Gray[600]};
    margin-bottom: 0.25rem;
  }
`;

export {
  StyledNav,
  TeacherNavDiv,
  StudentNavDiv,
  NavInner,
  StyledEditorNav,
  ArrowDiv,
  EditorNavDivTitle,
  EditorNavDiv,
  EditorNavDivInner,
};
