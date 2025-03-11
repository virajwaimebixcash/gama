import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import TransactAction from '../../../Common/CustomComponents/TransactAction';
import Sorting from '../../../Common/CustomComponents/Sorting';
import { useSelector } from 'react-redux';
import AdvanceModSIP from '../../../Common/OrderTypes/SIP/AdvanceModSIP';
import AdvanceModSubscription from '../../../Common/OrderTypes/Subscription/AdvanceModSubscription';
import CustomAlert from '../../../Common/CustomComponents/CustomAlert';
import AdvanceModRedemption from '../../../Common/OrderTypes/Reedemption/AdvModRedemption';
import SWP_Modal from '../../../Common/OrderTypes/SWP/SWP_Modal';
import AdvanceModSTP from '../../../Common/OrderTypes/STP/AdvanceModSTP';
import AdvanceModFundSwitch from '../../../Common/OrderTypes/Fundswitch/AdvanceModFundSwitch';
import Pagination from '../../../Common/CustomComponents/Pagination';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const ExpandableTable = ({ tableConfig, tableData, sortingState, handleSort }) => {
  console.log(tableData, "table>>>>>>>>>>>>>>>");

  const [open, setOpen] = useState({});
  const [hiddenDynamicColumns, setHiddenDynamicColumns] = useState([]);

  const [menuAnchorEl, setMenuAnchorEl] = useState({});
  const [folioOpen, setFolioOpen] = useState({});
  const [folioData, setFolioData] = useState({});
  const [openRowIndex, setOpenRowIndex] = useState(null);

  const [loading, setLoading] = useState({});

  const [modalOpen, setModalOpen] = useState({ name: "", data: "" });
  const [alertOpen, setAlertOpen] = useState({ show: false, msg: '', type: 'success' });
  // ------------------
  const getFolioHeaders = useSelector((state) => state.getHoldingsReportConfiguredDetails?.data?.fieldsAtFolioLevel);
  const getFolioData = useSelector((state) => state.getHoldingDetails?.data?.folioLevel);

  // const toggleFolio = (index) => {
  //   if (openRowIndex === index) {
  //     setOpenRowIndex(null);
  //     return;
  //   }

  //   setOpenRowIndex(index);
  //   setLoading((prev) => ({ ...prev, [index]: true }));

  //   try {
  //     const folioDataForRow = getFolioData || [];

  //     const rows = folioDataForRow.map((data) =>
  //       getFolioHeaders.map((header) => data[header.fieldName] || "N/A")
  //     );

  //     setFolioData((prev) => ({
  //       ...prev,
  //       [index]: {
  //         headers: getFolioHeaders?.map((field) => field.displayHeader) || [],
  //         rows,
  //       },
  //     }));
  //   } catch (error) {
  //     console.error('Error fetching folio data:', error);
  //   } finally {
  //     setLoading((prev) => ({ ...prev, [index]: false }));
  //   }
  // };

  const toggleFolio = (index, schemeName) => {
    if (openRowIndex === index) {
      setOpenRowIndex(null);
      return;
    }

    setOpenRowIndex(index);
    setLoading((prev) => ({ ...prev, [index]: true }));

    try {
      // Filter folio data based on the scheme name of the selected row
      const folioDataForRow = getFolioData?.filter((data) => data.schemeName === schemeName) || [];

      const rows = folioDataForRow.map((data) =>
        getFolioHeaders.map((header) => data[header.fieldName] || "N/A")
      );

      setFolioData((prev) => ({
        ...prev,
        [index]: {
          headers: getFolioHeaders?.map((field) => field.displayHeader) || [],
          rows,
        },
      }));
    } catch (error) {
      console.error('Error fetching folio data:', error);
    } finally {
      setLoading((prev) => ({ ...prev, [index]: false }));
    }
  };

  const fixedColumns = import.meta.env.VITE_HOLDINGS_FIXED_COLUMNS?.split(",") || [];

  const columns = useMemo(() => {
    const scriptNameColumn = tableConfig?.find((column) => column.fieldName === "schemeName") || {};

    const fixedColumn = {
      ...scriptNameColumn,
      Cell: ({ row }) => (
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Item className='shadowstab nobackcol'>
            <div className='fon13bldnew fon13bld blcfon12 texleftimp bigintabel'>{row.schemeName || "N/A"}</div>
            <div className='oneThirdSize'>
              <span className='dataintable'>Current NAV: </span>
              <span className='bigintabel'>{row.latestNav || "N/A"}</span>
            </div>
            <div className='oneThirdSize'>
              <span className='dataintable'>Avg. NAV: </span>
              <span className='bigintabel'>{row.avgNav ? row.avgNav.toFixed(4) : "N/A"}</span>
            </div>
            <div className='oneThirdSize'>
              <span className='dataintable'>Units: </span>
              <span className='bigintabel'>{row.unitAtSchemeLevel || "N/A"}</span>
            </div>
          </Item>
        </Grid>
      ),
    };

    const dynamicColumns = tableConfig
      ?.filter((column) => !fixedColumns.includes(column.fieldName))
      .map((column) => ({
        ...column,
        Cell: ({ value }) => <span className='bigintabel1'>{value || "N/A"}</span>,
      }));
    // ------------------------------------
    const visibleDynamicColumns = dynamicColumns?.slice(0, 5);
    const remainingColumns = dynamicColumns?.slice(5);

    if (hiddenDynamicColumns?.length !== remainingColumns?.length) {
      setHiddenDynamicColumns(remainingColumns);
    }

    // Add Action Column
    const actionColumn = {
      displayHeader: "Action",
      fieldName: "action",
      Cell: ({ row, rowIndex }) => (
        // <TableCell>
        //   <Item className="shadowstab nobackcol">
        //     <TransactAction />
        //     {/* Folio-wise Breakup Link */}
        //     <div
        //       className={`toggle-div ${openRowIndex === rowIndex ? "active" : ""}`}
        //       onClick={() => toggleFolio(rowIndex)}
        //     >
        //       View Folio wise breakup
        //       <span className="icon">{openRowIndex === rowIndex ? "-" : "+"}</span>
        //     </div>
        //   </Item>
        // </TableCell>
        <>
          <Item className='shadowstab nobackcol' >
            <div className='center fullw showinmiddle'>
              <TransactAction
                setAlertOpen={setAlertOpen}
                row={row}
                handleClickOpen={(type) => handleClickOpen(type, row)}
              //  onModalClose={() => setModalOpen({ name: null, data: null })}
              /></div>
            {/* <div className={`toggle-div ${openRowIndex === rowIndex ? 'active' : ''}`} onClick={() => toggleFolio(rowIndex)}>
              View Folio wise breakup
              <span className="icon">{openRowIndex === rowIndex ? '-' : '+'}</span>
            </div> */}
            <div className={`toggle-div ${openRowIndex === rowIndex ? 'active' : ''}`}
              onClick={() => toggleFolio(rowIndex, row.schemeName)}>
              View Folio wise breakup
              <span className="icon">{openRowIndex === rowIndex ? '-' : '+'}</span>
            </div>
          </Item>
        </>
      ),
    };

    return [fixedColumn, ...visibleDynamicColumns, actionColumn];
  }, [tableConfig, fixedColumns, hiddenDynamicColumns, menuAnchorEl, open, folioOpen, openRowIndex, toggleFolio]);

  const handleClickOpen = (modalType, row) => {
    setModalOpen({ name: modalType, data: row });
  };

  const handleCloseAlert = () => {
    setAlertOpen({ show: false, msg: '' });
  };



  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
      <Table size="small" aria-label="dynamic table" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell className='bldtext shadowstab nobackcol' sx={{ textAlign: 'center' }} key={index}>
                {column.isSortingEnable === 'Y' ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                  column.displayHeader
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, rowIndex) => {
            return (
              <>
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <>
                      <TableCell key={colIndex} className='fon13bld blcfon12 centpadds' sx={{ textAlign: 'center' }}>
                        {fixedColumns.includes(column.fieldName)
                          ? column.Cell({ row, rowIndex })
                          : column.Cell({ value: row[column.fieldName] })}
                      </TableCell>
                    </>
                  ))}
                </TableRow>
                {openRowIndex === rowIndex && folioData[rowIndex] && (
                  <TableRow>
                    <TableCell className="padingtble" colSpan={tableConfig?.length}>
                      <Collapse in={openRowIndex === rowIndex} timeout="auto" unmountOnExit>
                        {loading[rowIndex] ? (
                          <Typography>Loading...</Typography>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            <TableContainer component={Paper}>
                              <Table className="grybcks" aria-label="simple table">
                                {/* Header Section */}
                                <Box sx={{ flexGrow: 1 }}>
                                  <Grid container spacing={2} className="fullborbottom">
                                    {folioData[rowIndex]?.headers.map((header, idx) => (
                                      <Grid
                                        key={idx}
                                        size={{ xs: 4, sm: 4, md: 4, lg: 1.65 }}
                                        className="hideincell"
                                      >
                                        <Item className="shadowstab nobackcol whitebgforinner">
                                          <div className="bldtext">{header}</div>
                                        </Item>
                                      </Grid>
                                    ))}
                                  </Grid>
                                </Box>

                                {/* Body Section */}
                                <TableBody>
                                  {folioData[rowIndex]?.rows?.map((row, rowIdx) => (
                                    <TableRow key={rowIdx}>
                                      <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2} className="fullborbottom">
                                          {row.map((cell, cellIdx) => (
                                            <Grid
                                              key={cellIdx}
                                              size={{ xs: 4, sm: 4, md: 4, lg: 1.65 }}
                                              className="hideincell"
                                            >
                                              <Item className="shadowstab nobackcol whitebgforinner">
                                                <div className="showincell">
                                                  {folioData[rowIndex]?.headers[cellIdx]}
                                                </div>
                                                <div className="subintabel">
                                                  {/* {cell} */}
                                                  {typeof cell === "number" && cell.toString().includes(".") && cell.toString().split(".")[1].length > 4
                                                    ? cell.toFixed(4)
                                                    : cell}
                                                </div>
                                              </Item>
                                            </Grid>
                                          ))}
                                        </Grid>
                                      </Box>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Typography>
                        )}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )
          })}
        </TableBody>
      </Table>
      {/* <Pagination
        tableConfig={tableConfig}
      /> */}
      <AdvanceModSIP
        setAlertOpen={setAlertOpen}
        cartList={modalOpen?.data}
        // cartId={list.icid}
        tab={'holding'}
        open={modalOpen?.name === 'SIP'}
        setOpen={() => setModalOpen({ name: null, data: null })}
      // tab = "holding"
      />
      <AdvanceModSubscription
        setAlertOpen={setAlertOpen}
        cartList={modalOpen?.data}
        // cartId={list.icid}
        tab={'holding'}
        orderType={'Holding Subscription'}
        open={modalOpen?.name === 'Subscription'}
        setOpen={() => setModalOpen({ name: null, data: null })}
      // tab = "holding"
      />
      <AdvanceModRedemption
        setAlertOpen={setAlertOpen}
        tab={'holding'}
        cartList={modalOpen?.data}
        open={modalOpen?.name === 'Redemption'}
        // setOpen={() => setModalOpen(null)}
        setOpen={() => setModalOpen({ name: null, data: null })}

      />
      <SWP_Modal
        cartList={modalOpen?.data}
        setAlertOpen={setAlertOpen}
        open={modalOpen?.name === 'SWP'}
        tab={'holding'}
        setOpen={() => setModalOpen({ name: null, data: null })}
      />
      <AdvanceModSTP
        setAlertOpen={setAlertOpen}
        cartList={modalOpen?.data}
        // cartId={list.icid}
        tab={'holding'}
        open={modalOpen?.name === 'STP'}
        setOpen={() => setModalOpen({ name: null, data: null })}
      // tab = "holding"
      />
      <AdvanceModFundSwitch
        setAlertOpen={setAlertOpen}
        cartList={modalOpen?.data}
        // cartId={list.icid}
        tab={'holding'}
        open={modalOpen?.name === 'Fund Switch'}
        setOpen={() => setModalOpen(null)}
      // tab = "holding"
      />
      <CustomAlert
        open={alertOpen.show}
        onClose={handleCloseAlert}
        text={alertOpen.msg}
        icon={alertOpen.type}
        tab={'holding'}
        confirmButtonText="OK"
        cancelButtonText="Cancel"
        allowOutsideClick={false}
        width="40vw"
      />
    </TableContainer>
  );
};

export default ExpandableTable;