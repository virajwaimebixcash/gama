import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, Typography,
  Button
} from "@mui/material";
// import Sorting from '../ModelPortfolio/Sorting';
import { TextField, } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators } from '../../redux/actions/actionCreators';
import Sorting from "../../Common/CustomComponents/Sorting";

const DetailPageGridSection = ({ gridconfigdDetail, gridData, sortingState, setSortingState, calculatedValues }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [editApprovedValue, setEditApprovedValue] = useState({});
  const location = useLocation();
  const selectedModelData = location.state?.rebalancingUpperData?.displayedValues;
  const selectedSummaryPageRowData = location.state?.selectedRow;
  const viewType = selectedModelData?.viewType
  const selectedViewType = selectedModelData?.viewType
// console.log(selectedViewType,"selectedViewType");
//  console.log(gridconfigdDetail,"gridconfigdDetail");
 

  const handleSort = (columnFieldName, sortOrder) => {
    if (!sortOrder) {
      // If no sortOrder, reset the sortingState
      setSortingState(null);
    } else {
      // Update the sorting state with the current column and order
      setSortingState({ sortingField: columnFieldName, sortingOrder: sortOrder.toUpperCase() });
    }
  };

  useEffect(() => {
    // Initialize editable values with approvedValue from gridData
    const initialValues = {};
    const initiallySelected = [];

    gridData?.forEach((row, index) => {
      initialValues[index] = row.approvedValue || "";
      if (row.approvedValue) {
        initiallySelected.push(index);
      }
    });

    setEditApprovedValue(initialValues);
    setSelected(initiallySelected); // Set initially selected rows
  }, [gridData]);

  // Apply calculatedValues only to selected rows
  useEffect(() => {
    setEditApprovedValue((prevValues) => {
      const updatedValues = { ...prevValues };

      selected?.forEach((index) => {
        if (calculatedValues[index] !== undefined) {
          updatedValues[index] = calculatedValues[index]?.approvedValue ?? "";
        }
      });

      return updatedValues;
    });
    // console.log("Updated editApprovedValue after calculation:", editApprovedValue);
    // console.log("Selected rows remain checked:", selected);
  }, [calculatedValues, selected]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(gridData.map((_, index) => index));
      setEditApprovedValue((prev) => {
        const updatedValues = { ...prev };
        gridData.forEach((row, index) => {
          if (row.approvedValue === "") {
            updatedValues[index] = row.balanceValue;
          }
        });
        return updatedValues;
      });
    } else {
      setSelected([]);
    }
  };

  const handleSelectRow = (index) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(index)) {
        setEditApprovedValue((prev) => ({
          ...prev,
          [index]: gridData[index]?.approvedValue || "",
        }));
        return prevSelected.filter((rowIndex) => rowIndex !== index);
      } else {
        setEditApprovedValue((prev) => ({
          ...prev,
          [index]: gridData[index]?.approvedValue || gridData[index]?.balanceValue || "",
        }));
        return [...prevSelected, index];
      }
    });
    // console.log(`Row ${index} selection toggled. Current selected rows:`, selected);
  };

  // Handle Editing Approved Value
  const handleApprovedValueChange = (index, value) => {
    // console.log(`Editing row ${index}:`, value);
    setEditApprovedValue((prev) => ({ ...prev, [index]: value }));
  };

  // Handle save button click
  const handleSaveRebalanceDetail = () => {
    const selectedRows = gridData
      .filter((_, index) => selected.includes(index))
      .map((row, index) => ({
        ...row,
        approvedValue: editApprovedValue[index]
      }));

    const totalApprovedValue = selectedRows.reduce((sum, row) => sum + parseFloat(row.approvedValue || 0), 0);
   const viewType = selectedModelData?.viewType
    const payload = {
      // data: {
        rowsData: selectedRows,
        totalValue: totalApprovedValue.toString(),
        ...(viewType === 2
          ? { securityName: selectedSummaryPageRowData.portfolioAccName }
          : { portfolioAccName: selectedSummaryPageRowData.securityName })
      // }
    };
    
  
    // console.log("Payload to be saved:", payload);

    dispatch(actionCreators.CreateRebalanceDetailData(payload));
    navigate(-1);
  };

  // const filteredGridConfig = gridconfigdDetail?.filter(
  //   (column) => !(viewType === viewType && column.fieldName === "securityName")
  // );
  
  const filteredGridConfig = gridconfigdDetail?.filter(item => item.viewType == selectedViewType);
  // console.log("Filtered gridconfigdDetail:", filteredGridConfig);
  return (
    <TableContainer component={Paper} className="chboxsvg basefortabels1" sx={{ maxWidth: "100%", overflowX: "auto", p: 0, boxShadow: 0 }}>
      <Table className="scrolltabwith">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selected?.length === gridData?.length && gridData?.length > 0}
                // indeterminate={selected?.length > 0 && selected?.length < gridData?.length}
                indeterminate={false}
                onChange={handleSelectAll}
              />
            </TableCell>
            
            {filteredGridConfig
              ?.sort((a, b) => a.sequence - b.sequence)
              ?.map((column) => (
                <TableCell key={column.portfolioRebalanceFieldId}>
                  <div className="fon13nrlnew lefttxt foric">
                    <span className="pullleft fivepadss">{column.displayName}</span>
                    {column.isSortingEnable === "Y" && (
                      <span className="pullleft forsvgico">
                        {/* <Sorting /> */}
                        <Sorting
                          column={column}
                          isActive={sortingState?.sortingField === column.fieldName}
                          currentOrder={sortingState?.sortingField === column.fieldName ? sortingState.sortingOrder.toLowerCase() : null}
                          onSort={(newSortOrder) => handleSort(column.fieldName, newSortOrder)}
                        />
                      </span>
                    )}
                  </div>
                </TableCell>
              ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gridData?.map((row, index) => (
            <TableRow key={index} selected={selected.includes(index)}>
              {/* Checkbox for Row Selection */}
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.includes(index)}
                  onChange={() => handleSelectRow(index)}
                />
              </TableCell>

              {/* Dynamically Mapping Row Data Based on dispatcherName */}
              {filteredGridConfig
                ?.sort((a, b) => a.sequence - b.sequence)
                ?.map((column) => (
                  <TableCell key={`${column.portfolioRebalanceFieldId}-${index}`}>
                    {column.fieldName === "approvedValue" ? (
                      <TextField
                        // value={calculatedValues[index]?.approvedValue || ""}
                        value={editApprovedValue[index] || ""}
                        onChange={(e) => handleApprovedValueChange(index, e.target.value)}
                        size="small"
                        sx={{ width: "80px" }}
                          disabled={!selected.includes(index)}
                      />
                    ) : (
                      row[column.fieldName] ?? "--"
                    )}
                  </TableCell>
                ))}
            </TableRow>
          ))}

          {/* Save Button Row */}
          <TableRow >
            <TableCell colSpan={11}></TableCell>
            <TableCell
              // colSpan={gridconfigdDetail?.length + 1}
            >
              <Button
                variant="contained"
                className="Generatebtn"
                sx={{ float: "left", m: 1 }}
                onClick={handleSaveRebalanceDetail}
                disabled={selected?.length === 0} 
              >
                Save
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DetailPageGridSection;



