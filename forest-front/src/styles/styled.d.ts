import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      Lime: array;
      Orange: array;
      Gray: array;
    };
    mobile: string;
    tablet: string;
    desktop: string;
  }
}
