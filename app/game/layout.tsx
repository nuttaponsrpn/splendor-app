"use client";

import { Box, styled } from "@mui/material";
import { ReactNode } from "react";

export default function GameLayout({ children }: { children: ReactNode }) {
  return <Main component="main">{children}</Main>;
}

const Main = styled(Box)`
  display: flex;
  height: 100vh;
`;
