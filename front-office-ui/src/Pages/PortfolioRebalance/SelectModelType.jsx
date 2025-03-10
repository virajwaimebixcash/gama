import React, { useState } from "react";
import { Modal, Box, Button, Typography, Radio, RadioGroup, Grid, Paper } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const SelectModelType = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (value) => setSelectedValue(value);

  return (
    <div>
      {/* Button to Open Modal */}
      <Button variant="contained" onClick={handleOpen} className="modalcreatbtn">
        Create Modal
      </Button>

      {/* Modal Popup */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 310,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" className="all12font" sx={{ mb: 2 }}>
            Select an Option
          </Typography>

          {/* Radio Buttons in a Grid */}
          <RadioGroup row sx={{ justifyContent: "center", gap: "20px" }}>
            {["Parent Mode", "Child Mode"].map((option, index) => (
              <Grid key={index} item>
                <Paper
                  onClick={() => handleChange(option)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 100,
                    height: 60,
                    p: 2,
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor: selectedValue === option ? "#FAFAFA" : "#FAFAFA", // Light red when selected, gray otherwise
                    color: selectedValue === option ? "black" : "#ddd",
                    border: selectedValue === option ? "1px solid #967DE0" : "1px solid transparent",
                    transition: "0.3s",
                  }}
                >
                  <Radio
                    value={option}
                    checked={selectedValue === option}
                    icon={<CheckCircle sx={{ fontSize: 30, color: "gray" }} />} // Gray check when unselected
                    checkedIcon={<CheckCircle sx={{ fontSize: 30, color: "#38C14E" }} />} // Red check when selected
                    sx={{ "&.Mui-checked": { color: "red" } }}
                  />
                  <Typography variant="body2">{option}</Typography>
                </Paper>
              </Grid>
            ))}
          </RadioGroup>

        </Box>
      </Modal>
    </div>
  );
};

export default SelectModelType;




