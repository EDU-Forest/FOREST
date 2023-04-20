import styled from "styled-components";

interface Iprops {
  children: string;
}

const StyledStartBtn = styled.button`
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1rem 8rem;
  border-radius: 3rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.Lime[300]};
  color: white;
`;

export default function StartBtn({ children }: Iprops) {
  return <StyledStartBtn>{children}</StyledStartBtn>;
}
