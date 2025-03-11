import { useEffect, useRef, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, IconButton, Checkbox,
  TableFooter,
  Select,
  MenuItem
} from "@mui/material";
import SwitchforModel from './SwitchforModel';
import closewhite from '../../images/closewhite.png';
import { TextField, } from "@mui/material";
import api from "../../APIs/interceptor";
import { useFormContext, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Edit } from "@mui/icons-material";

const L2Allocation = ({ tab }) => {
  const { setError, clearErrors, watch, setValue, control, getValues } = useFormContext();
  const getChildModelPortfolioDetails = useSelector((state) => state.getChildModelPortfolioDetails.data.data)
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get("edit");
  const [attributeFilterationData, setAttributeFilterationData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [selectedSecondValue, setSelectedSecondValue] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [equalWeight, setEqualWeight] = useState(false);
  const isL2Checked = watch(`${tab.productClass}.l2AllocationChecked`, false);
  const l2AllocationData = watch(`${tab.productClass}.l2Allocation`);
  const tabData = watch(tab.productClass, {});
  const lastCustomAllocations = useRef({});
  const [errors, setErrors] = useState({});

  const l1AllocationChecked = watch(`${tab.productClass}.l1AllocationChecked`, false);
  const allocationPer = parseFloat(watch(`${tab.productClass}.l1Allocation.allocationPer`, 100));
  const displayTotalValue = isNaN(allocationPer) ? "100%" : `${allocationPer}%`;

  const [rows, setRows] = useState([
    { id: 0, firstValue: "", secondValue: "", l2Allocation: "", tolerance: "", selectedAttribute: null },
  ]);

  const distributeEqualWeight = (newRowCount) => {
    if (newRowCount > 0) {
      // const weight = (100 / newRowCount).toFixed(2);  //previous cal on fixed 100%
      const totalAllocation = l1AllocationChecked ? allocationPer : 100;
      const weight = (totalAllocation / newRowCount).toFixed(2);
      setRows((prevRows) =>
        prevRows.map((row) => ({
          ...row,
          l2Allocation: weight,
        }))
      );
      validateTotalAllocation(); // Validate total allocation after distributing
    }
  };

  // Handle mode change (Equal / Custom)
  const handleModeChange = (isEqualWeight) => {
    setEqualWeight(isEqualWeight);

    setValue("weightageType", isEqualWeight ? 1 : 2);

    if (isEqualWeight) {
      lastCustomAllocations.current = rows.reduce((acc, row, index) => {
        acc[index] = row.l2Allocation;
        return acc;
      }, {});

      distributeEqualWeight(rows.length);
      clearErrors("childMapping");
    } else {
      // Restore last custom allocations
      setRows((prevRows) =>
        prevRows.map((row, index) => ({
          ...row,
          l2Allocation: lastCustomAllocations.current[index] || "",
        }))
      );
    }
  };

  const validateTotalAllocation = (updatedRows = rows) => {
    const totalAllocation = l1AllocationChecked ? allocationPer : 100; // Max allocation if l1 is unchecked
    const total = updatedRows.reduce((sum, row) => sum + (parseFloat(row.l2Allocation) || 0), 0);

    let newErrors = { ...errors };

    if (l1AllocationChecked) {
      // If l1 is checked, enforce strict match
      if (total !== totalAllocation) {
        newErrors.rows = `Total allocation must be exactly ${totalAllocation}%`;
      } else {
        delete newErrors.rows;
      }
    } else {
      // If l1 is unchecked, total can be at most 100%
      if (total > 100) {
        newErrors.rows = "Total allocation cannot exceed 100%";
      } else {
        delete newErrors.rows;
      }
    }

    setErrors(newErrors);
    return newErrors;
  };


  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setValue(`${tab.productClass}.l2AllocationChecked`, checked);
    setValue(`selectedSecurities`, []);
  };

  useEffect(() => {
    if (watch('Fund.l2Allocation.rows') && isEdit) {
      setRows(watch('Fund.l2Allocation.rows') || []);
      setSelectedValue(watch('Fund.l2Allocation.groupId'));
      if (watch('Fund.l2Allocation.groupId')) fetchSecondDropdownData(watch('Fund.l2Allocation.groupId'))
      setEqualWeight(watch('Fund.l2Allocation.weightageType'))
     ;
    }
  }, [getChildModelPortfolioDetails, isEdit]);
  const addRow = () => {
    setRows((prevRows) => {
      const newRowCount = prevRows.length + 1;

      const newRow = {
        id: prevRows.length > 0 ? prevRows[prevRows.length - 1].id + 1 : 0,
        firstValue: "",
        secondValue: "",
        l2Allocation: "", // Default allocation, updated below if needed
        tolerance: "",
        selectedAttribute: null,
      };

      const newRows = [...prevRows, newRow];

      validateTotalAllocation(newRows);

      // If equalWeight is enabled, update all rows' weights
      if (equalWeight) {
        return newRows.map(row => ({
          ...row,
          // l2Allocation: (100 / newRowCount).toFixed(2),
          l2Allocation: (l1AllocationChecked ? allocationPer / newRowCount : 100 / newRowCount).toFixed(2),

        }));
      }

      return newRows;
    });
  };

  const removeRow = () => {
    setRows((prevRows) => {
      if (prevRows.length > 1) {
        const newRowCount = prevRows.length - 1;
        const newRows = prevRows.slice(0, -1); // Remove last row

        validateTotalAllocation(newRows);

        // If equalWeight is enabled, update remaining rows' weights
        if (equalWeight) {
          return newRows.map(row => ({
            ...row,
            // l2Allocation: newRowCount === 1 ? "100" : (100 / newRowCount).toFixed(2),
            // l2Allocation: newRowCount === 1 ? allocationPer.toString() : (l1AllocationChecked ? allocationPer : 100 / newRowCount).toFixed(2),
            l2Allocation: newRowCount === 1 ? allocationPer : (l1AllocationChecked ? allocationPer : 100 / newRowCount).toFixed(2),

          }));
        }

        return newRows;
      }

      return prevRows;
    });
  };

  const handleInputChange = (id, field, value) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      );

      let newErrors = {};

      updatedRows.forEach((row, index) => {
        let firstVal = parseFloat(row.firstValue) || 0;
        let secondVal = parseFloat(row.secondValue) || 0;

        // First row validation
        if (index === 0) {
          if (firstVal <= secondVal) {
            newErrors[row.id] = {
              firstValue: "Value 1 must be greater than Value 2",
              secondValue: "Value 2 must be less than Value 1",
            };
          }
        }

        // Subsequent rows validation
        if (index > 0) {
          let prevRow = updatedRows[index - 1];
          let prevSecondVal = parseFloat(prevRow.secondValue) || 0;

          if (firstVal >= prevSecondVal) {
            newErrors[row.id] = {
              ...newErrors[row.id],
              firstValue: "Value 1 must be less than the previous row's Value 2",
            };
          }

          if (firstVal <= secondVal) {
            newErrors[row.id] = {
              ...newErrors[row.id],
              firstValue: "Value 1 must be greater than Value 2",
              secondValue: "Value 2 must be less than Value 1",
            };
          }
        }
      });

      if (!equalWeight) {
        validateTotalAllocation(updatedRows);
      }

      setErrors(newErrors);
      return updatedRows;
    });
  };

  const getAttributeFilterationDropdownData = () => {
    const payload = { productClassId: 2 };

    api.post(`/ModelPortfolio/getPortfolioDataByProductClassId`, payload)
      .then((res) => {
        setAttributeFilterationData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching first dropdown data:", error);
      });
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    setSecondDropdownOptions([]); // Reset second dropdown options
    setSelectedSecondValue(""); // Reset second dropdown selected value
    setSelectedAttribute(null);

    fetchSecondDropdownData(newValue); // Fetch new options

    // Reset rows to only one row
    setRows([
      {
        id: 0,
        firstValue: "",
        secondValue: "",
        l2Allocation: "",
        tolerance: "",
        selectedAttribute: null,
      },
    ]);
  };
  // Reset rows to the initial state (one empty row)
  const resetRows = () => {
    setRows([{ id: 0, firstValue: "", secondValue: "", l2Allocation: "", tolerance: "", selectedAttribute: null }]);
  };


  const fetchSecondDropdownData = (groupId) => {
    const payload = { groupId };

    api
      .post(`/modelPortfolioConfigurator/getModelPortfolioGroupAttributeConfig`, payload)
      .then((res) => {
        if(isEdit){
          const attribute = res.data.data.find(
            (option) => option.mpGroupAttributeDetailId === watch('Fund.l2Allocation.mpGroupAttributeDetailId')
          );
          setSelectedAttribute(attribute);
          setSecondDropdownOptions(res.data.data);
          setSelectedSecondValue(watch('Fund.l2Allocation.mpGroupAttributeDetailId'));
          setValue(`${tab.productClass}.l2Allocation`, {
            rows:watch('Fund.l2Allocation.rows'),
            selectedValue:groupId,
            selectedSecondValue:watch('Fund.l2Allocation.mpGroupAttributeDetailId'),
            ...attribute,
            weightageType: watch('Fund.l2Allocation.weightageType')
          })
          return
        }
        setSecondDropdownOptions(res.data.data);
        setSelectedSecondValue("");
        setSelectedAttribute(null);
        resetRows(); // Reset rows when second dropdown options change
      })
      .catch((error) => {
        console.error("Error fetching second dropdown data:", error);
      });
  };

  const handleSecondDropdownChange = (event) => {
    const selectedId = event.target.value;
    setSelectedSecondValue(selectedId);

    // Find selected attribute details---->
    const attribute = secondDropdownOptions.find(
      (option) => option.mpGroupAttributeDetailId === selectedId
    );
    setSelectedAttribute(attribute);
    resetRows();
  };

  useEffect(() => {
    getAttributeFilterationDropdownData();
  }, []);

  const handleSave = () => {
    const saveErrors = validateTotalAllocation();

    if (errors.rows || !isL2Checked || saveErrors?.rows) {
      console.error("Save disabled: Ensure total allocation is 100% and L2 Allocation is checked.");
      return;
    }

    setValue(`${tab.productClass}.l2Allocation`, {
      rows,
      selectedValue,
      selectedSecondValue,
      ...selectedAttribute,
      weightageType: equalWeight ? 1 : 2
    });
  };

  useEffect(() => {
    if (!l1AllocationChecked &&!isEdit) {
      resetRows();
      setSelectedValue("");
      setSelectedSecondValue("");
      setValue(`selectedSecurities`, []);
      // setValue(`${tab.productClass}.l2AllocationChecked`, false);
      // setValue(`${tab.productClass}.l2Allocation`, {});
    }
  }, [l1AllocationChecked]);

  return (
    <div style={{ margin: "auto" }} className="forallspacecss">
      {/* Table */}
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table className="modeltabelcss">
          <TableHead>
            <TableRow>
              <TableCell colSpan={10}>
                <Controller
                  // name="l1AllocationChecked"
                  name={`${tab.productClass}.l2AllocationChecked`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field.value} onChange={handleCheckboxChange} />
                  )}
                />
                <span>L2 Allocation</span>
              </TableCell>
            </TableRow>
            {l1AllocationChecked && (
              <TableRow className="tabheadersgry">
                <TableCell colSpan={2} />
                <TableCell>
                  <div className="tgswitch">
                    <SwitchforModel  onModeChange={handleModeChange} value={equalWeight ? 1 : 2} />
                  </div>
                </TableCell>
                <TableCell />
              </TableRow>
            )}
            <TableRow>
              <TableCell>
                <Select
                  value={selectedValue}
                  onChange={handleChange}
                  size="small"
                  sx={{ width: "100%" }}
                  className="mainL2selectdropdown"
                  displayEmpty
                >
                  <MenuItem value="" disabled>Select a Group</MenuItem>
                  {attributeFilterationData.map((option) => (
                    <MenuItem key={option.modelPortfolioGroupId} value={option.modelPortfolioGroupId}>
                      {option.groupName}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={selectedSecondValue}
                  onChange={handleSecondDropdownChange}
                  size="small"
                  sx={{ width: "100%" }}
                  className="mainL2selectdropdown"
                  displayEmpty
                  disabled={secondDropdownOptions.length === 0 || !selectedValue}
                >
                  <MenuItem value="" disabled>
                    Select an Attribute
                  </MenuItem>
                  {secondDropdownOptions.filter(option => option.isHide !== "Y").map((option) => (
                    <MenuItem key={option.mpGroupAttributeDetailId} value={option.mpGroupAttributeDetailId}>
                      {option.displayName}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell className="tabheadersgry">
                <div className="l2labels">Allocation</div>
              </TableCell>
              <TableCell className="tabheadersgry">
                <div className="l2labels">Tollerance(+/-)</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell></TableCell>
                <TableCell className="extbottomgray">
                  {selectedAttribute?.controlDataTypeName === "ArithmeticOperatorSearch" ? (
                    <>
                      <TextField
                        size="small"
                        className='tabelsinsadd newposcss'
                        value={row.firstValue}
                        id="outlined-size-small"
                        placeholder=''
                        onChange={(e) => handleInputChange(row.id, "firstValue", e.target.value)}
                        error={errors[row.id]?.firstValue ? true : false}
                        helperText={errors[row.id]?.firstValue || ""}
                        sx={{ marginRight: "10px" }}
                      />
                      <TextField
                        size="small"
                        value={row.secondValue}
                        className='tabelsinsadd marleftin'
                        id="outlined-size-small"
                        placeholder=''
                        onChange={(e) => handleInputChange(row.id, "secondValue", e.target.value)}
                        error={errors[row.id]?.firstValue ? true : false}
                        helperText={errors[row.id]?.firstValue || ""}

                      />
                    </>
                  ) : selectedAttribute?.controlDataTypeName === "Dropdown" ? (
                    <Select
                      value={row.firstValue}
                      onChange={(e) => handleInputChange(row.id, "firstValue", e.target.value)}
                      size="small"
                      sx={{ width: "100%" }}
                    >
                      <MenuItem value="" disabled>
                        Select an Option
                      </MenuItem>
                      {/* Replace below options with real API response */}
                      <MenuItem value="Option1">Option 1</MenuItem>
                      <MenuItem value="Option2">Option 2</MenuItem>
                    </Select>
                  ) : null}
                </TableCell>
                <TableCell className="extbottomgray">
                  <TextField
                    size="small"
                    value={row.l2Allocation}
                    id="outlined-size-small"
                    className='tabelsinsaddsingle clswithzeroleft'
                    onChange={(e) => handleInputChange(row.id, "l2Allocation", e.target.value)}
                    error={parseFloat(row.l2Allocation) < 0 || parseFloat(row.l2Allocation) > 100}
                    helperText={parseFloat(row.l2Allocation) < 0 || parseFloat(row.l2Allocation) > 100 ? "Invalid weight" : ""}
                  />
                </TableCell>
                <TableCell className="extbottomgray">
                  <TextField
                    size="small"
                    value={row.tolerance}
                    id="outlined-size-small"
                    className='slectmaindd '
                    onChange={(e) => handleInputChange(row.id, "tolerance", e.target.value)}
                  />
                  <br />
                  <IconButton onClick={() => removeRow(row.id)} color="error" className="closico">
                    <img src={closewhite} />
                  </IconButton>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="extzeroallside" />
              <TableCell className="threebords extzeroallside">
                <Button variant="contained" className="addrowbtns" onClick={addRow}>
                  Add
                </Button>
                {/* <Button variant="contained" className="Generatebtn" onClick={handleSave}
                  disabled={!isL2Checked}
                >
                  Save
                </Button> */}
                <Button
                  variant="contained"
                  className="Generatebtn"
                  onClick={handleSave}
                  disabled={!!errors.rows || !isL2Checked} // Save is disabled unless total is 100% and checkbox is checked
                >
                  Save
                </Button>
              </TableCell>
              <TableCell className="borsrights extzeroallside">
                <TextField
                  disabled
                  label=""
                  id="outlined-size-small"
                  placeholder=''
                  size="small"
                  className='slectmaindd disgray'
                  // defaultValue="100%"
                  value={displayTotalValue}
                  error={errors?.rows ? true : false}
                  helperText={errors?.rows || ""}
                />
              </TableCell>
              <TableCell className="borsleft extzeroallside" />
            </TableRow>

          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default L2Allocation