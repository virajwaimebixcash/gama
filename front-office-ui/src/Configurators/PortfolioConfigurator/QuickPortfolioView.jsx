// import React from 'react'

// export default function PortfolioConfigForm() {
//   return (
//     <div>PortfolioConfigForm</div>
//   )
// }

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Box, Button, Container, Table, TableBody, Grid, createTheme, ThemeProvider,
    TableCell, TableContainer, TableHead, TableRow, Paper,


    Checkbox,
    FormControlLabel,
    TextField
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';

import { Tooltip } from '@mui/material';
import api from '../../APIs/interceptor';


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

function QuickPortfolioView({ setAlertOpen }) {

    // const [apis, setApis] = useState([{ name: 'List Users' }]);


    const [rows, setRows] = useState([]);
    const [fieldsRow, setFieldsRow] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [disabledSaveButton, setDisabledSaveButton] = useState(false)




    const quickFieldCunter = useMemo(() => {
        let count = 0
        for (let i in fieldsRow) {
            const data = fieldsRow[i]

            if (!data.isHide) {
                count = count + 1
            }

        }
        return count


    }, [fieldsRow])

    const SaveCreatedFields = (type) => {
        const formdata = Array.from(fieldsRow)
        const payload = []
        for (let i in formdata) {
            const singleData = formdata[i]
            singleData.fieldSequenceNo = Number(i)
            singleData.displayName = singleData.displayName ? singleData.displayName?.trim() : ''
            if (singleData.pvConfigDetailId == null) {
                singleData.pvConfigDetailId = ''

            }
            if (!singleData.isHide) {
                singleData.pageViewType = 'QuickView'
            }
            payload.push(singleData)


        }

        api.post(type == 'update' ? '/portfolioviewconfigurator/configuratorUpdate' : '/portfolioviewconfigurator/configuratorSave', payload)
            .then(result => {
                setAlertOpen({ show: true, msg: "Quick View Configuration Saved Successfully", type: "success" })
                getfields()

            })
            .catch(error => {
                setAlertOpen({ show: true, msg: error, type: "error" })
                console.error('Error fetching entities:', error)
            });

    }
    // ------------to swap rows=-----------------------
    const handleDragEnd = (result, type) => {
        if (!result.destination) {
            return;
        }
        if (type === 'field') {
            const newRows = Array.from(fieldsRow);
            const [movedRow] = newRows.splice(result.source.index, 1);
            newRows.splice(result.destination.index, 0, movedRow);
            setFieldsRow(newRows);
        }
        if (type === 'group') {
            const newRows = Array.from(rows);
            const [movedRow] = newRows.splice(result.source.index, 1);
            newRows.splice(result.destination.index, 0, movedRow);
            setRows(newRows);
        }

    };

    const handelOnchange = (value, id) => {
        setFieldsRow((prevRows) => {
            return prevRows.map((row) => {
                if (id == row.pvConfiguratorId) {
                    row.displayName = value

                }

                return row

            })
        })


    }

    const columns = useCallback(
        (selectedRow, index, type) => {
            try {
                // return <></>
                let baseColumns = [];
                if (type === 'field') {

                    baseColumns = [
                        {
                            // Header: 'Hide/Show',
                            Header: 'Visible',
                            accessor: 'isHide',
                            Cell: ({ row, value }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Tooltip title="Swap row">
                                        <SwapVertRoundedIcon fontSize="small" sx={{ color: "#86949D" }} />
                                    </Tooltip>
                                    <p>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={!selectedRow.isHide}
                                                    onChange={(e) => { hideAndShowHandler('field', selectedRow.pvConfiguratorId, !e.target.checked) }}
                                                />
                                            }
                                        // label={selectedRow.isHide ? 'Hide' : 'Show'}
                                        />
                                    </p>
                                    {/* <TextField
                    fullWidth
                    variant="outlined"
                    size='small'
                    value={value || ''}
                    onChange={(e) => handleSelectChange(row.index, 'entityName', e.target.value,selectedRow?.entityName,targetTable)}
                    InputProps={{
                      readOnly: row?.original?.isFromAPI,
                    }}
                  /> */}
                                </Box>
                            ),
                        },
                        {
                            Header: 'Field Name',
                            accessor: 'fieldName',
                            Cell: ({ row, value }) => (
                                <p>
                                    {selectedRow.fieldName}
                                </p>
                            ),
                        }
                    ];

                    // if (selectionType === 'database') {
                    baseColumns.push(
                        {
                            Header: 'Display Name',
                            accessor: 'displayName',
                            Cell: ({ row, value }) => (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size='small'
                                    value={selectedRow.displayName || ''}
                                    onChange={(e) => handelOnchange(e.target.value, selectedRow?.pvConfiguratorId)}
                                    inputProps={{ maxLength: 50 }}
                                />
                            ),
                        },
                    );
                    // }
                }

                return baseColumns;
            }
            catch (e) {
                console.log(e);
            }
        },
        [selectedOption, fieldsRow]
    );
    const getfields = () => {
        api.post('/portfolioviewconfigurator/getFieldList', {
            "pageViewType": "QuickView"
        })
            .then(result => {
                const datawithSequence = result.data.data.filter((item) => item.fieldSequenceNo !== null&& item.isHide ==false).sort((a, b) => a.fieldSequenceNo - b.fieldSequenceNo)
                const datawithoutSequence = result.data.data.filter((item) =>  item.isHide == true)
                setFieldsRow([...datawithSequence, ...datawithoutSequence])
            })
            .catch(error => console.error('Error fetching entities:', error));
    }

    useEffect(() => {
        getfields()
    }, []);

    const dataStucturing = (ApiFieldsData) => {
        for (let i in ApiFieldsData) {
            const result = ApiFieldsData[i]
            if (!result.isHide) {
                setDisabledSaveButton(true)
                break
            }

        }
    }


    // const getGroupOfFileds = useMemo(() => {
    //   return getGroupOfCollection.map((item) => {
    //     return {
    //       ...item,
    //       data: fieldsRow.filter((items) => {
    //         return item.pvgroupId == items.pvgroupId
    //       })

    //     }
    //   })

    // }, [fieldsRow, getGroupOfCollection])

    const hideAndShowHandler = (type, pvConfiguratorId, value,) => {
        if (quickFieldCunter >= 12 && value == false) {
            setAlertOpen({ show: true, msg: "Maximum 12 fields can be added", type: "error" })
            return
        }
        setFieldsRow((prevRows) => {
            return prevRows.map((row,) => {
                if (pvConfiguratorId == row.pvConfiguratorId) {
                    row.isHide = value
                }

                return row

            })
        })

    }

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ justifyContent: "center", display: "felx", padding: 1 }}>
                <Box sx={{ overflowX: 'auto', minWidth: 750, display: 'flex', flexDirection: 'row', mb: 2 }}>
                    <DragDropContext onDragEnd={(props) => handleDragEnd(props, 'field')}>
                        <Droppable droppableId="droppable-left">
                            {(provided) => (
                                <TableContainer component={Paper} {...provided.droppableProps} ref={provided.innerRef} sx={{ flex: 1, mr: 2 }}>
                                    <Table aria-label="left table" size={"small"} sx={{ minWidth: 375 }}>
                                        <TableHead>
                                            <TableRow>
                                                {columns(null, null, 'field').map((column, colIndex) => (
                                                    <TableCell key={colIndex}>{column.Header}</TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {fieldsRow.map((row, rowIndex) => (
                                                <Draggable key={rowIndex.toString()} draggableId={rowIndex.toString()} index={rowIndex}>
                                                    {(provided) => (
                                                        <TableRow
                                                            key={rowIndex}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            {columns(row, rowIndex, 'field').map((column, colIndex) => (
                                                                <TableCell key={colIndex}>
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
                </Box>
                <Box sx={{ mb: 2 }}>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => SaveCreatedFields('save')}
                        sx={{ mt: 2, mr: 2 }}
                    // disabled={disabledSaveButton}
                    >
                        Save Configuration
                    </Button>
                    {/* <Button
                        variant="contained"
                        color="primary"
                        disabled={!disabledSaveButton}
                        onClick={() => SaveCreatedFields('update')}
                        sx={{ mt: 2, mr: 2 }}
                    >
                        Update
                    </Button> */}

                </Box>

            </Container>
        </ThemeProvider>
    );
}

export default QuickPortfolioView;
