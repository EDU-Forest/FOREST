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
    cursor: pointer;
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
`;

const StudentNavDiv = styled.div`
  position: absolute;
  top: 40%;
  transform: translate(0%, -40%);
  cursor: pointer;
`;

const NavInner = styled.div<{ selected: boolean }>`
  color: ${({ theme }) => theme.colors.Gray[500]};
  ${flexBox("row", "center", "start")};
  width: 14rem;
  height: 5rem;
  cursor: pointer;

  .icon {
    font-size: 2.5rem;
    margin: 1.25rem 1.75rem 1.25rem 2rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.Gray[600]};
    background-color: ${({ theme }) => theme.colors.Gray[100]};
  }

  @media ${({ theme }) => theme.tablet} {
    ${flexBox("column", "center", "center")}
    width: 5rem;
    font-size: 0.8125rem;

    .icon {
      font-size: 1.75rem;
      margin: 0.5rem;
    }
  }

  ${({ selected }) =>
    selected &&
    css`
      font-weight: 700;
      color: ${({ theme }) => theme.colors.Lime[800]};
      background-color: ${({ theme }) => theme.colors.Lime[50]};
      border-left: 0.1875rem solid ${({ theme }) => theme.colors.Lime[800]};

      &:hover {
        color: ${({ theme }) => theme.colors.Lime[900]};
        background-color: ${({ theme }) => theme.colors.Lime[100]};
      }
    `}
`;

const StyledEditorNav = styled.div`
  display: inline-block;
  position: relative;
  width: 10.75rem;
  height: 100vh;
  background-color: white;

  .upload-problem {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const ArrowDiv = styled.div`
  padding: 1rem;
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
  /* padding: 1.5rem; */
  font-weight: 600;

  p {
    width: 100%;
    margin: 0;
    /* margin-bottom: 1.5rem; */
    padding: 0.75rem 1rem;
    cursor: pointer;
    font-size: 0.875rem;

    &:hover {
      background-color: ${({ theme }) => theme.colors.Gray[100]};
    }
  }

  .upload-problem {
    background-color: pink;
  }
`;

const EditorNavDivInner = styled.div`
  ${flexBox("column", "center", "center")}
  font-size: .875rem;
  /* width: 3rem; */
  width: 50%;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .ox-div {
    height: 2rem;
    margin-bottom: 0.25rem;

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

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray[100]};
  }
`;

const NavBottom = styled.div`
  ${flexBox("column", "center", "center")}
  gap: 0.75rem;
  position: absolute;
  top: 92%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  color: ${({ theme }) => theme.colors.Gray[500]};

  svg {
    font-size: 1.25rem;
    &:hover {
      color: ${({ theme }) => theme.colors.Orange[700]};
    }
  }

  @media ${({ theme }) => theme.desktop} {
    left: 50%;
    width: 80%;
    top: 95%;
    ${flexBox("row-reverse", "center", "space-between")}

    svg {
      font-size: 1.5rem;
    }
  }
`;

const LogoutParagraph = styled.p`
  color: ${({ theme }) => theme.colors.Gray[500]};
  font-size: 0.875rem;

  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.Gray[600]};
  }

  @media ${({ theme }) => theme.tablet} {
    font-size: 0.75rem;
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
  NavBottom,
  LogoutParagraph,
};
