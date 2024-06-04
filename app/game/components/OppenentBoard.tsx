import { Box, Stack, styled, Typography } from "@mui/material";
import { FC } from "react";
import { BlankCard } from "./DevelopmentTiles";
import { GemType, Token } from "./GemTokens";
import { Player } from "./PlayerBoard";

interface OpponentBoardProps {
  player: Player;
}

const OpponentBoard: FC<OpponentBoardProps> = ({ player }) => {
  return (
    <OpponentBoardBox>
      <PlayerHeader>
        <Typography variant="h5">Player {player.id}</Typography>
        <Typography variant="h5">{player.points}</Typography>
      </PlayerHeader>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        {Object.keys(player.gems).map((gem, index) => (
          <OpponentDevelopmentBox key={`${gem}${index}`}>
            <BlankCard width="2.5vw" height="6.5vh" />
            <TokenWrapper>
              <Token
                gem={gem as GemType}
                size="16px"
                onClick={() => {}}
                value={player.gems[gem as GemType].toString()}
              />
            </TokenWrapper>
          </OpponentDevelopmentBox>
        ))}
      </Stack>
    </OpponentBoardBox>
  );
};

export default OpponentBoard;

const OpponentBoardBox = styled(Box)`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.3rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PlayerHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OpponentDevelopmentBox = styled(Box)`
  display: flex;
  position: relative;
  margin-left: 8px !important;
`;

const TokenWrapper = styled(Box)`
  position: absolute;
  bottom: -5px;
  right: -5px;
  > div {
    font-size: 12px;
  }
`;
