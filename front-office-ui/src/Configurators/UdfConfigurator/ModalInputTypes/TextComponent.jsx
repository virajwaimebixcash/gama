import React, { useEffect, useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Box, MenuItem } from '@mui/material';
import validationConfiguration from "../../../assets/ValidationConfig.json";

const TextComponent = ({ fields, formValues, handleChange, entityName, setFormValid, dependonList }) => {
  const [isCustomPatternFilled, setIsCustomPatternFilled] = useState(false);
  const [customPatternError, setCustomPatternError] = useState('');
  const [isCustomValidationSelected, setIsCustomValidationSelected] = useState(false);

  useEffect(() => {
    handleChange('entityName', entityName);
  }, [entityName]);

  useEffect(() => {
    const isFormValid = customPatternError === '' && !(isCustomPatternFilled && !formValues['Customize Validation Pattern']);
    setFormValid(isFormValid);
  }, [customPatternError, isCustomPatternFilled, formValues, setFormValid]);

  useEffect(() => {
    // Initialize custom validation selection state when modal opens
    const isCustomSelected = formValues['Select Validation Type'] === 'Custom Validation';
    setIsCustomValidationSelected(isCustomSelected);
  }, [formValues['Select Validation Type']]);

  const handleFieldChange = (label, value) => {
    handleChange(label, value);

    if (label === 'Customize Validation Pattern') {
      const isFilled = typeof value === 'string' && value.trim() !== '';
      setIsCustomPatternFilled(isFilled);

      // Validate custom pattern
      try {
        new RegExp(value);
        setCustomPatternError('');
      } catch (e) {
        setCustomPatternError('Invalid pattern');
      }
    }

    if (label === 'Select Validation Type') {
      const isSelected = value === 'Custom Validation';
      setIsCustomValidationSelected(isSelected);
      if (isSelected) {
        setIsCustomPatternFilled(false);
      } else {
        // Clear custom validation fields and error when another validation type is selected
        handleChange('Customize Validation Pattern', '');
        handleChange('Validation Message', '');
        setCustomPatternError('');
        setIsCustomPatternFilled(false);
      }
    }
  };

  // Add "Custom Validation" to validation configuration
  const validationOptions = [...validationConfiguration, { name: 'Custom Validation', value: '', message: '' }];

  return (
    <Box>
      {fields.map(field => (
        <Box key={field.label} mt={2}>

          {field.type === 'text' && (
            <TextField
              label={field.label}
              size='small'
              inputProps={{ maxLength: 40 }}
              placeholder={field.placeholder}
              value={formValues[field.label] || ''}
              onChange={(e) => handleFieldChange(field.label, e.target.value)}
              fullWidth
              disabled={
                (isCustomValidationSelected && (field.label === 'Customize Validation Pattern' || field.label === 'Validation Message')) ||
                (isCustomPatternFilled && field.label === 'Select Validation Type')
              }
              error={field.label === 'Customize Validation Pattern' && !!customPatternError}
              helperText={field.label === 'Customize Validation Pattern' && customPatternError}
            />
          )}

          {field.type === 'checkbox' && (
            <FormControlLabel
              control={
                <Checkbox
                  disabled={(formValues['Mandatory'] && field.label == 'Mandatory Rule' && field.isDynamic) || (formValues['Mandatory Rule'] && field.label == 'Mandatory' && !field.isDynamic)}
                  checked={formValues[field.label] || false}
                  onChange={(e) => handleFieldChange(field.label, e.target.checked)}
                />
              }
              label={field.label}
            />
          )}
          {field.fields && field.isDynamic && formValues[field.label] && <TextComponent fields={field.fields} formValues={formValues} handleChange={handleChange} entityName={entityName} setFormValid={setFormValid} dependonList={dependonList} />}

          {field.type === 'number' && (
            <TextField
              type="number"
              size='small'
              label={field.label}
              placeholder={field.placeholder}
              value={formValues[field.label] || ''}
              onChange={(e) => handleFieldChange(field.label, e.target.value)}
              fullWidth
            />
          )}
          {/* {field.type === 'select' && field.isDynamic && (
            <TextField
              select
              size="small"
              label={field.label}
              value={formValues[field.label] || ''}
              onChange={(e) => {
                return handleFieldChange(field.label, e.target.value)
              }}
              fullWidth
            >
              {field.list.map((option, idx) => (
                <MenuItem key={idx} value={option.name === 'Select' ? '' : option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          )} */}

          {field.type === 'select' && (
            <TextField
              select
              size="small"
              label={field.label}
              value={formValues[field.label] || ''}
              onChange={(e) => {
                return handleFieldChange(field.label, e.target.value)
              }}
              fullWidth
            >
              {field.isDynamic && field.listType == 'dynamic' ?
                dependonList?.map((option, idx) => (
                  <MenuItem key={idx} value={option.name === 'Select' ? '' : option.value}>
                    {option.name}
                  </MenuItem>
                )) : field.isDynamic ?
                  field.list?.map((option, idx) => (
                    <MenuItem key={idx} value={option.name === 'Select' ? '' : option.value}>
                      {option.name}
                    </MenuItem>))
                  :
                  validationOptions.map((option, idx) => (
                    <MenuItem key={idx} value={option.name === 'Select' ? '' : option.name}>
                      {option.name}
                    </MenuItem>
                  ))

              }
            </TextField>
          )}
        </Box>
      ))}

      {isCustomValidationSelected && (
        <Box mt={2}>
          <Box mb={2}>
            <TextField
              label="Customize Validation Pattern"
              size='small'
              placeholder="Enter pattern here"
              value={formValues['Customize Validation Pattern'] || ''}
              onChange={(e) => handleFieldChange('Customize Validation Pattern', e.target.value)}
              fullWidth
              error={!!customPatternError}
              helperText={customPatternError}
            />
          </Box>
          <Box>
            <TextField
              label="Validation Message"
              size='small'
              placeholder="Enter message here"
              value={formValues['Validation Message'] || ''}
              onChange={(e) => handleFieldChange('Validation Message', e.target.value)}
              fullWidth
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TextComponent;

