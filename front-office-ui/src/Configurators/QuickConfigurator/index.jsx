import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box, Button, Container, Table, TableBody, createTheme, ThemeProvider,
  TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, FormControl, Paper,
  Typography,
  TextField,
  Tabs,
  Tab
} from '@mui/material';

import api from '../../APIs/interceptor';
import CustomAlert from '../../Common/CustomComponents/CustomAlert';


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

function QuickConfigForm() {
  // const [apis, setApis] = useState([{ name: 'List Users' }]);
  const [editGroupDetails, SetEditGroupDetails] = useState({ index: "", details: [] })
  const [selectedViewType, setselectedViewType] = useState('Detail view');
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [alertOpen, setAlertOpen] = useState({ show: false, msg: '', type: 'success' });
  const [rows, setRows] = useState([]);
  const [fieldsRow, setFieldsRow] = useState([]);
  const [selectedOption] = useState('');
  const [sortFields, setSortField] = useState(1)




  const SaveCreatedFields = (id) => {

    api.post('/quickOrderConfigurator/save', fieldsRow)
      .then(result => {
        setAlertOpen({ show: true, msg: "Quick Configuration Saved Successfully", type: "success" })
        getFields()
      })
      .catch(error => {
        setAlertOpen({ show: true, msg: error, type: "error" })
        console.error('Error fetching entities:', error)
      });

  }

  //===========previous code by chandan================
  // const getFields = () => {
  //   api.post('/quickOrderConfigurator/getAllConfigurations')
  //     .then(result => {
  //       // setRows(result.data.data)
  //       setFieldsRow(result.data.data)
  //     })
  //     .catch(error => console.error('Error fetching entities:', error));
  // }
  const getFields = () => {
    api.post('/quickOrderConfigurator/getAllConfigurations')
      .then(result => {
        const updatedFields = result.data.data.map(field => ({
          ...field,
          defaultValue: field.defaultValue || 'Payout', // Set default to "Payout" if not defined
        }));
        setFieldsRow(updatedFields);
      })
      .catch(error => console.error('Error fetching entities:', error));
  };
  

  useEffect(() => {
    getFields()
  }, []);


  const dataStucturing = useMemo(() => {
    const groupOfCollection = [{ name: 'All', key: "" }, { name: 'SIP', key: "" }, { name: 'Lumpsum', key: "" }]
    const fields = groupOfCollection.map((item) => {
      return {
        ...item,
        fixed: true,
        groupName: item.name,
        data: fieldsRow.filter((items) => {
          return item.name == items.quickOrderType
        })

      }
    })
    return fields
  }, [fieldsRow])



  const displayNameChangeHadler = (type, fieldId, value, groupName,) => {
    setFieldsRow((prevRows) => {
      return prevRows.map((row, rowindex) => {

        if (fieldId == row.fieldName && row.quickOrderType == groupName) {
          row.displayName = value
        }
        return row

      })
    })

  }
  const defaultValueChangeHadler = (type, fieldId, value, groupName,) => {
    setFieldsRow((prevRows) => {
      return prevRows.map((row, rowindex) => {

        if (fieldId == row.fieldName && row.quickOrderType == groupName) {
          row.defaultValue = value
        }
        return row

      })
    })

  }




  const hideAndShowHandler = (type, fieldId, value, groupName,) => {
    setFieldsRow((prevRows) => {
      return prevRows.map((row, rowindex) => {
        if (fieldId == row.fieldName && row.quickOrderType == groupName) {
          row.isMandatory = value
        }
        return row
      })
    })

  }



  const ColleapsRowHandler = useCallback(({ row }) => {
    return (
      <>

        <Box sx={{ margin: 1, padding: 2, overflow: 'visible' }}>
          <Typography sx={{ fontWeight: 'bold' }} variant="h6" gutterBottom component="div">
            {row.groupName}
          </Typography>

          <Table
            size="small"
            aria-label="purchases"

          >
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontWeight: 'bold' }}>Field Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Display Header</TableCell>
                {row.groupName == 'All' && <TableCell sx={{ fontWeight: 'bold' }} >DefaultValue</TableCell>}

                {/* <TableCell sx={{ fontWeight: 'bold' }}>Mandatory</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {row.data?.map((historyRow, index) => (

                <TableRow

                >
                  <TableCell>{historyRow.fieldName}</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={historyRow.displayName || ''}
                      onChange={(e) =>
                        displayNameChangeHadler(
                          'field',
                          historyRow.fieldName,
                          e.target.value,
                          row.groupName
                        )
                      }
                      inputProps={historyRow.fieldName.includes('Note') && { maxLength: 50 }}
                    />
                  </TableCell>
                  {row.groupName === 'All' && (
                    <TableCell>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          value={historyRow.defaultValue || 'Payout'}
                          onChange={(e) =>
                            defaultValueChangeHadler(
                              'field',
                              historyRow.fieldName,
                              e.target.value,
                              row.groupName
                            )
                          }
                          displayEmpty
                        >
                          <MenuItem value="PAYOUT">PAYOUT</MenuItem>
                          <MenuItem value="REINVEST">REINVEST</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  )}
                  {/* <TableCell component="th" scope="row">
                        <FormControlLabel
                          control={
                            <Checkbox
                              // checked={!historyRow.isMandatory}
                              checked={historyRow.isMandatory}
                              
                              onChange={(e) =>
                                hideAndShowHandler(
                                  'field',
                                  historyRow.fieldName,
                                  // !e.target.checked,
                                  e.target.checked,
                                  row.groupName
                                )
                              }
                            />
                          }
                        />
                      </TableCell> */}
                </TableRow>

              ))}
            </TableBody>
          </Table>
        </Box>
        {/* </Collapse> */}
        {/* </TableCell> */}
      </>
    );
  }, [])

  const handleCloseAlert = () => {
    setAlertOpen({ show: false, msg: '' });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ justifyContent: "center", display: "felx", padding: 1 }}>
        <h2>Quick Order Configurator</h2>



        <Box sx={{ overflowX: 'auto', minWidth: 750, display: 'flex', flexDirection: 'row', mb: 2, overflow: 'visible' }}>

          <TableContainer component={Paper} sx={{ flex: 1, mr: 2 }}>
            <Tabs
              value={"Order"}
              onChange={() => { }}
              aria-label="wrapped label tabs example"
            >
              <Tab
                value="Order"
                label="Order Configurator"
                wrapped
              />
              <Tab value="Table1" label="Order Configurator 2" />
              <Tab value="Table2" label="Order Configurator 3" />
            </Tabs>
            {dataStucturing.map((row, rowIndex) => {

              return (
                // <TableRow key={`fixed-${rowIndex}`}>
                <ColleapsRowHandler row={row} />
                // </TableRow>
              );

            })}
          </TableContainer>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => SaveCreatedFields()}
            sx={{ mt: 2, mr: 2 }}
          >
            Save Configuration
          </Button>

        </Box>
        <CustomAlert
          open={alertOpen.show}
          onClose={handleCloseAlert}
          text={alertOpen.msg}
          icon={alertOpen.type}
          confirmButtonText="OK"
          cancelButtonText="Cancel"
          allowOutsideClick={false}
          width="40vw"
        />
      </Container>
    </ThemeProvider>
  );
}

export default QuickConfigForm;
