import styled from "styled-components";
import css from "styled-jsx/css";

export const Title = styled.p`
  margin: 0;
  margin-bottom: 1.5rem;
  font-size: 1.375rem;
  font-weight: 700;
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
