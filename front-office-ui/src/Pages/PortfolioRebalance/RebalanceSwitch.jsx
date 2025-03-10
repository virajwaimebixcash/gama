import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

function RebalanceSwitch({ isOn, setIsOn }) {
  const handleToggle = () => {
    setIsOn(!isOn); // Toggle the switch state
  };

  return (
    <Button
      variant="contained"
      onClick={handleToggle}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '220px',       // Smaller width
        height: '29px',       // Smaller height
        padding: '4px 4px 4px 4px',
        fontSize: '12px',   // Smaller text size
        borderRadius: '5px', // Rounded corners
        backgroundColor: isOn ? '#DDDBDF' : '#DDDBDF', // Overall button color based on state
        borderColor:"#DDDBDF",
      }}
    >
      <Box
        sx={{
          flex: 1,
          textAlign: 'center',
          backgroundColor: isOn ? '#65B872' : '#fffbfb',  // Left side (On) background
          color: isOn ? '#fff' : '#D6CACA',                // Text color
          fontWeight: isOn ? 'bold' : 'normal',           // Bold text when active
          padding: '10px ',                 // Rounded only on the left side
          transition: 'all 0.3s ease',
        }}
      >
        To be Bought
      </Box>
      <Box
        sx={{
          flex: 1,
          textAlign: 'center',
          backgroundColor: !isOn ? '#65B872' : '#fffbfb', // Right side (Off) background
          color: !isOn ? '#fff' : '#D6CACA',               // Text color
          fontWeight: !isOn ? 'bold' : 'normal',          // Bold text when active
          padding: '10px',                 // Rounded only on the right side
          transition: 'all 0.3s ease',
        }}
      >
       To be Sold
        
      </Box>
    </Button>
  );
}

export default RebalanceSwitch;
