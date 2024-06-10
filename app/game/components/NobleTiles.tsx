import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Card, styled } from "@mui/material";
import Box from "@mui/material/Box";
import { FC, useState } from "react";
import { DevelopmentCard, Gem } from "./DevelopmentCard";
import { GemColors, GemType } from "./Tokens";

interface NobleTilesProps {
  nobleTiles: DevelopmentCard[];
}

const NobleTiles: FC<NobleTilesProps> = ({ nobleTiles }) => {
  const [randomBgColor] = useState([
    getRandomColorHex(),
    getRandomColorHex(),
    getRandomColorHex(),
    getRandomColorHex(),
    getRandomColorHex(),
  ]);

  function getGemCost(cost: Gem) {
    return Object.keys(cost).filter((gemType) => cost[gemType as GemType] > 0);
  }

  function getRandomColorHex() {
    // Generate a random integer between 0 and 16777215 (0xFFFFFF)
    const randomInt = Math.floor(Math.random() * 16777215);
    // Convert the integer to a hex string and pad with leading zeros if necessary
    const hexColor = "#" + randomInt.toString(16).padStart(6, "0");
    return hexColor;
  }

  return (
    <NobleTilesContainer className="noble-tiles-container">
      {nobleTiles.map(({ id, points, cost }, idx) => (
        <NobleCardWrapper key={`${id}${points}`}>
          <CardPoints points={points.toString()} className="text-shadow">
            <StarRoundedIcon />
          </CardPoints>
          <CardCostWrapper className="text-shadow">
            {getGemCost(cost).map((g, index) => {
              const gemType = g as GemType;
              return (
                <CardCost
                  gemtype={gemType as GemType}
                  cost={cost[gemType]}
                  key={`${gemType}${index}`}
                />
              );
            })}
          </CardCostWrapper>
        </NobleCardWrapper>
      ))}
    </NobleTilesContainer>
  );
};

export default NobleTiles;

const NobleTilesContainer = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NobleCardWrapper = styled(Card)`
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  padding: 10px;
  flex: 0 0 18%;
  margin: 4px;
  position: relative;
  display: flex;
  justify-content: center;
  top: 0px;
  overflow: visible;

  &:after {
    content: " ";
    position: absolute;
    background-color: burlywood;
    width: calc(100% - 22px);
    height: calc(100% - 20px);
    border-radius: 6px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
`;

const CardPoints = styled(Box)<{ points: string }>`
  position: absolute;
  top: -12px;
  left: -8px;
  width: 34px;
  height: 34px;
  z-index: 2;

  > svg {
    position: relative;
    color: #ffc40d;

    width: 100%;
    height: 100%;
    -webkit-filter: drop-shadow(1px 3px 2px rgba(0, 0, 0, 0.7));
    filter: drop-shadow(1px 3px 2px rgba(0, 0, 0, 0.7));
  }

  &:after {
    content: ${({ points }) => `"${points}"`};
    position: absolute;
    left: 13px;
    top: 9px;
    width: 100%;
    height: 100%;
    font-size: small;
    z-index: 3;
  }
`;

const CardCostWrapper = styled(Box)`
  position: absolute;
  right: 4px;
  height: calc(100% - 8px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
  gap: 2px;
`;

const CardCost = styled(Box)<{ gemtype: GemType; cost: number }>`
  width: 20px;
  height: 20px;
  z-index: 2;
  border-radius: 4px;
  background-color: ${({ gemtype }) => GemColors[gemtype]};
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  &:before {
    font-size: 14px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    content: ${({ cost }) => `"${cost > 0 ? +cost : ""}"`} !important;
  }

  &:after {
    background: "#fff";
    background: -webkit-linear-gradient(
      0deg,
      transparent 0%,
      transparent 50%,
      #fff 150%
    ) !important;
    background: linear-gradient(
      0deg,
      transparent 0%,
      transparent 50%,
      #fff 150%
    ) !important;
  }
`;
