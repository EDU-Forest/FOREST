import { StyledCommonBtn } from "@/components/Button/Btn.style";
import CommonBtn from "@/components/Button/CommonBtn";
import { ModalBox } from "@/styles/modal";
import { Title } from "@/styles/text";
import { scrollBar } from "@/styles/theme";
import styled from "styled-components";
import { StyledTestCommonBtn } from "../common/TextCommon.style";

const StyledTestContainer = styled.div`
  /* width: 100vw; */
  position: relative;
  height: 100vh;

  .scroll {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scroll::-webkit-scrollbar {
    display: none;
  }
`;

const StyledAnswerBox = styled.div`
  padding-left: 1.5rem;
  /* width: calc(100vw - 67.25rem); */
  width: 30%;
  min-width: 12rem;
  max-width: 21.5rem;
`;

const StyledTestHeader = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 24px;
  /* position: fixed;
  top: 0; */
`;

const StyledTestHeaderContentBox = styled.div`
  display: flex;
  align-items: center;

  .icon {
    width: 32px;
    height: 32px;
    color: ${({ theme }) => theme.colors.Lime[700]};

    &:hover {
      color: ${({ theme }) => theme.colors.Lime[900]};
    }
  }

  .logo-img {
    width: 5rem;
    cursor: pointer;
  }
`;

const StyledTestHeaderTitle = styled.div`
  margin-left: 32px;
  font-size: 22px;
  font-weight: 700;
`;

const StyledTestHeaderText = styled.div`
  margin-left: 1.5rem;
  font-size: 22px;
`;

// TestContent
const StyledTestContent = styled.div`
  padding: 1.5rem 2rem 1.5rem 2rem;
  display: flex;
  justify-content: center;
  height: calc(100% - 5rem);
`;

const StyledTestProblemBox = styled.div`
  /* width: calc(100vw - 20rem); */
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 33.5rem;
`;

const TestCanvas = styled.div`
  /* position: fixed;
  top: 5rem;
  left: 2rem; */
  z-index: 30;
`;

const StyledTestProblemTitle = styled.div`
  display: flex;
`;

const StyledTestProblemTitleLabel = styled.div`
  width: 56px;
  height: 28px;
  color: white;
  font-weight: 700;
  line-height: 28px;
  border-radius: 4px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.Lime[700]};
`;

const StyledTestProblemTitleContent = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-left: 24px;
`;

const StyledTestProblemText = styled.div`
  border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[600]};
  border-radius: 4px;
  padding: 24px;
  margin: 32px 0px;
  line-height: 150%;
`;

const StyledTestProblemMultipleChoiceAnswer = styled.div`
  padding-top: 2rem;
`;

const StyledTestProblemAnswerNumber = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 22px;

  img {
    max-width: 25rem;
    height: 25rem;
  }
`;

const StyledTestNumberBtn = styled.div<{ isSelected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[600]};
  color: ${({ isSelected, theme }) => (isSelected ? "white" : theme.colors.Lime[600])};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.Lime[600] : theme.colors.Lime[50]};
  text-align: center;
  line-height: 24px;
  font-size: 0.875rem;
  cursor: pointer;
`;

const StyledTestNumberText = styled.div`
  margin-left: 24px;
  font-size: 16px;
  cursor: pointer;
`;

// TestAnswerBox

const StyledUsername = styled(Title)`
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledTestAnswerTable = styled.table`
  /* border: 1px solid ${({ theme }) => theme.colors.Lime[800]}; */
  border-radius: 0.5rem;
  border-style: hidden;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.Lime[800]};
  border-collapse: collapse;
  text-align: center;
  width: 100%;
  table-layout: fixed;

  tbody tr:last-child {
    td:first-child {
      border-radius: 0 0 0 0.5rem;
    }
    td:last-child {
      border-radius: 0 0 0.5rem 0;
    }
  }

  th {
    height: 4rem;
    background-color: ${({ theme }) => theme.colors.Lime[200]};
    color: ${({ theme }) => theme.colors.Lime[900]};
    font-weight: 700;
    border-radius: 0.5rem 0.5rem 0rem 0rem;
  }

  th,
  td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.Lime[700]};
  }

  tr {
    cursor: pointer;

    td {
      padding: 0.75rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    }

    & td:nth-child(2) {
      background-color: white;
    }
  }
`;

const ProblemTr = styled.tr<{ isEnded: boolean; isCorrect: boolean }>`
  &:hover {
    td {
      background-color: ${({ isEnded, isCorrect, theme }) =>
        (isEnded && isCorrect) || !isEnded ? theme.colors.Lime[300] : theme.colors.Orange[300]};
    }
  }
`;

const ProblemNumTd = styled.td<{ isEnded: boolean; isCorrect: boolean }>`
  width: 10%;
  background-color: ${({ isEnded, isCorrect, theme }) =>
    isEnded
      ? isCorrect
        ? theme.colors.Lime[200]
        : theme.colors.Orange[200]
      : theme.colors.Lime[200]};
  color: ${({ isEnded, isCorrect, theme }) =>
    isEnded
      ? isCorrect
        ? theme.colors.Lime[700]
        : theme.colors.Orange[700]
      : theme.colors.Lime[700]};
`;

const StyledTestSubmitBtn = styled(StyledCommonBtn)`
  margin: 1.5rem 0rem;
  width: 100%;
  border-radius: 0.5rem;

  &:hover {
    border: 0.125rem solid ${({ theme }) => theme.colors.Lime[600]};
    background-color: ${({ theme }) => theme.colors.Lime[600]};
    color: white;
  }
