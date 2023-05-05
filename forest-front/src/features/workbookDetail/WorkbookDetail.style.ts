import { theme } from "./../../styles/theme";
import { StyledRoundSolid600Btn } from "@/components/Button/Btn.style";
import { WorkbookImg } from "@/components/Workbook/Workbook.style";
import { ModalBox } from "@/styles/modal";
import styled, { keyframes } from "styled-components";

export const StyledWorkbookDetailBox = styled.div`
  min-height: 100vh;

  display: flex;

  padding: 32px;
  gap: 24px;

  background-color: ${({ theme }) => theme.colors.Gray[50]};
`;

export const WorkbookDetailSideReturnBtnBox = styled.button`
  height: fit-content;

  margin-right: 8px;
  display: flex;

  background-color: transparent;
  border: none;

  svg {
    width: 32px;
    height: 32px;

    fill: ${({ theme }) => theme.colors.Lime[900]};
  }
`;

export const StyledWorkbookDetailInfoOverviewBox = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 24px;
  padding: 1.5rem 32px;

  background: ${({ theme }) => theme.colors.Lime[50]};
  border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[700]};
  border-radius: 1.5rem;

  > div:first-child {
    // 문제집 제목
    > div:first-child {
      margin-bottom: 12px;

      font-size: 22px;
      font-weight: bold;

      @media ${({ theme }) => theme.tablet} {
        font-size: 1rem;
      }
    }

    // 문제집 설명
    > div:last-child {
      margin-top: 16px;

      font-size: 16px;
      color: ${({ theme }) => theme.colors.Gray[600]};
    }
  }

  // 우측의 표지 및 접기 버튼
  > div:last-child {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    margin-left: 24px;
    gap: 24px;
  }
`;

export const StyledWorkbookBtnsBox = styled.div`
  display: flex;
  gap: 32px;

  > div:last-child {
    span {
      margin: 0 0.5rem;
      color: ${({ theme }) => theme.colors.Gray[400]};
    }
  }
`;

export const StyledWorkbookReactionBtnsBox = styled.div`
  display: flex;
  gap: 16px;
`;

export const StyledWorkbookDetailDescBox = styled.div<{ isFolded: boolean }>`
  display: ${({ isFolded }) => isFolded && "none"};
`;

export const StyledWorkbookDetailCoverBox = styled(WorkbookImg)<{ isFolded: boolean }>`
  display: ${({ isFolded }) => isFolded && "none"};
`;

export const StyledWorkbookDetailBtnsBox = styled.div`
  min-width: 344px;

  display: flex;

  margin-bottom: 24px;
  gap: 16px;

  @media ${({ theme }) => theme.tablet} {
    span {
      display: none;
    }
  }
`;

export const StyledWorkbookDetailQuestionListBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 24px;

  background: ${({ theme }) => theme.colors.Gray[100]};
  border: 0.0625rem solid ${({ theme }) => theme.colors.Gray[500]};
  border-radius: 1.5rem;
`;

export const WorkbookDetailQuestionOverviewAndContentBox = styled.div`
  flex: 1;
`;

export const WorkbookDetailQuestionBtnAndVisibilityBox = styled.div`
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.tablet} {
    max-width: 216px;
  }
`;

export const StyledToggleBtn = styled.button`
  width: 3rem;
  height: 1.5rem;

  display: flex;
  align-items: center;

  padding: 0.25rem;

  background: ${({ theme }) => theme.colors.Lime[600]};
  border-radius: 0.75rem;
  border: none;

  transition: all 0.2s ease-in-out;
`;

export const StyledToggleCircleBtn = styled.button<{ isPublic: boolean }>`
  width: 1rem;
  height: 1rem;

  box-shadow: 0rem 0rem 0.1875rem rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 50%;

  transform: ${({ isPublic }) => (isPublic ? "translate(0rem, 0)" : "translate(1.5rem, 0)")};
  transition: all 0.2s ease-in-out;
`;

export const StyledWorkbookDetailQuestionVisibilityBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span:first-child {
    color: ${({ theme }) => theme.colors.Gray[500]};
  }
`;

export const ToggleBox = styled.div`
  display: flex;
  gap: 1.5rem;

  span {
    font-weight: bold;
  }
`;

export const StyledWorkbookDetailQuestionListContentBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  margin-top: 1rem;
  padding: 1.5rem 1rem;
  gap: 1rem;

  background: #ffffff;
  border-radius: 0.5rem;

  p {
    font-weight: bold;
  }
`;

export const StyledWorkbookQuestionMoveBarListBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
`;

export const StyledWorkbookQuestionMoveBar = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;

  padding: 0.5rem 0.75rem;

  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.Lime[200] : theme.colors.Gray[100]};
  border-radius: 0.5rem;
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.Lime[800] : theme.colors.Gray[800]};
  font-weight: ${({ isSelected }) => isSelected && "bold"};

  cursor: grab;

  :hover {
    background-color: ${({ isSelected, theme }) => !isSelected && theme.colors.Gray[200]};
  }
  :active {
    background-color: ${({ isSelected, theme }) => !isSelected && theme.colors.Gray[300]};
  }

  span {
    white-space: nowrap;

    // 문제 번호
    :nth-of-type(1) {
      font-weight: 600;
    }

    // 문제 제목
    :nth-of-type(2) {
      max-width: 10.5rem;
      overflow: hidden;
      text-overflow: ellipsis;

      @media ${({ theme }) => theme.tablet} {
        max-width: 48px;
      }
    }
  }

  // move icon
  > svg:first-child {
    width: 20px;
    height: 20px;

    margin-right: 0.25rem;
    fill: ${({ isSelected, theme }) =>
      isSelected ? theme.colors.Lime[800] : theme.colors.Gray[800]};
  }

  // delete icon
  > svg:last-child {
    width: 16px;
    height: 16px;

    display: flex;
    margin-left: auto;
    fill: ${({ isSelected, theme }) =>
      isSelected ? theme.colors.Lime[800] : theme.colors.Gray[600]};
  }
`;

// 문제 스타일
export const StyledWorkbookDetailQuestionBox = styled.div`
  padding: 40px 2rem;

  background: #ffffff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
`;

// 문제 숫자, 제목
export const StyledQuestionDetailTitleBox = styled.div`
  display: flex;
  align-items: center;

  // 제목
  > span {
    font-size: 1.375rem;
    font-weight: bold;

    @media ${({ theme }) => theme.tablet} {
      font-size: 1rem;
    }
  }

  // 수정 버튼
  button {
    margin-left: auto;
  }
`;

export const StyledQuestionDetailNumBox = styled.div`
  padding: 4px 1.5rem;
  margin-right: 1.5rem;

  background: ${({ theme }) => theme.colors.Lime[600]};
  border-radius: 0.25rem;
  color: white;
`;

export const StyledQuestionDetailTextBox = styled.div`
  padding: 1.5rem;
  margin-top: 1.5rem;

  border: 1px solid ${({ theme }) => theme.colors.Lime[600]};
  border-radius: 4px;
  line-height: 28px;
`;
export const StyledQuestionDetailChoiceListBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 2.5rem;
  gap: 1rem;
`;

export const StyledQuestionDetailChoiceBox = styled.div`
  display: flex;
  align-items: center;

  gap: 1rem;
`;

export const StyledQuestionChoiceNumBox = styled.div`
  padding: 4px 8px;

  background: ${({ theme }) => theme.colors.Lime[50]};
  border: 0.8px solid ${({ theme }) => theme.colors.Lime[600]};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.Lime[600]};
  font-size: 0.875rem;
  font-weight: bold;
`;

const reactSpinnersClipLoaderClip = keyframes`
  0% {
      transform: rotate(0deg) scale(1);
  }
  50% {
      transform: none !important;
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

export const WorkbookSaveBtn = styled(StyledRoundSolid600Btn)`
  > span {
    animation-name: ${reactSpinnersClipLoaderClip} !important;
  }
`;

export const WorkBookPdfBox = styled.div`
  padding: 56px 80px;
`;

export const WorkBookPdfBoxQuestionsBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 80px;
`;

export const WorkBookPdfHeaderBox = styled.div`
  margin-bottom: 2.5rem;
  padding: 16px;

  text-align: center;
  border: 1px solid black;

  // 문제집 이름
  > p:first-child {
    margin-bottom: 0.5rem;

    font-size: 30px;
    font-weight: bold;
  }
  // 문항 수
  > p:nth-child(2) {
    font-size: 16px;
  }
`;

export const WorkbookImgEditModalBox = styled(ModalBox)`
  display: flex;
  gap: 1.5rem;
`;

export const WorkbookImgEditModalImgBox = styled.div`
  display: flex;
  flex-direction: row;

  gap: 1.5rem;
`;

export const WorkbookImgTypeBox = styled.div<{ type: number }>`
  width: 150px;
  height: 200px;

  padding: 1rem;

  font-weight: 600;
  background-image: ${({ type }) =>
    type === 1
      ? 'url("/images/Workbook_Type_1.png")'
      : type === 2
      ? 'url("/images/Workbook_Type_2.png")'
      : type === 3 && 'url("/images/Workbook_Type_3.png")'};
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

export const WorkbookDetailWorkbookImgBox = styled.div`
  width: 5rem;
  height: 6.25rem;
  img, div {
    width: 100%;
    height: 100%;
  }

  > div {
    font-size:14px;
    overflow: hidden;
  }
`;
