"use client";

import {
  Box,
  createTheme,
  responsiveFontSizes,
  styled,
  ThemeProvider,
} from "@mui/material";
import { ReactNode } from "react";

export default function GameLayout({ children }: { children: ReactNode }) {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Main component="main">{children}</Main>
    </ThemeProvider>
  );
}

const Main = styled(Box)`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
