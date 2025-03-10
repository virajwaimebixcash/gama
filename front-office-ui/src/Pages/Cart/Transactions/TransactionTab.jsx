import { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2'
import Sorting from '../../../Common/CustomComponents/Sorting';
import PersonalDetails from './PersonalDetails';
import Pagination from '../../../Common/CustomComponents/Pagination';
import FilterComponent from '../../../Common/CustomComponents/FilterComponent';

const activeColour = {
  "SIP": "activebtns",
  "Purchase": "activebtns",
  "Redemption": "activebtnred",
  "Switch": "activebtnred",
  "STP": "activebtnred",
  "SWP": "activebtnred"
}

export default function TransactionTab({
  tableConfig,
  tableData,
  filterValues,
  setFilterValues,
  getTransactions,
  sortingState,
  setSortingState,
  transactionTotalData,
  transactionPaginationState,
  setTransactionPaginationState,
  defaultTransactionPageSize
}) {
  const [open, setOpen] = useState(false);
  const [hiddenDynamicColumns, setHiddenDynamicColumns] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleSort = (columnFieldName, sortOrder) => {
    if (!sortOrder) {
      // If no sortOrder, reset the sortingState
      setSortingState(null);
    } else {
      // Update the sorting state with the current column and order
      setSortingState({ sortingField: columnFieldName, sortingOrder: sortOrder.toUpperCase() });
    }
  };

  const handlePagination = (pageNum, pageSize) => {
    setTransactionPaginationState({ pageNum, pageSize });
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fixedColumns = import.meta.env.VITE_TRANSACTION_FIXED_COLUMNS?.split(",") || [];

  const columns = useMemo(() => {
    const scriptNameColumn = tableConfig.find((column) => column.fieldName === "scriptName") || {};

    const fixedColumn = {
      ...scriptNameColumn,
      Cell: ({ row }) => {
        const transactionType = row.transactionType

        return (
          <Grid container spacing={2} className='newpaddintabs'>
            <Grid size={{ xs: 10 }}>
              {row.scriptName && (
                <div className='mr12 bigintabel1'>
                  <span>{row.scriptName}</span>
                </div>
              )}

              {(row.transactionType || row.txnAmountUnit || row.unit) && (
                <div className='bottommargins'>
                  {row.transactionType && (
                    <span className={activeColour[transactionType]}>
                      {transactionType}:{" "}
                      <span>{row.txnAmountUnit}</span>
                    </span>
                  )}
                  {(row.unit !== null || row.unit !== undefined) && (
                    <span className='padmeleftheader fon13nrl'>
                      <span className='fntgrcols'>Units: <span>{row.unit}</span></span>
                    </span>
                  )}
                </div>
              )}
            </Grid>

            <Grid size={{ xs: 2 }}>
              {row.status && (
                <div className='mr11'>
                  <span className='bigintabel1'>{row.status}</span>
                </div>
              )}

              {row.dividendOption && (
                <div>
                  <span className='bigintabel1'>{row.dividendOption}</span>
                </div>
              )}
            </Grid>
          </Grid>
        )
      },
    };


    const dynamicColumns = tableConfig
      .filter((column) => !fixedColumns.includes(column.fieldName))
      .map((column) => ({
        ...column,
        Cell: ({ value }) => <span className='bigintabel1'>{value || "N/A"}</span>,
      }));

    const visibleDynamicColumns = dynamicColumns.slice(0, 5);
    const remainingColumns = dynamicColumns.slice(5);

    if (hiddenDynamicColumns.length !== remainingColumns.length) {
      setHiddenDynamicColumns(remainingColumns);
    }

    if (remainingColumns.length > 0) {
      visibleDynamicColumns.push({
        fieldName: "viewDetails",
        displayHeader: "",
        Cell: ({ row }) => (
          <div className="linktxtnewview advacncebtnzero" onClick={() => {
            setSelectedRow(row);
            handleOpen();
          }}>
            View Details +
          </div>
        ),
      });
    }
    return [fixedColumn, ...visibleDynamicColumns];
  }, [tableConfig, fixedColumns, hiddenDynamicColumns, handleOpen]);
  
  return (
    <Box sx={{ flexGrow: 0 }} >
      <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ marginBottom: '16px' }}>
        {/* Transaction Info */}
        <Grid size={{ xs: 12, sm: 12, md: 8, lg: 10 }} >
          <div className="fon13nrlnew fon13nrl texleftimp adjusup" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="transactionhead" style={{ fontWeight: 'bold', fontSize: '1.2rem', paddingTop: '15px' }}>
              Transactions -
            </span>
            <span className="frmtdate" style={{ color: '#555' }}>From:</span>
            <span className='fortpdate'>{filterValues?.orderDateFrom}</span>
            <span className="frmtdate" style={{ color: '#555' }}>To Date:</span>
            <span className='fortpdate'>{filterValues?.orderDateTo}</span>
          </div>
        </Grid>

        {/* Filter Component */}
        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 2 }}>
          <div className=" pointercusrs tpsspacegp2" >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <FilterComponent
                tableConfig={tableConfig}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                getData={getTransactions}
                minToDate={true}
                requirePdf={true}
                requireExcel={true}
                requireFilter={true}
                setDefaultDate
              />
            </div>
          </div>
        </Grid>
      </Grid>
      <TableContainer 
        sx={{
          maxHeight: 400,
          overflowY: "auto",
        }} className=''>
        <Table size="small" aria-label="dynamic table" className='cssforborders' stickyHeader>
          <TableHead >
            <TableRow> 
              {columns.map((column, index) => (
                <TableCell key={index}>
                  {column.isSortingEnable === 'Y' ? (
                    <Box className='fntgrcols' sx={{ display: 'flex', alignItems: 'center' }}>
                      {/* {column.displayHeader}
                      <Sorting /> */}
                      <Sorting
                        column={column}
                        isActive={sortingState?.sortingField === column.fieldName}
                        currentOrder={sortingState?.sortingField === column.fieldName ? sortingState.sortingOrder.toLowerCase() : null}
                        onSort={(newSortOrder) => handleSort(column.fieldName, newSortOrder)}
                      />
                    </Box>
                  ) : (
                    <Box className='fntgrcols' sx={{ display: 'flex', alignItems: 'center' }}>
                      {column.displayHeader}
                    </Box>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns?.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {fixedColumns.includes(column.fieldName)
                      ? column.Cell({ row })
                      : column.Cell({ value: row[column.fieldName], row })}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        tableConfig={tableConfig}
        totalData={transactionTotalData}
        handlePagination={handlePagination}
        defaultPageSize = {defaultTransactionPageSize}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            maxHeight: "90vh",
            padding: "24px",
            borderRadius: "12px",
            width: "80%",
          },
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid #ddd",
            paddingBottom: "16px",
            marginBottom: "16px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            View Details
          </Typography>
        </Box>
        <DialogContent
          sx={{
            padding: "0 16px",
            overflowY: "auto",
          }}
        >
          <PersonalDetails config={hiddenDynamicColumns} data={selectedRow} />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-end", paddingTop: "16px" }}>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
