import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    Lime: {
      50: "#F4FCE3",
      100: "#F4FCE3",
      200: "#D8F5A2",
      300: "#C0EB75",
      400: "#A9E34B",
      500: "#94D82D",
      600: "#82C91E",
      700: "#74B816",
      800: "#66A80F",
      900: "#5C940D",
    },
    Orange: {
      50: "#FFF4E6",
      100: "#FFE8CC",
      200: "#FFD8A8",
      300: "#FFC078",
      400: "#FFA94D",
      500: "#FF922B",
      600: "#FD7E14",
      700: "#F76707",
      800: "#E8590C",
      900: "#D9480F",
    },
    Gray: {
      50: "#F8F9FA",
      100: "#F1F3F5",
      200: "#E9ECEF",
      300: "#DEE2E6",
      400: "#CED4DA",
      500: "#ADB5BD",
      600: "#868E96",
      700: "#495057",
      800: "#343A40",
      900: "#212529",
    },
  },
  // mobile: `(max-width: 767px)`,
  tablet: `(max-width: 1440px)`,
  desktop: `(min-width: 1440px)`,
};

// export const media = {
//   mobile: `(max-width: 768px)`,
//   tablet: `(max-width: 1440px)`,
//   desktop: `(min-width: 1440px)`,
// };

export const flexBox = (direction = "row", align = "center", justify = "center") => `
  display: flex;
  flex-direction: ${direction};
  align-items: ${align};
  justify-content: ${justify};
`;

export const positionCenter = (type = "absolute") => {
  if (type === "absolute" || type === "fixed")
    return `
            position: ${type};
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          `;
};
