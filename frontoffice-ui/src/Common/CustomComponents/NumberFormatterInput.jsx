import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const NumberFormatInput = ({ onChange, value, label = "", placeholder, className, ...props }) => {

    const formatNumber = (num) => {
        if (!isNaN(num) || num === '') {
            // setValue(formatNumber(inputValue)); // Store the formatted num,ber for display
            return num?.replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');
        }
        return num;
    };

    const handleChange = (event) => {
        const inputValue = event.target.value.replace(/,/g, ''); // Remove existing commas
        onChange(inputValue); // Store the actual number

    };

    return (
        <TextField
            
            label={label}
            variant="outlined"
            placeholder={placeholder}
            value={formatNumber(value?.toString())}
            onChange={handleChange}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Mobile-friendly numeric input
            fullWidth
            {...props}
        />
    );
};

export default NumberFormatInput;
