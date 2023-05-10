import styled from "styled-components";

const AuthSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ForestLargeLogo = styled.img`
  width: 20rem;
  height: 20rem;

  -webkit-animation: fade-in 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;

  @-webkit-keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export { AuthSection, ForestLargeLogo };
