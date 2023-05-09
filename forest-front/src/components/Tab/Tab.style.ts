import styled, { css } from "styled-components";

const StyledWorkbookTab = styled.p<{ selected?: boolean; space: number }>`
  display: inline-block;
  margin: 0;
  cursor: pointer;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.Gray[500]};
  padding-bottom: 16px;
  margin-right: ${({ space }) => `${space}px`};

  &:hover {
    color: ${({ theme }) => theme.colors.Gray[600]};
  }

  ${({ selected }) =>
    selected &&
    css`
      font-weight: 700;
      color: ${({ theme }) => theme.colors.Lime[600]};
      border-bottom: 2px solid ${({ theme }) => theme.colors.Lime[600]};

      &:hover {
        color: ${({ theme }) => theme.colors.Lime[700]};
      }
    `}
  @media ${({ theme }) => theme.tablet} {
    font-size: 1rem;
    padding-bottom: 8px;
    margin-right: 32px;
  }
`;

export { StyledWorkbookTab };
