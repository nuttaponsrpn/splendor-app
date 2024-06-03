import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface NobleTilesProps {
  nobleTiles: any[];
}

const NobleTiles: FC<NobleTilesProps> = ({ nobleTiles }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: "0 0 130px",
        borderRadius: "8px",
        gap: "8px",
      }}
    >
      {nobleTiles.map((tile, index) => (
        <Box
          key={index}
          sx={{
            flex: "1 1 30%",
            textAlign: "center",
            border: "1px solid #bbb",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="body1">Noble {index + 1}</Typography>
          {/* Display noble tile details */}
        </Box>
      ))}
    </Box>
  );
};

export default NobleTiles;
