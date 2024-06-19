"use client";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { WebsocketRequest, WebsocketResponse } from "../types/websocket_type";
import { DevelopmentCard } from "./DevelopmentCard";
import DevelopmentTiles from "./DevelopmentTiles";
import GemBoard from "./GemBoard";
import { initialGameState } from "./initialGameState";
import NobleTiles from "./NobleTiles";
import OpponentBoard from "./OppenentBoard";
import PlayerBoard, { Player } from "./PlayerBoard";
import { GemType } from "./Tokens";

export interface GameState {
  playerTurn: string;
  currentPlayer: Player;
  players: Player[];
  gemTokens: Record<GemType, number>;
  developmentCards: DevelopmentCard[];
  nobleTiles: DevelopmentCard[];
  selectedGem: GemType[];
}

interface GemBoardProps {
  playerID: string;
}

export default function GameBoard({ playerID }: GemBoardProps) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [wsState, setWsState] = useState<WebSocket>();
  const router = useRouter();

  useEffect(() => {
    const roomID = localStorage.getItem("roomID");
    if (!roomID) {
      router.push("/");
      return;
    }

    const ws = new WebSocket(
      `ws://go-splendor-purple-resonance-4326.fly.dev/ws?room_id=${roomID}&playerID=${playerID}`
    );
    window.addEventListener("beforeunload", (e) => {
      if (!!roomID) {
        const message: WebsocketRequest = {
          playerId: playerID,
          status: "CloseConnection",
        };
        ws.send(JSON.stringify(message));
      }
    });

    ws.onmessage = function (event) {
      let msg = JSON.parse(event.data) as WebsocketResponse;
      console.log("msg", msg);
      if (!!msg.developmentTiles) {
        const newGameState: GameState = {
          ...gameState,
          developmentCards: [
            ...msg.developmentTiles.level1,
            ...msg.developmentTiles.level2,
            ...msg.developmentTiles.level3,
          ],
          playerTurn: msg.currentPlayerId,
          nobleTiles: msg.nobles,
          players: [...msg.players.filter((p) => p.id != playerID)],
          currentPlayer: msg.players.find((p) => p.id == playerID)!,
          gemTokens: msg.gems,
        };
        setGameState(newGameState);
      }
      // setGameState((prev) => {
      //   const newGameState = { ...prev };
      // newGameState.developmentCards = [
      //   ...msg.developmentTiles.level1,
      //   ...msg.developmentTiles.level2,
      //   ...msg.developmentTiles.level3,
      // ];
      // newGameState.playerTurn = msg.currentPlayerId;
      // newGameState.nobleTiles = msg.nobles;
      // newGameState.players = [...msg.players.filter((p) => p.id != playerID)];
      // newGameState.currentPlayer = msg.players.find((p) => p.id == playerID)!;
      // newGameState.gemTokens = msg.gems;
      // return newGameState;
      // });
    };
    ws.onopen = function () {
      const message: WebsocketRequest = {
        playerId: playerID,
        status: "Waiting",
      };
      ws.send(JSON.stringify(message));
      setWsState(ws);
      localStorage.removeItem("roomID");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerSelectGem = (gem: GemType) => {
    if (!validateIsPlayerTurn()) {
      return;
    }

    const selectedGem = [...gameState.selectedGem];
    const gemTokens = { ...gameState.gemTokens };
    const newGem = [...selectedGem, gem];

    if (selectedGem.length < 3) {
      const isGemLimit = gemTokens[gem] < initialGameState.gemTokens[gem] - 1;
      const isDoubleGemselect = selectedGem.includes(gem) && isGemLimit;
      const isJoker = gem === "joker";
      const isDuplicate =
        newGem.length === 3 &&
        newGem.filter((item, index) => newGem.indexOf(item) != index).length;

      if (isDoubleGemselect || isDuplicate || isJoker) {
        return;
      }

      gemTokens[gem] -= 1;
      setGameState((gstate) => ({
        ...gstate,
        selectedGem: newGem,
        gemTokens: gemTokens,
      }));
    }
  };

  function getPlayerGemCardAmount(gem: GemType, player: Player) {
    return player.purchasedCards.filter((card) => card.gemType === gem).length;
  }

  function isDisplayPurchaseCard(card: DevelopmentCard, player: Player) {
    if (!validateIsPlayerTurn()) {
      return false;
    }

    let isPurchaseable = true;
    let jokerGems = 0 + player.gems.joker;

    /** Find gem that have cost */
    const payGemType = Object.keys(card.cost).filter((gem) => {
      return card.cost[gem as GemType] > 0;
    });

    /** Calculate cost */
    payGemType.forEach((gType) => {
      const gemType = gType as GemType;
      const gemCost = card.cost[gemType];
      const playerCard = getPlayerGemCardAmount(gemType, player);
      const playerGem = player.gems[gemType];
      let jokerCost = gemCost - playerCard - playerGem;

      for (let i = 0; i < jokerCost; i++) {
        jokerGems -= 1;
      }

      if (jokerGems < 0) {
        isPurchaseable = false;
      }
    });
    return isPurchaseable;
  }

  const handlePlayerRemoveGem = (gem: GemType, index: number) => {
    if (!validateIsPlayerTurn()) {
      return;
    }

    const removedGem = [...gameState.selectedGem].filter((_, i) => i != index);
    const gemTokens = { ...gameState.gemTokens };
    gemTokens[gem] += 1;
    setGameState((gstate) => ({
      ...gstate,
      selectedGem: removedGem,
      gemTokens: gemTokens,
    }));
  };

  const handleCardPurchase = (card: DevelopmentCard) => {
    if (!validateIsPlayerTurn()) {
      return;
    }

    wsState!.send(
      JSON.stringify({
        playerId: gameState.currentPlayer.id,
        purchasedCard: card,
        reservedCard: {},
        selectedGems: gameState.selectedGem,
        status: "Started",
      } as WebsocketRequest)
    );
  };

  const handleCardReserve = (card: DevelopmentCard) => {
    if (!validateIsPlayerTurn()) {
      return;
    }

    const currentPlayer = { ...gameState.currentPlayer };

    if (currentPlayer) {
      wsState!.send(
        JSON.stringify({
          playerId: gameState.currentPlayer.id,
          purchasedCard: {},
          reservedCard: card,
          selectedGems: ["joker"],
          status: "Started",
        } as WebsocketRequest)
      );
    }
  };

  function handleEndTurn() {
    const updatedPlayer = { ...gameState.currentPlayer };
    const playerGemsAmount = getPlayerGemsAmount(updatedPlayer);
    const holdAmount = playerGemsAmount + gameState.selectedGem.length;

    if (holdAmount <= 10) {
      gameState.selectedGem.forEach((sGem) => {
        updatedPlayer.gems[sGem] += 1;
      });

      wsState!.send(
        JSON.stringify({
          playerId: gameState.currentPlayer.id,
          selectedGems: gameState.selectedGem,
          purchasedCard: {},
          reservedCard: {},
          status: "Started",
        })
      );
      clearSelectedGem();
    }
  }

  function validateIsPlayerTurn() {
    return gameState.playerTurn == gameState.currentPlayer.id;
  }

  function getPlayerGemsAmount(player: Player) {
    return Object.keys(player.gems).reduce(
      (acc, cur) => acc + player.gems[cur as GemType],
      0
    );
  }

  function clearSelectedGem() {
    setGameState({ ...gameState, selectedGem: [] });
  }

  return (
    <GameBoardContainer className="game-board-container">
      <OpponentBoardWrapper
        className="opponent-board"
        playeramount={gameState.players.length}
      >
        {gameState.players.map((player, key) => (
          <OpponentBoard key={player.id + key} player={player} />
        ))}
      </OpponentBoardWrapper>

      <BoardBox className="board-box">
        <NobleTilesWrapper className="noble-tiles-wrapper">
          <NobleTiles nobleTiles={gameState.nobleTiles} />
        </NobleTilesWrapper>

        <GemsTokenWrapper className="gem-token-wrapper">
          <GemBoard
            gemTokens={gameState.gemTokens}
            onSelectGem={handlePlayerSelectGem}
          />
        </GemsTokenWrapper>

        <DevelopmentTilesWrapper className="development-tiles-wrapper">
          <DevelopmentTiles
            player={gameState.currentPlayer}
            developmentCards={gameState.developmentCards}
            onCardReserve={handleCardReserve}
            onCardPurchase={handleCardPurchase}
            isDisplayPurchaseCard={isDisplayPurchaseCard}
          />
        </DevelopmentTilesWrapper>
      </BoardBox>

      <PlayerBox className="player-box">
        <PlayerBoard
          playerTurn={gameState.playerTurn}
          selectedGem={gameState.selectedGem}
          player={gameState.currentPlayer}
          isDisplayPurchaseCard={isDisplayPurchaseCard}
          getPlayerGemCardAmount={getPlayerGemCardAmount}
          onCardPurchase={handleCardPurchase}
          onPlayerRemoveGem={handlePlayerRemoveGem}
          onPlayerEndTurn={handleEndTurn}
        />
      </PlayerBox>
    </GameBoardContainer>
  );
}

const GameBoardContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  gap: 4px;
  background: #bc48ff;
  background: -webkit-linear-gradient(0deg, #bc48ff 0%, #474bff 100%);
  background: linear-gradient(0deg, #bc48ff 0%, #474bff 100%);

  ${({ theme }) => theme.breakpoints.up("md")} {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 100vh;
    height: 100%;
    margin: auto;
    padding: 12px;
    padding-bottom: 0px;
    overflow: hidden;
  }
`;

const OpponentBoardWrapper = styled("div")<{ playeramount: number }>`
  display: flex;
  height: 10%;
  gap: 4px;

  > div {
    flex: ${({ playeramount }) => {
      return playeramount > 2 ? "1" : "0 0 33%";
    }};
  }
  ${({ theme }) => theme.breakpoints.up("md")} {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const BoardBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 70%;

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 100%;
    gap: 8px;
  }
`;

const GemsTokenWrapper = styled(Box)`
  height: 10%;
  width: 100%;
`;

const NobleTilesWrapper = styled(Box)`
  height: 13%;
  width: 100%;
`;

const DevelopmentTilesWrapper = styled(Box)`
  height: 70%;
  width: 100%;
`;

const PlayerBox = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 20%;

  ${({ theme }) => theme.breakpoints.up("md")} {
    gap: 8px;
    height: 20%;
    width: 100%;
  }
`;
