import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const MyInputTypeTable = ({
  multilanguage,
  rows = [{ rowId: "" }],
  columns = [{ field: "", headerName: "" }],
  componentType,
  buttonAction,
  ActionType,
  iconAction,
  renderInputField = () => { },
  tableName,
  tableLabel,
}) => {
  return (
    <>
    <h2 style={{textTransform:'capitalize'}}>{tableLabel.split('_')[0]}</h2>
    <TableContainer component={componentType}>
      
      <Table>
        <TableHead>
          <TableRow>
            {columns?.map(column => (
              <TableCell key={column.dispatchername}>{multilanguage(column.label)}</TableCell>
            ))}
            <TableCell>{ActionType}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            row?.rowId && <TableRow key={row?.rowId}>
              {columns?.map((column) => (
                <TableCell key={column.dispatchername}>
                  {renderInputField(row, column, index)}
                </TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => iconAction(row?.rowId, tableName)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={() => buttonAction(tableName)} startIcon={<Add />}>
        Add Row
      </Button>
    </TableContainer>
    </>
  );
};

export default MyInputTypeTable;