import { Container } from "@/styles/container";
import styled from "styled-components";

const SignupLayout = styled.div`
  width: 100vw;
  padding: 5rem 0rem;
  display: flex;
  justify-content: center;
`;

const SignupContainer = styled(Container)`
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export { SignupLayout, SignupContainer };
