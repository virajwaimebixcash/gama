import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, Typography,
  Button
} from "@mui/material";
import Sorting from '../ModelPortfolio/Sorting';
import { TextField, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators } from '../../redux/actions/actionCreators';
// import Sorting from "../../Common/CustomComponents/Sorting";

const DetailPageGridSection = ({ gridconfigdDetail, gridData }) => {
const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [editApprovedValue, setEditApprovedValue] = useState({});
  const [sortingState,setSortingState] = useState();
  console.log(gridconfigdDetail);
  console.log(gridData, ">>>>>>>>>");




  // const handleSort = (columnFieldName, sortOrder) => {
  //   if (!sortOrder) {
  //     // If no sortOrder, reset the sortingState
  //     setSortingState(null);
  //   } else {
  //     // Update the sorting state with the current column and order
  //     setSortingState({ sortingField: columnFieldName, sortingOrder: sortOrder.toUpperCase() });
  //   }
  // };


  useEffect(() => {
    // Initialize editable values with approvedValue from gridData
    const initialValues = {};
    gridData?.forEach((row, index) => {
      initialValues[index] = row.approvedValue || "";
    });
    setEditApprovedValue(initialValues);
  }, [gridData]);


  // Handle select all checkboxes
  const handleSelectAll = (event) => {
    setSelected(event.target.checked ? gridData.map((_, index) => index) : []);
  };

  // Handle individual row selection
  const handleSelectRow = (index) => {
    setSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((rowIndex) => rowIndex !== index)
        : [...prevSelected, index]
    );
  };

  // Handle editing approvedValue
  const handleApprovedValueChange = (index, value) => {
    setEditApprovedValue((prev) => ({ ...prev, [index]: value }));
  };

 // Handle save button click
 const handleSaveRebalanceDetail = () => {
  const selectedRows = gridData
    .filter((_, index) => selected.includes(index))
    .map((row, index) => ({
      ...row,
      approvedValue: editApprovedValue[index] // Include edited approvedValue
    }));

  // dispatch.actionCreators.CreateRebalanceDetailData((selectedRows));
  dispatch(actionCreators.CreateRebalanceDetailData(selectedRows));
  console.log("Selected Rows Data:", selectedRows);
  navigate(-1);

};

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
            {gridconfigdDetail
              ?.sort((a, b) => a.sequence - b.sequence)
              ?.map((column) => (
                <TableCell key={column.portfolioRebalanceFieldId}>
                  <div className="fon13nrlnew lefttxt foric">
                    <span className="pullleft fivepadss">{column.displayName}</span>
                    {column.isSortingEnable === "Y" && (
                      <span className="pullleft forsvgico">
                        <Sorting />
                        {/* <Sorting
                        column={column}
                        isActive={sortingState?.sortingField === column.dispatcherName}
                        currentOrder={sortingState?.sortingField === column.dispatcherName ? sortingState.sortingOrder.toLowerCase() : null}
                        onSort={(newSortOrder) => handleSort(column.dispatcherName, newSortOrder)}
                      /> */}
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
              {gridconfigdDetail
                ?.sort((a, b) => a.sequence - b.sequence)
                ?.map((column) => (
                  <TableCell key={`${column.portfolioRebalanceFieldId}-${index}`}>
                    {column.dispatcherName === "approvedValue" ? (
                      <TextField
                        value={editApprovedValue[index] || ""}
                        onChange={(e) => handleApprovedValueChange(index, e.target.value)}
                        size="small"
                        sx={{ width: "80px" }}
                      />
                    ) : (
                      row[column.dispatcherName] ?? "--"
                    )}
                  </TableCell>
                ))}
            </TableRow>
          ))}

          {/* Save Button Row */}
          <TableRow>
            <TableCell colSpan={gridconfigdDetail?.length + 1}>
              <Button
                variant="contained"
                className="Generatebtn"
                sx={{ float: "left", m: 1 }}
                onClick={handleSaveRebalanceDetail}
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



