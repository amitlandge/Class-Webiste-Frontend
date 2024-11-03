import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: "SUSE, sans-serif",
  },
  body: {},
});

const AppThemeProvider = (prop) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {prop.children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
