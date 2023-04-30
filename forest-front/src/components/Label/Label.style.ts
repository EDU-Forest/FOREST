import styled from "styled-components";

const StyledLabel = styled.p<{ status: string }>`
  margin: 0;
  padding-top: 0.5rem;
  padding-right: 1rem;
  font-size: 0.875rem;
  color: ${({ status, theme }) => {
    if (status === "pass") return theme.colors.Lime[600];
    else if (status === "fail") return theme.colors.Orange[500];
    else return theme.colors.Gray[500];
  }};

  .icon {
    font-size: 0.75rem;
    margin-right: 0.25rem;
  }
`;

export { StyledLabel };
