import { flexBox, positionCenter } from "@/styles/theme";
import styled, { css } from "styled-components";

const StyledClassBtn = styled.button<{ selected: boolean }>`
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  width: 480px;
  height: 48px;
  line-height: 40px;
  border: 0.125rem solid #74b816;
  border-radius: 24px;
  background-color: ${({ selected, theme }) => (selected ? theme.colors.Lime[700] : "white")};
  color: ${({ selected }) => (selected ? "white" : "black")};
`;

const StyledCommonBtn = styled.button<{
  disabled?: boolean;
  colored?: boolean;
  isYellowGreen?: boolean;
}>`
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  padding: 8px 32px;
  border-radius: 20px;
  border: 0.125rem solid ${({ theme }) => theme.colors.Lime[600]};
  background-color: white;
  color: ${({ theme }) => theme.colors.Lime[600]};

  &:disabled {
    border: 0.125rem solid ${({ theme }) => theme.colors.Gray[300]};
    background-color: white;
    color: ${({ theme }) => theme.colors.Gray[300]};
  }

  ${({ colored }) =>
    colored &&
    css`
      border: 0.125rem solid ${({ theme }) => theme.colors.Lime[600]};
      background-color: ${({ theme }) => theme.colors.Lime[600]};
      color: white;
    `}

  ${({ isYellowGreen }) =>
    isYellowGreen &&
    css`
      border: 0.125rem solid ${({ theme }) => theme.colors.Lime[100]};
      background-color: ${({ theme }) => theme.colors.Lime[100]};
      color: ${({ theme }) => theme.colors.Lime[600]};
    `}
`;

const StyledExportBtn = styled.button<{ selected: boolean }>`
  ${flexBox("column", "center", "center")}
  display: inline-block;
  width: 108px;
  height: 120px;
  font-weight: 700;
  padding-top: 8px;
  border-radius: 16px;
  border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[700]};
  background-color: ${({ theme }) => theme.colors.Lime[50]};
  color: ${({ theme }) => theme.colors.Lime[700]};

  ${({ selected }) =>
    !selected &&
    css`
      background-color: white;
      color: ${({ theme }) => theme.colors.Gray[500]};
      border: 0.0625rem solid ${({ theme }) => theme.colors.Gray[500]};
    `}
`;

const ExportBtnInner = styled.div`
  ${flexBox("column", "center", "center")}

  .icon {
    font-size: 32px;
    margin-top: 12px;
    margin-bottom: 6px;
  }
`;

const StyledProblemResultBtn = styled.button<{ isCorrect: boolean }>`
  display: inline-block;
  width: 64px;
  height: 64px;
  font-size: 22px;
  font-weight: 700;
  border-radius: 0.5rem;
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
  width: 16px;
  height: 16px;
  padding: 0;
  background-color: white;
  border-radius: 100%;
  border: 0.0625rem solid
    ${({ color, theme }) =>
      color === "green"
        ? theme.colors.Lime[700]
        : color === "orange"
        ? theme.colors.Orange[500]
        : theme.colors.Gray[500]};
`;

const RadioInner = styled.div<{ color: string }>`
  ${positionCenter("absolute")}
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: ${({ color, theme }) =>
    color === "green"
      ? theme.colors.Lime[700]
      : color === "orange"
      ? theme.colors.Orange[500]
      : theme.colors.Gray[500]};
`;

const StyledRoleBtn = styled.button<{ selected: boolean }>`
  margin-top: 8px;
  width: 512px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.Lime[50]};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  text-align: start;
  position: relative;

  .role-name {
    color: ${({ theme }) => theme.colors.Lime[600]};
    margin-right: 16px;
  }

  .role-detail {
    color: ${({ theme }) => theme.colors.Lime[400]};
    font-size: 14px;
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.colors.Lime[500]};
      border: 0.125rem solid ${({ theme }) => theme.colors.Lime[900]};

      .role-name {
        color: white;
      }

      .role-detail {
        color: ${({ theme }) => theme.colors.Lime[100]};
      }

      .icon {
        position: absolute;
        top: 50%;
        left: 95%;
        transform: translate(-50%, -50%);
        color: ${({ theme }) => theme.colors.Lime[900]};
      }
    `}
`;

const StyledSmallBtn = styled.button<{ colored?: boolean }>`
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  padding: 8px;
  border-radius: 8px;
  width: 80px;
  height: 40px;
  border: 0.125rem solid ${({ theme }) => theme.colors.Lime[700]};
  background-color: ${({ colored, theme }) => (colored ? theme.colors.Lime[700] : "white")};
  color: ${({ colored, theme }) => (colored ? "white" : theme.colors.Lime[700])};

  &:hover {
    border: 0.125rem solid ${({ theme }) => theme.colors.Lime[800]};
    background-color: ${({ colored, theme }) => (colored ? theme.colors.Lime[800] : "white")};
    color: ${({ colored, theme }) => (colored ? "white" : theme.colors.Lime[800])};
  }
`;

const StyledStartBtn = styled.button`
  display: inline-block;
  font-size: 24px;
  font-weight: 700;
  padding: 16px 128px;
  border-radius: 48px;
  border: none;
  background-color: ${({ theme }) => theme.colors.Lime[300]};
  color: white;
`;

const StyledTextBtn = styled.button`
  color: ${({ theme }) => theme.colors.Gray[600]};
  background-color: transparent;
  border: none;
  padding: 0;

  :active {
    color: ${({ theme }) => theme.colors.Gray[700]};
  }
`;

const StyledRoundSolid600Btn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem 1rem;
  gap: 0.5rem;

  background-color: ${({ theme }) => theme.colors.Lime[600]};
  border-radius: 24px;
  border: none;
  color: white;
  font-weight: bold;

  // 버튼 내 아이콘
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.Lime[700]};
  }
  :active {
    background-color: ${({ theme }) => theme.colors.Lime[800]};
  }
`;

const StyledRoundGhostBtn = styled(StyledRoundSolid600Btn)`
  background-color: white;
  border: 2px solid ${({ theme }) => theme.colors.Lime[600]};
  color: ${({ theme }) => theme.colors.Lime[600]};

  :hover {
    background-color: ${({ theme }) => theme.colors.Lime[100]};
  }
  :active {
    background-color: ${({ theme }) => theme.colors.Lime[200]};
  }
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
  StyledTextBtn,
  StyledRoundSolid600Btn,
  StyledRoundGhostBtn,
};
