import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import sort from '../../images/sort.png';
import nosort from '../../images/nosort.png';

function BackgroundChange({ checked, onChange, disabled }) {
  // State to manage the current image
  const [image, setImage] = useState(checked ? sort : nosort);

  // Update the image state when the checked prop changes
  useEffect(() => {
    setImage(checked ? sort : nosort);
  }, [checked]);

  // Function to toggle the image when clicked
  const toggleImage = () => {
    if (disabled) return; // Prevent action if disabled
    onChange(); // Call the onChange function
  };

  return (
    <Box
      sx={{
        cursor: disabled ? 'not-allowed' : 'pointer', // Show pointer only when enabled
        opacity: disabled ? 0.5 : 1, // Dim when disabled
      }}
    >
      <img
        className='sortcs'
        src={image}
        alt="Toggle"
        style={{
          transition: 'all 0.3s ease',
        }}
        onClick={toggleImage} // Toggle the image when clicked
      />
    </Box>
  );
}

export default BackgroundChange;
