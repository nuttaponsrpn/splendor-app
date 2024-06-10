"use client";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DevelopmentCard } from "./DevelopmentCard";
import GemBoard from "./GemBoard";
import { initialGameState } from "./initialGameState";
import NobleTiles from "./NobleTiles";
import OpponentBoard from "./OppenentBoard";
import PlayerBoard, { Player } from "./PlayerBoard";
import { GemType } from "./Tokens";
import DevelopmentTiles from "./DevelopmentTiles";
import SelectedGemTiles from "./SelectedGemTiles";
import EndTurnTiles from "./EndTurnTiles";

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
    return player.purchasedCards.filter((gemType) => gemType === gem).length;
  }

  function isDisplayPurchaseCard(card: DevelopmentCard, player: Player) {
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
    let jokerGems = 0 + gameState.players[0].gems.joker;

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
    playerGems.joker = jokerGems;
    player.gems = playerGems;
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
      currentPlayer.gems.joker += 1;
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
    <GameBoardContainer className="game-board-container">
      <OpponentBoardWrapper
        className="opponent-board"
        playeramount={[...gameState.players.filter(({ id }) => id != 1)].length}
      >
        {[...gameState.players]
          .filter(({ id }) => id != 1)
          .map((player, key) => (
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
            player={gameState.players[0]}
            developmentCards={gameState.developmentCards}
            onCardReserve={handleCardReserve}
            onCardPurchase={handleCardPurchase}
            isDisplayPurchaseCard={isDisplayPurchaseCard}
          />
        </DevelopmentTilesWrapper>
      </BoardBox>

      <PlayerBox className="player-box">
        <PlayerBoard
          selectedGem={gameState.selectedGem}
          player={gameState.players[0]}
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
