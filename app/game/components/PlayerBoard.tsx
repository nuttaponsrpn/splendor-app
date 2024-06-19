"use client";

import { Button, Card, Dialog, styled } from "@mui/material";
import Box from "@mui/material/Box";
import { FC, useState } from "react";
import DevelopmentCards, { DevelopmentCard } from "./DevelopmentCard";
import EndTurnTiles from "./EndTurnTiles";
import Token, { GemColors, GemType } from "./Tokens";

export interface Player {
  id: string;
  gems: Record<GemType, number>;
  reservedCards: DevelopmentCard[];
  purchasedCards: DevelopmentCard[];
  nobleCards: DevelopmentCard[];
  points: number;
}

const GemOrder: GemType[] = [
  "diamond",
  "sapphire",
  "emerald",
  "ruby",
  "onyx",
  "joker",
];

interface PlayerBoardProps {
  playerTurn: string;
  player: Player;
  selectedGem: GemType[];
  isDisplayPurchaseCard: (card: DevelopmentCard, player: Player) => boolean;
  onCardPurchase: (card: DevelopmentCard) => void;
  getPlayerGemCardAmount: (gem: GemType, player: Player) => number;
  onPlayerRemoveGem: (gem: GemType, index: number) => void;
  onPlayerEndTurn: () => void;
}

const PlayerBoard: FC<PlayerBoardProps> = ({
  playerTurn,
  selectedGem,
  player,
  isDisplayPurchaseCard,
  getPlayerGemCardAmount,
  onCardPurchase,
  onPlayerRemoveGem,
  onPlayerEndTurn,
}) => {
  const playerTokens = Object.keys(player.gems).reduce(
    (acc, cur) => acc + player.gems[cur as GemType],
    0
  );
  const [isOpenReserveCard, setIsOpenReserveCard] = useState(false);
  const holdTokensAmount = selectedGem.length + playerTokens;

  function getPlayerCardAmount(gemType: GemType) {
    if (gemType === "joker") {
      return player.reservedCards.length;
    }
    return getPlayerGemCardAmount(gemType as GemType, player);
  }

  function onClickJokerCard(gemType: GemType) {
    if (gemType === "joker" && player.reservedCards.length > 0) {
      setIsOpenReserveCard(true);
    }
  }

  return (
    <PlayerBoardBox name={player.id ? player.id : ""}>
      <PlayerPoints className="player-points text-shadow">
        {player.points}
      </PlayerPoints>
      <PlayerBoardHeader>
        {/* Player Gem */}
        <TokenWrapprer>
          {selectedGem.map((gem, index) => (
            <Token
              key={`${gem}${index}`}
              gem={gem}
              onClick={() => onPlayerRemoveGem(gem, index)}
            />
          ))}
        </TokenWrapprer>
      </PlayerBoardHeader>

      {/* Player Card */}
      <PlayerCardBox>
        {GemOrder.map((gemType, index) => (
          <PlayerCardWrapper
            key={gemType}
            className="player-card-wrapper text-shadow"
            gemtype={gemType as GemType}
          >
            <PlayerCard
              className="shadow"
              points={getPlayerCardAmount(gemType as GemType).toString()}
              onClick={() => onClickJokerCard(gemType as GemType)}
            >
              <PlayerToken
                className="shadow"
                points={player.gems[gemType as GemType].toString()}
              />
            </PlayerCard>
          </PlayerCardWrapper>
        ))}

        <TokenAmount className="token-amount">
          <IsValidSpan
            valid={holdTokensAmount <= 10}
            value={holdTokensAmount.toString()}
          />
          / 10
        </TokenAmount>
      </PlayerCardBox>

      {playerTurn === player.id && (
        <EndTurnWrapper>
          <EndTurnTiles onClickEndTurn={onPlayerEndTurn} />
        </EndTurnWrapper>
      )}

      <Dialog
        open={isOpenReserveCard}
        onClose={() => setIsOpenReserveCard(false)}
        PaperComponent={ReservePaperDialog}
      >
        <DevelopmentCardsDialog>
          {player.reservedCards.map((card, index) => (
            <ReserveBox key={index}>
              <DevelopmentCardsWrapper>
                <DevelopmentCards developmentCard={card} />
              </DevelopmentCardsWrapper>
              {isDisplayPurchaseCard(card, player) && (
                <PurchaseButton
                  variant="contained"
                  onClick={() => {
                    onCardPurchase(card);
                    setIsOpenReserveCard(false);
                  }}
                >
                  Purchase
                </PurchaseButton>
              )}
            </ReserveBox>
          ))}
        </DevelopmentCardsDialog>
      </Dialog>
    </PlayerBoardBox>
  );
};

export default PlayerBoard;

