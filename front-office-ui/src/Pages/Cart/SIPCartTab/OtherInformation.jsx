import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import MultiSelect from './MultiSelect';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
  } from "@mui/material";
import RadioButtonGroup from './RadioButtonGroup';
import CheckboxInline from './CheckboxInline';
import Autocomplete from './Autocomplete';
import FileUploadComponent from './FileUploadComponent';
import BasicDatePicker from './BasicDatePicker';
  
  
const OtherInformation = () => {
    const [textValue, setTextValue] = useState("");
    
  
    const handleTextChange = (e) => {
      setTextValue(e.target.value);
    };
   
  
    const handleSubmit = (e) => {
      e.preventDefault();
    };
  return (
    <Box className="maincontentprimary">
     
    <Grid container spacing={2}>

  
  
 


  

<Grid  size={{  xs: 12, sm: 6,  md: 4, lg: 2, }} >
<p>Fees</p>
<TextField
        label=""
        id="outlined-size-small"
       defaultValue='1254'
        size="small"
        sx={{ width: '100%' }}
      />
</Grid>


<Grid  size={{  xs: 12, sm: 6,  md: 4, lg: 2, }} >
<p>Physical Form Number</p>
<TextField
        label=""
        id="outlined-size-small"
         placeholder='Enter Physical Form Number'
        size="small"
        sx={{ width: '100%' }}
      />
</Grid>


<Grid  size={{  xs: 12, sm: 6,  md: 4, lg: 2, }} >
<p>Order Sourced by</p>
<TextField
        label=""
        id="outlined-size-small"
        placeholder="Enter Order Sourced by"
        size="small"
        sx={{ width: '100%' }}
      />
</Grid>


<Grid  size={{  xs: 12, sm: 6,  md: 4, lg: 2, }} >
<p>Introduced By</p>
<TextField
        label=""
        id="outlined-size-small"
          placeholder="Enter Details"
        size="small"
        sx={{ width: '100%' }}
      />
</Grid>


<Grid  size={{  xs: 12, sm: 6,  md: 4, lg: 2, }} >
<p>Sub-Broker</p>
<TextField
        label=""
        id="outlined-size-small"
         placeholder="Enter Sub-Broker Details"
        size="small"
        sx={{ width: '100%' }}
      />
</Grid>

<Grid  size={{  xs: 12, sm: 6,  md: 4, lg: 2, }} >
<p>Execution Mode</p>
<TextField
        label=""
        id="outlined-size-small"
         placeholder="Enter Execution Mode"
        size="small"
        sx={{ width: '100%' }}
      />
</Grid>

<Grid  size={{  xs: 12, sm: 6,  md: 4, lg: 2, }} >
<p>Communication Type</p>
<TextField
        label=""
        id="outlined-size-small"
        placeholder="Enter Communication Type"
        size="small"
        sx={{ width: '100%' }}
      />
</Grid>
<Grid  size={{  xs: 12, sm: 6,  md: 4, lg: 2, }} >
<p>Radio Button</p>
    <RadioButtonGroup></RadioButtonGroup>
</Grid>

<Grid  size={{  xs: 12, sm: 6,  md: 4, lg: 2, }} >
<p>Multiselect Dropdown</p>
<MultiSelect></MultiSelect>
</Grid>



<Grid  size={{  xs: 12, sm: 6,  md: 4, lg: 2, }} >
<p>Checkbox</p>
 <CheckboxInline></CheckboxInline>
</Grid>

<Grid  size={{  xs: 12, sm: 6,  md: 4, lg: 2, }} >
<p>Autocomplete</p>
 <Autocomplete></Autocomplete>
</Grid>



<Grid  size={{  xs: 12, sm: 6,  md: 4, lg: 4, }} >
<p>File Upload Component</p>
 <FileUploadComponent></FileUploadComponent>
</Grid>

<Grid  size={{  xs: 12, sm: 6,  md: 4, lg: 6, }} >
<p>Date Picker</p>
 <BasicDatePicker ></BasicDatePicker>
</Grid>

 

 </Grid>
</Box>
  )
}

export default OtherInformation