"use client";

import Box from "@mui/material/Box";
import { useState } from "react";
import DevelopmentTiles from "./DevelopmentTiles";
import GemTokens, { GemType } from "./GemTokens";
import { initialGameState } from "./initialGameState";
import NobleTiles from "./NobleTiles";
import PlayerBoard from "./PlayerBoard";
import { styled } from "@mui/material";
import SelectedGemTiles from "./SelectedGemTiles";
import EndTurnTiles from "./EndTurnTiles";
import { DevelopmentCard } from "./DevelopmentCard";
import OpponentBoard from "./OppenentBoard";

export interface Player {
  id: number;
  gems: Record<string, number>;
  reservedCards: any[];
  purchasedCards: any[];
  points: number;
}

export interface GameState {
  currentPlayer: Player;
  players: Player[];
  gemTokens: Record<string, number>;
  developmentCards: DevelopmentCard[];
  nobleTiles: DevelopmentCard[];
  selectedGem: GemType[];
}

export default function GameBoard() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const takeGemTokens = (playerId: number, tokens: Record<string, number>) => {
    setGameState((prevState) => {
      const newPlayers = prevState.players.map((player) => {
        if (player.id === playerId) {
          const newGems = { ...player.gems };
          for (const token in tokens) {
            newGems[token] += tokens[token];
            prevState.gemTokens[token] -= tokens[token];
          }
          return { ...player, gems: newGems };
        }
        return player;
      });
      return { ...prevState, players: newPlayers };
    });
  };

  const reserveCard = (playerId: number, card: any) => {
    setGameState((prevState) => {
      const newPlayers = prevState.players.map((player) => {
        if (player.id === playerId) {
          return { ...player, reservedCards: [...player.reservedCards, card] };
        }
        return player;
      });
      return { ...prevState, players: newPlayers };
    });
  };

  const purchaseCard = (playerId: number, card: any) => {
    setGameState((prevState) => {
      const newPlayers = prevState.players.map((player) => {
        if (player.id === playerId) {
          const newGems = { ...player.gems };
          for (const token in card.cost) {
            newGems[token] -= card.cost[token];
          }
          return {
            ...player,
            gems: newGems,
            purchasedCards: [...player.purchasedCards, card],
            points: player.points + card.points,
          };
        }
        return player;
      });
      return { ...prevState, players: newPlayers };
    });
  };

  const handlePlayerAction = (playerId: number) => {
    takeGemTokens(playerId, { diamond: 1, sapphire: 1 });
  };

  const handlePlayerSelectGem = (gem: GemType) => {
    const selectedGem = [...gameState.selectedGem];
    const gemTokens = { ...gameState.gemTokens };
    const newGem = [...selectedGem, gem];

    if (selectedGem.length < 3) {
      const isGemLimit = gemTokens[gem] < initialGameState.gemTokens[gem] - 1;
      const isDoubleGemselect = selectedGem.includes(gem) && isGemLimit;
      const isDuplicate =
        newGem.length === 3 &&
        newGem.filter((item, index) => newGem.indexOf(item) != index).length;

      if (isDoubleGemselect || isDuplicate) {
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

  const handlePlayerRemoveGem = (gem: GemType, index: number) => {
    const removedGem = [...gameState.selectedGem].filter((_, i) => i != index);
    const gemTokens = { ...gameState.gemTokens };
    gemTokens[gem] += 1;
    setGameState((gstate) => ({
      ...gstate,
      selectedGem: removedGem,
      gemTokens: gemTokens,
    }));
  };

  const handleCardReserve = (card: DevelopmentCard) => {
    const currentPlayerId = gameState.currentPlayer;
    const updatedPlayers = [...gameState.players];
    const currentPlayer = updatedPlayers.find(
      (player) => player.id === currentPlayerId.id
    );

    if (currentPlayer) {
      currentPlayer.reservedCards.push(card);
      // Remove the reserved card from available development cards
      const updatedDevelopmentCards = gameState.developmentCards.filter(
        (devCard) => devCard.id !== card.id
      );

      setGameState((prevState) => ({
        ...prevState,
        players: updatedPlayers,
        developmentCards: updatedDevelopmentCards,
      }));
    }
  };

  return (
    <GameBoardContainer>
      <BoardBox>
        <OpponentBoardWrapper>
          {gameState.players
            .filter((_, i) => i > 0)
            .map((player, key) => (
              <OpponentBoard key={player.id} player={player} />
            ))}
        </OpponentBoardWrapper>

        <DevelopmentTiles
          developmentCards={gameState.developmentCards}
          onCardReserve={handleCardReserve}
        />
        <GemTokens
          gemTokens={gameState.gemTokens}
          onSelectGem={handlePlayerSelectGem}
        />
        <NobleTiles nobleTiles={gameState.nobleTiles} />
      </BoardBox>

      <PlayerBox>
        <SelectedGemTiles
          name={gameState.players[0].id.toString()}
          points={gameState.players[0].points.toString()}
          selectedGems={gameState.selectedGem}
          onRemoveGem={handlePlayerRemoveGem}
        />
        <PlayerBoard
          player={gameState.players[0]}
          onPlayerAction={handlePlayerAction}
        />
        <EndTurnTiles onClickEndTurn={() => {}} />
      </PlayerBox>
    </GameBoardContainer>
  );
}

const GameBoardContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 100vh;
  width: 1200px;
  height: fit-content;
  margin: auto;
  gap: 14px;
  padding: 12px;
`;

const BoardBox = styled(Box)`
  display: flex;
  width: 100%;
  gap: 8px;
`;

const PlayerBox = styled(Box)`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const OpponentBoardWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
