import styled from "styled-components";

interface Iprops {
  value: string;
  onClick: (value: string) => void;
}

const StyledhashTag = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.Orange[600]}}
  padding: .5rem .75rem;
  border-radius: 2.5rem;
  color: white;
  cursor: pointer;
<<<<<<< HEAD

  @media ${({ theme }) => theme.tablet} {
  padding: .25rem .625rem;
  font-size: .875rem;
  }

=======
  margin-top: .75rem;
  margin-right: 1rem;
>>>>>>> c42e8bc92880763a276f3c6d48c37d2eb49a7fad
`;

export default function HashTag({ value, onClick }: Iprops) {
  return <StyledhashTag onClick={() => onClick(value)}># {value}</StyledhashTag>;
}
