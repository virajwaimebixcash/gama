
import React, { useEffect, useState, useCallback } from 'react';
import {
  TextField, FormControlLabel, Checkbox, Button, MenuItem, Select, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { IconButton, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { EditRounded } from '@mui/icons-material';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import api from '../../../APIs/interceptor';

const DropdownComponent = React.memo(({ fields, formValues, handleChange, entityName, dependonList, isDynamic }) => {
  const [manualOptions, setManualOptions] = useState([]);
  const [manualEntry, setManualEntry] = useState('');
  const [apiOptions, setApiOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastApiUrl, setLastApiUrl] = useState('');
  const [tableData, setTableData] = useState([...formValues.requestParam || []]);

  const handleManualEntry = useCallback(() => {
    if (manualEntry) {
      setManualOptions((prevOptions) => [...prevOptions, { value: manualEntry, label: manualEntry }]);
      setManualEntry('');
      setApiOptions([]);
    }
  }, [manualEntry]);

  const fetchOptions = useCallback(async () => {
    const apiUrl = formValues['API Url'];
    if (!apiUrl || apiUrl === lastApiUrl) return;
    setLoading(true);
    setLastApiUrl(apiUrl);

    try {
      // Use axios to fetch data from the API
      const response = await api.post(apiUrl);
      const data = response.data.data;  // Access the `data` array directly

      // Map the options to bind `entityId` and `tableName` as `value` and `label`
      const options = data.map((item) => ({
        value: item.entityId,      // `entityId` as the `value`
        label: item.tableName      // `tableName` as the `label`
      }));

      setApiOptions(options);       // Set the options to the dropdown
      setManualOptions([]);         // Clear manual options if API data is fetched

      // if (options.length > 0) {
      //   handleChange('defaultValue', options[0].value); // Set first option as default
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [formValues['API Url'], handleChange, lastApiUrl]);

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
    if (entityName && formValues.entityName !== entityName) {
      handleChange('entityName', entityName);
    }
  }, [entityName, formValues.entityName, handleChange]);

  useEffect(() => {
    if (formValues['API Url'] && formValues['defaultValue']) {
      fetchOptions();
    }
  }, [fetchOptions, formValues])

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
          {field.fields && field.isDynamic && formValues[field.label] && <DropdownComponent isDynamic={field.isDynamic} dependonList={dependonList} fields={field.fields} formValues={formValues} handleChange={handleChange} entityName={entityName} />}
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

      {/* API URL input and Fetch button */}
      {/* {!isDynamic && <Box mt={2} display="flex" alignItems="center">
        <TextField
          label="API Url"
          size="small"
          placeholder="Enter API Url"
          value={formValues['API Url'] || ''}
          onChange={(e) => handleChange('API Url', e.target.value)}
          fullWidth
        />
        <Button onClick={fetchOptions} variant="contained" sx={{ ml: 2 }} disabled={loading || formValues['API Url'] === lastApiUrl}>
          {loading ? "Loading..." : "Fetch"}
        </Button>
      </Box>} */}

      {/* Conditional rendering based on whether API options are fetched */}
      {/* {apiOptions.length > 0 && !isDynamic ? (
        <Box mt={2}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Select Default Value</InputLabel>
            <Select
              name='defaultValue'
              value={formValues['defaultValue'] || ''}
              onChange={(e) => handleChange('defaultValue', e.target.value)}
              label="Select Default Value"
            >
              <MenuItem value="" disabled>Select Default Value</MenuItem>
              {apiOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ) : null */}

      {/* // (
        //   <Box mt={2}>
        //     <TextField
        //       label="Add Manual Option"
        //       size="small"
        //       placeholder="Enter an option"
        //       value={manualEntry}
        //       onChange={(e) => setManualEntry(e.target.value)}
        //       fullWidth
        //     />
        //     <Button onClick={handleManualEntry} variant="outlined" sx={{ mt: 1 }}>
        //       Add Option
        //     </Button>
        //     {manualOptions.map((option, index) => (
        //       <Box key={index} mt={1}>
        //         <TextField
        //           value={option.label}
        //           label={`Option ${index + 1}`}
        //           size="small"
        //           fullWidth
        //           disabled
        //         />
        //       </Box>
        //     )
        //     )}
        //   </Box>
        // )
      //} */}
      {!isDynamic && <Box mt={2} display="flex" alignItems="center">
        <TextField
          label="API Url"
          size="small"
          placeholder="Enter API Url"
          value={formValues['API Url'] || ''}
          onChange={(e) => handleChange('API Url', e.target.value)}
          fullWidth
        />
      </Box>}

      {/*----- Response Parameter Section ----*/}
      {!isDynamic && <Box mt={2}>
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
      </Box>}

      {/* Dynamic Table Section */}
      {!isDynamic && <Box mt={2}>
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
                    <div className='inlineDisplay'>
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

DropdownComponent.displayName = 'DropdownComponent';

export default DropdownComponent;