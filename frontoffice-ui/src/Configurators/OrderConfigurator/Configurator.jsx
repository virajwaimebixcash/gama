import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
    Box, Button, Container, Table, TableBody, createTheme, ThemeProvider,
    TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, TextField, FormControl, InputLabel, Paper,
    Checkbox,
    Tooltip,
    Chip,
    ListItemText,
    Snackbar,
    Alert,
    FormHelperText,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Switch from '@mui/material/Switch';
import configForm from '../../assets/InputFieldConfig.json';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux/actions/actionCreators';
import CustomAlert from '../../Common/CustomComponents/CustomAlert';
import { useNavigate, useSearchParams } from 'react-router-dom';

const theme = createTheme({
    components: {
        MuiInputBase: {
            styleOverrides: {
                input: {
                    fontSize: '12px',
                }
            },
        },
    },
});

/**
 * The Configurator component is responsible for managing the configuration of an order. It provides functionality to:
 * - Select product class, product sub-class, order type, and portfolio type from dropdown menus
 * - Fetch the configurator details based on the selected options
 * - Display a table of configuration items, allowing users to edit and rearrange them
 * - Validate the configuration and submit the form to save the changes
 *
 * The component uses various state variables to manage the dropdown options, selected values, table data, and validation errors.
 * It also dispatches actions to fetch data from the server and save the configuration.
 *
 * The component renders a form with the dropdown menus, a table of configuration items, and a submit button. It also includes a snackbar for displaying error messages and a custom alert component for displaying success or error messages.
 */
