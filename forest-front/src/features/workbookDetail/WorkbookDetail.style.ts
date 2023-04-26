import styled from "styled-components";

export const StyledWorkbookDetailBox = styled.div`
  min-height: 100vh;

  display: flex;

  background-color: ${({ theme }) => theme.colors.Gray[50]};
`;

export const StyledWorkbookDetailInfoOverviewBox = styled.div`
  display: flex;

  padding: 24px 2rem;

  background: ${({ theme }) => theme.colors.Lime[50]};
  border: 1px solid ${({ theme }) => theme.colors.Lime[700]};
  border-radius: 24px;

  > div:first-child {
    // 문제집 제목
    > div:first-child {
      margin-bottom: 0.75rem;

      font-size: 1.375rem;
      font-weight: bold;
    }

    // 문제집 설명
    > div:last-child {
      margin-top: 1rem;

      font-size: 1rem;
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
    width: 80px;
    height: auto;

    margin-left: auto;
  }
`;

export const StyledWorkbookBtnsBox = styled.div`
  display: flex;
  gap: 2rem;

  > div:last-child {
    span {
      margin: 0 8px;
      color: ${({ theme }) => theme.colors.Gray[400]};
    }
  }
`;

export const StyledWorkbookReactionBtnsBox = styled.div`
  display: flex;
  gap: 1rem;
`;

export const StyledWorkbookDetailBtnsBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

export const StyledWorkbookDetailQuestionListBox = styled.div`
  padding: 1.5rem;

  background: ${({ theme }) => theme.colors.Gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.Gray[500]};
  border-radius: 24px;
`;

export const StyledToggleBtn = styled.button`
  width: 48px;
  height: 24px;

  display: flex;
  align-items: center;

  padding: 4px;

  background: ${({ theme }) => theme.colors.Lime[600]};
  border-radius: 12px;
  border: none;

  transition: all 0.2s ease-in-out;
`;

export const StyledToggleCircleBtn = styled.button<{ isPublic: boolean }>`
  width: 16px;
  height: 16px;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 50%;

  transform: ${({ isPublic }) => (isPublic ? "translate(0px, 0)" : "translate(24px, 0)")};
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
  gap: 24px;

  span {
    font-weight: bold;
  }
`;

export const StyledWorkbookDetailQuestionListContentBox = styled.div`
  padding: 24px 16px;

  background: #ffffff;
  border-radius: 8px;

  p {
    font-weight: bold;
  }
`;
