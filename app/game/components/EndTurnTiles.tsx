import { Box, Button, styled, Typography } from "@mui/material";
import { GemType, Token } from "./GemTokens";
import { FC } from "react";
import { Player } from "./GameBoard";

interface EndTurnTilesProps {
  onClickEndTurn: () => void;
}

const EndTurnTiles: FC<EndTurnTilesProps> = ({ onClickEndTurn }) => {
  return (
    <EndTurnContainer>
      <Button fullWidth sx={{ height: "100%" }}>
        End Turn
      </Button>
    </EndTurnContainer>
  );
};

const EndTurnContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 238px;
`;

export default EndTurnTiles;
