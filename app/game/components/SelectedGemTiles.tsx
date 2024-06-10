import { Box, styled, Typography } from "@mui/material";
import { FC } from "react";
import Token, { GemType } from "./Tokens";

interface SelectGemTilesProps {
  name: string;
  points: string;
  selectedGems: GemType[];
  onRemoveGem: (gem: GemType, index: number) => void;
}

const SelectedGemTiles: FC<SelectGemTilesProps> = ({
  name,
  points,
  selectedGems,
  onRemoveGem,
}) => {
  return (
    <SelectGemTilesContainer>
      <PlayerInfoSection>
        <Typography variant="h5">Player {name}</Typography>
        <Typography variant="h6">{points}</Typography>
      </PlayerInfoSection>

      <SelectTokenSection>
        {selectedGems.map((gem, index) => (
          <Token
            gem={gem}
            key={`${gem}${index}`}
            onClick={() => onRemoveGem(gem, index)}
          />
        ))}
      </SelectTokenSection>
    </SelectGemTilesContainer>
  );
};

const SelectGemTilesContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 20%;
  height: 100%;
`;

export default SelectedGemTiles;

const PlayerInfoSection = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectTokenSection = styled(Box)`
  display: flex;
  align-items: center;
  gap: 18px;
`;
