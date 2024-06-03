import { FC } from "react";
import { Player } from "./GameBoard";
import { Box, Stack, styled, Typography } from "@mui/material";
import { BlankCard } from "./DevelopmentTiles";
import { GemType, Token } from "./GemTokens";

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
            <BlankCard width="30px" height="34px" />
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
  padding: 8px 18px 22px 18px;
  gap: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
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
  margin-left: 8px;
`;

const TokenWrapper = styled(Box)`
  position: absolute;
  bottom: -5px;
  right: -5px;
  > div {
    font-size: 12px;
  }
`;
