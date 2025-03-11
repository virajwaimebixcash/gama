import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Checkbox, FormControlLabel, MenuItem } from '@mui/material';

const DynamicTableComponent = ({ fields, formValues, handleChange, entityName }) => {
  const [columns, setColumns] = useState(formValues.columns || []);

  useEffect(() => {
    handleChange('entityName', entityName);
  }, [entityName, handleChange]);

  const handleColumnChange = (index, field, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = {
      ...updatedColumns[index],
      [field]: value
    };
    setColumns(updatedColumns);
    handleChange('columns', updatedColumns);
  };

  const addColumn = () => {
    setColumns([...columns, {}]);
  };

  return (
    <Box>
      {fields.map((field) => (
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
          {field.type === 'array' && (
            <>
              <Button variant="outlined" onClick={addColumn}>Add Column</Button>
              {columns.map((column, index) => (
                <Box key={index} mt={2}>
                  {field.fields.map((colField) => (
                    <Box key={colField.label} mt={1}>
                      {colField.type === 'text' && (
                        <TextField
                          label={colField.label}
                          size="small"
                          placeholder={colField.placeholder}
                          value={column[colField.label] || ''}
                          onChange={(e) => handleColumnChange(index, colField.label, e.target.value)}
                          fullWidth
                        />
                      )}
                      {colField.type === 'select' && (
                        <TextField
                          select
                          size="small"
                          label={colField.label}
                          value={column[colField.label] || ''}
                          onChange={(e) => handleColumnChange(index, colField.label, e.target.value)}
                          fullWidth
                        >
                          {colField.options.map((option, idx) => (
                            <MenuItem key={idx} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                      {colField.type === 'checkbox' && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={column[colField.label] || false}
                              onChange={(e) => handleColumnChange(index, colField.label, e.target.checked)}
                            />
                          }
                          label={colField.label}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              ))}
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default DynamicTableComponent;
