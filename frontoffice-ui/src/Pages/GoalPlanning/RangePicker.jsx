import React, { useState } from "react";
import { Slider, Box, Typography } from "@mui/material";

export default function RangePicker() {
  const [value, setValue] = useState(50);

  return (
    <Box
      sx={{
        width: 300, // Fixed width
        padding: 0,
        whiteSpace: "nowrap", // Prevents line breaks
      }}
    >
      
      <Slider
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={100}
        className="rangeslidercss"
        sx={{ width: "100%" }} // Makes the slider fit the container
      />
    </Box>
  );
}
