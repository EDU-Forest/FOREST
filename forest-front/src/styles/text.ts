import styled from "styled-components";

export const Title = styled.p`
  margin: 0;
  margin-bottom: 1.5rem;
  font-size: 1.375rem;
  font-weight: 700;
`;

export const TextMaxCnt = styled.p`
  margin-top: 0.25rem;

  color: ${({ theme }) => theme.colors.Gray[500]};
  font-size: 14px;
  text-align: right;
`;

// const getBold = (type: FontType) => {
//   let fontWeight;
//   switch (type) {
//     case "title" || "button":
//       fontWeight = 700;
//       break;

//     case "label":
//       fontWeight = 600;
//       break;

//     default:
//       return null;
//   }
//   return css`
//     font-weight: ${fontWeight};
//   `;
// };

// const Typograph = styled.p<IFont>`
//   ${({ type }) => getBold(type)};
// `;

// export { Typograph };
