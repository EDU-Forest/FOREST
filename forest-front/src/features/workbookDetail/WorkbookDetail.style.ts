import styled from "styled-components";

export const StyledWorkbookDetailBox = styled.div`
  min-height: 100vh;

  display: flex;

  background-color: ${({ theme }) => theme.colors.Gray[50]};
`;

export const StyledWorkbookDetailInfoOverviewBox = styled.div`
  display: flex;

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
  }

  img {
    width: 5rem;
    height: auto;

    margin-left: auto;
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

export const StyledWorkbookDetailBtnsBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`;

export const StyledWorkbookDetailQuestionListBox = styled.div`
  padding: 24px;

  background: ${({ theme }) => theme.colors.Gray[100]};
  border: 0.0625rem solid ${({ theme }) => theme.colors.Gray[500]};
  border-radius: 1.5rem;
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

export const StyledWorkbookQuestionMoveBar = styled.div`
  display: flex;
  align-items: center;

  padding: 0.5rem 0.75rem;

  background-color: ${({ theme }) => theme.colors.Gray[100]};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.Gray[800]};

  cursor: pointer;

  // 문제 번호
  > span:first-child {
    font-weight: 600;
  }

  // move icon
  > svg:first-child {
    width: 20px;
    height: 20px;

    margin-right: 0.25rem;
    fill: ${({ theme }) => theme.colors.Gray[800]};
  }

  // delete icon
  > svg:last-child {
    width: 16px;
    height: 16px;

    display: flex;
    margin-left: auto;
    fill: ${({ theme }) => theme.colors.Gray[600]};
  }
`;
