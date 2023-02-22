import { ThemeProvider } from "styled-components";

const colorDefs = {
  textPrimary: "#000000",
  textSecondary: "#56584B",
  bcBlue: "#2741d2",
  bcWhite: "#FFFFFF",
};

const theme = {
  bodyFontFamily: `'Arial', sans-serif`,
  ...colorDefs,
};

type themeProps = React.PropsWithChildren<{}>;

const Theme = ({ children }: themeProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
