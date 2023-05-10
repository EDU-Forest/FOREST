import styled from "styled-components";

const StyledHashTag = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.Orange[600]};
  padding: 0.5rem 0.75rem;
  border-radius: 2.5rem;
  color: white;
  cursor: pointer;
  margin-top: 0.75rem;
  margin-right: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.Orange[700]};
  }
`;

export { StyledHashTag };
