import React, { useState, useEffect } from 'react';
import {
  TextField, FormControlLabel, Checkbox, Button, MenuItem, Select, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { IconButton, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { EditRounded } from '@mui/icons-material';
import DeleteRounded from '@mui/icons-material/DeleteRounded';

const AutoSuggestionDropdown = ({ fields, formValues, handleChange, entityName, dependonList }) => {
  const [tableData, setTableData] = useState([...formValues.requestParam || []]);

  // Add new row dynamically
  const addNewRow = () => {
    const newRow = {
      fieldName: '',
      defaultValue: '',
      fieldNametoBindValue: '',
      IsSearchDropDownField: '',
      isEditing: true,
    };
    setTableData((prevData) => [...prevData, newRow]);
  };

  // Update row data on change
  const handleTableChange = (index, field, value) => {
    const updatedRows = tableData.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setTableData(updatedRows);

    // Map table data to requestParam
    const requestParam = updatedRows.map((row) => ({
      fieldName: row.fieldName,
      defaultValue: row.defaultValue,
      fieldNametoBindValue: row.fieldNametoBindValue,
      IsSearchDropDownField: row.IsSearchDropDownField,
    }));
    handleChange('requestParam', requestParam);
  };

  // Toggle Edit/Save mode
  const toggleEditRow = (index) => {
    const updatedRows = tableData.map((row, i) =>
      i === index ? { ...row, isEditing: !row.isEditing } : row
    );
    setTableData(updatedRows);
  };

  // Delete a row
  const handleDeleteRow = (index) => {
    const updatedRows = tableData.filter((_, i) => i !== index);
    setTableData(updatedRows);
  };

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
                  checked={formValues[field.label] || false}
                  onChange={(e) => handleChange(field.label, e.target.checked)}
                />
              }
              label={field.label}
            />
          )}
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
        </Box>
      ))}
      {/*----- Response Parameter Section ----*/}
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          Response Parameter
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="body1" sx={{ minWidth: '100px', fontWeight: 'bold' }}>
            Value:
          </Typography>
          <TextField
            size="small"
            // label="Response Parameter Value"
            placeholder="Enter Value"
            value={formValues['Value'] || ''}
            onChange={(e) => handleChange('Value', e.target.value)}
            fullWidth
          />
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="body1" sx={{ minWidth: '100px', fontWeight: 'bold' }}>
            Text:
          </Typography>
          <TextField
            size="small"
            // label="Response Parameter Label"
            placeholder="Enter option text"
            value={formValues['Text'] || ''}
            onChange={(e) => handleChange('Text', e.target.value)}
            fullWidth
          />
        </Box>
      </Box>

      {/* Dynamic Table Section */}
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          Request Parameter
        </Typography>
        <TableContainer component={Paper} sx={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field Name</TableCell>
                <TableCell>Default Value</TableCell>
                <TableCell>Field Name to Bind</TableCell>
                <TableCell>Is Search Dropdown Field</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  {/* Field Name */}
                  <TableCell>
                    <TextField
                      size="small"
                      value={row.fieldName}
                      placeholder="Enter Field Name"
                      onChange={(e) => handleTableChange(index, 'fieldName', e.target.value)}
                      fullWidth
                      disabled={!row.isEditing}
                    />
                  </TableCell>

                  {/* Default Value */}
                  <TableCell>
                    <TextField
                      size="small"
                      value={row.defaultValue}
                      placeholder="Enter Default Value"
                      onChange={(e) => handleTableChange(index, 'defaultValue', e.target.value)}
                      fullWidth
                      disabled={!row.isEditing}
                    />
                  </TableCell>

                  {/* Field Name to Bind Value Dropdown */}
                  <TableCell>
                    {row.isEditing ? (
                      <Select
                        value={row.fieldNametoBindValue}
                        onChange={(e) =>
                          handleTableChange(index, 'fieldNametoBindValue', e.target.value)
                        }
                        fullWidth
                        size="small"
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Select an Option
                        </MenuItem>
                        <MenuItem key="userDataStore" value="userDataStore">User Data Store</MenuItem>
                        {dependonList.map((option) => (
                          <MenuItem key={option.name} value={option.value}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      row.fieldNametoBindValue || 'N/A'
                    )}
                  </TableCell>

                  {/* Is Search Control Field */}
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={row.IsSearchDropDownField === 'Y'}
                          onChange={(e) =>
                            handleTableChange(
                              index,
                              'IsSearchDropDownField',
                              e.target.checked ? 'Y' : ''
                            )
                          }
                          disabled={!row.isEditing}
                        />
                      }
                      label="Yes"
                    />
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    {/* Edit or Save */}
                    <div className='inlineDisplay'>
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
              ))}
            </TableBody>

          </Table>
        </TableContainer>
        <Box mt={2}>
          <Button variant="contained" onClick={addNewRow}>
            Add Row
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AutoSuggestionDropdown;