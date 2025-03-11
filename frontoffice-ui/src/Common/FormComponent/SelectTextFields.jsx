import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NumberFormatInput from '../CustomComponents/NumberFormatterInput';

export default function ComposedTextField({ label, error, helperText, defaultValue, onChange, handleInput, placeholder,value }) {

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1 } }}
      noValidate
      autoComplete="off"
    >
      <FormControl>
        <NumberFormatInput
          onChange={(value) => onChange(value)}
          value={value}
          label={label}
          placeholder={placeholder}
          id="outlined-size-small"
          defaultValue={defaultValue}
          size="medium"
          sx={{ width: '100%' }}
          error={error}
          helperText={helperText}
          slotProps={{
            input: {
              onInput: handleInput, // Add the handleInput function here
            },
          }}
        />
      </FormControl>

    </Box>
  );
}