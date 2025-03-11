import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NumberFormatInput from '../CustomComponents/NumberFormatterInput';

export default function ComposedTextField({amount}) {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1 } }}
      noValidate
      autoComplete="off"
      
    >
     
      <FormControl>
        {/* <InputLabel htmlFor="component-outlined">₹</InputLabel>
        <OutlinedInput
          id="component-outlined"
          defaultValue="50000"
          label="Name"
        /> */}
        <NumberFormatInput
         InputProps={{
          style: { height: '60px', fontSize:'28px'}, // Height of the input area
        }}
        label=""
        className='whitecolorbg laregfontsize'
        id="outlined-size-small" 
        value={amount}
        size="large"
        sx={{ width: '60%', marginLeft:'20%' , backgroundColor:'#F8F3FE'}}
      />
      </FormControl>
      
    </Box>
  );
}