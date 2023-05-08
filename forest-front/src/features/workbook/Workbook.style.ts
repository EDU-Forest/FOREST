import styled from "styled-components";

export const StyledWorkbookTab = styled.div`
  display: flex;
  gap: 5rem;

  @media ${({ theme }) => theme.tablet} {
    gap: 2rem;
  }
`;

export const StyledWorkbookTabItem = styled.div<{ isSelected: boolean }>`
  padding-bottom: 1rem;

  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.Lime[600] : theme.colors.Gray[500]};
  font-size: 1.375rem;
  font-weight: ${({ isSelected }) => isSelected && "bold"};
  border-bottom: ${({ isSelected, theme }) => isSelected && `2px solid ${theme.colors.Lime[600]}`};

  cursor: pointer;

  &:hover {
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.colors.Lime[700] : theme.colors.Gray[600]};
    border-bottom: ${({ isSelected, theme }) =>
      isSelected && `2px solid ${theme.colors.Lime[700]}`};
  }

  @media ${({ theme }) => theme.tablet} {
    font-size: 1rem;
  }
`;

export const StyledWorkbookListBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

  margin-top: 2rem;
  row-gap: 4rem;

  @media ${({ theme }) => theme.tablet} {
    grid-template-columns: 1fr 1fr 1fr 1fr;

    margin-top: 1.5rem;
    row-gap: 2.8125rem;
  }
`;
