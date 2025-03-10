import React, { useState } from "react";
import { Box, Typography, Paper, Grid2, keyframes } from "@mui/material";
import { CheckCircleOutline, HighlightOff, Info, Star, Home, Settings } from "@mui/icons-material";

// Define keyframes for the animation
const pulse = keyframes`
  0% {
    transform: scale(1);
    color: #757575;
  }
  50% {
    transform: scale(1.2);
    color: green;
  }
  100% {
    transform: scale(1);
    color: green;
  }
`;

const SWPIconRadioButtons = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleBoxClick = (value) => {
    setSelectedOption(value);
  };

  const options = [
    { value: "option1", label: "1 Month", icon: <CheckCircleOutline />, message: "SIP will be start after 1 month." },
    { value: "option2", label: "2 Month", icon: <CheckCircleOutline />, message: "SIP will be start after 2 month." },
    { value: "option3", label: "3 Month", icon:  <CheckCircleOutline />, message: "SIP will be start after 3 month." },
    // { value: "option4", label: "Option 4", icon: <Star />, message: "You selected Option 4." },
    // { value: "option5", label: "Option 5", icon: <Home />, message: "You selected Option 5." },
    // { value: "option6", label: "Option 6", icon: <Settings />, message: "You selected Option 6." },
  ];

  const selectedMessage = options.find((option) => option.value === selectedOption)?.message;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 1,
        px: 0,
      }}
    >
    
      <Grid2 container spacing={3} justifyContent="center">
        {options.map((option) => (
          <Grid2 item xs={12} sm={6} md={4} lg={3} key={option.value}>
            <Paper
              onClick={() => handleBoxClick(option.value)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 3,
                borderRadius: "8px",
                cursor: "pointer",
                transition: "0.3s",
                border: selectedOption === option.value ? "2px solid #1976d2" : "1px solid #ccc",
                backgroundColor: selectedOption === option.value ? "#e3f2fd" : "#fff",
                boxShadow: selectedOption === option.value ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "0 1px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box
                sx={{
                  fontSize: 20,
                  color: selectedOption === option.value ? "green" : "#757575",
                  animation: selectedOption === option.value ? `${pulse} 0.5s ease-in-out` : "none",
                }}
              >
                {option.icon}
              </Box>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {option.label}
              </Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>

      {/* Display the message based on the selected option */}
      {selectedMessage && (
        <Typography
          variant="body1"
          sx={{
            mt: 4,
            p: 2,
            textAlign: "center",
            maxWidth: 600,
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {selectedMessage}
        </Typography>
      )}
    </Box>
  );
};

export default SWPIconRadioButtons;

 
 
 

 
