import styled from "styled-components";

interface Iprops {
  children: string;
}

const StyledhashTag = styled.div`
display: inline-block;
background-color: ${({ theme }) => theme.colors.Orange[600]}}
padding: .5rem .75rem;
border-radius: 2.5rem;
color: white;
`;

export default function HashTag({ children }: Iprops) {
  return <StyledhashTag># {children}</StyledhashTag>;
}
