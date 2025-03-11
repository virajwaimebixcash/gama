import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,TablePagination  } from "@mui/material";
import api from "../APIs/interceptor";

const OrderList = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  useEffect(() => {
    
      api.get("/mutualFundOrder/getAllOrders") 
      .then((response) => {        
        setRows(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      // Handle rows per page change
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
      };

      const transactionTypeMapping = {
        1: "Lumpsum",
        2: "SIP",
        3: "Redemption",
        6: "Fund Switch",
        8: "SWP",
        5: "STP"
      };

  return (
   
    <Box sx={{ padding: 2 }}>
    <Grid container spacing={2}>
      <Grid xs={12}>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Order ID</strong></TableCell>
                <TableCell><strong>Client Code</strong></TableCell>
                <TableCell><strong>Script Name</strong></TableCell>
                <TableCell><strong>Script Code</strong></TableCell>
                {/* <TableCell><strong>Order By</strong></TableCell> */}
                <TableCell><strong>Order Date</strong></TableCell>
                <TableCell><strong>Folio</strong></TableCell>
                <TableCell><strong>Transaction Amount</strong></TableCell>
                <TableCell><strong>Transaction Type</strong></TableCell>
                <TableCell><strong>Start Date</strong></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.orderId}</TableCell>
                  <TableCell>{row.clientCode}</TableCell>
                  <TableCell>{row.scriptName}</TableCell>
                  <TableCell>{row.scriptCode}</TableCell>
                  {/* <TableCell>{row.orderBy}</TableCell> */}
                  <TableCell>{row.valueDate || "NA"}</TableCell>
                  <TableCell>{row.folio}</TableCell>
                  <TableCell>{row.txnAmountUnit}</TableCell>
                  <TableCell> {transactionTypeMapping[row.transactionType] || "N/A"}</TableCell>
                  <TableCell>{row.startDate || "NA"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
    
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            "& .MuiTablePagination-select": {
              marginRight: "16px", // Add margin to avoid overlapping
            },
          }}
        />
      </Grid>
    </Grid>
  </Box>
  );
};

export default OrderList;
