"use client";

import { Button, Dialog, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC, useState } from "react";
import DevelopmentCards, { DevelopmentCard } from "./DevelopmentCard";
import { BlankCard } from "./DevelopmentTiles";
import { GemColors, GemType, Token } from "./GemTokens";

export interface Player {
  id: number;
  gems: Record<GemType, number>;
  reservedCards: any[];
  purchasedCards: GemType[];
  nobleCards: DevelopmentCard[];
  points: number;
}

interface PlayerBoardProps {
  player: Player;
  selectedGem: string[];
  isDisplayPurchaseCard: (card: DevelopmentCard, player: Player) => boolean;
  onCardPurchase: (card: DevelopmentCard) => void;
  getPlayerGemCardAmount: (gem: GemType, player: Player) => number;
}

const PlayerBoard: FC<PlayerBoardProps> = ({
  selectedGem,
  player,
  isDisplayPurchaseCard,
  onCardPurchase,
  getPlayerGemCardAmount,
}) => {
  const playerTokens = Object.keys(player.gems).reduce(
    (acc, cur) => acc + player.gems[cur as GemType],
    0
  );
  const [isOpenReserveCard, setIsOpenReserveCard] = useState(false);
  const holdTokensAmount = selectedGem.length + playerTokens;

  function displayBgColor(gemType: GemType) {
    const isPlayerHaveGemType = player.purchasedCards.includes(gemType);
    return isPlayerHaveGemType ? GemColors[gemType] : "inherit";
  }

  return (
    <PlayerBoardBox>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        gap="20px"
        width="80%"
        height="100%"
      >
        {Object.keys(player.gems).map((gem, index) => (
          <PlayerDevelopmentBox key={`${gem}${index}`}>
            <PurchaseAmount>
              {getPlayerGemCardAmount(gem as GemType, player)}
            </PurchaseAmount>
            <BlankCard
              width="100%"
              height="100%"
              bgcolor={displayBgColor(gem as GemType)}
            />
            <TokenWrapper>
              <Token
                gem={gem as GemType}
                size="40px"
                onClick={() => {}}
                value={player.gems[gem as GemType].toString()}
              />
            </TokenWrapper>
          </PlayerDevelopmentBox>
        ))}
      </Stack>
      <TokenAmount>
        <IsValidSpan
          valid={holdTokensAmount <= 10}
          value={holdTokensAmount.toString()}
        />
        / 10
      </TokenAmount>

      <JokerGemsWrapper>
        <Token size="30px" gem="joker" value={player.gems.joker.toString()} />
      </JokerGemsWrapper>

      {player.reservedCards.map((i, idx) => (
        <ReserveCardWrapper
          key={idx}
          index={idx}
          onClick={() => setIsOpenReserveCard(true)}
        >
          <BlankCard width="30px" height="40px" bgcolor={GemColors.joker} />
        </ReserveCardWrapper>
      ))}

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
                <Button
                  variant="contained"
                  onClick={() => {
                    onCardPurchase(card);
                    setIsOpenReserveCard(false);
                  }}
                >
                  Purchase
                </Button>
              )}
            </ReserveBox>
          ))}
        </DevelopmentCardsDialog>
      </Dialog>
    </PlayerBoardBox>
  );
};

export default PlayerBoard;

const PlayerBoardBox = styled(Box)`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  flex: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TokenWrapper = styled(Box)`
  position: absolute;
  bottom: -20px;
  right: -20px;
`;

const PlayerDevelopmentBox = styled(Box)`
  display: flex;
  position: relative;
  flex: 1;
  height: 100%;
`;

const TokenAmount = styled(Box)`
  position: absolute;
  bottom: 5px;
  left: 10px;
`;

const IsValidSpan = styled("span")<{ valid: boolean; value: string }>`
  color: ${({ valid }) => (valid ? "inherit" : "red")};

  &:before {
    content: " ${({ value }) => value} ";
  }
`;

const JokerGemsWrapper = styled(Box)`
  position: absolute;
  top: 5px;
  right: 10px;
`;

const ReserveCardWrapper = styled(Box)<{ index: number }>`
  position: absolute;
  bottom: 5px;
  right: calc(10px + ${({ index }) => reserveCardCss(index).right}px);
  transform: rotate(${({ index }) => `${reserveCardCss(index).rotate}turn`});
  z-index: ${({ index }) => reserveCardCss(index).zIndex};
`;

function reserveCardCss(idx: number) {
  switch (idx) {
    case 0:
      return { rotate: "0.0", right: 7, zIndex: 2 };
    case 1:
      return { rotate: "-0.05", right: 15, zIndex: 1 };
    case 2:
      return { rotate: "0.05", right: 0, zIndex: 3 };
    default:
      return { rotate: "0.0", right: "", zIndex: "" };
  }
}

const DevelopmentCardsDialog = styled(Box)`
  display: flex;
  gap: 30px;
`;

const DevelopmentCardsWrapper = styled(Box)`
  height: 300px;
  width: 200px;
`;

const ReservePaperDialog = styled(Box)`
  background-color: transparent;
  max-width: fit-content !important;
`;

const ReserveBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PurchaseAmount = styled(Box)`
  position: absolute;
  top: 5px;
  right: 8px;
`;
