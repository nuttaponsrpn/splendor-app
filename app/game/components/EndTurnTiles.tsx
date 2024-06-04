import { Box, Button, styled } from "@mui/material";
import { FC } from "react";

interface EndTurnTilesProps {
  onClickEndTurn: () => void;
}

const EndTurnTiles: FC<EndTurnTilesProps> = ({ onClickEndTurn }) => {
  return (
    <EndTurnContainer>
      <EndTurnButton fullWidth onClick={onClickEndTurn}>
        End Turn
      </EndTurnButton>
    </EndTurnContainer>
  );
};

export default EndTurnTiles;

const EndTurnContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 15%;
`;

const EndTurnButton = styled(Button)`
  height: 100%;
`;
