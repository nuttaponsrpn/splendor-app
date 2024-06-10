import { Button, styled } from "@mui/material";
import { FC } from "react";

interface EndTurnTilesProps {
  onClickEndTurn: () => void;
}

const EndTurnTiles: FC<EndTurnTilesProps> = ({ onClickEndTurn }) => {
  return (
    <EndTurnContainer
      className="end-turn-container"
      color="secondary"
      onClick={onClickEndTurn}
      variant="contained"
    >
      End Turn
    </EndTurnContainer>
  );
};

export default EndTurnTiles;

const EndTurnContainer = styled(Button)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #fffdde !important;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  font-weight: bold !important;
  white-space: nowrap;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.palette.primary.main};
`;
