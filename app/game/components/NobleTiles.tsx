import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { DevelopmentCard } from "./DevelopmentCard";
import { GemType, Token } from "./GemTokens";

interface NobleTilesProps {
  nobleTiles: DevelopmentCard[];
}

const NobleTiles: FC<NobleTilesProps> = ({ nobleTiles }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "0 0 130px",
        borderRadius: "8px",
        gap: "26px",
      }}
    >
      {nobleTiles.map((tile, index) => (
        <NobleTilesBox key={index}>
          <Typography variant="body1">Noble {index + 1}</Typography>

          <NobleCostWrapper>
            {Object.keys(tile.cost)
              .filter((gemType) => tile.cost[gemType as GemType] > 0)
              .map((gToken, index) => (
                <Token
                  gem={gToken as GemType}
                  key={gToken + index}
                  size="30px"
                  value={tile.cost[gToken as GemType].toString()}
                />
              ))}
          </NobleCostWrapper>
        </NobleTilesBox>
      ))}
    </Box>
  );
};

export default NobleTiles;

const NobleTilesBox = styled(Box)`
  flex: 0 0 30%;
  text-align: center;
  border: 1px solid #bbb;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
`;

const NobleCostWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap-reverse;
  flex-direction: row;
  position: absolute;
  bottom: 10px;
  left: 10px;
  gap: 6px;
`;
