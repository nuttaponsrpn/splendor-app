import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { FC } from "react";
import Token, { GemType } from "./Tokens";

interface GemBoardProps {
  gemTokens: Record<GemType, number>;
  onSelectGem: (gem: GemType) => void;
}

const GemBoard: FC<GemBoardProps> = ({ gemTokens, onSelectGem }) => {
  const allGems = Object.keys(gemTokens).filter((gem) => gem !== "joker");
  return (
    <TokenTiles>
      {allGems.map((gem) => (
        <TokenBox key={gem}>
          <Token
            gem={gem as GemType}
            value={gemTokens[gem as GemType].toString()}
            onClick={() => onSelectGem(gem as GemType)}
          />
          <TokenAmount className="text-shadow">
            {gemTokens[gem as GemType]}
          </TokenAmount>
        </TokenBox>
      ))}
    </TokenTiles>
  );
};

export default GemBoard;

const TokenTiles = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  position: relative;
`;

const TokenBox = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const TokenAmount = styled(Box)`
  position: absolute;
  bottom: -8px;
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 20px !important;
`;
