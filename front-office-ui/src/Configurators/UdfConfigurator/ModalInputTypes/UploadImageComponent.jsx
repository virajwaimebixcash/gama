import React, { useEffect } from 'react';
import { TextField, Checkbox, FormControlLabel, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const UploadImageComponent = ({ fields, formValues, handleChange, entityName }) => {
  useEffect(() => {
    handleChange('entityName', entityName);
  }, [entityName]);

  return (
    <Box>
      {fields.map(field => (
        <Box key={field.label} mt={2}>
          {field.type === 'text' && (
            <TextField
              label={field.label}
              size="small"
              placeholder={field.placeholder}
              value={formValues[field.label] || ''}
              onChange={(e) => handleChange(field.label, e.target.value)}
              fullWidth
            />
          )}
          {field.type === 'checkbox' && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues[field.label] || false}
                  onChange={(e) => handleChange(field.label, e.target.checked)}
                />
              }
              label={field.label}
            />
          )}
          {field.type === 'dropdown' && (
            <FormControl fullWidth size="small">
              <InputLabel>{field.label}</InputLabel>
              <Select
                label={field.label}
                value={formValues[field.label] || ''}
                onChange={(e) => handleChange(field.label, e.target.value)}
              >
                {field.options.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {field.type === 'number' && (
            <TextField
              label={field.label}
              size="small"
              placeholder={field.placeholder}
              type="number"
              value={formValues[field.label] || ''}
              onChange={(e) => handleChange(field.label, e.target.value)}
              fullWidth
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default UploadImageComponent;
