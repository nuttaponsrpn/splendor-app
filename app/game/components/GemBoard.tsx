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
        <>
          {gemTokens[gem as GemType] > 0 ? (
            <TokenBox key={gem} onClick={() => onSelectGem(gem as GemType)}>
              <Token
                gem={gem as GemType}
                value={gemTokens[gem as GemType].toString()}
              />
              <TokenAmount className="text-shadow">
                {gemTokens[gem as GemType]}
              </TokenAmount>
            </TokenBox>
          ) : (
            <TokenBox>
              <BlankToken />
            </TokenBox>
          )}
        </>
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

  ${({ theme }) => theme.breakpoints.up("sm")} {
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

const TokenBox = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 8px;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    height: 60px;
  }
`;

const TokenAmount = styled(Box)`
  z-index: 3;
  position: absolute;
  bottom: 28px;
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 20px !important;
  cursor: pointer;
  top: 27px;
`;

const BlankToken = styled(Box)`
  height: calc(100% - 20px);
  background-color: #fff;
  z-index: 2;
  border-radius: 50%;
  aspect-ratio: 1/1;
  padding: 10px;
  position: relative;
  cursor: pointer;
  box-shadow: #9ebfae 0px 0px 0px 2px, #bcbf8c 0px 4px 6px -1px,
    #ffffff 0px 1px 0px inset;

  &:after {
    content: " ";
    position: absolute;
    background-color: #fff;
    height: calc(100% - 10px);
    aspect-ratio: 1/1;
    border-radius: 50%;
    z-index: 2;
    top: 5px;
    left: 5px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;
