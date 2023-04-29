import styled from "styled-components";

export const Title = styled.p`
  margin: 0;
  margin-bottom: 1.5rem;
  font-size: 1.375rem;
  font-weight: 700;
`;

export const Text = (size = 16, isBold = false, isGray = false) => `
  font-size: ${size / 16}rem;
  font-weight: ${isBold && 700};
  color: ${isGray && "#ADB5BD"};
`;
