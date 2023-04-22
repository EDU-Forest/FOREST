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
  margin-top: .75rem;
  margin-right: 1rem;
`;

export default function HashTag({ value, onClick }: Iprops) {
  return <StyledhashTag onClick={() => onClick(value)}># {value}</StyledhashTag>;
}
