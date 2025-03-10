import React, { useEffect } from 'react';
import { TextField, Checkbox, FormControlLabel, Box, MenuItem } from '@mui/material';

const CheckboxComponent = ({ fields, formValues, handleChange, entityName, dependonList }) => {
  useEffect(() => {
    handleChange('entityName', entityName)
  }, [])

  return (
    <Box>
      {fields.map(field => (
        <Box key={field.label} mt={2}>
          {field.type === 'text' && (
            <TextField
              label={field.label}
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
          {field.fields && field.isDynamic && formValues[field.label] && <CheckboxComponent dependonList={dependonList} fields={field.fields} formValues={formValues} handleChange={handleChange} entityName={entityName} />}
          {field.type === 'select' && (
            <TextField
              select
              size='small'
              label={field.label}
              value={formValues[field.label] || ''}
              onChange={(e) => handleChange(field.label, e.target.value)}
              fullWidth
            > {field.isDynamic && field.listType == 'dynamic' ?
              dependonList?.map((option, idx) => (
                <MenuItem key={idx} value={option.name === 'Select' ? '' : option.value}>
                  {option.name}
                </MenuItem>
              )) : field.isDynamic ?
                field.list?.map((option, idx) => (
                  <MenuItem key={idx} value={option.name === 'Select' ? '' : option.value}>
                    {option.name}
                  </MenuItem>))
                : field.options.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default CheckboxComponent;
