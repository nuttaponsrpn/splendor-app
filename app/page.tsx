"use client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  styled,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DisplayRooms {
  roomID: string;
  players: number;
}

export default function Home() {
  const [roomID, setRoomID] = useState("");
  const router = useRouter();
  const [playerID, setPlayerID] = useState("");
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [displayRooms, setDisplayRooms] = useState<DisplayRooms[]>([]);

  useEffect(() => {
    initPlayerID();
    window.addEventListener("beforeunload", (e) => {
      const val = [{ roomID: "close", palyers: 0 }];
      console.log("beforeunload", val);
      ws.send(JSON.stringify(val));
    });

    const ws = new WebSocket(
      `wss://go-splendor-purple-resonance-4326.fly.dev/ws/displayrooms`
    );

    ws.onmessage = function (event) {
      let rooms = (JSON.parse(event.data) as DisplayRooms[]) || [];
      console.log("rooms", rooms);
      setDisplayRooms(rooms);
    };
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

  function handleClickRow(roomID: string) {
    localStorage.setItem("roomID", roomID);
    router.push("/game");
  }

  return (
    <PageContainer>
      <CssBaseline />
      <HeaderPage>
        <LogoGame>Splendor Game</LogoGame>
        <PlayerName>Player: {playerID}</PlayerName>
      </HeaderPage>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: "100vw" }}
          size="small"
          aria-label="a dense table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Room name</TableCell>
              <TableCell align="right">Player</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRooms.map((row, id) => (
              <TableRow
                onDoubleClick={() => handleClickRow(row.roomID)}
                key={row.roomID}
                sx={{ cursor: "pointer" }}
              >
                <TableCell component="th" scope="row" align="center">
                  {id + 1}
                </TableCell>
                <TableCell align="left">{row.roomID}</TableCell>
                <TableCell align="right">{row.players}/3</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateRoomButton onClick={() => setIsOpenDialog(true)} fullWidth>
        Create Room
      </CreateRoomButton>

      <Dialog
        open={isOpenDialog}
        onClose={() => {
          setIsOpenDialog(false);
          setRoomID("");
        }}
      >
        <Box
          flexDirection="column"
          display="flex"
          padding={5}
          paddingBottom={2}
        >
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
        </Box>
      </Dialog>
    </PageContainer>
  );
}

const PageContainer = styled(Box)`
  height: 100vh;
  width: 100vw;
  background-color: #fff;
`;

const HeaderPage = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.up("md")} {
    flex-direction: row;
  }
`;

const LogoGame = styled("h1")``;

const PlayerName = styled("h1")`
  position: relative;

  ${({ theme }) => theme.breakpoints.up("md")} {
    position: absolute;
    right: 0;
    font-size: 18px;
  }
`;

const CreateRoomButton = styled(Button)`
  position: absolute;
  bottom: 0;
`;
