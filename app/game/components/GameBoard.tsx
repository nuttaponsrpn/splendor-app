"use client";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DevelopmentCard } from "./DevelopmentCard";
import DevelopmentTiles from "./DevelopmentTiles";
import EndTurnTiles from "./EndTurnTiles";
import GemTokens, { GemType } from "./GemTokens";
import { initialGameState } from "./initialGameState";
import NobleTiles from "./NobleTiles";
import OpponentBoard from "./OppenentBoard";
import PlayerBoard, { Player } from "./PlayerBoard";
import SelectedGemTiles from "./SelectedGemTiles";

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

  const takeGemTokens = (playerId: number, newGems: Record<string, number>) => {
    setGameState((prevState) => {
      const newPlayers = prevState.players.map((player) => {
        if (player.id === playerId) {
          return { ...player, gems: newGems };
        }
        return player;
      });
      return { ...prevState, players: newPlayers };
    });
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

  function getPlayerGemCardAmount(gem: GemType, player: Player) {
    return player.purchasedCards.filter((gemType) => gemType === gem).length;
  }

  function isDisplayPurchaseCard(card: DevelopmentCard, player: Player) {
    let isPurchaseable = true;
    let jokerGems = 0 + player.jokerGems;

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
    const player = { ...gameState.players[0] };
    const playerGems = { ...gameState.players[0].gems };
    const cardCost = { ...card.cost };
    const gemState = { ...gameState.gemTokens };
    let jokerGems = 0 + gameState.players[0].jokerGems;

    /** Gem type that have cost */
    const payGemType = Object.keys(cardCost).filter((gType) => {
      const gemType = gType as GemType;
      return card.cost[gemType] > 0;
    });

    /** Calculate card cost minus purchase card */
    payGemType.forEach((gType) => {
      const gemType = gType as GemType;
      cardCost[gemType] -= getPlayerGemCardAmount(gemType, player);
    });

    /** Pay card cost */
    Object.keys(cardCost).forEach((gType) => {
      const gemType = gType as GemType;
      const gemCost = cardCost[gemType];
      if (gemCost > 0) {
        const payGem = playerGems[gemType] - gemCost;
        if (payGem < 0) {
          jokerGems += payGem;
          gemState[gemType] += playerGems[gemType];
          playerGems[gemType] = 0;
        } else {
          playerGems[gemType] -= gemCost;
        }
      }
    });

    /** Updated player value */
    const updatedDevelopmentCard = [...gameState.developmentCards].filter(
      ({ id }) => id !== card.id
    );
    const updateReserveCard = [...gameState.players[0].reservedCards].filter(
      ({ id }) => id !== card.id
    );
    const updatedPlayer = [...gameState.players];
    player.points += card.points;
    player.gems = playerGems;
    player.jokerGems = jokerGems;
    player.purchasedCards.push(card.gemType);
    player.reservedCards = updateReserveCard;
    updatedPlayer[0] = player;

    checkNobleCondition(player);
    setGameState((prev) => ({
      ...prev,
      gemTokens: gemState,
      players: updatedPlayer,
      developmentCards: updatedDevelopmentCard,
    }));
  };

  function checkNobleCondition(player: Player) {
    let latestNoble: DevelopmentCard | undefined;
    gameState.nobleTiles.forEach((noble) => {
      const nobleCost = Object.keys(noble.cost).filter((gem) => {
        return noble.cost[gem as GemType] > 0;
      });

      let isGetNoble = true;
      nobleCost.forEach((gTpye) => {
        const gemType = gTpye as GemType;
        const playerCards = getPlayerGemCardAmount(gemType, player);
        const nobleCost = noble.cost[gemType];

        console.log("playerCards < nobleCost", playerCards, nobleCost);
        if (playerCards < nobleCost) {
          isGetNoble = false;
          return;
        }
      });

      console.log("isGetNoble", isGetNoble);
      if (isGetNoble) {
        latestNoble = noble;
      }
    });

    if (!!latestNoble) {
      const updatedPlayer = { ...player };
      updatedPlayer.nobleCards = [...player.nobleCards, latestNoble];
      updatedPlayer.points = player.points += latestNoble.points;

      const updatedNobleTiles = gameState.nobleTiles.filter(
        (noble) => noble.id != latestNoble!.id
      );

      const playerId = gameState.players.findIndex(
        ({ id }) => id === player.id
      );
      const updatedPlayers = [...gameState.players];
      updatedPlayers[playerId] = updatedPlayer;

      console.log("latestNoble", latestNoble);

      setGameState((prev) => ({
        ...prev,
        nobleTiles: updatedNobleTiles,
        players: updatedPlayers,
        currentPlayer: updatedPlayer,
      }));
    }
  }

  const handleCardReserve = (card: DevelopmentCard) => {
    const currentPlayerId = gameState.currentPlayer;
    const updatedPlayers = [...gameState.players];
    const currentPlayer = updatedPlayers.find(
      (player) => player.id === currentPlayerId.id
    );

    if (currentPlayer) {
      currentPlayer.reservedCards.push(card);
      currentPlayer.jokerGems += 1;
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

  function handleEndTurn() {
    const player = gameState.players[0];
    const playerGem = { ...player.gems };
    const playerGemsAmount = getPlayerGemsAmount(player);
    const holdAmount = playerGemsAmount + gameState.selectedGem.length;

    if (holdAmount <= 10) {
      gameState.selectedGem.forEach((sGem) => {
        playerGem[sGem] += 1;
      });

      clearSelectedGem();
      takeGemTokens(player.id, playerGem);
    }
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
          player={gameState.players[0]}
          developmentCards={gameState.developmentCards}
          onCardReserve={handleCardReserve}
          onCardPurchase={handleCardPurchase}
          isDisplayPurchaseCard={isDisplayPurchaseCard}
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
          selectedGem={gameState.selectedGem}
          player={gameState.players[0]}
          isDisplayPurchaseCard={isDisplayPurchaseCard}
          onCardPurchase={handleCardPurchase}
          getPlayerGemCardAmount={getPlayerGemCardAmount}
        />
        <EndTurnTiles onClickEndTurn={handleEndTurn} />
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
