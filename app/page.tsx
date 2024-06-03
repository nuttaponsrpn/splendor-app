import Link from "next/link";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
export default function Home() {
  return (
    <div>
      <h1>Splendor Game</h1>
      <CssBaseline />
      <Link href="/game">Start Game</Link>
    </div>
  );
}
