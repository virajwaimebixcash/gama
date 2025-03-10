import React, { useState } from 'react';
import { Button, Drawer, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import DatePickerComponent from '../FormComponent/DatePickerComponent';
import threedot from "../../images/threedot.png";
 
import Grid from '@mui/material/Grid2';
import AutocompleteWithJSON from './AutocompleteWithJSON';
import ArithmaticOperatorDiv from './ArithmaticOperatorDiv';
 
  
const Filter = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [filterOption, setFilterOption] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const filterOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleApplyFilter = () => {
    setIsPanelOpen(false); // Close the panel after applying the filter
  };

  return (
     
      <div>
        {/* Button to open filter panel */}
      
      
        <span className='dwloption stdpadding'><img src= {threedot}  onClick={togglePanel} /></span> 

        {/* Right-side drawer */}
        <Drawer
          anchor="right"
          open={isPanelOpen}
          onClose={togglePanel}
        >
          <div className='filterpanl'>
            <h2>Filter Options</h2>
  

            <Grid   size={{  xs: 12, sm: 6,  md: 4, lg: 2, }} >
<p>Security</p>
 {/* Select Input */}

     
     <AutocompleteWithJSON></AutocompleteWithJSON>
  
</Grid>



<Grid   size={{  xs: 12, sm: 6,  md: 4, lg: 2, }} >
<p>Select Date</p>
 {/* Select Input */}

     
     {/* <Select  size="small"
     sx={{ width: '100%' }} >
     
        <MenuItem value="option1">Last 7 Days</MenuItem>
        <MenuItem value="option2">Last  15 Days</MenuItem>
        <MenuItem value="option3">Last  30 Days</MenuItem>
        <MenuItem value="option4">Last  60 Days</MenuItem>
        <MenuItem value="option5">Custom</MenuItem>
     </Select> */}

   <DatePickerComponent></DatePickerComponent>
  
</Grid>
         
<Grid   size={{  xs: 12, sm: 6,  md: 4, lg: 2, }} >
<p>Arithmatic Operator</p>
 {/* Select Input */}

     
     <ArithmaticOperatorDiv></ArithmaticOperatorDiv>
 
  
</Grid>
      
            
            <div className='filterbtn'>
            {/* Apply Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyFilter}
              style={{ marginTop: '20px' }}
              
            >
             Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleApplyFilter}
              style={{ marginTop: '20px' }}
              
            >
              Apply Filter
            </Button>
            </div>
          </div>
        </Drawer>
      </div>
 
  );
};

export default Filter;

 