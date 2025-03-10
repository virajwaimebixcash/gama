import { useEffect, useMemo, useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SIP from "../../images/SIP.png";
import SIPSave from "../../images/SIPSave.png";
import next from "../../images/next.png";
import AdvanceModSIP from '../../Common/OrderTypes/SIP/AdvanceModSIP';
import CustomizedDialogs from '../../Common/OrderTypes/Subscription/AdvanceModSubscription'
import Grid from '@mui/material/Grid2';
import colordate from "../../images/colordate.png";
import infoicon from "../../images/info.png";
import CustomizedMenus from '../../Common/CustomComponents/CustomizedMenus';
import tick from "../../images/tick.png";
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import largetick from "../../images/largetick.png";
import SelectTextFields1 from '../../Common/FormComponent/SelectTextFields1';
import { TextField, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux/actions/actionCreators';
import CustomAlert from '../../Common/CustomComponents/CustomAlert';
import { useNavigate } from 'react-router-dom';
import { handleNumericInput } from '../../utils/commonFunction';
import Delete1 from "../../images/delete.png";
import note from "../../images/note.png";
import Savenew from "../../images/save.png";
import NumberFormatInput from '../../Common/CustomComponents/NumberFormatterInput';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const InvestNowTabs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientCode = parseInt(import.meta.env.VITE_CLIENT_CODE);

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState([{}]);
  const [isEditing2, setIsEditing2] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertIcon, setAlertIcon] = useState('error');
  const [isPlacedSuccessful, setIsPlacedSuccessful] = useState(false);
  const [modalOpen, setModalOpen] = useState(null);

  const AdvanceModSIPData = useSelector((state) => state.investNowAction)
  const AdvanceModLumpSumData = useSelector((state) => state.investNowLumpSumAction);
  const addtoCartPayload = useSelector((state) => state.addtoCart.payload);      

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formConfig, setFormConfig] = useState([]);

  //----------previous edit function without validation -------------------
  // const handleEditClick = (val) => {
  //   if (val === 1)
  //     setIsEditing(true);
  //   else if (val === 2)
  //     setIsEditing2(true);
  // };
  const [calculatedMinInvAmount, setCalculatedMinInvAmount] = useState("0");
  const [minLumpSumAmount, setMinLumpSumAmount] = useState("0");
  const [error, setError] = useState({
    lumpsum: "",
    sip: "",
    sipDate: "",
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const handleEditClick = (val) => {

    const body = {
      // clientCode: "35",
      clientCode:clientCode,
      userId: "integra",
      transactionType: val,
      searchString: "",
      lastBusinessDate: new Date().toISOString(),
      getData: 1,
      schemeCode: cartdata.sipData?.scriptCode || cartdata.lumpsumData?.scriptCode
    };

    dispatch(actionCreators.GetSchemeList(body)).then((res) => {
      if (res.status === 200) {
        const MinLumpSumAmount = res.data[0].MinPurchaseAmt
        const SipFrequency = res.data[0]?.SipFrequency;
        const MinInvAmount = res.data[0]?.MinInvAmount;
        const selectedValue = "4";

        const index = SipFrequency?.indexOf(selectedValue);
        const calculatedMinInvAmount = index !== -1 ? MinInvAmount[index] : "N/A";
        setCalculatedMinInvAmount(calculatedMinInvAmount);
        setMinLumpSumAmount(MinLumpSumAmount);

        const initialTxnAmount = parseFloat(cartdata.sipData?.txnAmountUnit || "0");
        if (initialTxnAmount && initialTxnAmount >= calculatedMinInvAmount) {
          setIsSaveDisabled(false);
          setError({ sip: "" });
        } else {
          setIsSaveDisabled(true);
          setError({ sip: initialTxnAmount ? `Min. SIP amount is ${calculatedMinInvAmount}` : "SIP Amount is required" });
        }

        // Validate initial lumpsum amount
        const initialLumpSumAmount = parseFloat(cartdata.lumpsumData?.txnAmountUnit || "0");
        if (!initialLumpSumAmount || initialLumpSumAmount < MinLumpSumAmount) {
          setError((prev) => ({
            ...prev,
            lumpsum: initialLumpSumAmount
              ? `Min. Lumpsum amount is ${MinLumpSumAmount}`
              : "Lumpsum Amount is required",
          }));
          setIsSaveDisabled(true);
        } else {
          setError((prev) => ({ ...prev, lumpsum: "" }));
        }

        if (!cartdata?.sipData?.startDate) {
          setError((prev) => ({
            ...prev,
            sipDate: "SIP Date is required",
          }));
          setIsSaveDisabled(true);
        } else {
          setError((prev) => ({ ...prev, sipDate: "" }));
        }

      }

    })

    // Set the editing state
    if (val === 1) {
      setIsEditing(true);
    } else if (val === 2) {
      setIsEditing2(true);
    }
  };

  const handleDeleteClick = (val) => {
    setInputValue(inputValue.filter(data => data.transactionType !== val));
    dispatch(actionCreators.addtoCartPayload(inputValue.filter(data => data.transactionType !== val)))
      .then(() => { })
      .catch((error) => { console.log(error) })
  }

  const handleSaveClick = () => {
    setIsEditing(false);
    setIsEditing2(false);
    dispatch(actionCreators.addtoCartPayload(inputValue))
      .then(() => { })
      .catch((error) => { console.log(error) })
  };

  const handleChange = (value, type) => {
    const txnAmountUnit = parseFloat(value);

    // Update state based on transaction type
    setInputValue([
      ...inputValue.map((data) => {
        if ((type === "sip" && data.transactionType === 2) ||
          (type === "lumpsum" && data.transactionType === 1)) {
          return {
            ...data,
            txnAmountUnit: value,
          };
        }
        if (type === "sipDate" && data.transactionType === 2) {
          return {
            ...data,
            startDate: value, // Set the SIP date
          };
        }
        return data;
      }),
    ]);

    // Validate based on type
    if (type === "sip") {
      if (!value || txnAmountUnit < calculatedMinInvAmount) {
        setError((prev) => ({
          ...prev,
          sip: value
            ? `Min. SIP amount is ${calculatedMinInvAmount}`
            : "SIP Amount is required",
        }));
        setIsSaveDisabled(true);
      } else {
        setError((prev) => ({ ...prev, sip: "" }));
        setIsSaveDisabled(false);
      }
    } else if (type === "lumpsum") {
      if (!value || txnAmountUnit < minLumpSumAmount) {
        setError((prev) => ({
          ...prev,
          lumpsum: value
            ? `Min. Lumpsum amount is ${minLumpSumAmount}`
            : "Lumpsum Amount is required",
        }));
        setIsSaveDisabled(true);
      } else {
        setError((prev) => ({ ...prev, lumpsum: "" }));
        setIsSaveDisabled(false);
      }
    } else if (type === "sipDate") {
      if (!value || value === "Invalid Date") {
        setError((prev) => ({
          ...prev,
          sipDate: "SIP Date is required",
        }));
        setIsSaveDisabled(true);
      } else {
        setError((prev) => ({ ...prev, sipDate: "" }));
        setIsSaveDisabled(false);
      }
    }
  };


  const cartdata = useMemo(() => {
    if (addtoCartPayload.length === 0) {
      return {
        sipData: {},
        lumpsumData: {},
        data: null
      }
    }

    const sipData = inputValue.find((item) => item.transactionType === 2) || null;
    const lumpsumData = inputValue.find((item) => item.transactionType === 1) || null;
    // const SWP = inputValue.find((item) => item.transactionType === 8) || null;
    // const fundSwitch = inputValue.find((item) => item.transactionType === 6) || null;
    // const STP = inputValue.find((item) => item.transactionType === 5) || null;
    // const redemptionData = inputValue.find((item) => item.transactionType === 3) || null;

    return {
      sipData,
      lumpsumData,
      data: true,
      showAddButton: sipData || lumpsumData,
    };
  }, [inputValue, addtoCartPayload]);

  const handleAddToCart = () => {
    const payload = inputValue
    setIsEditing(false);
    setIsEditing2(false);

    dispatch(actionCreators.addtoCart(payload)).then((res) => {
      if (res.status === 200) {
        handleOpen()
        navigate('/investmentcarts');
        dispatch(actionCreators.investNowAction(null, true))
        dispatch(actionCreators.investNowLumpSumAction(null, true))
        // dispatch(actionCreators.addtoCart(null, true))
        return
      }
    }).catch((error) => { console.log(error) })
  }

  const calculatePrice = useMemo(() => {
    if (!Array.isArray(inputValue) || inputValue.length === 0) {
      return 0; // Return 0 if inputValue is not an array or is empty
    }

    const totalPrice = inputValue.reduce((total, id) => {
      const price = Number(total) + Number(id.txnAmountUnit);
      return price;
    }, 0);
    return totalPrice;
  }, [inputValue, addtoCartPayload])

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handlePayNow = () => {
    const AdvanceSIPData = AdvanceModSIPData.data.udfFieldValues || {};
    const SIPEnddate = AdvanceModSIPData.data.EndDate
    const formattedEndDate = SIPEnddate ? dayjs(SIPEnddate, "DD/MM/YYYY").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") : "";

    const body = [];

    if (cartdata.sipData) {
      body.push({
        clientCode: clientCode,
        transactionType: 2,
        scriptCode: cartdata.sipData?.scriptCode,
        scriptName: cartdata.sipData?.scriptName,
        tranType: "B",
        // txnAmountUnit: cartdata.sipData?.txnAmountUnit,
        txnAmountUnit: AdvanceModSIPData.data.txnAmountUnit || cartdata.sipData?.txnAmountUnit,
        valueDate: new Date(),
        startDate: cartdata.sipData?.startDate,
        nextInstallmentDate: null,
        isDividend: cartdata.sipData?.isDividend,
        dividendOption: cartdata.sipData?.dividendOption,
        source: 1,
        folio: AdvanceModSIPData.data.folio,
        orderBy: "A",
        frequency: "1",       //1 for monthly
        tenorBasis: AdvanceModSIPData.data.tenorBasis,
        periodOrNoOfTransactions: AdvanceModSIPData.data.periodOrNoOfTransactions || 0,
        // endDate : formattedEndDate || cartdata.sipData?.startDate,
        endDate: formattedEndDate || "",
        targetSchemeCode: "",
        targetSchemeName: "",
        targetFolio: "",
        udfFieldValues: AdvanceSIPData
      })
    }

    if (cartdata.lumpsumData) {
      body.push({
        clientCode: clientCode,
        transactionType: 1,
        scriptCode: cartdata.lumpsumData?.scriptCode,
        scriptName: cartdata.lumpsumData?.scriptName,
        tranType: "B",
        txnAmountUnit: AdvanceModLumpSumData.data.txnAmountUnit || cartdata.lumpsumData?.txnAmountUnit,
        valueDate: new Date(),
        startDate: cartdata.lumpsumData?.startDate,
        nextInstallmentDate: null,
        dividendOption: cartdata.lumpsumData?.dividendOption,
        isDividend: cartdata.lumpsumData?.isDividend,
        source: 1,
        folio: AdvanceModLumpSumData.data.folio,
        orderBy: "A",
        frequency: "",
        tenorBasis: "",
        periodOrNoOfTransactions: 0,
        endDate: "",
        targetSchemeCode: "",
        targetSchemeName: "",
        targetFolio: "",
        udfFieldValues: AdvanceModLumpSumData.data.udfFieldValues || {}
      })
    }
    dispatch(actionCreators.PlaceOrderDetailsForInvestNow(body))
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setAlertMessage(res.data.message);
          setAlertIcon("success");
          setAlertOpen(true);
          setIsPlacedSuccessful(true);
        }
      })
      .catch((error) => {
        setAlertMessage(error);
        setAlertIcon('error');
        setAlertOpen(true);
        setIsPlacedSuccessful(false);
        console.error("Error placing order", error);
      }).finally(() => {
        setAlertOpen(true); // Open alert regardless of success or failure
      });
  };

  useEffect(() => {
    if (addtoCartPayload.length === 0) {
      navigate('/securityview');
      // setAlertMessage("Your cart is empty. Please add some products to your cart.");
      // setAlertIcon("error")
      // setAlertOpen(true);
      // return
    }
    setInputValue(addtoCartPayload);
  }, [addtoCartPayload]);

  const handleAddTransaction = (transactionType) => {
    //==============Scheme Api calling again in case of getting min sip and lumpsum amount ==================
    const body = {
      clientCode: clientCode,
      userId: "integra",
      transactionType: 2,
      searchString: "",
      lastBusinessDate: new Date().toISOString(),
      getData: 1,
      schemeCode: cartdata.sipData?.scriptCode || cartdata.lumpsumData?.scriptCode
    };

    // Dispatch the API action
    dispatch(actionCreators.GetSchemeList(body)).then((res) => {
      if (res.status === 200) {
        const MinLumpSumAmount = res.data[0].MinInvAmount
        const SipFrequency = res.data[0]?.SipFrequency;
        const MinInvAmount = res.data[0]?.MinInvAmount;
        const selectedValue = "4";

        const index = SipFrequency?.indexOf(selectedValue);
        const calculatedMinInvAmount = index !== -1 ? MinInvAmount[index] : "N/A";
        setCalculatedMinInvAmount(calculatedMinInvAmount);
        setMinLumpSumAmount(MinLumpSumAmount);

        const initialTxnAmount = parseFloat(cartdata.sipData?.txnAmountUnit || "0");
        if (initialTxnAmount && initialTxnAmount >= calculatedMinInvAmount) {
          setIsSaveDisabled(false);
          setError({ sip: "" });
        } else {
          setIsSaveDisabled(true);
          setError({ sip: initialTxnAmount ? `Min. SIP amount is ${calculatedMinInvAmount}` : "SIP Amount is required" });
        }

        // Validate initial lumpsum amount
        const initialLumpSumAmount = parseFloat(cartdata.lumpsumData?.txnAmountUnit || "0");
        if (!initialLumpSumAmount || initialLumpSumAmount < MinLumpSumAmount) {
          setError((prev) => ({
            ...prev,
            lumpsum: initialLumpSumAmount
              ? `Min. Lumpsum amount is ${MinLumpSumAmount}`
              : "Lumpsum Amount is required",
          }));
          setIsSaveDisabled(true);
        } else {
          setError((prev) => ({ ...prev, lumpsum: "" }));
        }
      }

    })
    //==========================================================================

    const newTransaction = {
      ...inputValue[0],
      transactionType,
      txnAmountUnit: "",
      startDate: transactionType === 2 ? new Date().toISOString() : null,
      valueDate: new Date().toISOString(),
      //   valueDate: transactionType === 1 
      // ? new Date().toISOString() 
      // : inputValue.startDate || null
      // clientCode: 35,
      // scriptCode: "",
      // scriptName: '',
      // tranType: 'B',
      // isDividend: false,
      // dividendOption: '',
      // source: 1
    };

    setInputValue([...inputValue, newTransaction]);

    if (transactionType === 2) {
      setIsEditing2(true);
    } else {
      setIsEditing(true);
    }
  };

  useEffect(() => {
    dispatch(actionCreators.GetQuickOrderConfiguratorDetails()).then((res) => {
      if (res.status === 200) {
        setFormConfig(res.data.data); // Set the fields from the API response
      }
    })
      .catch((error) => {
        console.error("Error fetching config:", error);
      });

  }, [dispatch]);

  const handleClickOpen = (modalType) => {
    setModalOpen(modalType);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={10} aria-label="basic tabs example">
        <Tab label="Cart" {...a11yProps(0)} />
        <Tab label={
          <div>
            <span>Holdings</span>
            <small className='tabsspanbctxt orangetabsmall'>6</small>
          </div>
        } {...a11yProps(1)} />
        <Tab label={
          <div>
            <span>Transactions</span>
            <small className='tabsspanbctxt orangetabsmall'>0</small>
          </div>
        } {...a11yProps(2)} />
        <Tab label={
          <div>
            <span>SIP</span>
            <small className='tabsspanbctxt orangetabsmall'>0</small>
          </div>
        } {...a11yProps(3)} />
        <Tab label={
          <div>
            <span>SWP</span>
            <small className='tabsspanbctxt orangetabsmall'>0</small>
          </div>
        } {...a11yProps(4)} />
        <Tab label={
          <div>
            <span>STP</span>
            <small className='tabsspanbctxt orangetabsmall'>0</small>
          </div>
        } {...a11yProps(5)} />
      </Tabs>

      <TabPanel value={0} index={0}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 9, }}>
            <div className='width100 investtabscss'>
              <div>
                <div className='divforcellp' style={{ textAlign: 'right', marginRight: 10, marginTop: "10px", }}>
                  <Button variant="contained" color="primary" className='fixbtnsize mr10 paybtns'
                    onClick={() => handleAddToCart()}
                    disabled={isEditing || isEditing2}
                  >
                    Add to Cart
                  </Button>
                </div>
                <div style={{ textAlign: "left", PaddingTop: 10, paddingBottom: 10 }}>
                  <strong className='fontsbold' >{cartdata.sipData?.scriptName || cartdata.lumpsumData?.scriptName}</strong>
                </div>
                <Box className="borderbott">
                  {/* SIP Row */}
                  {cartdata.sipData &&
                    (
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6, }}  >
                          <div className='sipdatbox' style={{ marginLeft: 5 }}>
                            <span className='spanrigh'>
                              <img src={SIP} />
                              <span className='lefcss'>SIP on
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker
                                    className='sipday'
                                    views={['day']}
                                    value={dayjs(cartdata?.sipData?.startDate)}
                                    minDate={dayjs()}
                                    onChange={(date) => handleChange(dayjs(date).format("YYYY-MM-DD"), "sipDate")}
                                    disabled={!isEditing2} // Disable select if not in edit mode
                                    // renderInput={(params) => <TextField {...params} />}
                                    renderInput={(params) => <TextField {...params} error={!!error.sipDate} helperText={error.sipDate} />}
                                  />
                                </LocalizationProvider>
                              </span>
                            </span>
                            <span>
                              <span>
                                <img src={next} />
                              </span>
                              <span className='on3px'>SIP Starts On </span>
                              <span className='blcfon'>{dayjs(cartdata.sipData?.startDate).format('DD-MM-YYYY')}</span></span>
                          </div>
                        </Grid>

                        <Grid size={{ xs: 5, sm: 6, md: 4, lg: 3, }} >
                          <div className='sipdatbox'>
                            {!isEditing2 && cartdata.sipData &&
                              <span className='blcol'>
                                <Button variant="outlined" onClick={() => handleClickOpen('sip')} className='advacncebtn'>
                                  <span className='adva'>Advance +</span>
                                </Button>
                              </span>}
                          </div>
                        </Grid>
                        <Grid size={{ xs: 5, sm: 6, md: 4, lg: 2, }} >
                          <div className='sipdatbox' >
                            <span className='intxts'>
                              <NumberFormatInput
                                value={cartdata.sipData?.txnAmountUnit}
                                onChange={(e) => handleChange(e, "sip")}
                                helperText={error.sip}
                                error={!!error.sip}
                                slotProps={{
                                  input: {
                                    onInput: handleNumericInput,
                                  },
                                }}
                                disabled={!isEditing2}
                                variant="outlined"
                                size="small"
                                placeholder={`Enter ${formConfig.find(field => field.dispatcherName === "SIPOrderAmount" && field.quickOrderType === "SIP")?.displayName || "SIPOrderAmount"}`}

                              />
                            </span>
                          </div>
                        </Grid>
                        <Grid size={{ xs: 2, sm: 6, md: 4, lg: 1, }} >
                          <div className='sipdatbox'>
                            {isEditing2 ? (
                              <IconButton onClick={handleSaveClick} className='editsave' color="primary" disabled={isSaveDisabled}>
                                <img src={Savenew} />
                              </IconButton>
                            ) : (
                              <IconButton onClick={() => handleEditClick(2)} className='editsave' color="primary">
                                <img src={note} />
                              </IconButton>
                            )}
                            <span>
                              <IconButton className='editsave' color="primary"
                                onClick={() => handleDeleteClick(2)}
                              >
                                <img src={Delete1} />
                              </IconButton>
                            </span>
                          </div>
                        </Grid>
                      </Grid>
                    )
                  }
                  <div className='hei20px'></div>
                  {/* Lumpsum Row */}
                  {cartdata.lumpsumData &&
                    (
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6, }} >
                          <div className='sipdatbox' style={{ marginLeft: 5 }}>
                            <span className='spanrigh'>
                              <img src={SIPSave} />
                              <span className='lefcss'>Lumpsum</span>
                            </span>
                            <span>
                              <span>
                                <img src={next} />
                              </span>
                              <span className='on3px'>Value Date On </span>
                              <span className='blcfon'>{dayjs(cartdata.lumpsumData?.valueDate).format('DD-MM-YYYY')}</span> </span>
                          </div>
                        </Grid>
                        <Grid size={{ xs: 5, sm: 6, md: 4, lg: 3, }} >
                          <div className='sipdatbox'>
                            {!isEditing && cartdata.lumpsumData &&
                              <span className='blcol'>
                                <Button variant="outlined" onClick={() => handleClickOpen('lumpsum')} className='advacncebtn'>
                                  <span className='adva'>Advance +</span>
                                </Button>
                              </span>
                            }
                          </div>
                        </Grid>
                        <Grid size={{ xs: 5, sm: 6, md: 4, lg: 2, }} >
                          <div className='sipdatbox'>
                            <span className='intxts'>
                              <NumberFormatInput
                                value={cartdata.lumpsumData?.txnAmountUnit}
                                // value={inputValue.find((data) => data.transactionType === 1)?.txnAmountUnit || ""}

                                // onChange={(e) => setInputValue([...inputValue.map((data) => {
                                //   if (data.transactionType === 1) {
                                //     return {
                                //       ...data, txnAmountUnit: e.target.value
                                //     }
                                //   }
                                //   return data
                                // })])}
                                onChange={(e) => handleChange(e, "lumpsum")}
                                slotProps={{
                                  input: {
                                    onInput: handleNumericInput, // Add the handleInput function here
                                  },
                                }}
                                disabled={!isEditing} // Disable editing when not in edit mode
                                variant="outlined"
                                size="small"
                                helperText={error.lumpsum}
                                error={!!error.lumpsum}
                                placeholder={`Enter ${formConfig.find(field => field.dispatcherName === "OrderAmount" && field.quickOrderType === "Lumpsum")?.displayName || "OrderAmount"}`}

                              />
                            </span>
                          </div>
                        </Grid>
                        <Grid size={{ xs: 2, sm: 6, md: 4, lg: 1, }} >
                          <div className='sipdatbox'>
                            {isEditing ? (
                              <IconButton onClick={handleSaveClick} className='editsave' color="primary" disabled={isSaveDisabled}>
                                <img src={Savenew} />
                              </IconButton>
                            ) : (
                              <IconButton onClick={() => handleEditClick(1)} className='editsave' color="primary">
                                <img src={note} />
                              </IconButton>
                            )}
                            <span>
                              <IconButton className='editsave' color="primary"
                                onClick={() => handleDeleteClick(1)}>
                                <img src={Delete1} />
                              </IconButton>
                            </span>
                          </div>
                        </Grid>
                        <div className='hei20px'></div>
                      </Grid>
                    )
                  }
                  {!cartdata.sipData && cartdata.showAddButton &&
                    (
                      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
                        <div className="sipdatbox">
                          <Button className='advacncebtn'
                            onClick={() => handleAddTransaction(2)}
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                              padding: 0,
                              // textDecoration: "underline",
                              color: "blue",
                            }}
                          >
                            + Add SIP
                          </Button>
                        </div>
                      </Grid>

                    )
                  }
                  {!cartdata.lumpsumData && cartdata.showAddButton &&
                    (
                      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
                        <div className="sipdatbox">
                          <Button className='advacncebtn'
                            onClick={() => handleAddTransaction(1)}
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                              padding: 0,
                              // textDecoration: "underline",
                              color: "blue",
                            }}
                          >
                            + Add Lumpsum
                          </Button>
                        </div>
                      </Grid>
                    )}
                </Box>
              </div>
            </div>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3 }} sx={{ boxShadow: 2, padding: 2, borderRadius: 2, height: 530 }} >
            <Grid minHeight={20} size={{ lg: 12, xs: 12, sm: 12, md: 12, }} sx={{ height: 30 }} >
              <div className=''>
                <div className='bigbolds'>Payment Details</div>
              </div>
            </Grid>
            <Grid minHeight={20} size={{ lg: 12, xs: 12, sm: 12, md: 12, }} sx={{ height: 30 }} >
              <div className='whitecolorbg'>
                <div className='dateico'><img src={colordate} /></div>
                <div className='dattim'><span className='graycs'>Scheduled SIP:</span><span className="bld14 "> ₹ 15,000</span><img src={infoicon} /></div>
              </div>
            </Grid>
            <Grid minHeight={20} size={{ lg: 1 }} >
            </Grid>
            <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
              <div className="fontsbold minhei">My Investment Account</div>
            </Grid>
            <Grid minHeight={60} size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
              <CustomizedMenus></CustomizedMenus>
            </Grid>
            <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
              <span className='graycs'>Balance</span><span className='bankbal'>122,688.70</span>
            </Grid>
            <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
              <div className='minh35'>
                <span className='tickcss'><img src={tick} /></span>
                <span className='purple'>Active Bank Account </span>
              </div>
            </Grid>
            <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
              <div className="fontsbold minheinew">Total Amount</div>
            </Grid>
            <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
              <div className='centincell'><SelectTextFields1 amount={calculatePrice} /></div>
            </Grid>
            <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
              <div className='checboxs'>
                <FormControlLabel control={<Checkbox defaultChecked sx={{ transform: 'scale(0.6)', padding: 0 }} />} label={
                  <div>
                    <p className='tnc' style={{ fontSize: '0.7rem' }}>Terms and conditions</p>
                  </div>
                } />
              </div>
              <div className='graycs allmarbt'>I agree with all the &quot;Terms and Conditions&quot;</div>
            </Grid>
            <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
              <div className='allbtnpadding'>
                <Button variant="contained" color="secondary" className='fixbtnsize paybtns' onClick={handlePayNow}>
                  Pay Now
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
      <div>
        {/* <Button onClick={handleOpen}><img src= {tablediv} /></Button> */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                <img src={largetick} />
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 1 }}>
                <span className='modalscuc'>Fund has been successfully added to your cart</span>
                <div className='allbtnpadding'>Click on cart icon to confirm order</div>
              </Typography>
              <Button variant="contained" color="primary" className='fixbtnsize' onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>
      {
        <CustomAlert
          open={alertOpen}
          onClose={handleCloseAlert}
          text={alertMessage}
          icon={alertIcon}
          confirmButtonText="OK"
          allowOutsideClick={false}
          width="30vw"
          //  onConfirmButton={() => navigate('/securityview')}
          onConfirmButton={() => {
            // Navigate based on the success state
            if (addtoCartPayload.length === 0) {
              navigate('/securityview');
              return
            }
            if (isPlacedSuccessful) {
              navigate('/securityview'); // On success
              dispatch(actionCreators.investNowAction(null, true))
              dispatch(actionCreators.investNowLumpSumAction(null, true))
              dispatch(actionCreators.addtoCart(null, true))
            } else {
              navigate('/investnow'); // On failure
            }
            handleCloseAlert(); // Close the alert after navigation
          }}
        />
      }
      <CustomizedDialogs cartList={cartdata.lumpsumData} cartId={null} open={modalOpen === 'lumpsum'} setOpen={() => setModalOpen(null)} tab={"cart"} />
      <AdvanceModSIP cartList={cartdata.sipData} cartId={null} open={modalOpen === 'sip'} setOpen={() => setModalOpen(null)} tab={"cart"} />
    </Box>
  );
};

export default InvestNowTabs;