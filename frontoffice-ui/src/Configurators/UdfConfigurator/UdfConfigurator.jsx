import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
    Box, Button, Container, Table, TableBody, createTheme, ThemeProvider, OutlinedInput, Checkbox, Chip,
    TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, TextField, FormControl, InputLabel, Paper, ListItemText,
    Snackbar,
    Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import Switch from '@mui/material/Switch';
import { IconButton, Tooltip } from '@mui/material';
import configForm from '../../assets/InputFieldConfig.json';
import ModalComponent from './Modal';
import jsonCreator from '../../utils/jsonCreator';
import { actionCreators } from '../../redux/actions/actionCreators';
import { useDispatch } from 'react-redux';
import CustomAlert from '../../Common/CustomComponents/CustomAlert';
import { useNavigate, useSearchParams } from 'react-router-dom';
import reverseJsonParser from '../../utils/reverseJsonParser';


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

function UdfConfigurator() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isApiCalled = useRef(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const action = searchParams.get('action');
    const entityId = Number(searchParams.get('entityId'));
    const dtlConfigId = Number(searchParams.get('dtlConfigId'));

    const [entities, setEntities] = useState([]);
    const [selectedEntity, setSelectedEntity] = useState('');
    const [rows, setRows] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [columnConfig, setColumnConfig] = useState('');
    const [finalArray, setFinalArray] = useState([]);
    const [propertiesValues, SetpropertiesValues] = useState([])
    const [selectionType, setSelectionType] = useState('database'); // Add this line
    const [dynamicRealtedTable, SetDynamicRealtedTable] = useState([])
    const [relationalTableData, setrelationalTableData] = useState({})
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertIcon, setAlertIcon] = useState('error');
    const [snackbarAlertMessage, setSnackbarAlertMessage] = useState('Something went wrong')
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isModalOpenedByToggle, setIsModalOpenedByToggle] = useState(false);

    const [currentSelectedRow, setCurrentSelectedRow] = useState(null);
    const [currentTargetTable, setCurrentTargetTable] = useState(null);

    const [productClass, setProductClass] = useState('');
    const [productSubClass, setProductSubClass] = useState([]);
    const [orderType, setOrderType] = useState('');
    const [portfolioType, setPortfolioType] = useState([]);

    const [productClasses, setProductClasses] = useState([])
    const [productSubClasses, setProductSubClasses] = useState([]);
    const [orderTypes, setOrderTypes] = useState([]);
    const [portfolioTypes, setPortfolioTypes] = useState([]);
    const [showDynamicTableField, setShowDynamicTableField] = useState(false);
    const [dynamicTableName, setDynamicTableName] = useState('');
    const [dynamicTableReadOnly, setDynamicTableReadOnly] = useState(false);
    const [isModalOpenedByReadOnly, setIsModalOpenedByReadOnly] = useState(false);
    const [dependonList, setDependonList] = useState([])

    const [tableName, setTableName] = useState(null);

    /**
     * Fetches the UDF (User Defined Field) configurator details for the given entityId and dtlConfigId.
     * This function is responsible for populating the state variables with the fetched data, including product class, product subclass, order type, portfolio type, column config, and the form elements config.
     * The form elements config is processed to extract the row data and dynamic table data, which are then stored in the state variables.
     *
     * @param {number} entityId - The ID of the entity for which the UDF configurator details are to be fetched.
     * @returns {void}
     */
    const GetUDFConfiguratorDetails = (entityId) => {
        const ConfiguratorBody = {
            "entityId": entityId,
            "dtlConfigId": dtlConfigId
        }

        dispatch(actionCreators.GetUDFConfiguratorDetails(ConfiguratorBody)).then((res) => {
            if (res.status === 200) {
                setProductClass(res.data.data.entityConfig.productClassId)
                setProductSubClass(res.data.data.entityConfig.productSubclassId)
                setOrderType(res.data.data.entityConfig.orderTypeId)
                setPortfolioType(res.data.data.entityConfig.portfolioTypeId)
                setColumnConfig(res.data.data.udfConfig.columnConfig)

                const rowData = []
                let tableData = []
                const tableName = []
                const relatedtable = {}
                for (let i in res.data.data.udfConfig.formElementsConfig) {
                    const formValue = res.data.data.udfConfig.formElementsConfig[i]
                    if (formValue.component === 'dynamicTable') {
                        tableName.push({
                            name: formValue.label,
                            isDynamic: true,
                        })
                        const newTableData = []
                        for (let j in formValue.columns) {
                            const udftableValue = formValue.columns[j]
                            newTableData.push({
                                ...udftableValue,
                                entityName: udftableValue?.dispatchername,
                                action: true
                            })
                        }
                        tableData = [...tableData, ...newTableData]
                        relatedtable[formValue.label] = newTableData

                    } else {
                        rowData.push({
                            ...formValue,
                            entityName: formValue.dispatchername,
                            action: true
                        })
                    }


                }

                const combineArray = [...rowData, ...tableData]

                setRows(rowData);
                setFinalArray(combineArray)
                SetpropertiesValues(combineArray)
                SetDynamicRealtedTable(tableName)
                setrelationalTableData(relatedtable)
                setFormValues({})
                setSelectedOption('')
            }
        });
    }

    /**
     * Adds a new row to the rows state.
     * The new row has the following properties:
     * - entityName: ''
     * - entityDatatype: ''
     * - component: ''
     * - properties: {}
     * - isFromAPI: false
     * - isHide: false
     */
    const handleAddRow = () => {
        setRows([...rows, { entityName: '', entityDatatype: '', component: '', properties: {}, isFromAPI: false, isHide: false, isReadOnly: false, dispatchername: "" }]);
    };

    /**
     * Removes a row from the rows state or the relationalTableData object.
     *
     * @param {number} index - The index of the row to be removed.
     * @param {string} [targetTable] - The name of the table in the relationalTableData object to remove the row from.
     * @returns {void}
     */
    const handleRemoveRow = (index, targetTable) => {
        if (targetTable) {
            const arrayData = Array.from(relationalTableData[targetTable])
            setrelationalTableData({ ...relationalTableData, [targetTable]: arrayData.filter((_, rowIndex) => rowIndex !== index) })
            return
        }
        setRows((prevRows) => prevRows.filter((_, rowIndex) => rowIndex !== index));
    };

    /**
     * Handles the change event for a select input field in the UdfConfigurator component.
     *
     * @param {number} index - The index of the row being updated.
     * @param {string} field - The name of the field being updated (e.g. 'component', 'entityName').
     * @param {any} value - The new value for the field.
     * @param {string} entityName - The name of the entity associated with the row.
     * @param {string} [targetTable] - The name of the table in the relationalTableData object to update.
     * @returns {void}
     */
    const handleSelectChange = (index, field, value, entityName, targetTable) => {
        if (targetTable) {
            // const entityName=`${entityName}${targetTable}`
            const newRows = Array.from(relationalTableData[targetTable])
            if (field === 'component') {
                newRows[index].component = value;
                newRows[index].properties = {};
                newRows[index].dispatchername = `${entityName}_${targetTable}`

                const selected = configForm.find((option) => option.value === value);
                if (selected) {
                    setSelectedOption({ ...selected, entityName, targetTable });
                    setFormValues({});
                    setModalOpen(true);
                } else {
                    console.log("Selected option not found in formConfigurations");
                }
            } else {
                newRows[index][field] = value;
                newRows[index].properties[field] = value;
                newRows[index].dispatchername = `${entityName}_${targetTable}`

            }
            setrelationalTableData({ ...relationalTableData, [targetTable]: newRows })
            return
        }

        setRows((prevRows) => {
            const newRows = [...prevRows];
            if (field === 'component') {
                newRows[index].component = value;
                newRows[index].properties = {};
                newRows[index].dispatchername = `${entityName}`


                const selected = configForm.find((option) => option.value === value);
                if (selected) {
                    setSelectedOption({ ...selected, entityName });
                    setFormValues({});
                    setModalOpen(true);
                    setIsModalOpenedByToggle(false);

                } else {
                    console.log("Selected option not found in formConfigurations");
                }
            } else {
                newRows[index][field] = value;
                newRows[index].properties[field] = value;
                newRows[index].dispatchername = `${entityName}`
            }
            return newRows;
        });

    };

    /**
     * Toggles the visibility of a row in the relational table data or the main table data.
     *
     * @param {string} entityName - The name of the entity to toggle the visibility for.
     * @param {boolean} actionValue - The new visibility state to set for the row.
     * @param {string} [targetTable] - The name of the table in the relationalTableData object to update.
     * @returns {void}
     */
    const handleActionButton = (entityName, actionValue, targetTable) => {
        if (targetTable) {
            const rowsData = Array.from(relationalTableData[targetTable])

            rowsData.map((value) => {
                if (entityName === value.entityName) {
                    value.isHide = !actionValue
                }
                return value;
            });
            setrelationalTableData({ ...relationalTableData, [targetTable]: rowsData })
            return
        }
        setRows((rowsData) => {
            return rowsData.map((value) => {
                if (entityName === value.entityName) {
                    value.isHide = !actionValue
                }
                return value;
            });
        });
    };

    const handleActionButtonReadOnly = (entityName, actionValue, targetTable) => {
        if (targetTable) {

            const rowsData = Array.from(relationalTableData[targetTable])

            rowsData.map((value) => {
                if (entityName === value.entityName) {
                    value.isReadOnly = actionValue
                }
                return value;
            });
            setrelationalTableData({ ...relationalTableData, [targetTable]: rowsData })
            return
        }

        setRows((rowsData) => {
            return rowsData.map((value) => {
                if (entityName === value.entityName) {
                    value.isReadOnly = actionValue
                }
                return value;
            });
        });
    };

    /**
     * Handles the closing of the modal.
     * If the modal was opened by the toggle, it sets the visibility of the corresponding row back to true.
     * Then, it sets the modal to be closed.
     */
    const handleClose = () => {
        if (isModalOpenedByToggle) {
            handleActionButton(currentSelectedRow?.entityName, true, currentTargetTable);
        }

        setModalOpen(false);
    };

    const handleSave = () => {
        const hasDefaultValue = formValues.defaultValue != null && formValues.defaultValue !== "" && formValues.defaultValue !== undefined;

        if (isModalOpenedByToggle && hasDefaultValue) {
            handleActionButton(currentSelectedRow?.entityName, false, currentTargetTable);
        } else if (isModalOpenedByToggle && !hasDefaultValue) {
            handleActionButton(currentSelectedRow?.entityName, true, currentTargetTable);
        }
        // if (isModalOpenedByReadOnly && hasDefaultValue) {
        //     handleActionButtonReadOnly(currentSelectedRow?.entityName, true, currentTargetTable);
        // } else if (isModalOpenedByToggle && !hasDefaultValue) {
        //     handleActionButtonReadOnly(currentSelectedRow?.entityName, false, currentTargetTable);
        // }

        const dataArray = jsonCreator(formValues, selectedOption?.value, selectedOption.targetTable);

        setFinalArray((finalArray) => {
            const index = finalArray.findIndex(item =>
                item.dispatchername?.toLowerCase()?.split(" ").join("") === selectedOption?.entityName?.toLowerCase()?.split(" ").join("")
            );

            if (index !== -1) {
                return finalArray.map((item, i) => (i === index ? dataArray : item));
            } else {
                return [...finalArray, dataArray];
            }
        });

        SetpropertiesValues((prevArray) => {
            const index = prevArray.findIndex(item => item.entityName === selectedOption?.entityName);

            if (index !== -1) {
                return prevArray.map((item, i) => (i === index ? { ...formValues, isEdited: true, dispatchername: selectedOption.entityName } : item));
            } else {
                return [...prevArray, { ...formValues, isEdited: true, dispatchername: selectedOption.entityName }];
            }
        });
        setFormValues({ ...formValues });
        setModalOpen(false);
        return
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const value = rows.map(data => {
            return { ...data, ...finalArray.find((config) => data.dispatchername?.toLowerCase()?.split(" ").join("") === config.dispatchername.toLowerCase().split(" ").join("")) || undefined };
        }).filter(item => item !== undefined);

        const tableArrya = dynamicRealtedTable.map((item) => {
            const tableObject = {}
            if (item.isDynamic) {
                const arrayData = relationalTableData[item.name]?.map(data => {
                    return finalArray.find((config) => data.dispatchername?.toLowerCase()?.split(" ")?.join("") == config.dispatchername?.toLowerCase()?.split(" ").join("")) || undefined;
                })
                tableObject['label'] = item.name
                tableObject['component'] = 'dynamicTable'
                tableObject['tableId'] = item.name
                tableObject['dispatchername'] = item.name?.toLowerCase()?.split(" ").join("")
                tableObject['columns'] = arrayData

                return tableObject
            }
        }).filter(item => item !== undefined);
        const combinedConfig = value.concat(tableArrya)

        const data = {
            "entityConfig": {
                "dtlConfigId": dtlConfigId,
                "entityId": selectedEntity,
                "productClassId": productClass,
                "orderTypeId": orderType,
                "productSubClassId": productSubClass,
                "portfolioTypeId": portfolioType
            },
            "udfConfig": {
                "columnConfig": columnConfig,
                "formSubmitAPIURL": "",
                "formElementsConfig": combinedConfig
            }
        };

        if (!productClass || productSubClass.length === 0 || !orderType || portfolioType.length === 0 || !columnConfig || !selectedEntity) {
            setSnackbarAlertMessage(
                'Please select at least one option from the filters!'
            );
            setSnackbarOpen(true);
            return;
        }

        dispatch(actionCreators.SaveUpdateUdfConfiguratorDetails(data, action)).then((res) => {
            setAlertMessage(res.data.message);
            setAlertIcon('success');
            setAlertOpen(true);
        }).catch((error) => {
            setAlertMessage(error.response.data.message);
            setAlertIcon('error');
            setAlertOpen(true);
        })
    };

    const handleChange = (label, value) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [label]: value
        }));
    };

    const handleColumnConfigChange = (value) => {
        setColumnConfig(value);
    };

    const handleDragEnd = (result, entityName) => {
        if (!result.destination) {
            return;
        }
        if (entityName && relationalTableData[entityName]) {
            const newRows = Array.from(relationalTableData[entityName]);
            const [movedRow] = newRows.splice(result.source.index, 1);
            newRows.splice(result.destination.index, 0, movedRow);
            setrelationalTableData({ ...relationalTableData, [entityName]: newRows })
            return
        }
        const newRows = Array.from(rows);
        const [movedRow] = newRows.splice(result.source.index, 1);
        newRows.splice(result.destination.index, 0, movedRow);
        setRows(newRows);
    };    

    const columns = useCallback(
        (selectedRow, targetTable) => {
            try {
                const baseColumns = [
                    {
                        Header: 'Field Name',
                        accessor: 'entityName',
                        Cell: ({ row, value }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Tooltip title="Swap row">
                                    <SwapVertRoundedIcon fontSize="small" sx={{ color: "#86949D" }} />
                                </Tooltip>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size='small'
                                    value={value || ''}
                                    onChange={(e) => handleSelectChange(row.index, 'entityName', e.target.value, selectedRow?.entityName, targetTable)}
                                    slotProps={{
                                        input: {
                                            readOnly: row?.original?.isFromAPI
                                            // readOnly: row?.original?.fieldName ? true : false
                                        },
                                    }}
                                />
                            </Box>
                        ),
                    },
                    // {
                    //     Header: 'Property Datatype',
                    //     accessor: 'entityDatatype',
                    //     Cell: ({ row, value }) => (
                    //         row?.original?.isFromAPI ? (
                    //             <TextField
                    //                 sx={{ width: "100%" }}
                    //                 variant="outlined"
                    //                 size='small'
                    //                 value={value || ''}
                    //                 onChange={(e) => handleSelectChange(row.index, 'entityDatatype', e.target.value)}
                    //                 InputProps={{
                    //                     readOnly: true,
                    //                 }}
                    //             />
                    //         ) : (
                    //             <FormControl fullWidth variant="outlined" size="small">
                    //                 <InputLabel id={`select-entityDatatype-label-${row.index}`}>Select Datatype</InputLabel>
                    //                 <Select
                    //                     sx={{ width: "100%" }}
                    //                     labelId={`select-entityDatatype-label-${row.index}`}
                    //                     value={value || ''}
                    //                     onChange={(e) => handleSelectChange(row.index, 'entityDatatype', e.target.value)}
                    //                     label="Select Datatype"
                    //                 >
                    //                     <MenuItem value="" disabled>Select an option</MenuItem>
                    //                     <MenuItem value="nvarchar">nvarchar</MenuItem>
                    //                     <MenuItem value="int">int</MenuItem>
                    //                     <MenuItem value="bool">Boolean</MenuItem>
                    //                     <MenuItem value="date">Date</MenuItem>
                    //                 </Select>
                    //             </FormControl>
                    //         )
                    //     ),
                    // }
                ];
                baseColumns.push(
                    {
                        Header: 'Component Type',
                        accessor: 'component',
                        Cell: ({ row, value }) => (
                            <Select
                                sx={{ width: "100%" }}
                                size='small'
                                value={value || ''}
                                onChange={(e) => handleSelectChange(row.index, 'component', e.target.value, selectedRow?.entityName, targetTable)}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>Select an option</MenuItem>
                                {configForm.sort((a, b) => a.label.trim().localeCompare(b.label.trim())).map((option, index) => (
                                    <MenuItem key={`${option.value}_${index}`} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        ),
                    },
                    {
                        Header: 'Properties',
                        accessor: 'properties',
                        Cell: ({ row }) => (
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => {

                                    let editProperties
                                    if (targetTable) {
                                        editProperties = propertiesValues.find((option) => {
                                            // return option.entityName === selectedRow?.entityName
                                            return option.dispatchername + "_" + targetTable == selectedRow?.dispatchername
                                        })
                                    } else {
                                        editProperties = propertiesValues.find((option) => {
                                            // return option.entityName === selectedRow?.entityName
                                            return option.dispatchername == selectedRow?.dispatchername
                                        })
                                    }

                                    setIsModalOpenedByToggle(false);

                                    setModalOpen(true);
                                    setSelectedOption((data) => ({ ...data, ...configForm.find((option) => option.value === row.original.component), entityName: selectedRow?.entityName }));
                                    setFormValues(action === 'edit' && !editProperties?.isEdited ? reverseJsonParser(row.original) : editProperties || {});
                                }}
                                disabled={!configForm.find((option) => option.value === row.original.component)}
                            >
                                + Edit Properties
                            </Button>
                        ),
                    }
                );
                baseColumns.push(
                    {
                        Header: 'Delete',
                        Cell: ({ row }) => (
                            <>
                                <Tooltip title="Delete row">
                                    <IconButton disabled={row.original.isFromAPI}>
                                        <DeleteRounded fontSize="small" sx={{ color: row.original.isFromAPI ? "grey" : "#dc3545" }}
                                            onClick={() => handleRemoveRow(row.index, targetTable)}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </>
                        ),
                    },
                    {
                        Header: 'Is Read Only',
                        accessor: 'isReadOnly',

                        Cell: ({ row }) => {
                            const editProperties = propertiesValues.find(
                                (option) => option.entityName === selectedRow?.entityName
                            );
                            const hasDefaultValue = editProperties?.defaultValue !== null && editProperties?.defaultValue !== "" && editProperties?.defaultValue !== undefined;
                            return (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox
                                        checked={row.original.isReadOnly ? true : false}
                                        onChange={(e) => {
                                            const isReadOnly = e.target.checked
                                            handleActionButtonReadOnly(selectedRow?.entityName, isReadOnly, targetTable);
                                        }}
                                        inputProps={{ 'aria-label': 'Is Read Only' }}
                                    />
                                </Box>
                            )
                        },
                    },
                    {
                        Header: 'Visible',
                        Cell: ({ row }) => {
                            const editProperties = propertiesValues.find(
                                (option) => option.entityName === selectedRow?.entityName
                            );

                            // Check if the formValues contain a default                           
                            const hasDefaultValue = editProperties?.defaultValue !== null && editProperties?.defaultValue !== "" && editProperties?.defaultValue !== undefined;

                            return (
                                <>
                                    <Tooltip title={!row.original.isHide ? "Visible" : "Hidden"}>
                                        <Switch
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;

                                                // Update visibility status
                                                handleActionButton(selectedRow?.entityName, isChecked, targetTable);

                                                if (import.meta.env.VITE_DEFAULT_VALUE_COMPONENTS.includes(selectedRow?.component)) {
                                                    setCurrentSelectedRow(selectedRow);
                                                    setCurrentTargetTable(targetTable);
                                                    setIsModalOpenedByToggle(true);

                                                    // If the switch is turned ON (isHide = true) and no default value exists, trigger modal logic
                                                    if (!isChecked && !hasDefaultValue) {
                                                        setModalOpen(true);
                                                        setSelectedOption((data) => ({
                                                            ...data,
                                                            ...configForm.find(
                                                                (option) => option.value === row.original.component
                                                            ),
                                                            entityName: selectedRow?.entityName,
                                                        }));

                                                        const initialFormValues =
                                                            action === 'edit' && !editProperties?.isEdited
                                                                ? reverseJsonParser(row.original)
                                                                : editProperties || {};

                                                        setFormValues(initialFormValues);
                                                    }
                                                }
                                            }}
                                            checked={!row.original.isHide}
                                            size="small"
                                        />
                                    </Tooltip>
                                </>
                            );
                        },
                    }
                );
                return baseColumns;
            }
            catch (e) {
                console.log(e);
            }
        },
        [selectedOption, finalArray, handleActionButton, handleActionButtonReadOnly, selectionType]
    );

    const handleEntityChange = (entityName) => {
        setSelectedEntity(entityName);
        // setUserDefineField(`${entityName}_UDF`)
        setRows([])
    }

    const modifiedData = useMemo(() => {
        let dynamicData = []

        dynamicRealtedTable.forEach((value) => {
            if (value.isDynamic) {
                dynamicData.push({ name: value.name, data: relationalTableData[value.name] })
            }
        })
        const list = rows.map((item) => ({ name: item.entityName, value: item.entityName }));
        return { simpleRowData: rows, dynamicData, dependonList: [...dependonList, ...list] }
    }, [rows, relationalTableData, dynamicRealtedTable, dependonList])

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleAddDynamicTable = () => {
        setShowDynamicTableField(true);
        setDynamicTableName(''); // Clear the previous value
        setDynamicTableReadOnly(false); // Enable the field for editing
    };

    const handleDynamicTableNameChange = (event) => {
        setDynamicTableName(event.target.value);
    };

    const handleSubmitDynamicTable = () => {
        const fullTableName = `${dynamicTableName}_UDF`;
        // const fullTableName = `_${dynamicTableName}_UDF`;
        setTableName(fullTableName)
        SetDynamicRealtedTable([...dynamicRealtedTable, { name: fullTableName, isDynamic: true }])
        setrelationalTableData(prevTables => ({
            ...prevTables,
            [fullTableName]: [{ entityName: '', entityDatatype: '', component: '', properties: {}, isFromAPI: false, action: true, isReadOnly: false }] // Initialize with empty data
        }));

        setDynamicTableName('');
        setShowDynamicTableField(false); // Hide the field after submission
        setDynamicTableReadOnly(false); // Reset to allow new entries
    };

    const handleAddRowToDynamicTable = (tableName) => {

        setrelationalTableData(prevState => ({
            ...prevState,
            [tableName]: [...(prevState[tableName] || []), { entityName: '', entityDatatype: '', component: '', properties: {}, isFromAPI: false, action: true }]
        }));
    };

    const goBack = () => {
        navigate(-1);
    };

    const handleMoveUp = (index) => {
        if (index <= 0) return; // Prevent moving the first item up

        const dynamicDataNames = dynamicRealtedTable
            .filter((value) => value.isDynamic)
            .map((value) => value.name);

        // Swap the order of the corresponding names in dynamicRealtedTable
        [dynamicDataNames[index - 1], dynamicDataNames[index]] = [dynamicDataNames[index], dynamicDataNames[index - 1]];

        SetDynamicRealtedTable(dynamicDataNames.map((name) => ({ name, isDynamic: true })));
    };

    const handleMoveDown = (index) => {
        if (index >= modifiedData.dynamicData.length - 1) return; // Prevent moving the last item down

        const dynamicDataNames = dynamicRealtedTable
            .filter((value) => value.isDynamic)
            .map((value) => value.name);

        // Swap the order of the corresponding names in dynamicRealtedTable
        [dynamicDataNames[index], dynamicDataNames[index + 1]] = [dynamicDataNames[index + 1], dynamicDataNames[index]];

        SetDynamicRealtedTable(dynamicDataNames.map((name) => ({ name, isDynamic: true })));
    };

    useEffect(() => {
        dispatch(actionCreators.GetEntityMasterDetails()).then((res) => {
            if (res.status === 200) {
                setEntities(res.data.data)
            }
        })

        dispatch(actionCreators.GetPortfolioTypes()).then((res) => {
            if (res.status === 200) {
                setPortfolioTypes(res.data.data)
            }
        });
    }, [dispatch]);

    useEffect(() => {
        if (selectedEntity) {
            dispatch(actionCreators.GetUDFProductClassDetails(selectedEntity)).then((res) => {
                if (res.status === 200) {
                    setProductClasses(res.data.data)
                }
            });
        }
    }, [selectedEntity, dispatch]);

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

                    const payload = {
                        "productClassId": productClass,
                        "orderTypeIds": orderType,
                        "productSubClassIds": productSubClass,
                        "portfolioTypeIds": portfolioType
                    }
                    dispatch(actionCreators.GetOrderViewConfiguratorDetails(payload)).then((res) => {
                        if (res.status === 200) {
                            setDependonList(res.data.data.map((config) => ({ name: config.fieldName, value: config.fieldName }))) // setFormConfig(res.data.data); // Set the fields from the API response
                        }
                    })
                }
            });
        }
    }, [productClass, dispatch]);

    useEffect(() => {
        const payload = {
            "productClassId": productClass,
            "orderTypeIds": orderType,
            "productSubClassIds": productSubClass,
            "portfolioTypeIds": productSubClass
        }
        dispatch(actionCreators.GetOrderViewConfiguratorDetails(payload)).then((res) => {
            if (res.status === 200) {
                setDependonList(res.data.data.map((config) => ({ name: config.fieldName, value: config.fieldName }))) // setFormConfig(res.data.data); // Set the fields from the API response
            }
        })

    }, [productClass, productSubClass, productSubClass, orderType, dispatch]);

    useEffect(() => {
        if (action === 'edit' && entityId && !isApiCalled.current) {
            if (entityId) {
                setSelectedEntity(entityId);
                GetUDFConfiguratorDetails(entityId)
                isApiCalled.current = true; // Set the flag after API call
            }
        }
    }, [action, entityId]);

    return (
        <ThemeProvider theme={theme}>
            <Container className='maincontainer' sx={{ mt: 3 }}>
                <h2 className='mainheding'>UDF Configurator </h2>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 6, md: 2, lg: 2 }}>
                        <FormControl size="small" variant="filled" fullWidth
                            sx={{
                                '& .MuiInputBase-input': { fontSize: '10px' },
                                '& .MuiInputLabel-root': { fontSize: '12px' }
                            }}
                        >
                            <InputLabel id="select-entity-label">Select Entity</InputLabel>
                            <Select
                                sx={{ pt: 2 }}
                                labelId="select-entity-label"
                                value={selectedEntity}
                                onChange={(e) => handleEntityChange(e.target.value)}
                                label="Select Entity"
                                renderValue={(selected) => {
                                    const selectedItem = entities.find((item) => item.entityId === Number(selected));
                                    return selectedItem ? (
                                        <Chip label={selectedItem.tableName} />
                                    ) : (
                                        <em>Select</em>
                                    );
                                }}
                                disabled={action === 'edit'}

                            >
                                <MenuItem value="">
                                    <em>Select</em>
                                </MenuItem>
                                {entities.map((entity, index) => (
                                    <MenuItem key={`${entity.entityId}_${index}`} value={entity.entityId}>
                                        {entity.tableName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 6, md: 2, lg: 2 }} >
                        <FormControl size='small' variant="filled" fullWidth
                            sx={{
                                '& .MuiInputBase-input': { fontSize: '10px' },
                                '& .MuiInputLabel-root': { fontSize: '12px' }
                            }}
                        >
                            <InputLabel id="select-column-configuration">Select Column Configuration</InputLabel>
                            <Select
                                sx={{ pt: 2 }}
                                labelId="select-column-configuration"
                                value={columnConfig}
                                onChange={(e) => handleColumnConfigChange(e.target.value)}
                                label="Select Column Configuration"
                                renderValue={(selected) => (
                                    selected && <Chip label={selected} />
                                )}
                            // disabled={action === 'edit'}

                            >
                                <MenuItem value="">
                                    <em>Select</em>
                                </MenuItem>
                                <MenuItem value={1}><em>1</em></MenuItem>
                                <MenuItem value={2}><em>2</em></MenuItem>
                                <MenuItem value={3}><em>3</em></MenuItem>
                                <MenuItem value={4}><em>4</em></MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    {selectedEntity && (
                        <>
                            <Grid size={{ xs: 6, md: 1, lg: 3 }}>
                                <FormControl size="small" variant="filled" fullWidth
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
                                        onChange={(e) => setProductClass(e.target.value)}
                                        label="Product Class"
                                        renderValue={(selected) => {
                                            const selectedItem = productClasses.find((item) => item.productClassId === Number(selected));
                                            return selectedItem ? (
                                                <Chip label={selectedItem.productClassName} />
                                            ) : (
                                                <em>Select</em>
                                            );
                                        }}
                                        disabled={!selectedEntity || action === 'edit'}


                                    >
                                        {productClasses.map((item, index) => (
                                            <MenuItem key={`${item.productClassId}_${index}`} value={item.productClassId}>
                                                {item.productClassName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {
                                productClass &&
                                <>
                                    <Grid size={{ xs: 6, md: 1, lg: 3 }}>
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
                                                onChange={(e) => setProductSubClass(e.target.value)}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {selected.map((value, index) => {
                                                            const selectedItem = productSubClasses.find((item) => item.assetId === Number(value));
                                                            return <Chip key={`${value}_${index}`} label={selectedItem ? selectedItem.assetName : value} />;
                                                        })}
                                                    </Box>
                                                )}
                                                disabled={!productClass || action === 'edit'}

                                            >
                                                {productSubClasses?.map((item, id) => (
                                                    <MenuItem key={`${item.assetId}_${id}`} value={item.assetId}>
                                                        <Checkbox checked={productSubClass.includes(item.assetId)} />
                                                        <ListItemText primary={item.assetName} />
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid size={{ xs: 6, md: 1, lg: 3 }}>
                                        <FormControl size="small" variant="filled" fullWidth
                                            sx={{
                                                '& .MuiInputBase-input': { fontSize: '10px' },
                                                '& .MuiInputLabel-root': { fontSize: '12px' }
                                            }}
                                        >
                                            <InputLabel id="order-by-label">Order Type</InputLabel>
                                            <Select
                                                sx={{ pt: 2 }}
                                                labelId="order-by-label"
                                                value={orderType}
                                                onChange={(e) => setOrderType(e.target.value)}
                                                label="Order Type"
                                                // renderValue={(selected) => selected && <Chip label={selected} />}
                                                renderValue={(selected) => {
                                                    const selectedItem = orderTypes.find((item) => item.orderTypeId === Number(selected));
                                                    return selectedItem ? (
                                                        <Chip label={selectedItem.orderType} />
                                                    ) : (
                                                        <em>Select</em>
                                                    );
                                                }}
                                                disabled={!productClass || action === 'edit'}

                                            >
                                                {orderTypes.map((item, index) => (
                                                    <MenuItem key={`${item.orderTypeId}_${index}`} value={item.orderTypeId}>
                                                        {item.orderType}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </>
                            }
                            <Grid size={{ xs: 6, md: 1, lg: 3 }}>
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
                                        onChange={(e) => setPortfolioType(e.target.value)}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value, index) => {
                                                    const selectedItem = portfolioTypes.find((item) => item.hatCode === Number(value));
                                                    return <Chip key={`${value}_${index}`} label={selectedItem ? selectedItem.hatTypeName : value} />;
                                                })}
                                            </Box>
                                        )}
                                        disabled={!selectedEntity || action === 'edit'}

                                    >
                                        {portfolioTypes.map((option, index) => (
                                            <MenuItem key={`${option.hatCode}_${index}`} value={option.hatCode}>
                                                <Checkbox checked={portfolioType.indexOf(option.hatCode) > -1} />
                                                <ListItemText primary={option.hatTypeName} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </>
                    )}
                </Grid>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row' }}>
                    <Button variant="contained" color="primary" onClick={handleAddRow}>Add Row</Button>
                    <Button variant="contained" color="primary" sx={{ marginLeft: 5 }} onClick={handleAddDynamicTable}
                    // disabled={action === 'edit'}
                    >Add Dynamic Table</Button>
                    {/* <Grid > */}
                    {showDynamicTableField && (
                        <Box sx={{ ml: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <TextField
                                label="Enter Dynamic Table Name"
                                // fullWidth
                                variant="outlined"
                                size='small'
                                value={dynamicTableName || ''}
                                onChange={handleDynamicTableNameChange}

                            />

                            <Button disabled={dynamicTableReadOnly} variant="contained" color="primary" sx={{ marginLeft: 1 }} onClick={handleSubmitDynamicTable}>Create</Button>
                        </Box>
                    )}
                    {/* </Grid> */}
                </Box>
                <Box sx={{ overflowX: 'auto', minWidth: 750, display: 'flex', flexDirection: 'column', mb: 2, mt: 2 }}>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="droppable_Fields">
                            {(provided) => (
                                <TableContainer component={Paper} {...provided.droppableProps} ref={provided.innerRef}>
                                    <Table aria-label="simple table" size={"small"} sx={{ minWidth: 750 }}>
                                        <TableHead >
                                            <TableRow >
                                                {columns().map((column, colIndex) => (
                                                    <TableCell key={colIndex.toString()}>{column.Header}</TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {modifiedData.simpleRowData.map((row, rowIndex) => (
                                                <Draggable key={rowIndex.toString()} draggableId={rowIndex.toString()} index={rowIndex}>
                                                    {(provided) => (
                                                        <TableRow
                                                            key={rowIndex.toString()}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            {columns(row).map((column, colIndex) => (
                                                                <TableCell key={`${colIndex.toString()}_${rowIndex.toString()}`}>
                                                                    {column.Cell({ row: { index: rowIndex, original: row }, value: row[column.accessor] })}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {/* {modifiedData?.dynamicData.map((value, index) => {
                        return (
                            <>
                                <Box key={`${index.toString()}_${value.name}`} sx={{ mt: 2, p: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                        <TextField
                                            variant="outlined"
                                            label="Table Name"
                                            value={value.name}
                                            sx={{ width: "200px" }}
                                            disabled
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleAddRowToDynamicTable(value.name)}
                                        >
                                            Add Row to {value.name}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleMoveUp(index)}
                                            disabled={index === 0}
                                        >
                                            Move Up
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleMoveDown(index)}
                                            disabled={index === modifiedData.dynamicData.length - 1}
                                        >
                                            Move Down
                                        </Button>
                                    </Box>
                                </Box>
                                <DragDropContext key={index.toString()} onDragEnd={(e) => handleDragEnd(e, value.name)}>
                                    <Droppable droppableId={`droppable_dynamicTable_${index}`}>
                                        {(provided) => (
                                            <TableContainer component={Paper} {...provided.droppableProps} ref={provided.innerRef}>
                                                <Table aria-label="simple table" size={"small"} sx={{ minWidth: 750 }}>
                                                    <TableBody>
                                                        {value?.data?.map((row, rowIndex) => {
                                                            const indexvalue = rowIndex
                                                            return <Draggable key={indexvalue.toString()} draggableId={indexvalue.toString()} index={indexvalue}>
                                                                {(provided) => (
                                                                    <TableRow
                                                                        key={indexvalue.toString()}
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        {columns(row, value.name).map((column, colIndex) => (
                                                                            <TableCell key={`${rowIndex.toString()}_${colIndex.toString()}`}>
                                                                                {column.Cell({ row: { index: rowIndex, original: row }, value: row[column.accessor] })}
                                                                            </TableCell>
                                                                        ))}
                                                                    </TableRow>
                                                                )}
                                                            </Draggable>
                                                        }
                                                        )}
                                                        {provided.placeholder}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </>
                        )
                    })} */}
                    <Box sx={{ overflowX: 'auto', minWidth: 750, display: 'flex', flexDirection: 'column', mb: 2, mt: 2 }}>
                        {modifiedData?.dynamicData.map((value, index) => {
                            return (
                                <>
                                    <Box key={`${index.toString()}_${value.name}`} sx={{ mt: 2, p: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                            <TextField
                                                variant="outlined"
                                                label="Table Name"
                                                value={value.name}
                                                sx={{ width: "200px" }}
                                                disabled
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleAddRowToDynamicTable(value.name)}
                                            >
                                                Add Row to {value.name}
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleMoveUp(index)}
                                                disabled={index === 0}
                                            >
                                                Move Table Up
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleMoveDown(index)}
                                                disabled={index === modifiedData.dynamicData.length - 1}
                                            >
                                                Move Table Down
                                            </Button>
                                            {/* <<<<---------Delete Table----------------->>>>> */}
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                // onClick={() => handleMoveDown(index)}
                                                // disabled={index === modifiedData.dynamicData.length - 1}
                                            >
                                                Delete Table
                                            </Button>
                                        </Box>
                                    </Box>
                                    <DragDropContext key={index.toString()} onDragEnd={(e) => handleDragEnd(e, value.name)}>
                                        <Droppable droppableId={`droppable_dynamicTable_${index}`}>
                                            {(provided) => (
                                                <TableContainer component={Paper} {...provided.droppableProps} ref={provided.innerRef}>
                                                    <Table aria-label="simple table" size={"small"} sx={{ minWidth: 750 }}>
                                                        <TableBody>
                                                            {value?.data?.map((row, rowIndex) => {
                                                                const indexvalue = rowIndex
                                                                return <Draggable key={indexvalue.toString()} draggableId={indexvalue.toString()} index={indexvalue}>
                                                                    {(provided) => (
                                                                        <TableRow
                                                                            key={indexvalue.toString()}
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            {columns(row, value.name).map((column, colIndex) => (
                                                                                <TableCell key={`${rowIndex.toString()}_${colIndex.toString()}`}>
                                                                                    {column.Cell({ row: { index: rowIndex, original: row }, value: row[column.accessor] })}
                                                                                </TableCell>
                                                                            ))}
                                                                        </TableRow>
                                                                    )}
                                                                </Draggable>
                                                            }
                                                            )}
                                                            {provided.placeholder}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                </>
                            )
                        })}
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2, mb: 2 }}
                    disabled={modifiedData.simpleRowData.length <= 0}
                >
                    {action === 'edit' ? 'Update' : "Save"}
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 15 }}
                    className='custom-alert-button'
                    sx={{ mt: 2, mb: 2 }}
                    type='submit'
                    onClick={goBack}
                >
                    {"Cancel"}
                </Button>

                <ModalComponent
                    modalOpen={modalOpen}
                    handleClose={handleClose}
                    selectedOption={selectedOption}
                    formValues={formValues}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    dependonList={modifiedData.dependonList}
                />
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
                onConfirmButton={() => navigate('/udf-configurations')}
            />
        </ThemeProvider >
    );
}

export default UdfConfigurator;
