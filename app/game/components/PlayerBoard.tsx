"use client";

import { Card, styled } from "@mui/material";
import Box from "@mui/material/Box";
import { FC, useState } from "react";
import { DevelopmentCard, Gem } from "./DevelopmentCard";
import EndTurnTiles from "./EndTurnTiles";
import Token, { GemColors, GemType } from "./Tokens";

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
  selectedGem: GemType[];
  isDisplayPurchaseCard: (card: DevelopmentCard, player: Player) => boolean;
  onCardPurchase: (card: DevelopmentCard) => void;
  getPlayerGemCardAmount: (gem: GemType, player: Player) => number;
  onPlayerRemoveGem: (gem: GemType, index: number) => void;
  onPlayerEndTurn: () => void;
}

const PlayerBoard: FC<PlayerBoardProps> = ({
  selectedGem,
  player,
  isDisplayPurchaseCard,
  onCardPurchase,
  getPlayerGemCardAmount,
  onPlayerRemoveGem,
  onPlayerEndTurn,
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
    <PlayerBoardBox name={"Player " + player.id}>
      <PlayerBoardHeader>
        {/* Player Gem */}
        <TokenWrapprer>
          {selectedGem.map((gem, index) => (
            <Token
              key={gem}
              gem={gem}
              onClick={() => onPlayerRemoveGem(gem, index)}
            />
          ))}
        </TokenWrapprer>
      </PlayerBoardHeader>

      {/* Player Card */}
      <PlayerCardBox>
        {Object.keys(player.gems).map((gemType, index) => (
          <PlayerCardWrapper
            key={gemType}
            className="player-card-wrapper text-shadow"
            gemtype={gemType as GemType}
          >
            <PlayerCard
              className="shadow"
              points={getPlayerGemCardAmount(
                gemType as GemType,
                player
              ).toString()}
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

      <EndTurnWrapper>
        <EndTurnTiles onClickEndTurn={onPlayerEndTurn} />
      </EndTurnWrapper>
      {/* <Stack
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
                onClick={() => {}}
                value={player.gems[gem as GemType].toString()}
              />
            </TokenWrapper>
          </PlayerDevelopmentBox>
        ))}
      </Stack>

      <JokerGemsWrapper>
        <Token gem="joker" value={player.gems.joker.toString()} />
      </JokerGemsWrapper>

      {player.reservedCards.map((i, idx) => (
        <ReserveCardWrapper
          key={idx}
          index={idx}
          onClick={() => setIsOpenReserveCard(true)}
        >
          <BlankCard width="30px" height="40px" bgcolor={GemColors.joker} />
        </ReserveCardWrapper>
      ))} */}

      {/* <Dialog
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
      </Dialog> */}
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
    width: 40%;
    height: 25%;
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
`;

const PlayerBoardHeader = styled(Box)`
  width: 100%;
  margin-top: auto;
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
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
  height: 100%;
  width: 38px;
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
`;
// const TokenWrapper = styled(Box)`
//   position: absolute;
//   bottom: -20px;
//   right: -20px;
// `;

// const PlayerDevelopmentBox = styled(Box)`
//   display: flex;
//   position: relative;
//   flex: 1;
//   height: 100%;
// `;

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

// const JokerGemsWrapper = styled(Box)`
//   position: absolute;
//   top: 5px;
//   right: 10px;
// `;

// const ReserveCardWrapper = styled(Box)<{ index: number }>`
//   position: absolute;
//   bottom: 5px;
//   right: calc(10px + ${({ index }) => reserveCardCss(index).right}px);
//   transform: rotate(${({ index }) => `${reserveCardCss(index).rotate}turn`});
//   z-index: ${({ index }) => reserveCardCss(index).zIndex};
// `;

// function reserveCardCss(idx: number) {
//   switch (idx) {
//     case 0:
//       return { rotate: "0.0", right: 7, zIndex: 2 };
//     case 1:
//       return { rotate: "-0.05", right: 15, zIndex: 1 };
//     case 2:
//       return { rotate: "0.05", right: 0, zIndex: 3 };
//     default:
//       return { rotate: "0.0", right: "", zIndex: "" };
//   }
// }

// const DevelopmentCardsDialog = styled(Box)`
//   display: flex;
//   gap: 30px;
// `;

// const DevelopmentCardsWrapper = styled(Box)`
//   height: 300px;
//   width: 200px;
// `;

// const ReservePaperDialog = styled(Box)`
//   background-color: transparent;
//   max-width: fit-content !important;
// `;

// const ReserveBox = styled(Box)`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// const PurchaseAmount = styled(Box)`
//   position: absolute;
//   top: 5px;
//   right: 8px;
// `;

const TokenWrapprer = styled(Box)`
  display: flex;
  height: 65px;
  width: 200px;
  gap: 12px;
  align-items: center;
  position: relative;
  margin-left: auto;
`;

const EndTurnWrapper = styled(Box)`
  position: absolute;
  top: -20px;
  right: 20px;
  width: 120px;
  height: 45px;
  z-index: 2;
`;
