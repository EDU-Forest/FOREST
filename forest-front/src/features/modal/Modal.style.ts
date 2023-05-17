import styled from "styled-components";

const HomeModal = styled.div<{ width: number; borderRadius: number }>`
  width: ${(props) => props.width / 16}rem;
`;
