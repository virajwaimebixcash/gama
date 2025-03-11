import React, { useCallback, useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableRow, Paper,
  IconButton, Button, Box, MenuItem, Select, TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";
import { Add } from "@mui/icons-material";
import api from "../../APIs/interceptor";
import ModelPortfolioPopup from './ModelPortfolioPopup';
import { useSelector } from "react-redux";
import { useFormContext, Controller, useWatch } from "react-hook-form";

const fetchData = async (url, thirdPartyUrl, requestParams, responseParams, userDataStore) => {
  if (!url) return null;

  const entries = JSON.parse(requestParams)?.map((key) => [
    key.fieldName,
    key.fieldNametoBindValue === "userDataStore"
      ? userDataStore[key.fieldName]
      : key.defaultValue,
  ]) || [];

  const body = {
    relativeTPAPIUrl: thirdPartyUrl,
    requestParam: Object.fromEntries(entries),
  };

  try {
    const response = await api.post(url, body);
    const responseData = response.data.responseBody;

    return responseData?.map((item) => ({
      value: item[responseParams.Value],
      text: item[responseParams.Text],
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};


const AttributefilterationSection = ({ tab, getFundData }) => {
  const { setError, clearErrors, watch, setValue, control, getValues, reset } = useFormContext();
  const userDataStore = useSelector(state => state.userDataStore);

  const [attributeFilterationData, setAttributeFilterationData] = useState([]);
  const [rows, setRows] = useState([{
    id: 0,
    selectedValue: "",
    secondDropdownOptions: [],
    selectedSecondValue: "",
    selectedControlType: "",
    selectedOperator: "",
    inputValue: "",
    fromValue: "",
    toValue: ""
  }]);
  // l2Allocation


  useEffect(() => {
    getAttributeFilterationDropdownData();
    
    // addRow(); // Initialize with one row
  }, []);

  const getAttributeFilterationDropdownData = async () => {
    try {
      const payload = { productClassId: 2 };
      const res = await api.post("/ModelPortfolio/getPortfolioDataByProductClassId", payload);
      setAttributeFilterationData(res.data.data);
    } catch (error) {
      console.error("Error fetching first dropdown data:", error);
    }
  };

  const fetchSecondDropdownData = async (groupId, rowIndex) => {
    try {
      const payload = { groupId };
      const res = await api.post("/modelPortfolioConfigurator/getModelPortfolioGroupAttributeConfig", payload);
      const options = res.data.data.map(item => ({
        ...item,
        id: item.mpGroupAttributeDetailId,
        label: item.displayName,
        type: item.controlDataTypeName
      }));
      updateRow(rowIndex, {
        secondDropdownOptions: options,
        selectedSecondValue: "",
        selectedControlType: "",
        selectedOperator: "",
        inputValue: "",
        fromValue: "",
        toValue: ""
      });
    } catch (error) {
      console.error("Error fetching second dropdown data:", error);
    }
  };

  const addRow = () => {
    setRows(prevRows => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        selectedValue: "",
        secondDropdownOptions: [],
        selectedSecondValue: "",
        selectedControlType: "",
        selectedOperator: "",
        inputValue: "",
        fromValue: "",
        toValue: ""
      }
    ]);
  };

  const deleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const updateRow = (index, updatedValues) => {
    setRows(prevRows => prevRows.map((row, i) => i === index ? { ...row, ...updatedValues } : row));
  };

  const [open, setOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState("50%");
  const [generateData, setGenerateData] = useState([]);

  const handleOpen = () => {
    api.post('/schemes', {
      "clientCode": "35",
      "userId": "integra",
      "transactionType": 2,
      "searchString": "",
      "lastBusinessDate": "2025-02-19T15:24:15.096Z",
      "getData": 1,
      "schemeCode": "",
      "multipleSchemeCode": 0,
      "category": "Equity",
      "subCategory": "Solution Oriented: Children's"
    }).then((res) => {
      // const fundData = getFundData();
      // const data = { ...getValues(), fundData: fundData }      
      // reset({ ...data })
      setGenerateData(res.data);
      setModalWidth("90%");
      setOpen(true);
    })
  };
  // Validate if a Row is Filled
  const isRowValid = (row) => {
    if (!row.selectedValue) return false;
    if (!row.selectedSecondValue) return false;

    // Validate based on control type
    if (row.selectedControlType === "ArithmeticOperatorSearch" && !row.selectedOperator) return false;
    if (row.selectedOperator === "Between" && (!row.fromValue || !row.toValue)) return false;
    if (row.selectedOperator && row.selectedOperator !== "Between" && !row.inputValue) return false;

    return true;
  };

  // Check if All Rows Are Valid
  const allRowsValid = rows.every(isRowValid);

  const isButtonDisabled = !((watch("Fund.l2Allocation") && watch("Fund.l2AllocationChecked")) || allRowsValid);

  return (
    <Box sx={{ width: "100%", overflowX: "auto", backgroundColor: '#fff' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={7} align="left">
                <strong>Attribute Filtration</strong>
              </TableCell>
            </TableRow>
            {rows.map((row, index) => {
              const selectedOption = row.secondDropdownOptions.find(r => r.mpGroupAttributeDetailId === row.selectedSecondValue)
              return (
                <TableRow key={row.id}>
                  <TableCell sx={{ width: "20%" }}>
                    <Select
                      value={row.selectedValue}
                      onChange={(e) => {
                        updateRow(index, { selectedValue: e.target.value });
                        fetchSecondDropdownData(e.target.value, index);
                      }}
                      displayEmpty
                      fullWidth
                    >
                      <MenuItem value="" disabled>Select an option</MenuItem>
                      {attributeFilterationData.map(option => (
                        <MenuItem key={option.modelPortfolioGroupId} value={option.modelPortfolioGroupId}>
                          {option.groupName}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>

                  <TableCell sx={{ width: "20%" }}>
                    <Select
                      value={row.selectedSecondValue}
                      onChange={(e) => {
                        const selectedItem = row.secondDropdownOptions.find(opt => opt.id === e.target.value);
                        updateRow(index, {
                          selectedSecondValue: e.target.value,
                          selectedControlType: selectedItem ? selectedItem.type : ""
                        });
                      }}
                      displayEmpty
                      disabled={!row.secondDropdownOptions.length}
                      fullWidth
                    >
                      <MenuItem value="" disabled>Select the Group</MenuItem>
                      {row.secondDropdownOptions.filter(option => option.isHide !== "Y").map(option => (
                        <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>

                  <TableCell sx={{ width: "15%" }}>
                    {row.selectedControlType === "ArithmeticOperatorSearch" && (
                      <Select
                        value={row.selectedOperator}
                        onChange={(e) => updateRow(index, { selectedOperator: e.target.value })}
                        displayEmpty
                        fullWidth
                      >
                        <MenuItem value="" disabled>Select Operator</MenuItem>
                        <MenuItem value="EqualTo">=</MenuItem>
                        <MenuItem value="NotEqualTo">!=</MenuItem>
                        <MenuItem value="LessThanEqualTo">≤</MenuItem>
                        <MenuItem value="GreaterThanEqualTo">≥</MenuItem>
                        <MenuItem value="LessThan">&lt;</MenuItem>
                        <MenuItem value="GreaterThan">&gt;</MenuItem>
                        <MenuItem value="Between">Between</MenuItem>
                      </Select>
                    )}
                    {(row.selectedControlType === "Dropdown" || row.selectedControlType === "MultiSelect") && (
                      <>
                        {
                          fetchData('/common/getThirdPartyMasterData', selectedOption.relativeTPAPIUrl, selectedOption.controlRequestParam, selectedOption.controlResponseParam, userDataStore).then((res) => console.log(res))

                        }
                        <Select
                          value={row.inputValue}
                          onChange={(e) => updateRow(index, { inputValue: e.target.value })}
                          displayEmpty
                          fullWidth
                          size="small">
                          <MenuItem value="Option1">Option 1</MenuItem>
                          <MenuItem value="Option2">Option 2</MenuItem>
                        </Select>
                      </>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "15%" }}>
                    {row.selectedOperator && row.selectedOperator !== "Between" && (
                      <TextField
                        value={row.inputValue}
                        onChange={(e) => updateRow(index, { inputValue: e.target.value })}
                        fullWidth
                        size="small"
                        // label="Value"
                        variant="outlined"
                      />
                    )}
                    {row.selectedOperator === "Between" && (
                      <TextField
                        fullWidth
                        size="small"
                        // label="From"
                        variant="outlined"
                        value={row.fromValue}
                        onChange={(e) => updateRow(index, { fromValue: e.target.value })}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "15%" }}>
                    {row.selectedOperator === "Between" && (
                      <TextField
                        fullWidth
                        size="small"
                        // label="To"
                        variant="outlined"
                        value={row.toValue}
                        onChange={(e) => updateRow(index, { toValue: e.target.value })}
                      />
                    )}
                  </TableCell>

                  <TableCell sx={{ width: "10%" }}>
                    <IconButton onClick={() => deleteRow(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box textAlign="left" mb={2} mt={2}>
        <div className="leftfloats">
          <Button variant="contained" className="addrowbtns lfroats" onClick={addRow}>
            Add
          </Button>
        </div>
        <div className="leftfloats lfroats">
          <Button variant="contained" onClick={handleOpen} className="Generatebtn" sx={{ float: 'left' }}
            disabled={isButtonDisabled}
          >
            Generate Data
          </Button>
          <ModelPortfolioPopup open={open} modalWidth={modalWidth} handleOpen={handleOpen} setOpen={setOpen} data={generateData} getFundData = {getFundData}  />
        </div>
      </Box>
    </Box>
  );
};

export default AttributefilterationSection;
