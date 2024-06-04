import { Avatar, AvatarSlotsAndSlotProps, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";

interface GemTokensProps {
  gemTokens: Record<GemType, number>;
  onSelectGem: (gem: GemType) => void;
}

export type GemType = "diamond" | "sapphire" | "emerald" | "ruby" | "onyx";

export const gemColors: Record<GemType, string> = {
  diamond: "#b9f2ff",
  sapphire: "#0f52ba",
  emerald: "#50c878",
  ruby: "#e0115f",
  onyx: "#353839",
};

export const jokerGemColors = "#fdfd64";

const GemTokens: FC<GemTokensProps> = ({ gemTokens, onSelectGem }) => {
  return (
    <GemTokensContainer>
      {Object.keys(gemTokens).map((gem) => (
        <TokenTiles key={gem}>
          <Typography variant="body1">
            {gem.charAt(0).toUpperCase() + gem.slice(1)}:{""}
            {gemTokens[gem as GemType]}
          </Typography>
          <Token
            gem={gem as GemType}
            onClick={() => onSelectGem(gem as GemType)}
            size="45px"
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
      bgcolor={gem === "joker" ? jokerGemColors : gemColors[gem as GemType]}
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
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const GemTokensContainer = styled(Box)`
  display: flex;
  width: 80%;
  justify-content: space-around;
  flex-direction: column;
  flex: 0 0 100px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
`;

const TokenTiles = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;
