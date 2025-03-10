import { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';

function SwitchforModel({ onModeChange, value }) {    
  const [isEqualWeight, setIsEqualWeight] = useState(value === 1);

  useEffect(() => {
    setIsEqualWeight(value === 1); // Ensure it updates when value changes
  }, [value]);

  const handleToggle = () => {
    const newMode = !isEqualWeight;
    setIsEqualWeight(newMode);
    onModeChange(newMode); // Notify parent component
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
        height: '25px',       // Smaller height
        padding: '1px 3px 1px 3px',
        fontSize: '12px',   // Smaller text size
        borderRadius: '5px', // Rounded corners
        backgroundColor: isEqualWeight ? '#DDDBDF' : '#DDDBDF', // Overall button color based on state
        borderColor: "#DDDBDF",
      }}
    >
      <Box
        sx={{
          flex: 1,
          textAlign: 'center',
          backgroundColor: isEqualWeight ? '#A35CFB' : '#fffbfb',  // Left side (On) background
          color: isEqualWeight ? '#fff' : '#000',                // Text color
          fontWeight: isEqualWeight ? 'bold' : 'normal',           // Bold text when active
          padding: '10px ',                 // Rounded only on the left side
          transition: 'all 0.3s ease',
        }}
      >
        Equal Weight
      </Box>
      <Box
        sx={{
          flex: 1,
          textAlign: 'center',
          backgroundColor: !isEqualWeight ? '#A35CFB' : '#fffbfb', // Right side (Off) background
          color: !isEqualWeight ? '#fff' : '#000',               // Text color
          fontWeight: !isEqualWeight ? 'bold' : 'normal',          // Bold text when active
          padding: '10px',                 // Rounded only on the right side
          transition: 'all 0.3s ease',
        }}
      >
        Custom Weight
      </Box>
    </Button>
  );
}

export default SwitchforModel;
