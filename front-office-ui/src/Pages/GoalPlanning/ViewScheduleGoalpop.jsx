import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ViewScheduleGoalpop = () => {
  // Static data
  const rows = [
    { id: 1, name: "Alice", age: 25, city: "New York" },
    { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
    { id: 3, name: "Charlie", age: 22, city: "Chicago" },
    { id: 4, name: "David", age: 28, city: "Houston" },
  ];

  return (
    <TableContainer component={Paper} elevation={0} className="forintables1">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ROI </TableCell>
            <TableCell>Inflation Adjusted Value </TableCell>
            <TableCell>Monthly</TableCell>
            <TableCell>Lumpsum</TableCell>
            <TableCell>Flexible</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>3 Years</TableCell>
              <TableCell>₹ 2,97,754.00</TableCell>
              <TableCell>₹ 7,531.82</TableCell>
              <TableCell>₹ 2,48,816.62</TableCell>
              <TableCell>₹ 4,504.77</TableCell>
            </TableRow>   
            <TableRow>
              <TableCell>+ 3 Months</TableCell>
              <TableCell>₹ 3,03,680.16</TableCell>
              <TableCell>₹ 7,036.34</TableCell>
              <TableCell>₹ 2,50,000.00</TableCell>
              <TableCell>₹ 7,036.34</TableCell>
            </TableRow> 
            <TableRow>
              <TableCell>+ 6 Months</TableCell>
              <TableCell>₹ 3,08,258.17</TableCell>
              <TableCell>₹ 6,581.15</TableCell>
              <TableCell>₹ 2,50,000.00</TableCell>
              <TableCell>₹ 6,581.15</TableCell>
            </TableRow>   
            <TableRow>
              <TableCell>+ 9 Months</TableCell>
              <TableCell>₹ 3,12,905.21</TableCell>
              <TableCell>₹ 6,186.86</TableCell>
              <TableCell>₹ 2,50,000.00</TableCell>
              <TableCell>₹ 6,186.86</TableCell>
            </TableRow>   
            <TableRow>
              <TableCell>+ 12 Months</TableCell>
              <TableCell>₹ 3,17,622.29</TableCell>
              <TableCell>₹ 5,842.05</TableCell>
              <TableCell>₹ 2,50,000.00</TableCell>
              <TableCell>₹ 5,842.05</TableCell>
            </TableRow>
            <TableRow className="bldfnwig">
              <TableCell>Total </TableCell>
              <TableCell>₹ 15,40,219.83 </TableCell>
              <TableCell>₹ 33,178.21</TableCell>
              <TableCell>₹ 12,48,816.62</TableCell>
              <TableCell>₹ 30,151.16</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewScheduleGoalpop;
