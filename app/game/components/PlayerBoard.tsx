import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { GemType, Token } from "./GemTokens";
import { BlankCard } from "./DevelopmentTiles";
import { styled } from "@mui/material";

interface Player {
  id: number;
  gems: Record<GemType, number>;
  reservedCards: any[];
  purchasedCards: any[];
  points: number;
}

interface PlayerBoardProps {
  player: Player;
  onPlayerAction: (playerId: number) => void;
}

const PlayerBoard: FC<PlayerBoardProps> = ({ player, onPlayerAction }) => {
  const playerTokens = Object.keys(player.gems).reduce(
    (acc, cur) => acc + player.gems[cur as GemType],
    0
  );
  return (
    <PlayerBoardBox sx={{}}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        gap="20px"
      >
        {Object.keys(player.gems).map((gem, index) => (
          <PlayerDevelopmentBox key={`${gem}${index}`}>
            <BlankCard width="60px" height="72px" />
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
      <TokenAmount>{playerTokens} / 10</TokenAmount>
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
`;

const TokenWrapper = styled(Box)`
  position: absolute;
  bottom: -20px;
  right: -20px;
`;

const PlayerDevelopmentBox = styled(Box)`
  display: flex;
  position: relative;
`;

const TokenAmount = styled(Box)`
  position: absolute;
  top: 5px;
  right: 10px;
`;
