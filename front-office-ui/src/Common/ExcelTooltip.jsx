import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import excel from "../images/excel.png";
const ExcelTooltip = () => {
  return (
    <Tooltip title="Excel" arrow>
      <Box
        component="img"
        src={excel}
        alt="Example"
        sx={{ width: 24, height: 24, cursor: "pointer", borderRadius: 2 }}
      />
    </Tooltip>
  );
};

export default ExcelTooltip;