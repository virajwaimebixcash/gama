import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import pdf from "../images/pdf.png";
const PDFTooltip = () => {
  return (
    <Tooltip title="PDF" arrow>
      <Box
        component="img"
        src={pdf}
        alt="Example"
        sx={{ width: 24, height: 24, cursor: "pointer", borderRadius: 2 }}
      />
    </Tooltip>
  );
};

export default PDFTooltip;
