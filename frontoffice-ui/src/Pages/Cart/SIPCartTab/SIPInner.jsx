import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, Modal, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import clientlogosmall from "../../../images/clientlogosmall.png";
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import PopupSIP from './PopupSIP';
import TransactAction from '../../../Common/CustomComponents/TransactAction';
import AdvanceModSIP from '../../../Common/OrderTypes/SIP/AdvanceModSIP';
import AdvanceModSubscription from '../../../Common/OrderTypes/Subscription/AdvanceModSubscription';
import AdvanceModRedemption from '../../../Common/OrderTypes/Reedemption/AdvModRedemption';
import SWP_Modal from '../../../Common/OrderTypes/SWP/SWP_Modal';
import AdvanceModSTP from '../../../Common/OrderTypes/STP/AdvanceModSTP';
import AdvanceModFundSwitch from '../../../Common/OrderTypes/Fundswitch/AdvanceModFundSwitch';

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

export default function SIPInner({ sipManagerActionData, sipManagerConfigData, sipManagerTableData }) {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [alertOpen, setAlertOpen] = useState({ show: false, msg: '', type: 'success' });
  const [modalOpen, setModalOpen] = useState({ name: "", data: "" });

  const handleOpen = (data) => {
    setModalData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleCloseAlert = () => {
    setAlertOpen({ show: false, msg: '' });
  };

  const handleClickOpen = (modalType, row) => {
    setModalOpen({ name: modalType, data: row });
  };

  // Filtering out 'SecurityName' and 'Status', and sorting based on 'fieldSequence'
  const filteredAndSortedData = sipManagerConfigData
    ?.filter(item => item.fieldName !== 'fund_Name' && item.fieldName !== 'status')
    ?.sort((a, b) => a.fieldSequence - b.fieldSequence) || [];

  //----------------- Slicing First 4 fields and remaining fields
  const firstFourFields = filteredAndSortedData.slice(0, 4);
  const remainingFields = filteredAndSortedData.slice(4);

  // Grouping data by Fund_Name and sorting rows by Status alphabetically
  const groupedData = sipManagerTableData?.reduce((acc, curr) => {
    const { fund_Name, amount } = curr;
    if (!acc[fund_Name]) {
      acc[fund_Name] = { rows: [], totalAmount: 0 };
    }
    acc[fund_Name].rows.push(curr);
    acc[fund_Name].totalAmount += parseFloat(amount) || 0; // Total Sum amounts, handle undefined or NaN
    return acc;
  }, {});



  // Sort the rows in each group by the Status column in ascending order
  // Object.keys(groupedData).forEach((fundName) => {
  //   groupedData[fundName] = groupedData[fundName].sort((a, b) => {
  //     const statusA = a.Status?.toLowerCase() || ""; // Handle cases where Status might be undefined
  //     const statusB = b.Status?.toLowerCase() || "";
  //     return statusA.localeCompare(statusB);
  //   });
  // });
  console.log(sipManagerConfigData, "sipManagerConfigData");

  return (
    <Box sx={{ flexGrow: 1 }}>
      {sipManagerTableData?.length === 0 ? (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "200px" }}>
          <Typography variant="h6" color="textSecondary">
            No Record Found
          </Typography>
        </Grid>
      ) : (

        Object?.entries(groupedData)?.map(([fund_Name, { rows, totalAmount }], index) => (
          <Grid key={`${fund_Name}_${index}`} className="contentsintab">
            {/* -------------------- Security Fund name and amount --------------------- */}
            <Grid container spacing={2}>
              <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 9 }}>
                <div className="texleftimp onlyflol ">
                  <img src={clientlogosmall} className="clilogosmall" alt="Client Logo" />
                </div>

                <div className="fon13bld texleftimp  extpadbot20">
                  {fund_Name}
                  <span className="darkblcbld">₹ {totalAmount.toLocaleString("en-IN")}</span> {/* Display total AIP amount */}
                  {/* <span className="darkblcbld">₹ 5000</span> */}
                </div>
              </Grid>

              {/* <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 3 }}>
                <div className="rightfloats pointercusrs ">
                  <div>
                    <div className="center">
                      <TransactAction row={
                        { ...rows, switchOutAllowed: null }
                      }
                        setAlertOpen={setAlertOpen} handleClickOpen={(type) => handleClickOpen(type,
                          { schemeName: rows[0].fund_Name, ...rows[0] }
                        )}

                      />
                    </div>
                  </div>
                </div>
              </Grid> */}
            </Grid>
            {/* -------------------- Security name and amount --------------------- */}
            <div className='bxshadods '>
              {/* Table Header */}
              <Grid container spacing={2} className="showincell1 hideincell1 whitewithpadding ">
                {firstFourFields.map((config) => (
                  <Grid
                    minHeight={20}
                    size={{ xs: 6, sm: 6, md: 6, lg: 2 }}
                    className="colinsiptb"
                    key={config.fieldName}
                  >
                    <Item className="nobackcol fon13bld aligmeleftsnew paddforinnersip">
                      {config.displayHeader || "N/A"}
                    </Item>
                  </Grid>
                ))}
                <Grid minHeight={20}
                  size={{ xs: 6, sm: 6, md: 6, lg: 2 }}
                  className="colinsiptb">
                  <Item className="nobackcol fon13bld aligmeleftsnew paddforinnersip">
                    {/* View Details */}
                  </Item>
                </Grid>
                {/* <Grid minHeight={20}
                  size={{ xs: 6, sm: 6, md: 6, lg: 2 }}
                  className="colinsiptb">
                  <Item className="nobackcol fon13bld aligmeleftsnew paddforinnersip">Status</Item>
                </Grid> */}
                {/* Status Column from Config */}
                {sipManagerConfigData.some((config) => config.fieldName === "status") && (
                  <Grid minHeight={20} xs={6} sm={6} md={6} lg={2} className="colinsiptb">
                    <Item className="nobackcol fon13bld aligmeleftsnew paddforinnersip">
                      {sipManagerConfigData.find((config) => config.fieldName === "status")?.displayHeader || "Status"}
                    </Item>
                  </Grid>
                )}

              </Grid>

              {/* Table Rows */}
              {rows.map((row, rowIndex) => (
                <Grid key={`row_${rowIndex}`} spacing={2} className="whitewithpadding ">
                  <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                    <Item>
                      <Grid container spacing={2}>
                        {firstFourFields.map((config) => (
                          <Grid
                            minHeight={20}
                            size={{ xs: 6, sm: 6, md: 6, lg: 2 }}
                            className="colinsiptb fonsizenweigh"
                            key={config.fieldName}
                          >
                            <Item className="nobackcol fon13bld blacktxtstabs texleft">
                              {row[config.fieldName] || "N/A"}
                            </Item>
                          </Grid>
                        ))}
                        {/* -----------------view Details column------------- */}
                        <Grid minHeight={20}
                          size={{ xs: 6, sm: 6, md: 6, lg: 2 }}
                          className="colinsiptb fonsizenweigh">
                          <Item >
                            <div className='texleftimp linktxtnewview' onClick={() => handleOpen({ ...row })}>

                              View Details +
                            </div>
                          </Item>
                        </Grid>
                        {/* ------------Status Column------------ */}
                        {sipManagerConfigData.some((config) => config.fieldName === "status") && (
                          
                          <Grid item size={{ xs: 6, sm: 6, md: 6, lg: 2 }} className="colinsiptb fonsizenweigh">
                            <Item className="nobackcol fon13bld blacktxt texleft">
                              <div className="inlineDisplay">
                                <span className={`${row.status?.trim() === "Active" ? "activebtnssmall" : ""}`}>{row.status || "N/A"}</span>
                                <span className="SIPdd">
                                <PopupSIP sipManagerActionData={sipManagerActionData} />
                                </span>
                              </div>
                            </Item>
                          </Grid>
                        )}
                      </Grid>
                    </Item>
                  </Grid>
                </Grid>
              ))}
            </div>
            <div className='gapsdiveall'></div>
          </Grid>
        ))
      )}




      <AdvanceModSIP
        setAlertOpen={setAlertOpen}
        cartList={modalOpen?.data}
        tab={'sipManager'}
        open={modalOpen?.name === 'SIP'}
        setOpen={() => setModalOpen({ name: null, data: null })}
      />
      <AdvanceModSubscription
        setAlertOpen={setAlertOpen}
        cartList={modalOpen?.data}
        tab={'sipManager'}
        open={modalOpen?.name === 'Subscription'}
        setOpen={() => setModalOpen({ name: null, data: null })}
      />
      <AdvanceModRedemption
        setAlertOpen={setAlertOpen}
        cartList={modalOpen?.data}
        tab={'sipManager'}
        open={modalOpen?.name === 'Redemption'}
        setOpen={() => setModalOpen({ name: null, data: null })}
      />
      <SWP_Modal
        setAlertOpen={setAlertOpen}
        cartList={modalOpen?.data}
        tab={'sipManager'}
        open={modalOpen?.name === 'SWP'}
        setOpen={() => setModalOpen({ name: null, data: null })}
      />
      <AdvanceModSTP
        setAlertOpen={setAlertOpen}
        cartList={modalOpen?.data}
        tab={'sipManager'}
        open={modalOpen?.name === 'STP'}
        setOpen={() => setModalOpen({ name: null, data: null })}
      />
      <AdvanceModFundSwitch
        setAlertOpen={setAlertOpen}
        cartList={modalOpen?.data}
        tab={'sipManager'}
        open={modalOpen?.name === 'Fund Switch'}
        setOpen={() => setModalOpen({ name: null, data: null })}
      />


      {/* Dialog for View Details */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: {
            width: "60%", // Custom width (adjust as needed)
            maxHeight: "90vh", // Ensure it doesn’t overflow vertically
          },
        }}
      >

        <h2 className="headingtop pl23">View Details</h2>
        <DialogContent>
          <Grid container spacing={2}>
            {remainingFields.map((config) => (
              <Grid key={config.fieldName}>
                <Grid
                  className="minhegt50 fixheiflexwidth"
                  size={{ xs: 6, sm: 6, md: 4, lg: 3 }}
                >
                  <p>{config.displayHeader || "N/A"}</p>
                  <label className="lbltxt">
                    {modalData[config.fieldName] || "N/A"}
                  </label>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}