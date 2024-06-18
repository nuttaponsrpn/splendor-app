import { Box, Card, styled } from "@mui/material";
import { FC } from "react";
import { Player } from "./PlayerBoard";
import { GemColors, GemType } from "./Tokens";

interface OpponentBoardProps {
  player: Player;
}

const OpponentBoard: FC<OpponentBoardProps> = ({ player }) => {
  function getGemCardsAmount(player: Player, gem: GemType) {
    return player.purchasedCards
      .filter((card) => card.gemType === gem)
      .length.toString();
  }

  return (
    <OpponentBoardBox name={player.id} className="opponent-board-box">
      <OpponentAssetBox>
        {Object.keys(player.gems).map((gem, index) => (
          <OpponentCardWrapper
            className="opponent-card-wrapper text-shadow"
            key={index}
            gemtype={gem as GemType}
          >
            <OpponentCard
              className="shadow"
              points={getGemCardsAmount(player, gem as GemType)}
            />
            <OpponentToken
              className="shadow"
              points={player.gems[gem as GemType].toString()}
            />
          </OpponentCardWrapper>
        ))}
      </OpponentAssetBox>
    </OpponentBoardBox>
  );
};

export default OpponentBoard;

const OpponentBoardBox = styled(Card)<{ name: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  padding: 4px;
  margin-top: 6px;
  overflow: visible;
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
    content: "${({ name }) => name} ";
    width: 80%;
    background: #f3c244;
    background: -webkit-linear-gradient(
      0deg,
      #f3c244 0%,
      #ffe37f 50%,
      #f9e496 100%
    );
    background: linear-gradient(0deg, #f3c244 0%, #ffe37f 50%, #f9e496 100%);
    width: 100px;
    height: 18px;
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

const OpponentAssetBox = styled(Box)`
  display: flex;
  gap: 1px;
  width: 100%;
  height: 100%;
  padding: 13% 8% 8% 8%;
`;

const OpponentCardWrapper = styled(Box)<{ gemtype: GemType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 1px;

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

const OpponentCard = styled(Box)<{ points: string }>`
  width: 100%;
  height: 40%;
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

const OpponentToken = styled(Box)<{ points: string }>`
  width: 100%;
  height: 35%;
  background-color: ${({ points }) =>
    +points > 0 ? "" : "transparent !important"};
  border: solid 0.5px #fff;
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
