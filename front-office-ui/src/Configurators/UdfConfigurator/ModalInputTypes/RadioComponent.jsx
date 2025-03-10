import React, { useState, useEffect } from 'react';
import { TextField, Checkbox, FormControlLabel, Box, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const RadioComponent = ({ fields, formValues, handleChange, entityName }) => {
  const [inputFields, setInputFields] = useState([]);
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action');
  useEffect(() => {
    setInputFields(action == 'edit' ?
      formValues.value?.map((field, index) => ({
        id: index===0?'label':"Option " + (index),
        value: field.value,
        label: index===0?'label':"Option " + (index),
        type: 'text',
        data: field.data || '',
        isDynamic:index>2?true: false // Indicate these fields are static
      }))
      : fields.map((field, index) => ({
        id: field.label,
        value: formValues.value?.[index]?.value || '',
        label: field.label,
        type: field.type,
        data: formValues.value?.[index]?.data || '',
        isDynamic: false // Indicate these fields are static
      })));
  }, [fields]);

  useEffect(() => {
    handleChange('entityName', entityName);
  }, []);

  useEffect(() => {
    handleChange('value', inputFields);
  }, [inputFields]);

  const handleAddField = () => {
    // Get the highest existing option number
    const dynamicFields = inputFields.filter(field => field.isDynamic && field.label.startsWith('Option '));
    const optionNumbers = dynamicFields.map(field => parseInt(field.label.split(' ')[1], 10));
    const nextOptionNumber = optionNumbers.length > 0 ? Math.max(...optionNumbers) + 1 : 3;

    const optionLabel = `Option ${nextOptionNumber}`;
    // const valueLabel = `Value for Option ${nextOptionNumber}`;

    setInputFields([
      ...inputFields,
      { id: optionLabel, value: '', label: optionLabel, type: 'text', isDynamic: true, data: '' },
    ]);
  };

  const handleInputChange = (id, event, data) => {
    const values = [...inputFields];
    const index = values.findIndex(field => field.id === id);

    if (data) {

      values[index].data = event.target.value;

    } else {

      values[index].value = event.target.value;
    }
    setInputFields(values);
  };

  const handleRemoveField = (relatedId) => {
    const updatedValues = inputFields.filter(field => field.id !== relatedId && field.relatedId !== relatedId);
    setInputFields(updatedValues);
  };

  return (
    <Box>
      {inputFields?.filter(field => field.type === 'text')?.map((inputField) => (
        <Box key={inputField.id} mb={2} mt={2} display="flex" alignItems="center">
          <TextField
            size='small'
            variant="outlined"
            label={inputField.label}
            value={inputField.value}
            onChange={(event) => handleInputChange(inputField.id, event)}
            fullWidth
            sx={{ mr: 2 }}
          />{inputField.label.includes('Option') &&
            <TextField
              size='small'
              variant="outlined"
              label={inputField.label + ' value'}
              value={inputField.data}
              onChange={(event) => handleInputChange(inputField.id, event, 'value')}
              fullWidth
              sx={{ mr: 2 }}
            />
          }
          {inputField.isDynamic && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemoveField(inputField.id)}
              sx={{ ml: 2 }}
            >
              Remove
            </Button>
          )}
        </Box>
      ))}
      <Box mt={2}>
        <Button variant="contained" onClick={handleAddField}>
          Add Field
        </Button>
      </Box>
      <Box mt={2}>
        {inputFields?.filter(field => field.type === 'checkbox')?.map((inputField) => (
          <FormControlLabel
            key={inputField.id}
            control={
              <Checkbox
                checked={formValues[inputField.label] || false}
                onChange={(e) => handleChange(inputField.label, e.target.checked)}
              />
            }
            label={inputField.label}
          />

        ))}
      </Box>
    </Box>
  );
};

export default RadioComponent;
