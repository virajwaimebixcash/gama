import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Hidden } from '@mui/material';

export default function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}  sx={{padding:0,}}>
        <DatePicker  size="small" sx={{
              "& .MuiInputBase-root": {
                height: 36, // Customize the height as desired
                overflow: 'hidden',
                padding:0,
              },
            }} />
      </DemoContainer>
    </LocalizationProvider>
  );
}