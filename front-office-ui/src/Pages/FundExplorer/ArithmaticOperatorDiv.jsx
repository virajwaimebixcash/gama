import React, { useState } from 'react';
import { Button, Drawer, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import DatePickerComponent from '../FormComponent/DatePickerComponent';
import { Stepper, Step, StepLabel,  Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
const ArithmaticOperatorDiv = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      
      
      {/* <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">None</option>
        <option value="div1">Show Div 1</option>
        <option value="div2">Show Div 2</option>
        <option value="div3">Show Div 3</option>
      </select> */}

<Select  size="small" value={selectedOption} onChange={handleSelectChange}
     sx={{ width: '100%' }} >
      <MenuItem value="Select">Select</MenuItem>
      <MenuItem value="div1">= </MenuItem>
        <MenuItem value="div1">!=</MenuItem>
        <MenuItem value="div1">&#x2039;=</MenuItem>
        <MenuItem value="div1">&#x203A;=</MenuItem>
        <MenuItem value="div1">&#x2039;</MenuItem>
     </Select> 

      {/* Conditionally render each div based on selectedOption */}
      {/* {selectedOption === 'div1' && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'lightblue', color: 'white' }}>
          Div 1 is Enabled
        </div>
      )}

      {selectedOption === 'div2' && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'lightgreen', color: 'white' }}>
          Div 2 is Enabled
        </div>
      )} */}

      {selectedOption === 'div1' && (
        <div>
               <Box >
            
     <Grid container spacing={2}>
                       <Grid   size={{  xs: 12, sm: 6,  md: 4, lg: 6, }} >
                       <p>From </p>
                       <TextField
           variant="outlined"  size='small'
      />
            </Grid>
            <Grid   size={{  xs: 12, sm: 6,  md: 4, lg: 6, }} >
            <p>To</p>
            <TextField size='small'
           variant="outlined"
      />
            </Grid>
            </Grid>
            </Box>
        </div>
      )}
    </div>
  );
};

export default ArithmaticOperatorDiv;
