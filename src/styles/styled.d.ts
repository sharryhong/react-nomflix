import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    yellow: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      lighter: string;
      darker: string;
    };
  }
}
