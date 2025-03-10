import React, { useEffect } from 'react';
import { TextField, Box } from '@mui/material';

const HiddenFieldComponent = ({ fields, formValues, handleChange, entityName,  }) => {
  useEffect(() => {
    handleChange('entityName', entityName);
  }, [entityName]);

  return (
    <Box >
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
        </Box>
      ))}
    </Box>
  );
};

export default HiddenFieldComponent;
