import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

function GoalSwitch1() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn); // Toggle the state between true and false
  };

  return (
    <Button
      variant="contained"
      onClick={handleToggle}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '190px',       // Smaller width
        height: '25px',       // Smaller height
        padding: '1px 3px 1px 3px',
        margin:'13px 0px 0px 0px',
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
          backgroundColor: isOn ? '#A35CFB' : '#fffbfb',  // Left side (On) background
          color: isOn ? '#fff' : '#000',                // Text color
          fontWeight: isOn ? 'bold' : 'normal',           // Bold text when active
          padding: '10px ',                 // Rounded only on the left side
          transition: 'all 0.3s ease',
        }}
      >
        One-Time
      </Box>
      <Box
        sx={{
          flex: 1,
          textAlign: 'center',
          backgroundColor: !isOn ? '#A35CFB' : '#fffbfb', // Right side (Off) background
          color: !isOn ? '#fff' : '#000',               // Text color
          fontWeight: !isOn ? 'bold' : 'normal',          // Bold text when active
          padding: '10px',                 // Rounded only on the right side
          transition: 'all 0.3s ease',
        }}
      >
        Recurring
        
      </Box>
    </Button>
  );
}

export default GoalSwitch1;