`;

const StyledTestProblemShortAnswer = styled.input`
  width: 100%;
  height: 3.5rem;
  line-height: 3.5rem;
  padding: 0rem 1.5rem;
  margin: 2rem 0rem;
  background-color: ${({ theme }) => theme.colors.Gray[50]};
  border: none;
  border-radius: 0.5rem;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.Gray[500]};
    padding: 0rem 1.5rem;
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.Gray[500]};
  }
`;

const StyledTestProblemEssayAnswer = styled.textarea`
  width: 100%;
  height: 11.5rem;
  padding: 1.5rem;
  margin: 2rem 0rem;
  background-color: ${({ theme }) => theme.colors.Gray[50]};
  border: none;
  border-radius: 0.5rem;
  resize: none;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.Gray[500]};
    padding: 1.5rem;
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.Gray[500]};
  }
`;

const StyledTestProblemOXAnswer = styled.div<{ selectedMenu: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;

  .correct-icon {
    width: 9.25rem;
    height: 9.25rem;
    cursor: pointer;
    color: ${({ selectedMenu, theme }) =>
      selectedMenu === "O" ? theme.colors.Orange[600] : theme.colors.Gray[600]};

    &:hover {
      color: ${({ selectedMenu, theme }) =>
        selectedMenu === "O" ? theme.colors.Orange[700] : theme.colors.Gray[700]};
    }
  }

  .wrong-icon {
    width: 11.5rem;
    height: 11.5rem;
    cursor: pointer;
    color: ${({ selectedMenu, theme }) =>
      selectedMenu === "X" ? theme.colors.Orange[600] : theme.colors.Gray[600]};

    &:hover {
      color: ${({ selectedMenu, theme }) =>
        selectedMenu === "X" ? theme.colors.Orange[700] : theme.colors.Gray[700]};
    }
  }
`;

const TestProblemBtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const TestProblemBtn = styled(StyledCommonBtn)`
  margin: 0.5rem;

  &:hover {
    background-color: ${({ theme, colored }) => colored && theme.colors.Lime[700]};
    border: 0.125rem solid
      ${({ theme, colored }) => (colored ? theme.colors.Lime[700] : theme.colors.Lime[900])};
    color: ${({ theme, colored }) => !colored && theme.colors.Lime[900]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.Gray[500]};
    color: #ffffff;
    border: none;
    cursor: auto;
  }
`;

const TestEndModalBox = styled(ModalBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5rem 3.5rem;

  > p {
    font-size: 1rem;
    font-weight: 700;
    padding-bottom: 1rem;
  }
`;

const TestWarningBox = styled.div`
  padding: 0.5rem 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.Orange[50]};
  color: ${({ theme }) => theme.colors.Orange[700]};
  border-radius: 0.5rem;
  margin: 0.5rem 0rem;

  p {
    font-size: 0.875rem;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.25rem;
  }
`;

const TestEndBox = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.375rem;
    font-weight: 700;
  }
`;

const TestEndBtn = styled(StyledTestCommonBtn)`
  margin-top: 2rem;
`;

const TestProblemAnswerBox = styled.div`
  margin-top: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.Orange[900]};

  & div:first-child {
    padding: 0.75rem;
    background-color: ${({ theme }) => theme.colors.Orange[200]};
    border-radius: 0.5rem 0rem 0rem 0.5rem;
    color: ${({ theme }) => theme.colors.Orange[900]};
  }

  & div:last-child {
    padding: 0.75rem 2rem;
    /* background-color: ${({ theme }) => theme.colors.Gray[100]}; */
    color: ${({ theme }) => theme.colors.Gray[700]};
    border-radius: 0rem 0.5rem 0.5rem 0rem;
  }
`;

const TestProblemSection = styled.section`
  height: calc(100% - 7rem);
  padding: 1.5rem 0rem 1.5rem 1.5rem;
  background-color: white;
  box-shadow: 0rem 0rem 1.25rem 0.125rem rgba(0, 0, 0, 0.1);
  border-radius: 1.5rem;
`;

const TestProblemContentBox = styled.div`
  width: 99%;
  padding: 1.5rem;
  height: 100%;
  overflow: auto;
  ${scrollBar(0.75)}
`;

const TestProblemImgBox = styled.div`
  padding: 2rem;
  text-align: center;

  img {
    max-width: 25rem;
    height: 25rem;
  }
`;

export {
  StyledTestContainer,
  StyledAnswerBox,
  StyledTestHeader,
  StyledTestHeaderContentBox,
  StyledTestHeaderTitle,
  StyledTestHeaderText,
  StyledTestContent,
  StyledTestProblemBox,
  StyledTestProblemTitle,
  StyledTestProblemTitleLabel,
  StyledTestProblemTitleContent,
  StyledTestProblemText,
  StyledTestProblemMultipleChoiceAnswer,
  StyledTestProblemAnswerNumber,
  StyledTestNumberBtn,
  StyledTestNumberText,
  StyledUsername,
  StyledTestAnswerTable,
  ProblemNumTd,
  StyledTestSubmitBtn,
  StyledTestProblemShortAnswer,
  StyledTestProblemEssayAnswer,
  StyledTestProblemOXAnswer,
  TestProblemBtnBox,
  TestProblemBtn,
  TestEndModalBox,
  TestWarningBox,
  TestEndBox,
  TestEndBtn,
  TestProblemAnswerBox,
  TestProblemSection,
  TestProblemContentBox,
  TestCanvas,
  TestProblemImgBox,
  ProblemTr,
};
