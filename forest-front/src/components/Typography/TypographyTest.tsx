// // import styled from "styled-components";
// // import css from "styled-jsx/css";

// // type FontType = "title" | "label" | "button";

// // interface IFontType {
// //   children: string;
// //   type: FontType;
// // }

// // const getBold = (type: string) => {
// //   let fontWeight;
// //   switch (type) {
// //     case "title" || "button":
// //       fontWeight = 700;
// //       break;

// //     case "label":
// //       fontWeight = 600;
// //       break;

// //     default:
// //       return null;
// //   }
// //   return css`
// //     font-weight: ${fontWeight};
// //   `;
// // };

// // const Typograph = styled.p<IFontType>`
// //   ${({type}) => getBold(type)}
// // `;

// // export { Typograph };

// import React from "react";
// import styled, { css } from "styled-components";

// type FontType = "title" | "label" | "button";

// interface LabelType {
//   children: string;
//   type: FontType;
// }

// const Label = ({
//   children,
//   type
// }: LabelType) => {
//   return (
//     <StyleLabel type={type}>
//       {children}
//     </StyleLabel>
//   );
// };

// export default Label;

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

// // const getLabelRadius = (radius: LabelRadius) => {
// //   let labelRadius;

// //   switch (radius) {
// //     case "round":
// //       labelRadius = "20px";
// //       break;

// //     case "square":
// //       labelRadius = "0px";
// //       break;

// //     default:
// //       return null;
// //   }

// //   return css`
// //     border-radius: ${labelRadius};
// //   `;
// // };

// // const getLabelBackgroundColor = (background: LabelColor) => {
// //   let backgroundColor;

// //   switch (background) {
// //     case "black":
// //       backgroundColor = "#111111";
// //       break;

// //     case "blue":
// //       backgroundColor = "blue";
// //       break;

// //     case "gray":
// //       backgroundColor = "#eeeeee";
// //       break;

// //     default:
// //       return null;
// //   }
// //   return css`
// //     background: ${backgroundColor};
// //   `;
// // };

// // const getLabelFontColor = (fontColor: LabelFontColor) => {
// //   let labelFontColor;

// //   switch (fontColor) {
// //     case "black":
// //       labelFontColor = "black";
// //       break;

// //     case "white":
// //       labelFontColor = "white";
// //       break;

// //     default:
// //       return null;
// //   }
// //   return css`
// //     color: ${labelFontColor};
// //   `;
// // };
