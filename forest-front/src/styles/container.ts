import styled, { css } from "styled-components";
import { flexBox } from "./theme";

export const FullScreen = styled.div`
  ${flexBox("row", "center", "center")}
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
`;

export const Container = styled.div<{ isEditor?: boolean }>`
  width: calc(100% - 14rem);

  ${({ isEditor }) =>
    isEditor &&
    css`
      width: calc(100% - 10.75rem);
    `};

  height: 100vh;
  background-color: ${({ theme }) => theme.colors.Gray[50]};
  overflow-x: hidden;
  overflow-y: auto;

  @media ${({ theme }) => theme.tablet} {
    width: calc(100% - 5rem);
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 1px solid transparent;
    border-radius: 3rem;
    background-color: ${({ theme }) => theme.colors.Lime[300]};
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.Gray[200]};
  }
`;
