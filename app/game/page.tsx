"use client";

import GameBoard from "@/app/game/components/GameBoard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GamePage() {
  const [playerID, setPlayerID] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getPlayerID = localStorage.getItem("playerID");
    if (!getPlayerID) {
      router.push("/");
    } else {
      setPlayerID(getPlayerID);
    }
  }, [playerID, router]);

  return playerID && <GameBoard playerID={playerID} />;
}
