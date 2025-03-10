
import React, { useEffect, useState } from 'react';
import {
    TextField, FormControlLabel, Checkbox, Button, MenuItem, Select, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { IconButton, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { EditRounded } from '@mui/icons-material';
import DeleteRounded from '@mui/icons-material/DeleteRounded';

const StaticDropdownComponent = React.memo(({ fields, formValues, handleChange, entityName, dependonList, isDynamic }) => {
    const [tableData, setTableData] = useState([...formValues.options || []]);

    // Add new row dynamically
    const addNewRow = () => {
        const newRow = {
            value: '',
            text: '',
            isDefaultOption: false,
            isEditing: true,
            error: ''
        };
        setTableData((prevData) => [...prevData, newRow]);
    };

    // Validate row data
    const validateRow = (rows) => {
        // Assume the last row added is the "new" row
        const lastIndex = rows.length - 1;
        const newRow = rows[lastIndex];

        // Check for duplicates in the other rows, but not for the new row itself
        const isDuplicateValue = rows.some((r, i) => i !== lastIndex && r.value === newRow.value);
        const isDuplicateText = rows.some((r, i) => i !== lastIndex && r.text === newRow.text);

        // Only assign error to the new row
        const error =
            isDuplicateValue && isDuplicateText
                ? 'Value and Text must both be unique.'
                : isDuplicateValue
                    ? 'Value must be unique.'
                    : isDuplicateText
                        ? 'Text must be unique.'
                        : '';

        // Return all rows, but with the new row’s error updated
        return [
            ...rows.slice(0, lastIndex),
            { ...newRow, error }, // Update the new row’s error
        ];
    };

    // Update row data on change
    const handleTableChange = (index, field, value) => {
        let updatedRows = tableData.map((row, i) => {
            if (field === 'isDefaultOption' && value === true) {
                return i === index ? { ...row, isDefaultOption: true } : { ...row, isDefaultOption: false };
            }
            return i === index ? { ...row, [field]: value } : row;
        });

        updatedRows = validateRow(updatedRows);

        setTableData(updatedRows);

        // Map table data to options
        const options = updatedRows.map((row) => ({
            value: row.value,
            text: row.text,
            isDefaultOption: row.isDefaultOption,
        }));

        handleChange('options', options);
    };


    // Toggle Edit/Save mode
    const toggleEditRow = (index) => {
        let updatedRows = [...tableData];

        if (tableData[index].isEditing) {
            // Perform validation before saving
            updatedRows = validateRow(updatedRows);

            // If there are validation errors, do not proceed
            if (updatedRows[index].error) {
                setTableData(updatedRows);
                return;
            }
        }

        updatedRows[index].isEditing = !updatedRows[index].isEditing;
        setTableData(updatedRows);
    };

    // Delete a row
    const handleDeleteRow = (index) => {
        const updatedRows = tableData.filter((_, i) => i !== index);
        setTableData(updatedRows);
    };

    useEffect(() => {
        if (entityName && formValues.entityName !== entityName) {
            handleChange('entityName', entityName);
        }
    }, [entityName, formValues.entityName, handleChange]);

    return (
        <Box>
            {/* Render fields based on configuration */}
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
                    {field.fields && field.isDynamic && formValues[field.label] && <StaticDropdownComponent isDynamic={field.isDynamic} dependonList={dependonList} fields={field.fields} formValues={formValues} handleChange={handleChange} entityName={entityName} />}
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

            {/* Dynamic Table Section */}
            {!isDynamic && <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                    Static Options
                </Typography>
                <TableContainer component={Paper} sx={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Value</TableCell>
                                <TableCell>Text</TableCell>
                                <TableCell>Is Default Option</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row, index) => (
                                <>
                                    <TableRow key={index}>
                                        {/* Value */}
                                        <TableCell>
                                            <TextField
                                                size="small"
                                                value={row.value}
                                                placeholder="Enter Value"
                                                onChange={(e) => handleTableChange(index, 'value', e.target.value)}
                                                fullWidth
                                                disabled={!row.isEditing}
                                            />
                                        </TableCell>

                                        {/* Text */}
                                        <TableCell>
                                            <TextField
                                                size="small"
                                                value={row.text}
                                                placeholder="Enter Text"
                                                onChange={(e) => handleTableChange(index, 'text', e.target.value)}
                                                fullWidth
                                                disabled={!row.isEditing}
                                            />
                                        </TableCell>

                                        {/* Is Default Option */}
                                        <TableCell>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={row.isDefaultOption}
                                                        onChange={(e) =>
                                                            handleTableChange(index, 'isDefaultOption', e.target.checked)
                                                        }
                                                        disabled={!row.isEditing}
                                                    />
                                                }
                                                label="Yes"
                                            />
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell>
                                            <div className="inlineDisplay">
                                                {/* Edit or Save */}
                                                <Tooltip title={row.isEditing ? 'Save' : 'Edit'}>
                                                    <IconButton
                                                        color={row.isEditing ? 'primary' : 'secondary'}
                                                        onClick={() => toggleEditRow(index)}
                                                    >
                                                        {row.isEditing ? <SaveIcon /> : <EditRounded />}
                                                    </IconButton>
                                                </Tooltip>
                                                {/* Delete */}
                                                <Tooltip title="Delete">
                                                    <IconButton color="error" onClick={() => handleDeleteRow(index)}>
                                                        <DeleteRounded />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    {
                                        !!row.error && (
                                            <TableCell colSpan={4}>
                                                <Typography sx={{ color: 'red !important' }} variant="body2">
                                                    {row.error}
                                                </Typography>
                                            </TableCell>
                                        )
                                    }
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box mt={2}>
                    <Button variant="contained" onClick={addNewRow}>
                        Add Row
                    </Button>
                </Box>
            </Box>}
        </Box>
    );
});

StaticDropdownComponent.displayName = 'StaticDropdownComponent';

export default StaticDropdownComponent;