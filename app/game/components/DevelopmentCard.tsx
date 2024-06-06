import { Box, Card, styled, Typography } from "@mui/material";
import { FC } from "react";
import { GemType, Token } from "./GemTokens";

export type DevelopmentLevel = 1 | 2 | 3;

type LevelBgColor = Record<DevelopmentLevel, string>;

export interface DevelopmentCard {
  id: number;
  level: number;
  cost: Gem;
  points: number;
  gemType: GemType;
}

export interface Gem {
  diamond: number;
  sapphire: number;
  emerald: number;
  ruby: number;
  onyx: number;
  joker: number;
}

const levelBgColor: LevelBgColor = {
  1: "#c2e7b8",
  2: "#ffffe4",
  3: "#bdcef3",
};

interface DevelopmentCardProps {
  developmentCard: DevelopmentCard;
}

const DevelopmentCards: FC<DevelopmentCardProps> = ({ developmentCard }) => {
  return (
    <DevelopmentCardBox
      id={`id${developmentCard.id}level${developmentCard.level}`}
      bgcolor={levelBgColor[developmentCard.level as DevelopmentLevel]}
    >
      <DevelopmentCardHeader>
        <CardPoints variant="h5">{developmentCard.points}</CardPoints>
        <Token gem={developmentCard.gemType} size="2.3vw"></Token>
      </DevelopmentCardHeader>
      <DevelopmentCardFooter>
        {Object.keys(developmentCard.cost)
          .filter((key) => developmentCard.cost[key as GemType] > 0)
          .map((key, i) => (
            <div key={`${key}${i}`}>
              <Token
                gem={key as GemType}
                size="2vw"
                value={developmentCard.cost[key as GemType].toString()}
              ></Token>
            </div>
          ))}
      </DevelopmentCardFooter>
    </DevelopmentCardBox>
  );
};

export default DevelopmentCards;

const DevelopmentCardBox = styled(Card)<{ bgcolor: string }>`
  text-align: center;
  padding: 0px 4%;
  background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : "inherit")};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border: 5px solid #ffe853c9; /* Thickness and color of the border */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* Shadow with gradient effect */
  cursor: pointer;
`;

const DevelopmentCardHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DevelopmentCardFooter = styled(Box)`
  display: flex;
  flex-wrap: wrap-reverse;
  gap: 3%;
  padding-bottom: 8%;
`;

const CardPoints = styled(Typography)`
  color: #fff;
  text-shadow: 0 0 0 rgba(0, 0, 0, 1),
    /* main shadow, fully opaque */ 0.05em 0 0 rgba(0, 0, 0, 1),
    /* thin right */ -0.05em 0 0 rgba(0, 0, 0, 1),
    /* thin left */ 0 0.05em 0 rgba(0, 0, 0, 1),
    /* thin down */ 0 -0.05em 0 rgba(0, 0, 0, 1); /* thin up */
  letter-spacing: 2px;
`;
