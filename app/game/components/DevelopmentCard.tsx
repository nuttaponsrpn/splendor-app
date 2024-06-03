import { Box, styled, Typography } from "@mui/material";
import { GemType, Token } from "./GemTokens";
import { FC } from "react";

export type DevelopmentLevel = 1 | 2 | 3;

type LevelBgColor = Record<DevelopmentLevel, string>;

export interface DevelopmentCard {
  id: number;
  level: number;
  cost: Gem;
  points: number;
  gemType: GemType;
}

interface Gem {
  diamond: number;
  sapphire: number;
  emerald: number;
  ruby: number;
  onyx: number;
}

const levelBgColor: LevelBgColor = {
  1: "#bfe7bf",
  2: "#fbfbc4",
  3: "#c8d6f5",
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
        <Typography variant="h5">{developmentCard.points}</Typography>
        <Token gem={developmentCard.gemType}></Token>
      </DevelopmentCardHeader>
      <DevelopmentCardFooter>
        {Object.keys(developmentCard.cost)
          .filter((key) => developmentCard.cost[key as GemType] > 0)
          .map((key, i) => (
            <div key={`${key}${i}`}>
              <Token
                gem={key as GemType}
                size="30px"
                value={developmentCard.cost[key as GemType].toString()}
              ></Token>
            </div>
          ))}
      </DevelopmentCardFooter>
    </DevelopmentCardBox>
  );
};

export default DevelopmentCards;

const DevelopmentCardBox = styled(Box)`
  text-align: center;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const DevelopmentCardHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DevelopmentCardFooter = styled(Box)`
  display: flex;
  flex-wrap: wrap-reverse;
  gap: 6px;
`;
