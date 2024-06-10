import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { FC } from "react";

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

interface TokenProps {
  gem: GemType;
  value?: string;
  addClass?: string;
  onClick?: (gem: GemType) => void;
}

const Token: FC<TokenProps> = ({
  gem,
  value,
  addClass = "",
  onClick = (gem: GemType) => {},
}) => {
  return (
    <TokenBox
      className={`text-shadow ${addClass}`}
      gem={gem}
      onClick={() => onClick(gem)}
    >
      {!!value ? value : gem.charAt(0).toUpperCase()}
    </TokenBox>
  );
};

export default Token;

const TokenBox = styled(Box)<{ gem: GemType }>`
  height: calc(100% - 20px);
  background-color: ${({ gem }) => GemColors[gem]};
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
