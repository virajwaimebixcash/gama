import React, { useState, useEffect } from 'react';
import { Button, Box, FormHelperText, FormControl } from '@mui/material';

function ToggleSwitch({ label, error, helperText, defaultValue, onChange }) {
  // const [isOn, setIsOn] = useState(defaultValue === 'R' ? 1 : 0);
  const [isOn, setIsOn] = useState(defaultValue === 'P' ? 1 : 0);


  useEffect(() => {
    // Update the state when defaultValue changes
    // setIsOn(defaultValue === 'R' ? 1 : 0);
    setIsOn(defaultValue === 'P' ? 1 : 0);
  }, [defaultValue]);

  const handleToggle = () => {
    const newState = isOn === 1 ? 0 : 1; // Toggle between 1 and 0
    setIsOn(newState);
    // onChange(newState === 1 ? 'R' : 'P'); // Emit the updated state
    onChange(newState === 1 ? 'P' : 'R'); // Emit the updated state
  };

  return (
    <FormControl error={error} sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        variant="contained"
        onClick={handleToggle}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '135px',
          height: '30px',
          fontSize: '10px',
          // padding: 0,
          borderRadius: '0px',

          backgroundColor: isOn ? '#A35CFB' : '#A35CFB',
          // backgroundColor: isOn ? '#A35CFB' : '#fff',

          marginTop: '0px',

          textTransform: 'capitalize',

          padding: '3px',

          background: '#fff',

          border: '1px solid #ddd'
        }}
      >
        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            backgroundColor: isOn ? '#A35CFB' : '#fffbfb',

            color: isOn ? '#fff' : '#000',
             // fontWeight: isOn ? 'bold' : 'normal',

           fontSize: '10px',
            padding: '3px',
            borderRadius: '00px 0 0 00px',
            transition: 'all 0.3s ease',
          }}
        >
          Payout
        </Box>
        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            backgroundColor: !isOn ? '#A35CFB' : '#fffbfb',

            color: !isOn ? '#fff' : '#000',

            //fontWeight: !isOn ? 'bold' : 'normal',

            fontSize: '10px',

            padding: '3px',

            borderRadius: '0 00px 00px 0',
            transition: 'all 0.3s ease',
          }}
        >
          Reinvest
        </Box>
      </Button>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default ToggleSwitch;