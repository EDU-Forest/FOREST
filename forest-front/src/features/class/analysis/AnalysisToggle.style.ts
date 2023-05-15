import { flexBox } from "@/styles/theme";
import styled, { css } from "styled-components";

const ToggleWrapper = styled.div`
  position: relative;
`;

const ToggleContainer = styled.div<{ isSummary: boolean }>`
  ${flexBox("row", "center", "center")}
  width: calc(50% - .75rem);
  height: 4rem;
  border-radius: 1.5rem;
  background-color: white;
  box-shadow: 0rem 0.125rem 1.25rem rgba(0, 0, 0, 0.25);
  cursor: pointer;

  @media ${({ theme }) => theme.desktop} {
    width: calc(25% - 1.5rem);
  }

  ${({ isSummary }) =>
    isSummary &&
    css`
      transition: 0.5s;
    `}
`;

const ToggleCircle = styled.div<{ isSummary: boolean }>`
  position: absolute;
  top: 0rem;
  left: 0rem;
  width: calc((50% - 0.75rem) / 2);
  height: 4rem;
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme.colors.Lime[300]};
  transition: 0.5s;

  @media ${({ theme }) => theme.desktop} {
    width: calc((25% - 1rem) / 2);
  }

  ${({ isSummary }) =>
    !isSummary &&
    css`
      left: calc((50% - 0.75rem) / 2);
      transition: 0.5s;

      @media ${({ theme }) => theme.desktop} {
        left: calc((25% - 2rem) / 2);
      }
    `}
`;

const ToggleText = styled.p<{ selected: boolean }>`
  display: inline-block;
  font-weight: ${({ selected }) => (selected ? "700" : "400")};
  z-index: 10;
  width: calc(50% - 0.75rem);
  text-align: center;
`;

export { ToggleWrapper, ToggleContainer, ToggleCircle, ToggleText };
