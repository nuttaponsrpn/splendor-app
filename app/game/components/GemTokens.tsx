import { Avatar, AvatarSlotsAndSlotProps, styled } from "@mui/material";
import Box from "@mui/material/Box";
import { FC } from "react";

interface GemTokensProps {
  gemTokens: Record<GemType, number>;
  onSelectGem: (gem: GemType) => void;
}

export type GemType =
  | "diamond"
  | "sapphire"
  | "emerald"
  | "ruby"
  | "onyx"
  | "joker";

export const GemColors: Record<GemType, string> = {
  diamond: "#ffeeb8",
  sapphire: "#007ef2",
  emerald: "#07c64f",
  ruby: "#e10000",
  onyx: "#362712",
  joker: "#ffe439",
};

const GemTokens: FC<GemTokensProps> = ({ gemTokens, onSelectGem }) => {
  return (
    <GemTokensContainer className="gem-token-container">
      {Object.keys(gemTokens).map((gem) => (
        <TokenTiles key={gem}>
          <Token
            gem={gem as GemType}
            value={gemTokens[gem as GemType].toString()}
            onClick={() => onSelectGem(gem as GemType)}
            size="2.5vw"
          />
        </TokenTiles>
      ))}
    </GemTokensContainer>
  );
};

interface TokenProps {
  gem: GemType | "joker";
  type?: "circular" | "rounded" | "square";
  value?: string;
  size?: string;
  onClick?: (gem: GemType) => void;
}

export const Token: FC<TokenProps> = ({
  gem,
  value,
  type = "circular",
  size,
  onClick = (gem: GemType) => {},
}) => {
  return (
    <AvatarToken
      gem={gem}
      bgcolor={gem === "joker" ? GemColors.joker : GemColors[gem as GemType]}
      variant={type}
      onClick={() => onClick(gem as GemType)}
      size={size}
    >
      {!!value ? value : gem.charAt(0).toUpperCase()}
    </AvatarToken>
  );
};

export default GemTokens;

const AvatarToken = styled(Avatar)<
  AvatarSlotsAndSlotProps & { bgcolor: string; size?: string; gem: string }
>`
  background-color: ${({ bgcolor }) => bgcolor};
  width: ${({ size }) => (!!size ? size : "40px")};
  height: ${({ size }) => (!!size ? size : "40px")};
  color: ${({ gem }) => (gem === "joker" ? "black" : "#fff")};
  border: 1px solid #fff;
  box-shadow: 0 0px 8px #ffe853;
  text-shadow: 0 0 0 rgba(0, 0, 0, 1),
    /* main shadow, fully opaque */ 0.05em 0 0 rgba(0, 0, 0, 1),
    /* thin right */ -0.05em 0 0 rgba(0, 0, 0, 1),
    /* thin left */ 0 0.05em 0 rgba(0, 0, 0, 1),
    /* thin down */ 0 -0.05em 0 rgba(0, 0, 0, 1); /* thin up */
  letter-spacing: 2px;
  font-size: 10px !important;
`;

const GemTokensContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: fit-content;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
  }
`;

const TokenTiles = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid #ff232326;
  border-radius: 50%;
  cursor: pointer;
`;