function Configurator() {
    const dispatch = useDispatch();

    const isInitialLoad = useRef(true);

    const navigate = useNavigate();

    const [isSaveSuccessful, setIsSaveSuccessful] = useState(false);



    const [searchParams, setSearchParams] = useSearchParams();
    const action = searchParams.get('action'); // 'edit'
    const productClassId = Number(searchParams.get('productClassId')); // productClassId
    const orderTypeId = Number(searchParams.get('orderTypeId')); // orderTypeId

    // Parse the comma-separated arrays back into arrays
    const productSubClassId = searchParams.get('productSubClassId')?.split(',').map(Number) || [];
    const portfolioTypeId = searchParams.get('portfolioTypeId')?.split(',').map(Number) || [];

    const [errors, setErrors] = useState({});

    // State for dropdown values
    const [productClass, setProductClass] = useState('')
    const [productSubClass, setProductSubClass] = useState([]);
    const [orderType, setOrderType] = useState('');
    const [portfolioType, setPortfolioType] = useState([]);

    // State for dropdown options
    const [productClasses, setProductClasses] = useState([])
    const [productSubClasses, setProductSubClasses] = useState([]);
    const [orderTypes, setOrderTypes] = useState([]);
    const [portfolioTypes, setPortfolioTypes] = useState([]);

    const [snackbarAlertMessage, setSnackbarAlertMessage] = useState('Something went wrong')
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [finalArray, setFinalArray] = useState([]);
    const [relationalTableData, setrelationalTableData] = useState({})
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertIcon, setAlertIcon] = useState('error');

    const [dynamicRealtedTable, SetDynamicRealtedTable] = useState([])
    const [selectionType, setSelectionType] = useState('database'); // Add this line
    const [modalOpen, setModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({});

    /**
     * Handles changes to the selected value in a dropdown or related table.
     *
     * @param {number} index - The index of the row being updated.
     * @param {string} field - The name of the field being updated.
     * @param {any} value - The new value for the field.
     * @param {string} entityName - The name of the entity associated with the row.
     * @param {string} [targetTable] - The name of the related table, if applicable.
     * @returns {void}
     */
    const handleSelectChange = (index, field, value, entityName, targetTable) => {
        if (targetTable) {
            const newRows = Array.from(relationalTableData[targetTable])
            if (field === 'component') {
                newRows[index].component = value;
                newRows[index].properties = {};

                const selected = configForm.find((option) => option.value === value);
                if (selected) {
                    setSelectedOption({ ...selected, entityName });
                    setFormValues({});
                    setModalOpen(true);
                } else {
                    console.log("Selected option not found in formConfigurations");
                }
            } else {
                newRows[index][field] = value;
                newRows[index].properties[field] = value;
            }
            setrelationalTableData({ ...relationalTableData, [targetTable]: newRows })
            return
        }

        setRows((prevRows) => {
            const newRows = [...prevRows];

            if (field === 'component') {
                newRows[index].component = value;
                newRows[index].properties = {};

                const selected = configForm.find((option) => option.value === value);
                if (selected) {
                    setSelectedOption({ ...selected, entityName });
                    setFormValues({});
                    setModalOpen(true);
                } else {
                    console.log("Selected option not found in formConfigurations");
                }
            } else {
                newRows[index][field] = value;
            }
            return newRows;
        });

    };


    /**
     * Handles the action button functionality for toggling the visibility of rows in a table.
     *
     * @param {string} fieldName - The name of the field to toggle the visibility for.
     * @param {boolean} actionValue - The new visibility state (true for visible, false for hidden).
     * @param {string} [targetTable] - The name of the target table, if the action is for a related table.
     * @returns {void}
     */
    const handleActionButton = (orderConfigId, actionValue, targetTable) => {
        if (targetTable) {
            const rowsData = Array.from(relationalTableData[targetTable])

            rowsData.map((value) => {
                if (orderConfigId === value.orderConfigId) {
                    value.isHide = !actionValue
                }
                return value;
            });
            setrelationalTableData({ ...relationalTableData, [targetTable]: rowsData })
            return
        }

        setRows((rowsData) => {
            return rowsData.map((value) => {
                if (orderConfigId === value.orderConfigId) {
                    value.isHide = !actionValue
                }
                return value;
            });
        });
    };

    /**
     * Handles the checkbox change event for a row in the configurator.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The checkbox change event.
     * @param {string} orderConfigId - The ID of the order configuration.
     * @returns {void} - This function does not return anything.
     *
     * @description
     * This function is responsible for updating the `isReadOnly` property of a row in the `rows` state based on the checkbox value and the `orderConfigId`.
     */
    const handleCheckbox = (e, orderConfigId) => {
        const updatedValue = e.target.checked;

        // Update the row data with the new checkbox value based on orderConfigId
        const updatedRows = rows.map((item) => {
            if (item.orderConfigId === orderConfigId) {
                return { ...item, isReadOnly: updatedValue };
            }
            return item;
        });

        setRows(updatedRows);
    }

    /**
     * Handles the form submission and saves the configuration data.
     *
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     * @returns {void} - This function does not return anything.
     *
     * @description
     * This function is responsible for the following:
     * 1. Prevents the default form submission behavior.
     * 2. Filters the `rows` array to get the visible rows and maps them to the corresponding `finalArray` items.
     * 3. Maps the `dynamicRealtedTable` array to create an array of table objects, including the table name, component type, table ID, dispatcher name, and columns.
     * 4. Combines the `value` and `tableArrya` arrays to create the `combinedConfig`.
     * 5. Creates a data object with the `columnConfig`, `formSubmitAPIURL`, and `formElementsConfig`.
     * 6. Logs the `rows` array to the console.
     * 7. Uncomments the code to save the configuration data to the API.
     */
    const submitHandler = (event) => {
        event.preventDefault();

        const hasErrors = validateAllFields();
        let missingSelections = false;

        // Check if product-related fields have valid selections
        if (!productClass || productSubClass.length === 0 || !orderType || portfolioType.length === 0) {
            missingSelections = true;
            setSnackbarAlertMessage(
                'Please select at least one option from Product Sub Class, Order Type, and Portfolio Type!'
            );
            setSnackbarOpen(true);
        }

        // Prevent submission only if there are errors in fields or missing selections
        if (hasErrors || missingSelections) {
            console.log('Form has errors or missing selections, submission prevented.');
            return;
        }

        const keysToOmit = action === 'edit' ? import.meta.env.VITE_UPDATE_ORDER_FIELD_OMIT.split(',') : import.meta.env.VITE_SAVE_ORDER_FIELD_OMIT.split(',');

        const filteredRows = rows.map(obj =>
            Object.fromEntries(Object.entries(obj).filter(([key]) => !keysToOmit.includes(key)))
        );

        let wasSaveSuccessful = false; // Local variable to track success

        const saveBody = {
            "productClassId": productClass,
            "productSubClassId": productSubClass,
            "portfolioTypeId": portfolioType,
            "orderTypeId": orderType,
            "config": filteredRows
        }

        dispatch(actionCreators.SaveUpdateConfiguratorDetails(saveBody, action)).then((res) => {
            setAlertMessage(res.data.message);
            setAlertIcon('success');
            setAlertOpen(true);
            setIsSaveSuccessful(true); // Set flag to true on success
          
        }).catch((error) => {            
            setAlertMessage(error.response.data.message);
            setAlertIcon('error');
            setAlertOpen(true);
             setIsSaveSuccessful(false); // Set flag to false on error
           
        }) .finally(() => {
            setAlertOpen(true); // Open alert regardless of success or failure
        });
    };

    /**
     * Generates a modified data object with simple row data and dynamic data.
     *
     * This function is responsible for processing the `rows` and `relationalTableData` state to create a modified data object. It separates the dynamic data from the simple row data, and returns an object with these two properties.
     *
     * @returns {object} - An object with `simpleRowData` and `dynamicData` properties.
     */
    const modifiedData = useMemo(() => {
        let dynamicData = []
        dynamicRealtedTable.forEach((value) => {
            if (value.isDynamic) {
                dynamicData.push({ name: value.name, data: relationalTableData[value.name] })
            }
        })
        return { simpleRowData: rows, dynamicData }
    }, [rows, relationalTableData, dynamicRealtedTable])

    /**
     * Validates all fields in the form and sets any errors found.
     *
     * This function iterates through the `rows` array and checks if any rows have the `isHide` flag set to true but no `defaultValue` is provided. If any such rows are found, an error object is created and stored in the `newErrors` object, with the row index as the key. The `hasErrors` flag is also set to true.
     *
     * The `newErrors` object is then set as the new `errors` state, and the `hasErrors` flag is returned, indicating whether any errors were found.
     *
     * @returns {boolean} - True if any errors were found, false otherwise.
     */
    const validateAllFields = () => {
        let hasErrors = false;
        let newErrors = {};

        rows.forEach((row, rowIndex) => {
            if ((row.isHide || row.isReadOnly) && !row.defaultValue) {
                newErrors[rowIndex] = { defaultValue: 'Please enter a default value' };
                hasErrors = true;
            }
        });

        setErrors(newErrors);
        return hasErrors;
    };

    /**
     * Handles the validation of a field in the form.
     *
     * This function is responsible for managing the errors related to a specific field in the form. It checks if the field is set to be hidden (`isHide`) and if a default value is provided. If the field is hidden and no default value is provided, an error is added to the `newErrors` object for the corresponding row index and field name. If the field is not hidden or a default value is provided, any existing error for that field is removed.
     *
     * @param {number} rowIndex - The index of the row in the form.
     * @param {string} fieldName - The name of the field being validated.
     * @param {any} value - The current value of the field.
     * @param {boolean} isHide - Indicates whether the field is set to be hidden.
     */
    const handleValidation = (rowIndex, fieldName, value, isHide, isReadOnly) => {
        let newErrors = { ...errors };

        if (isHide && isReadOnly && !value) {
            newErrors[rowIndex] = { ...newErrors[rowIndex], [fieldName]: 'Please enter a default value' };
        } else {
            if (newErrors[rowIndex]) {
                delete newErrors[rowIndex][fieldName];
                if (Object.keys(newErrors[rowIndex]).length === 0) {
                    delete newErrors[rowIndex];
                }
            }
        }

        setErrors(newErrors);
    };

    /**
     * Handles the input change event for a field in the form.
     *
     * This function is responsible for updating the value of a field in the form and validating the field based on whether it is set to be hidden or not.
     *
     * @param {number} rowIndex - The index of the row in the form.
     * @param {string} fieldName - The name of the field being updated.
     * @param {any} value - The new value of the field.
     * @param {boolean} isHide - Indicates whether the field is set to be hidden.
     */
    const handleInputChange = (rowIndex, fieldName, value, isHide, isReadOnly) => {
        handleSelectChange(rowIndex, fieldName, value);
        handleValidation(rowIndex, fieldName, value, isHide, isReadOnly);
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    /**
     * Generates the columns configuration for a table based on the selected row and target table.
     *
     * This function is responsible for defining the columns and their configurations for a table in the application. It includes columns for property name, property datatype, component type, and actions (delete and hide/show).
     *
     * @param {object} selectedRow - The selected row object.
     * @param {string} targetTable - The target table name.
     * @returns {array} - An array of column configurations.
     */
    const columns = useCallback(
        (selectedRow, targetTable) => {
            try {
                const baseColumns = [
                    {
                        Header: 'Field Name',
                        accessor: 'fieldName',
                        Cell: ({ row, value }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size='small'
                                    value={value || ''}
                                    onChange={(e) => handleSelectChange(row.index, 'fieldName', e.target.value)}
                                    slotProps={{
                                        input: {
                                            readOnly: row?.original?.fieldName ? true : false
                                        },
                                    }}
                                />
                            </Box>
                        ),
                    },
                    {
                        Header: 'Display Label',
                        accessor: 'displayLabel',
                        Cell: ({ row, value }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size='small'
                                    value={value || ''}
                                    onChange={(e) => handleSelectChange(row.index, 'displayLabel', e.target.value)}
                                />
                            </Box>
                        ),
                    },
                    // {
                    //     Header: 'Is Mandatory',
                    //     accessor: 'isMandatary',
                    //     Cell: ({ row }) => (
                    //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    //             <Checkbox
                    //                 checked={row.original.isMandatary}
                    //                 disabled
                    //                 inputProps={{ 'aria-label': 'Is Mandatory' }}
                    //             />
                    //         </Box>
                    //     ),
                    // },
                    {
                        Header: 'Default Value',
                        accessor: 'defaultValue',
                        Cell: ({ row, value }) => {
                            const isDropdown = row.original.isList;
                            const options = row.original.fieldValues || [];

                            return (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {isDropdown ? (
                                        <FormControl fullWidth size="small" variant="outlined" error={!!errors[row.index]?.defaultValue}>
                                            <Select
                                                value={value || ''}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        row.index,
                                                        'defaultValue',
                                                        e.target.value,
                                                        row.original.isHide,
                                                        row.original.isReadOnly
                                                    )
                                                }
                                                // disabled={!row.original.isHide && !row.original.isReadOnly}
                                                className={row.original.isHide ? 'blink-border' : ''}
                                                displayEmpty
                                            >
                                                {options.map((option, index) => (
                                                    <MenuItem key={index} value={option.values}>
                                                        {option.values}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors[row.index]?.defaultValue && (
                                                <FormHelperText>{errors[row.index]?.defaultValue}</FormHelperText>
                                            )}
                                        </FormControl>
                                    ) : (
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            value={value || ''}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    row.index,
                                                    'defaultValue',
                                                    e.target.value,
                                                    row.original.isHide,
                                                    row.original.isReadOnly
                                                )
                                            }
                                            // disabled={!row.original.isHide && !row.original.isReadOnly}
                                            error={!!errors[row.index]?.defaultValue}
                                            helperText={errors[row.index]?.defaultValue}
                                            className={row.original.isHide ? 'blink-border' : ''}
                                        />
                                    )}
                                </Box>
                            );
                        },
                    },
                    {
                        Header: 'Is Read Only',
                        accessor: 'isReadOnly',
                        Cell: ({ row }) => {
                            return (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox
                                        checked={row.original.isReadOnly}
                                        onChange={(e) => {
                                            handleCheckbox(e, row.original.orderConfigId)
                                        }}
                                        inputProps={{ 'aria-label': 'Is Read Only' }}
                                    />
                                </Box>
                            )
                        },
                    }
                ];
                baseColumns.push(
                    {
                        Header: 'Visible',
                        Cell: ({ row }) => (
                            <>
                                <Tooltip title={!row.original.isHide ? "Visible" : "Hidden"}>
                                    <Switch
                                        onChange={(e) => {
                                            handleActionButton(selectedRow?.orderConfigId, e.target.checked, targetTable)
                                        }}
                                        checked={!row.original.isHide}
                                        size="small" />
                                </Tooltip>
                            </>
                        ),
                    }
                );

                return baseColumns;
            }
            catch (e) {
                console.log(e);
            }
        },
        [selectedOption, finalArray, handleActionButton, selectionType]
    );

    /**
     * Fetches the configurator details based on the selected product sub class, portfolio type, and order type.
     *
     * This function is responsible for fetching the configurator details from the server and updating the state with the fetched data. It dispatches an action to fetch the configurator details, and then maps the response data to create a new array of rows for the table.
     *
     * @returns {void}
     */
    const GetConfiguratorDetails = () => {
        const ConfiguratorBody = {
            "productClassId": productClass,
            "productSubClassIds": productSubClass,
            "orderTypeIds": orderType,
            "portfolioTypeIds": action === 'edit' ? portfolioType : []
        }

        dispatch(actionCreators.GetConfiguratorDetails(ConfiguratorBody)).then((res) => {
            if (res.status === 200) {
                const newRows = res.data.data?.map(rowData => {
                    return ({
                        ...rowData,
                    })
                });

                // setBaseTableSchema(newRows);
                setRows(newRows);
                setFinalArray([])
                setFormValues({})
                setSelectedOption('')
            }
        });
    }


    /**
     * Handles the change in the selected portfolio types.
     *
     * This function is called when the user selects new portfolio types from the dropdown. It updates the `portfolioType` state with the new value. If the "Select All" option is clicked, it toggles the selection of all portfolio types.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event object containing the new portfolio type values.
     * @returns {void}
     */
    const handlePortfolioTypeChange = (event) => {
        const {
            target: { value },
        } = event;

        if (value.includes('select-all')) {
            // If "Select All" was clicked, toggle all selections
            if (portfolioType.length === portfolioTypes.length) {
                setPortfolioType([]); // Deselect all
            } else {
                const allIds = portfolioTypes.map((item) => item.hatCode);
                setPortfolioType(allIds); // Select all
            }
        } else {
            // Normal selection logic
            setPortfolioType(
                typeof value === 'string' ? value.split(',') : value,
            );
        }
    };


    /**
     * Handles the change in the selected product sub class.
     *
     * This function is called when the user selects a new product sub class from the dropdown. It updates the `productSubClass` state with the new value. If the "Select All" option is clicked, it toggles the selection of all product sub classes.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event object containing the new product sub class value.
     * @returns {void}
     */
    const handleProductSubClassChange = (event) => {
        const {
            target: { value },
        } = event;

        if (value.includes('select-all')) {
            // If "Select All" was clicked, toggle all selections
            if (productSubClass.length === productSubClasses.length) {
                setProductSubClass([]); // Deselect all
            } else {
                const allIds = productSubClasses.map((item) => item.assetId);
                setProductSubClass(allIds); // Select all
            }
        } else {
            // Normal selection logic
            setProductSubClass(
                typeof value === 'string' ? value.split(',') : value
            );
        }
    };

    /**
     * Handles the closing of the snackbar.
     *
     * This function is called when the user wants to close the snackbar. It sets the `snackbarOpen` state to `false` to hide the snackbar.
     *
     * @returns {void}
     */
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    /**
    * Handles the fetching of configurator details.
    *
    * This function is called when the user wants to fetch the configurator details. It first checks if the required fields (product sub class, order type, and portfolio type) have been selected. If any of these fields are missing, it sets the `snackbarOpen` state to true to display an error snackbar. If all the required fields are selected, it calls the `GetConfiguratorDetails` function to proceed with fetching the configurator details.
    *
    * @returns {void}
    */
    const handleFetchSchema = () => {
        if (!productClass || productSubClass.length === 0 || !orderType || portfolioType.length === 0) {
            // Show error snackbar
            setSnackbarAlertMessage('Please select at least one option from Product Class, Product Sub Class, Order Type, and Portfolio Type!')
            setSnackbarOpen(true);
        } else {
            // Proceed with fetching schema
            GetConfiguratorDetails();
        }
    };

    /**
     * Resets the state variables to their initial values.
     *
     * This function is used to reset the state variables related to the product class, product sub class, order type, portfolio type, rows, relational table data, errors, and the options for these fields.
     *
     * @returns {void}
     */
    const resetStates = () => {
        setProductSubClass([]);
        setOrderType('');
        setPortfolioType([]);
        setRows([]);
        setrelationalTableData({});
        setErrors({});
    };

    /**
     * Fetches initial options for product classes and portfolio types.
     *
     * This effect is triggered once when the component is mounted. It dispatches actions to fetch the initial options for product classes and portfolio types, and updates the corresponding state variables with the fetched data.
     *
     * @returns {void}
     */
    useEffect(() => {
        // Example fetch function for product sub classes
        dispatch(actionCreators.GetProductClasses()).then((res) => {
            if (res.status === 200) {
                setProductClasses(res.data.data)
            }
        });

        // Fetch initial options for portfolio types
        dispatch(actionCreators.GetPortfolioTypes()).then((res) => {
            if (res.status === 200) {
                setPortfolioTypes(res.data.data)
            }
        });
    }, [dispatch]);

    /**
     * Fetches product sub classes and order types based on the selected product class.
     *
     * This effect is triggered whenever the `productClass` state variable changes. It dispatches actions to fetch the product sub classes and order types based on the selected product class, and updates the corresponding state variables with the fetched data.
     *
     * @returns {void}
     */
    useEffect(() => {
        if (productClass) {
            dispatch(actionCreators.GetProductSubClasses(productClass)).then((res) => {
                if (res.status === 200) {
                    setProductSubClasses(res.data.data);
                }
            });
            dispatch(actionCreators.GetOrderTypes(productClass)).then((res) => {
                if (res.status === 200) {
                    setOrderTypes(res.data.data)
                }
            });
        }
    }, [productClass, dispatch]);


    /**
     * Initializes the configurator state based on the action type.
     *
     * This effect is triggered whenever the `action` state variable changes. If the action is 'edit', it sets the state variables for product class, product sub class, order type, and portfolio type based on the corresponding ID values. If the action is not 'edit', it calls the `resetStates` function to reset the state variables.
     *
     * @returns {void}
     */
    useEffect(() => {
        if (action === 'edit') {
            if (productClassId) setProductClass(productClassId);
            if (productSubClassId.length) setProductSubClass(productSubClassId);
            if (orderTypeId) setOrderType(orderTypeId);
            if (portfolioTypeId.length) setPortfolioType(portfolioTypeId);
        } else {
            resetStates();
        }
    }, [action]);

    /**
     * Fetches configurator details when the product class, product sub class, order type, or portfolio type changes, but only when in edit mode.
     *
     * This effect is triggered whenever the `productClass`, `productSubClass`, `orderType`, or `portfolioType` state variables change, but only when the `action` is 'edit'. It calls the `GetConfiguratorDetails` function to fetch the configurator details based on the updated values.
     *
     * @returns {void}
     */
    useEffect(() => {
        if (action === 'edit' && !isInitialLoad.current) {
            if (productClass && productSubClass.length && orderType && portfolioType.length) {
                GetConfiguratorDetails();
            }
        }
        isInitialLoad.current = false;
    }, [productClass, productSubClass, orderType, portfolioType, action]);

    /**
     * Fetches configurator details when the order type changes, but only when not in edit mode.
     *
     * This effect is triggered whenever the `orderType` state variable changes, but only when the `action` is not 'edit'. It calls the `GetConfiguratorDetails` function to fetch the configurator details based on the updated order type.
     *
     * @returns {void}
     */
    useEffect(() => {
        if (action !== 'edit' && orderType) {
            GetConfiguratorDetails();
        }
    }, [orderType]);


    /**
     * Fetches configurator details when the product sub class or order type changes, but only when not in edit mode.
     *
     * This effect is triggered whenever the `productSubClass` or `orderType` state variables change, but only when the `action` is not 'edit'. It calls the `GetConfiguratorDetails` function to fetch the configurator details based on the updated product sub class and order type.
     *
     * @returns {void}
     */
    useEffect(() => {
        if (action !== 'edit' && productSubClass && orderType) {
            GetConfiguratorDetails();
        }
    }, [productSubClass]);


      //Go back to previous screen
      const goBack = () => {
        navigate('/order-configurations');
    };

    return (
        <ThemeProvider theme={theme}>
            <Container className='maincontainer' sx={{ mt: 3 }}>
                <h5 className='mainheding'>Order Configurator</h5>
                <Grid container spacing={2}>
                    {/* Product Class Dropdown */}
                    <Grid size={{ xs: 6, md: 3, lg: 3 }}>
                        <FormControl size='small' variant="filled" fullWidth
                            sx={{
                                '& .MuiInputBase-input': { fontSize: '10px' },
                                '& .MuiInputLabel-root': { fontSize: '12px' },
                            }}
                        >
                            <InputLabel id="product-class-label">Product Class</InputLabel>
                            <Select
                                sx={{ pt: 2 }}
                                labelId="product-class-label"
                                value={productClass}
                                onChange={(e) => {
                                    resetStates();
                                    setProductClass(e.target.value);
                                }}
                                label="Product Class"
                                renderValue={(selected) => {
                                    const selectedItem = productClasses.find((item) => item.productClassId === Number(selected));
                                    return selectedItem ? (
                                        <Chip label={selectedItem.productClassName} />
                                    ) : (
                                        <em>Select</em>
                                    );
                                }}
                                disabled={action === 'edit'}
                            >
                                <MenuItem value="">
                                    <em>Select</em>
                                </MenuItem>
                                {productClasses?.map((item, id) => (
                                    <MenuItem key={id} value={item.productClassId}>{item.productClassName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {
                    productClass &&
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {/* Product Sub Class Dropdown */}
                        <Grid size={{ xs: 6, md: 1, lg: 4 }}>
                            <FormControl size="small" variant="filled" fullWidth
                                sx={{
                                    '& .MuiInputBase-input': { fontSize: '10px' },
                                    '& .MuiInputLabel-root': { fontSize: '12px' }
                                }}
                            >
                                <InputLabel id="product-sub-class-label">Product Sub Class</InputLabel>
                                <Select
                                    sx={{ pt: 2 }}
                                    labelId="product-sub-class-label"
                                    multiple
                                    value={productSubClass}
                                    onChange={handleProductSubClassChange}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => {
                                                const selectedItem = productSubClasses.find((item) => item.assetId === Number(value));
                                                return <Chip key={value} label={selectedItem ? selectedItem.assetName : value} />;
                                            })}
                                        </Box>
                                    )}
                                    disabled={!productClass || action === 'edit'}
                                >
                                    {/* <MenuItem
                                        value="select-all"
                                    >
                                        <Checkbox
                                            checked={productSubClass.length === productSubClasses.length}
                                            indeterminate={
                                                productSubClass.length > 0 &&
                                                productSubClass.length < productSubClasses.length
                                            }
                                        />
                                        <ListItemText primary="Select All" />
                                    </MenuItem> */}
                                    {productSubClasses?.map((item, id) => (
                                        <MenuItem key={id} value={item.assetId}>
                                            <Checkbox checked={productSubClass.includes(item.assetId)} />
                                            <ListItemText primary={item.assetName} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Order Type Dropdown */}
                        <Grid size={{ xs: 6, md: 1, lg: 4 }}>
                            <FormControl size="small" variant="filled" fullWidth
                                sx={{
                                    '& .MuiInputBase-input': { fontSize: '10px' },
                                    '& .MuiInputLabel-root': { fontSize: '12px' }
                                }}
                            >
                                <InputLabel id="order-type-label">Order Type</InputLabel>
                                <Select
                                    sx={{ pt: 2 }}
                                    labelId="order-type-label"
                                    value={orderType}
                                    onChange={(e) => setOrderType(e.target.value)}
                                    label="Order Type"
                                    disabled={!productClass || action === 'edit'}
                                    renderValue={(selected) => {
                                        const selectedItem = orderTypes.find((item) => item.orderTypeId === Number(selected));
                                        return selectedItem ? (
                                            <Chip label={selectedItem.orderType} />
                                        ) : (
                                            <em>Select</em>
                                        );
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Select</em>
                                    </MenuItem>
                                    {orderTypes?.map((item, id) => (
                                        <MenuItem key={id} value={item.orderTypeId}>{item.orderType}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Portfolio Type Dropdown */}
                        <Grid size={{ xs: 6, md: 1, lg: 4 }}>
                            <FormControl size="small" variant="filled" fullWidth
                                sx={{
                                    '& .MuiInputBase-input': { fontSize: '10px' },
                                    '& .MuiInputLabel-root': { fontSize: '12px' }
                                }}
                            >
                                <InputLabel id="portfolio-type-label">Portfolio Type</InputLabel>
                                <Select
                                    sx={{ pt: 2 }}
                                    labelId="portfolio-type-label"
                                    multiple
                                    value={portfolioType}
                                    onChange={handlePortfolioTypeChange}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => {
                                                const selectedItem = portfolioTypes.find((item) => item.hatCode === Number(value));
                                                return <Chip key={value} label={selectedItem ? selectedItem.hatTypeName : value} />;
                                            })}
                                        </Box>
                                    )}
                                    disabled={action === 'edit'}
                                >
                                    {/* <MenuItem
                                        value="select-all"
                                    >
                                        <Checkbox
                                            checked={portfolioType.length === portfolioTypes.length}
                                            indeterminate={
                                                portfolioType.length > 0 &&
                                                portfolioType.length < portfolioTypes.length
                                            }
                                        />
                                        <ListItemText primary="Select All" />
                                    </MenuItem> */}
                                    {portfolioTypes.map((item, id) => (
                                        <MenuItem key={id} value={item.hatCode}>
                                            <Checkbox checked={portfolioType.includes(item.hatCode)} />
                                            <ListItemText primary={item.hatTypeName} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                }
                {/* {
                    action !== 'edit' &&
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid size={{ xs: 6, md: 1, lg: 2 }}>
                            <Button variant="contained" onClick={handleFetchSchema} className="custom-alert-button" fullWidth>
                                Fetch Schema
                            </Button>
                        </Grid>
                    </Grid>
                }  */}
                <form onSubmit={submitHandler}>
                    <Box sx={{ overflowX: 'auto', minWidth: 750, display: 'flex', flexDirection: 'column', mb: 2, mt: 2 }}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table" size={"small"} sx={{ minWidth: 750 }}>
                                <TableHead >
                                    <TableRow >
                                        {columns().map((column, colIndex) => (
                                            <TableCell key={colIndex}>{column.Header}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {modifiedData.simpleRowData.map((row, rowIndex) => (
                                        <TableRow
                                            key={rowIndex}
                                        >
                                            {columns(row).map((column, colIndex) => (
                                                <TableCell key={colIndex}>
                                                    {column.Cell({ row: { index: rowIndex, original: row }, value: row[column.accessor] })}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        className='custom-alert-button'
                        sx={{ mt: 2 }}
                        disabled={modifiedData.simpleRowData.length <= 0}
                        type='submit'
                    >
                        {action === 'edit' ? 'Update' : "Save"}
                    </Button>
                    <Button
                    variant="contained"
                     color="primary"
                    style={{  marginLeft: 15 }}
                    className='custom-alert-button'
                    sx={{ mt: 2 }}
                    // type='submit'
                    onClick={goBack}
                >
                    {"Cancel"}
                </Button>
                </form>
            </Container>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity="error">
                    {snackbarAlertMessage}
                </Alert>
            </Snackbar>
            <CustomAlert
                open={alertOpen}
                onClose={handleCloseAlert}
                text={alertMessage}
                icon={alertIcon}
                confirmButtonText="OK"
                allowOutsideClick={false}
                width="30vw"
                // onConfirmButton={() => navigate('/order-configurations')}
                onConfirmButton={() => {
                    // Navigate based on the success state
                    if (isSaveSuccessful) {
                        navigate('/order-configurations'); // On success
                    } else {
                        navigate('/order-configurator'); // On failure
                    }
                    handleCloseAlert(); // Close the alert after navigation
                }}
            />
            

        </ThemeProvider>
    );
}

export default Configurator;
