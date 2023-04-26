import { flexBox } from "@/styles/theme";
import styled, { css } from "styled-components";

const ToggleWrapper = styled.div`
  position: relative;
`;

const ToggleContainer = styled.div<{ isSummary: boolean }>`
  ${flexBox("row", "center", "center")}
  width: calc(50% - 0.75rem);
  height: 64px;
  border-radius: 24px;
  background-color: white;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.25);
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
  top: 0px;
  left: 0px;
  width: calc((50% - 0.75rem) / 2);
  height: 64px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.Lime[300]};
  transition: 0.5s;

  @media ${({ theme }) => theme.desktop} {
    width: calc((25% - 1.5rem) / 2);
  }

  ${({ isSummary }) =>
    !isSummary &&
    css`
      left: 140px;
      transition: 0.5s;
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
