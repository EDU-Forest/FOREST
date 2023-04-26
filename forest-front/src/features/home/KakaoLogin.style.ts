import { positionCenter } from "@/styles/theme";
import styled from "styled-components";

const KakaoLoginBtn = styled.button`
  width: 22.5rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: #ffe90d;
  position: relative;
  margin-bottom: 0.75rem;
  border: none;

  &:hover {
    background-color: #efdb0f;
  }
`;

const KakaoLoginImg = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  position: absolute;
  top: 50%;
  left: 1.125rem;
  transform: translate(0%, -50%);
`;

const KakaoLoginText = styled.div`
  ${positionCenter()}
  font-size: 1rem;
  font-weight: bold;
`;

export { KakaoLoginBtn, KakaoLoginImg, KakaoLoginText };