const PlayerBoardBox = styled(Card)<{ name: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding-bottom: 18px;
  position: relative;
  margin-top: 6px;
  overflow: visible;
  width: 100%;
  z-index: 2;
  background: #fdfdfd;
  background: -webkit-radial-gradient(
    circle,
    #fdfdfd 0%,
    #fffcd6 50%,
    #e8a000 150%
  );
  background: radial-gradient(circle, #fdfdfd 0%, #fffcd6 50%, #e8a000 150%);

  &:before {
    content: ${({ name }) => `"${name}"`};
    width: 80%;
    background: #f3c244;
    background: -webkit-linear-gradient(
      0deg,
      #f3c244 0%,
      #ffe37f 50%,
      #f9e496 100%
    );
    font-size: 1.2rem !important;
    background: linear-gradient(0deg, #f3c244 0%, #ffe37f 50%, #f9e496 100%);
    width: 50%;
    height: 35px;
    position: absolute;
    top: -6px;
    left: 0px;
    z-index: 3;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    -webkit-box-shadow: 0 0 2px 1px #fef8d1;
    -moz-box-shadow: 0 0 2px 1px #fef8d1;
    box-shadow: 0 0 2px 1px #fef8d1;
    display: flex;
    font-weight: bolder;
    padding-left: 8px;
    align-items: center;
    font-size: xx-small;
    padding-bottom: 3px;
  }

  &:after {
    content: " ";
    position: absolute;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    margin: 6px;
    top: 0px;
    left: 0px;
    border-radius: 3px;
    z-index: 1;
    background-color: #cda077;
  }

  ${({ theme }) => theme.breakpoints.up("sm")} {
    &:before {
      width: 250px;
      height: 25px;
    }
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    &:before {
      width: 250px;
      height: 35px;
    }
  }
`;

const PlayerBoardHeader = styled(Box)`
  width: 100%;
  margin-top: auto;
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    position: absolute;
    padding-right: 40px;
    top: 22px;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    padding-right: 40px;
    top: 32px;
  }
`;

const PlayerCardBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 40px;

  height: 50px;
  width: 100%;
`;

const PlayerCardWrapper = styled(Box)<{ gemtype: GemType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  width: 32px;
  position: relative;

  .shadow {
    background-color: ${({ gemtype }) => GemColors[gemtype]};
    z-index: 2;

    &:before {
      content: " ";
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      z-index: 3;
    }
    &:after {
      content: " ";
      position: absolute;
      width: 100%;
      height: 100%;

      background: #4f4444;
      border-radius: 3px;
      background: -webkit-linear-gradient(
        0deg,
        transparent 0%,
        transparent 50%,
        #4f4444 150%
      );
      background: linear-gradient(
        0deg,
        transparent 0%,
        transparent 50%,
        #4f4444 150%
      );
    }
  }

  ${({ theme }) => theme.breakpoints.up("sm")} {
    height: 100%;
    width: 28px;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    height: 75%;
  }
`;

const PlayerCard = styled(Box)<{ points: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ points }) =>
    +points > 0 ? "" : "transparent !important"};
  border: solid 1px #fff;
  border-radius: 3px;
  position: relative;

  &:before {
    font-size: 14px !important;
    content: ${({ points }) => `"${+points > 0 ? +points : ""}"`} !important;
  }

  &:after {
    background: "#4f4444";
    background: -webkit-linear-gradient(
      0deg,
      transparent 0%,
      transparent 50%,
      ${({ points }) => (+points > 0 ? "#fff" : "#4f4444")} 150%
    ) !important;
    background: linear-gradient(
      0deg,
      transparent 0%,
      transparent 50%,
      ${({ points }) => (+points > 0 ? "#fff" : "#4f4444")} 150%
    ) !important;
  }
`;

const PlayerToken = styled(Box)<{ points: string }>`
  height: 28px;
  aspect-ratio: 1/1;
  position: absolute !important;
  right: -11px !important;
  bottom: -10px;
  background-color: ${({ points }) =>
    +points > 0 ? "" : "#cda077 !important"};
  border: solid 2.5px #fff;
  border-radius: 50%;
  position: relative;
  display: flex;

  &:before {
    content: ${({ points }) => `"${+points > 0 ? +points : ""}"`} !important;
  }

  &:after {
    border-radius: 50% !important;
    height: 100% !important;

    background: "#4f4444";
    background: -webkit-linear-gradient(
      0deg,
      transparent 0%,
      transparent 50%,
      ${({ points }) => (+points > 0 ? "#fff" : "#4f4444")} 150%
    ) !important;
    background: linear-gradient(
      0deg,
      transparent 0%,
      transparent 50%,
      ${({ points }) => (+points > 0 ? "#fff" : "#4f4444")} 150%
    ) !important;
  }

  ${({ theme }) => theme.breakpoints.up("sm")} {
    height: 22px;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    height: 28px;
  }
`;

const PurchaseButton = styled(Button)`
  font-size: 12px;
`;

const TokenAmount = styled(Box)`
  position: absolute;
  bottom: 10px;
  right: 14px;
  z-index: 2;
  font-weight: bold;
`;

const IsValidSpan = styled("span")<{ valid: boolean; value: string }>`
  color: ${({ valid }) => (valid ? "inherit" : "red")};

  &:before {
    content: " ${({ value }) => value} ";
  }
`;

const DevelopmentCardsDialog = styled(Box)`
  display: flex;
  gap: 12px;
`;

const DevelopmentCardsWrapper = styled(Box)`
  height: 150px;
  width: 100px;
`;

const ReservePaperDialog = styled(Box)`
  background-color: transparent;
  margin: 0px !important;
`;

const ReserveBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TokenWrapprer = styled(Box)`
  display: flex;
  height: 65px;
  width: 200px;
  gap: 12px;
  align-items: center;
  position: relative;
  margin-left: auto;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    height: 60px;
    width: 200px;
  }
  ${({ theme }) => theme.breakpoints.up("md")} {
    height: 65px;
    width: 200px;
  }
`;

const EndTurnWrapper = styled(Box)`
  position: absolute;
  top: -20px;
  right: 20px;
  width: 120px;
  height: 45px;
  z-index: 2;
`;

const PlayerPoints = styled(Box)`
  z-index: 3;
  font-size: 22px !important;
  position: absolute;
  right: 200px;
  top: 2px;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    position: relative;
    right: 175px;
    top: -6px;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    right: 205px;
    top: -10px;
  }
`;
