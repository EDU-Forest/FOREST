import styled, { css } from "styled-components";
import { flexBox } from "@/styles/theme";
import { positionCenter } from "@/styles/theme";

const StyledClassBtn = styled.button<{ selected: boolean }>`
  display: inline-block;
  font-size: 1rem;
  font-weight: 700;
  width: 30rem;
  height: 3rem;
  line-height: 2.5rem;
  border: 2px solid #74b816;
  border-radius: 1.5rem;
  background-color: ${({ selected, theme }) => (selected ? theme.colors.Lime[700] : "white")};
  color: ${({ selected }) => (selected ? "white" : "black")};
`;

const StyledCommonBtn = styled.button<{ colored: boolean }>`
  display: inline-block;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem 2rem;
  border-radius: 1.25rem;
  border: 2px solid ${({ colored, theme }) => (colored ? "white" : theme.colors.Lime[600])};
  background-color: ${({ colored, theme }) => (colored ? theme.colors.Lime[600] : "white")};
  color: ${({ colored, theme }) => (colored ? "white" : theme.colors.Lime[600])};
`;

const StyledExportBtn = styled.button<{ selected: boolean }>`
  ${flexBox("column", "center", "center")}
  display: inline-block;
  width: 6.75rem;
  height: 7.5rem;
  font-weight: 700;
  padding-top: 0.5rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.Lime[700]};
  background-color: ${({ theme }) => theme.colors.Lime[50]};
  color: ${({ theme }) => theme.colors.Lime[700]};

  ${({ selected }) =>
    !selected &&
    css`
      background-color: white;
      color: ${({ theme }) => theme.colors.Gray[500]};
      border: 1px solid ${({ theme }) => theme.colors.Gray[500]};
    `}
`;

const ExportBtnInner = styled.div`
  ${flexBox("column", "center", "center")}

  .icon {
    font-size: 2rem;
    margin-top: 0.75rem;
    margin-bottom: 0.375rem;
  }
`;

const StyledProblemResultBtn = styled.button<{ isCorrect: boolean }>`
  display: inline-block;
  width: 4rem;
  height: 4rem;
  font-size: 1.375rem;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.colors.Lime[700]};
  color: white;

  ${({ isCorrect }) =>
    !isCorrect &&
    css`
      background-color: ${({ theme }) => theme.colors.Orange[700]};
    `}
`;

const StyledRadioBtn = styled.button<{ color: string }>`
  position: relative;
  width: 1rem;
  height: 1rem;
  padding: 0;
  background-color: white;
  border-radius: 100%;
  border: 1px solid
    ${({ color, theme }) =>
      color === "green"
        ? theme.colors.Lime[700]
        : color === "orange"
        ? theme.colors.Orange[500]
        : theme.colors.Gray[500]};
`;

const RadioInner = styled.div<{ color: string }>`
  ${positionCenter("absolute")}
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: ${({ color, theme }) =>
    color === "green"
      ? theme.colors.Lime[700]
      : color === "orange"
      ? theme.colors.Orange[500]
      : theme.colors.Gray[500]};
`;

const StyledRoleBtn = styled.button<{ selected: boolean }>`
  width: 32rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.Lime[50]};
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  text-align: start;

  .role-name {
    color: ${({ theme }) => theme.colors.Lime[600]};
    margin-right: 1rem;
  }

  .role-detail {
    color: ${({ theme }) => theme.colors.Lime[400]};
    font-size: 0.875rem;
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.colors.Lime[500]};
      border: 2px solid ${({ theme }) => theme.colors.Lime[900]};

      .role-name {
        color: white;
      }

      .role-detail {
        color: ${({ theme }) => theme.colors.Lime[100]};
      }
    `}
`;

const StyledSmallBtn = styled.button<{ colored: boolean }>`
  display: inline-block;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 5rem;
  border: 2px solid ${({ theme }) => theme.colors.Lime[700]};
  background-color: ${({ colored, theme }) => (colored ? theme.colors.Lime[700] : "white")};
  color: ${({ colored, theme }) => (colored ? "white" : theme.colors.Lime[700])};

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.Lime[800]};
    background-color: ${({ colored, theme }) => (colored ? theme.colors.Lime[800] : "white")};
    color: ${({ colored, theme }) => (colored ? "white" : theme.colors.Lime[800])};
  }
`;

const StyledStartBtn = styled.button`
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1rem 8rem;
  border-radius: 3rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.Lime[300]};
  color: white;
`;

export {
  StyledClassBtn,
  StyledCommonBtn,
  StyledExportBtn,
  ExportBtnInner,
  StyledProblemResultBtn,
  StyledRadioBtn,
  RadioInner,
  StyledRoleBtn,
  StyledSmallBtn,
  StyledStartBtn,
};
