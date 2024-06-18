"use client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, Button, CssBaseline, styled, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [roomID, setRoomID] = useState("");
  const router = useRouter();
  const [playerID, setPlayerID] = useState("");

  useEffect(() => {
    initPlayerID();
  }, []);

  function initPlayerID() {
    const localPlayerID = localStorage.getItem("playerID");
    if (localPlayerID) {
      setPlayerID(localPlayerID);
    } else {
      const generatePlayerID = "Player" + Math.floor(Math.random() * 10000);
      localStorage.setItem("playerID", generatePlayerID);
      setPlayerID(generatePlayerID);
    }
  }

  function handleStartGame() {
    localStorage.setItem("roomID", roomID);
    router.push("/game");
  }

  return (
    <PageContainer>
      <h1>Player: {playerID}</h1>

      <h1>Splendor Game</h1>
      <CssBaseline />
      <TextField
        id="room-id"
        label="Enter room name"
        variant="outlined"
        value={roomID}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setRoomID(event.target.value)
        }
      />

      <Button disabled={!roomID.length} onClick={handleStartGame}>
        Join Room
      </Button>
    </PageContainer>
  );
}

const PageContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;
