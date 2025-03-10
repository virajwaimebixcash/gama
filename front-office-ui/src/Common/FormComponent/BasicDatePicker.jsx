import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl, FormHelperText } from '@mui/material';
import dayjs from 'dayjs';

export default function BasicDatePicker({ label, error, helperText, defaultValue, onChange, minDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl error={error} >
        <DatePicker
          label={label}
          minDate={dayjs(minDate)}
          // onChange={(data) => onChange(dayjs(data))}
          onChange={(data) => {
            const newDate = data ? dayjs(data) : null;
            onChange(newDate);  // Pass `null` if the date is cleared
          }}
          defaultValue={defaultValue}
          format="DD/MM/YYYY"
          clearable
          slotProps={{
            textField: {
              error: error, // Pass error prop to the TextField
            },
            actionBar: {
              actions: ["clear"], // Show the clear button in the calendar
            },
          }}

        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </LocalizationProvider>
  );
}


