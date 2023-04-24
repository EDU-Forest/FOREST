import styled, { css } from "styled-components";

const StyledWorkbookTab = styled.p<{ selected: boolean; space: number }>`
  display: inline-block;
  cursor: pointer;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.Gray[500]};
  padding: 16px 0px;
  margin-right: ${({ space }) => `${space}px`};
  ${({ selected }) =>
    selected &&
    css`
      font-weight: 700;
      color: ${({ theme }) => theme.colors.Lime[600]};
      border-bottom: 2px solid ${({ theme }) => theme.colors.Lime[600]};
    `}
  @media ${({ theme }) => theme.tablet} {
    font-size: 16px;
    padding: 8px 0px;
    margin-right: 32px;
  }
`;

export { StyledWorkbookTab };
