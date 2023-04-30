import styled from "styled-components";

interface Iprops {
  children: string;
  colored: boolean;
}

const StyledCommonBtn = styled.button<{ colored: boolean }>`
  display: inline-block;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem 2rem;
  border-radius: 1.25rem;
  border: 2px solid ${({ colored, theme }) => (colored ? "white" : theme.colors.Lime[600])};
  background-color: ${({ colored, theme }) => (colored ? theme.colors.Lime[600] : "white")};
  color: ${({ colored, theme }) => (colored ? "white" : theme.colors.Lime[600])};
`;

export default function CommonBtn({ children, colored }: Iprops) {
  return <StyledCommonBtn colored={colored}>{children}</StyledCommonBtn>;
}
