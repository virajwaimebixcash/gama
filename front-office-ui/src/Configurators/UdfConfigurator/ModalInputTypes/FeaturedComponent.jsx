import React, { useEffect, useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Box, MenuItem } from '@mui/material';
import validationConfiguration from "../../../assets/ValidationConfig.json";

const FeaturedComponent = ({ fields, formValues, handleChange, entityName, setFormValid, componentValue, dependonList, isDynamic }) => {
    const [isCustomPatternFilled, setIsCustomPatternFilled] = useState(false);
    const [isValidationTypeSelected, setIsValidationTypeSelected] = useState(false);
    const [customPatternError, setCustomPatternError] = useState('');
    const [selectedValidationType, setSelectedValidationType] = useState('');
    const [isCustomValidationSelected, setIsCustomValidationSelected] = useState(false);

    useEffect(() => {
        handleChange('entityName', entityName);
    }, [entityName]);

    useEffect(() => {
        if (!isDynamic) {
            setSelectedValidationType(formValues['Type']);
            const isFormValid = customPatternError === '' && !(isCustomPatternFilled && !formValues['Customize Validation Pattern']);
            setFormValid(isFormValid);
        }


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
            if (isFilled) setIsValidationTypeSelected(false);

            // Validate custom pattern
            try {
                new RegExp(value);
                setCustomPatternError('');
            } catch (e) {
                setCustomPatternError('Invalid pattern');
            }
        }

        if (label === 'Type') {
            setSelectedValidationType(value);
            //   const isSelected = typeof value === 'string' && value.trim() !== '';
            //   setIsValidationTypeSelected(isSelected);
            //   if (isSelected) setIsCustomPatternFilled(false);
        }
        // if (label === 'Select Validation Type') {

        //     // setSelectedValidationType(value);
        //     const isSelected = typeof value === 'string' && value.trim() !== '';
        //     setIsValidationTypeSelected(isSelected);
        //     if (isSelected) setIsCustomPatternFilled(false);
        // }
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
                        ((field.label !== 'Prefix' && field.label !== "Suffix") || (selectedValidationType !== 'numeric' && selectedValidationType !== 'alphabetical')) && (
                            <TextField
                                label={field.label}
                                size='small'
                                inputProps={{ maxLength: 40 }}
                                placeholder={field.placeholder}
                                value={formValues[field.label] || ''}
                                onChange={(e) => handleFieldChange(field.label, e.target.value)}
                                fullWidth
                                // disabled={
                                //     (isValidationTypeSelected && (field.label === 'Customize Validation Pattern' || field.label === 'Validation Message')) ||
                                //     (isCustomPatternFilled && field.label === 'Select Validation Type')
                                // }
                                disabled={
                                    (isCustomValidationSelected && (field.label === 'Customize Validation Pattern' || field.label === 'Validation Message')) ||
                                    (isCustomPatternFilled && field.label === 'Select Validation Type')
                                }
                                error={field.label === 'Customize Validation Pattern' && !!customPatternError}
                                helperText={field.label === 'Customize Validation Pattern' && customPatternError}
                            />
                        )
                    )}

                    {field.type === 'checkbox' && !field.isDynamic && (
                        ((field.label !== 'Thousand Separator') || (selectedValidationType !== 'numeric' && selectedValidationType !== 'alphabetical')) && (
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
                        ))}

                    {field.type === 'checkbox' && field.isDynamic && (
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
                    {field.type === 'number' && (
                        ((field.label !== 'Decimal Precision') || (selectedValidationType !== 'numeric' && selectedValidationType !== 'alphabetical')) && (
                            <TextField
                                type="number"
                                size='small'
                                label={field.label}
                                placeholder={field.placeholder}
                                value={formValues[field.label] || ''}
                                onChange={(e) => handleFieldChange(field.label, e.target.value)}
                                fullWidth
                            />
                        ))}
                    {field.fields && field.isDynamic && formValues[field.label] && <FeaturedComponent isDynamic={field.isDynamic} dependonList={dependonList} fields={field.fields} formValues={formValues} handleChange={handleChange} entityName={entityName} />}
                    {field.type === 'select' && (
                        <TextField
                            select
                            size="small"
                            label={field.label}
                            value={formValues[field.label] || ''}
                            onChange={(e) => handleFieldChange(field.label, e.target.value)}
                            fullWidth
                            disabled={isCustomPatternFilled}
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
                                    : field.label === "Select Validation Type" ?
                                        validationOptions.map((option, idx) => (
                                            <MenuItem key={idx} value={option.name === 'Select' ? '' : option.name}>
                                                {option.name}
                                            </MenuItem>
                                        ))
                                        :
                                        field.options.map((option, idx) => (
                                            <MenuItem key={idx} value={option.value}>
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

export default FeaturedComponent;
