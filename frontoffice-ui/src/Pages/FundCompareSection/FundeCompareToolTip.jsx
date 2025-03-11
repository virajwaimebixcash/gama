import React from "react";
import { Tooltip, Typography } from "@mui/material";

const EllipsisText = ({ text, maxWidth = 170 }) => {
  return (
    <Tooltip title={text} arrow>
      <Typography
        variant="body2"
        noWrap
        sx={{
          maxWidth: maxWidth,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          display: "block",
          cursor: "pointer",
        }}
      >
        {text?.slice(0,20)}
      </Typography>
    </Tooltip>
  );
};

export default function FundeCompareToolTip({text}) {
  return (
    <div style={{ padding: 0 }}>
      <EllipsisText text={text} />
    </div>
  );
}
