import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import {
  TextField,
  Select,


} from "@mui/material";
export default function CustomizedMenus() {

  const [selectValue, setSelectValue] = useState("option2");

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Select Bank Account</InputLabel> */}
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Bank"
          onChange={handleChange}
        >
          <MenuItem value="option1">Kotak Mahindra Bank -123234</MenuItem>
          <MenuItem value="option2">Kotak Mahindra Bank -321543</MenuItem>
          <MenuItem value="option2">Kotak Mahindra Bank -332134</MenuItem>
        </Select> */}
        <Select value={selectValue} onChange={handleSelectChange} size="small" className='noddborder'
          sx={{ width: '100%', height: '50px !important', backgroundColor: '#FAFAFA', boxShadow: '0 2px 9px 1px rgba(44, 53, 66, .1)', borderColor: '#FAFAFA' }} >

          <MenuItem value="option1">Kotak Mahindra Bank -123234</MenuItem>
          <MenuItem value="option2">Kotak Mahindra Bank -321543</MenuItem>
          <MenuItem value="option2">Kotak Mahindra Bank -332134</MenuItem>
        </Select>

      </FormControl>
    </Box>
  );
}