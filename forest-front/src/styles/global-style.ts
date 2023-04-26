import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    font-family: Pretendard;
    font-size: 1rem;
    min-width: 20rem;
  }

  body {
    background-color: ${({ theme }) => theme.colors.Gray[50]}
  }
  
  a { cursor: pointer; text-decoration: none; }
  button { cursor: pointer }
  p { margin: 0 }

  @font-face {
    font-family: "Pretendard";
    font-weight: 100;
    src: url("/fonts/Pretendard-Thin.otf") format("truetype");
  }
  
  @font-face {
    font-family: "Pretendard";
    font-weight: 200;
    src: url("/fonts/Pretendard-ExtraLight.otf") format("truetype");
  }
  
  @font-face {
    font-family: "Pretendard";
    font-weight: 300;
    src: url("/fonts/Pretendard-Light.otf") format("truetype");
  }
  
  @font-face {
    font-family: "Pretendard";
    font-weight: 400;
    src: url("/fonts/Pretendard-Regular.otf") format("truetype");
  }
  
  @font-face {
    font-family: "Pretendard";
    font-weight: 500;
    src: url("/fonts/Pretendard-Medium.otf") format("truetype");
  }
  
  @font-face {
    font-family: "Pretendard";
    font-weight: 600;
    src: url("/fonts/Pretendard-SemiBold.otf") format("truetype");
  }
  
  @font-face {
    font-family: "Pretendard";
    font-weight: 700;
    src: url("/fonts/Pretendard-Bold.otf") format("truetype");
  }
  
  @font-face {
    font-family: "Pretendard";
    font-weight: 800;
    src: url("/fonts/Pretendard-ExtraBold.otf") format("truetype");
  }
  
  @font-face {
    font-family: "Pretendard";
    font-weight: 900;
    src: url("/fonts/Pretendard-Black.otf") format("truetype");
  }
  
`;
