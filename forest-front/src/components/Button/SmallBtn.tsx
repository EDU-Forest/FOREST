import styled from "styled-components";

interface Iprops {
  children: string;
  colored: boolean;
}

const StyledSmallBtn = styled.button<{ colored: boolean }>`
  display: inline-block;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 5rem;
  border: 2px solid ${({ theme }) => theme.colors.Lime[700]};
  background-color: ${({ colored, theme }) => (colored ? theme.colors.Lime[700] : "white")};
  color: ${({ colored, theme }) => (colored ? "white" : theme.colors.Lime[700])};

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.Lime[800]};
    background-color: ${({ colored, theme }) => (colored ? theme.colors.Lime[800] : "white")};
    color: ${({ colored, theme }) => (colored ? "white" : theme.colors.Lime[800])};
  }
`;

export default function SmallBtn({ children, colored }: Iprops) {
  return <StyledSmallBtn colored={colored}>{children}</StyledSmallBtn>;
}
