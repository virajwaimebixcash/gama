import React, { useEffect } from 'react';
import { TextField, Box, Checkbox, FormControlLabel, MenuItem } from '@mui/material';

const MultiSelectComponent = ({ fields, formValues, handleChange,entityName,dependonList }) => {
  useEffect(()=>{
    handleChange('entityName',entityName)
  },[])
  
  return (
    <Box>
      {fields.map(field => (
        <Box key={field.label} mt={2}>
          {field.type === 'text' && (
            <TextField
              label={field.label}           
               size='small'
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
                disabled={(formValues['Mandatory'] && field.label == 'Mandatory Rule' && field.isDynamic) || (formValues['Mandatory Rule'] && field.label == 'Mandatory' && !field.isDynamic)}

                  checked={formValues[field.label] || false}
                  onChange={(e) => handleChange(field.label, e.target.checked)}
                />
              }
              label={field.label}
            />
          )}
           {field.fields && field.isDynamic && formValues[field.label] && <MultiSelectComponent isDynamic={field.isDynamic} dependonList={dependonList} fields={field.fields} formValues={formValues} handleChange={handleChange} entityName={entityName} />}
           {field.type === 'number' && (
            <TextField
              type="number"           
               size='small'
              label={field.label}
              placeholder={field.placeholder}
              value={formValues[field.label] || ''}
              onChange={(e) => handleChange(field.label, e.target.value)}
              fullWidth
            />
          )}
          {field.type === 'select' && (
            <TextField
              select
              size="small"
              label={field.label}
              value={formValues[field.label] || ''}
              onChange={(e) => {
                return handleChange(field.label, e.target.value)
              }}
              fullWidth
            >
              {field.listType == 'dynamic' ? dependonList.map((option, idx) => (
                <MenuItem key={idx} value={option.name === 'Select' ? '' : option.value}>
                  {option.name}
                </MenuItem>
              )) :
                field.list.map((option, idx) => (
                  <MenuItem key={idx} value={option.name === 'Select' ? '' : option.value}>
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MultiSelectComponent;
