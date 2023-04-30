import styled from "styled-components";

const StyledTestCommonBtn = styled.button`
  width: 15rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.colors.Lime[700]};
  border: none;
  border-radius: 1.5rem;
  line-height: 2.5rem;
  text-align: center;
  color: white;
  margin-top: 3rem;
  font-weight: 700;

  &:hover {
    background-color: ${({ theme }) => theme.colors.Lime[900]};
  }
`;

export { StyledTestCommonBtn };
