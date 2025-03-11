import { useCallback, useEffect, useMemo, useState } from 'react';
import { Tabs, Tab, Box, Typography, Icon } from '@mui/material';
import CustomAlert from '../../Common/CustomComponents/CustomAlert';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SIP from "../../images/SIP.png";
import SIPSave from "../../images/SIPSave.png";
import next from "../../images/next.png";
import AdvanceModSIP from '../../Common/OrderTypes/SIP/AdvanceModSIP';
import AdvanceModSubscription from '../../Common/OrderTypes/Subscription/AdvanceModSubscription';
import AdvanceModSTP from '../../Common/OrderTypes/STP/AdvanceModSTP';
import Grid from '@mui/material/Grid2';
import colordate from "../../images/colordate.png";
import infoicon from "../../images/info.png";
import CustomizedMenus from '../../Common/CustomComponents/CustomizedMenus';
import tick from "../../images/tick.png";
import { Button } from '@mui/material';
import TransactionTab from './Transactions/TransactionTab';
import SelectTextFields1 from '../../Common/FormComponent/SelectTextFields1';
import SIPTab from './SIPCartTab/SIPTab';
import { TextField, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import api from '../../APIs/interceptor';
import { actionCreators } from '../../redux/actions/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import MyHoldings from './Holdings/MyHoldings';
import { defaultFromDate, defaultToDate, handleNumericInput } from '../../utils/commonFunction';
import Delete1 from "../../images/delete.png";
import note from "../../images/note.png";
import Savenew from "../../images/save.png";
import NumberFormatInput from '../../Common/CustomComponents/NumberFormatterInput';
import AdvModRedemption from '../../Common/OrderTypes/Reedemption/AdvModRedemption';
import AdvanceModFundSwitch from '../../Common/OrderTypes/Fundswitch/AdvanceModFundSwitch';
import SWP_Modal from '../../Common/OrderTypes/SWP/SWP_Modal';
import STPTab from './STPCartTab/STPTab';
import SWPTab from './SWPCartTabManager/SWPTab';
import { useSearchParams } from 'react-router-dom';
import { useModal } from '../../Common/AlertModal/ModalContext';
import HoldingsSkeleton from '../../Common/Skeletons/HoldingsSkeleton';
import TransactionsSkeleton from '../../Common/Skeletons/TransactionsSkeleton';
import SIPSkeleton from '../../Common/Skeletons/SIPSkeleton';
import CartSkeleton from '../../Common/Skeletons/CartSkeleton';

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
const clientCode = import.meta.env.VITE_CLIENT_CODE;

const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");

const timePeriod = 30;

const getTabSkeleton = {
  cart: <CartSkeleton />,
  holdings: <HoldingsSkeleton />,
  transactions: <TransactionsSkeleton />,
  sip: <SIPSkeleton />,
  swp: <SIPSkeleton />,
  stp: <SIPSkeleton />,
}

const CartTabs = () => {
  const [searchParams] = useSearchParams();
  const path = searchParams.get("path");
  const { showModal } = useModal()
  const today = formatDate(dayjs().format("YYYY-MM-DD"));
  const managersTimePeriod = dayjs().add(timePeriod - 1, "days").format("YYYY-MM-DD");

  const dispatch = useDispatch();
  const cartListData = useSelector(state => state.getcartList.cartList);
  const selectedSearchedValue = useSelector((state) => state.getSchemeList.data);
  const [isEditing, setIsEditing] = useState([]);
  const [cartList, setCartList] = useState(cartListData);
  const [alertOpen, setAlertOpen] = useState({ show: false, msg: '', type: 'success' });
  const [selectedCheckbox, SetselectedCheckbox] = useState([]);
  const [selectedItems, SetselectedItems] = useState([]);
  const [value, setValue] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [hodingCount, setHoldingCount] = useState(0);
  const [filterValues, setFilterValues] = useState({ orderDateFrom: defaultFromDate, orderDateTo: defaultToDate });
  const [filterConfig, setFilterConfig] = useState([]);
  const [tableConfig, setTableConfig] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [transactionsCount, setTransactionsCount] = useState(0);
  const [transactionsTableConfig, setTransactionsTableConfig] = useState([]);
  const [transactionsTableData, setTransactionsTableData] = useState([]);
  const [defaultTransactionPageSize, setDefaultTransactionPageSize] = useState(0);

  const [sipManagerActionData, setSipManagerActionData] = useState([]);
  const [sipManagerConfigData, setSipManagerConfigData] = useState([]);
  const [sipManagerTableData, setSipManagerTableData] = useState([]);
  const [sipManagerCount, setSipManagerCount] = useState(0);
  const [sipFilterValues, setSipFilterValues] = useState();

  const [stpManagerActionData, setStpManagerActionData] = useState([]);
  const [stpManagerConfigData, setStpManagerConfigData] = useState([]);
  const [stpManagerTableData, setStpManagerTableData] = useState([]);
  const [stpManagerCount, setStpManagerCount] = useState(0);
  const [stpFilterValues, setStpFilterValues] = useState({});

  const [swpManagerActionData, setSwpManagerActionData] = useState([]);
  const [swpManagerConfigData, setSwpManagerConfigData] = useState([]);
  const [swpManagerTableData, setSwpManagerTableData] = useState([]);
  const [swpManagerCount, setSwpManagerCount] = useState(0);
  const [swpFilterValues, setSwpFilterValues] = useState({});

  const [transactionsSortingState, setTransactionsSortingState] = useState(null);
  const [holdingSortingState, setHoldingSortingState] = useState(null);
  const [transactionTotalData, setTransactionTotalData] = useState(0);
  const [transactionPaginationState, setTransactionPaginationState] = useState({ pageNum: 1, pageSize: 10 });
  const [txnAmountUnit, setTxnAmountUnit] = useState({});
  const [startDate, setStartDate] = useState({});
  const [formConfig, setFormConfig] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [modalOpen, setModalOpen] = useState({ name: null, icid: "", list: "" });
  const [visibleRows, setVisibleRows] = useState({ lumpsum: false, sip: false, redemption: false, });
  const [openState, setOpenState] = useState({});

  const [loading, setLoading] = useState({
    cart: true,
    holdings: true,
    transactions: true,
    sip: true,
    swp: true,
    stp: true,
  });

  const handleOpen = (key) => {
    setOpenState((previousState) => ({ ...previousState, [key]: true }));
  };

  const handleClose = (key) => {
    setOpenState((previousState) => ({ ...previousState, [key]: false }));
  };

  const [addSIPOpenState, setAddSIPOpenState] = useState(false);

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

  const handleDateChange = (scriptCode, value) => {
    // Validate that the date is selected
    if (!value) {
      setValidationErrors((prev) => ({
        ...prev,
        [scriptCode + "sip"]: { ...prev[scriptCode], date: 'Start date is required.' },
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        [scriptCode + "sip"]: { ...prev[scriptCode], date: '' }, // Clear error
      }));
    }

    setStartDate((prevDates) => ({
      ...prevDates,
      [scriptCode]: value,
    }));
  };

  const handleAmountChange = (value, type, scriptCode) => {
    let minAmount;
    if (type === 'sip') {
      const SipFrequency = selectedSearchedValue[0]?.SipFrequency;
      const MinInvAmount = selectedSearchedValue[0]?.MinInvAmount;
      const selectedValue = "4"; // Example selected frequency
      const index = SipFrequency?.indexOf(selectedValue);
      // minAmount = index !== -1 ? MinInvAmount?.[index] : "N/A";
      minAmount = Array.isArray(MinInvAmount) && index !== -1 && MinInvAmount?.[index] !== undefined
        ? MinInvAmount?.[index]
        : "N/A";
    } else if (type === 'lumpsum') {
      minAmount = selectedSearchedValue[0]?.MinPurchaseAmt;
    } else if (type === 'redemption') {  //redemption----------------
      minAmount = selectedSearchedValue[0]?.MinRedeemAmount;
    }

    // Validate the user input based on the dynamic minimum values

    if (Number(value) < Number(minAmount)) {
      setValidationErrors((prev) => ({
        ...prev,
        [scriptCode + type]: { ...prev[scriptCode + type], amount: `Minimum amount for ${type === 'sip' ? 'SIP' : type === 'redemption' ? 'Redemption' : 'Lumpsum'} is ${minAmount}` },
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        [scriptCode + type]: { ...prev[scriptCode + type], amount: '' },
      }));
    }

    setTxnAmountUnit((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [scriptCode]: value,
      },
    }));
  };

  const toggleDisplay = (type, scriptName, items) => {
    const body = {
      // clientCode: "35",
      clientCode: clientCode,
      userId: "integra",
      transactionType: 2,
      searchString: "",
      lastBusinessDate: new Date().toISOString(),
      getData: 1,
      schemeCode: items?.cart[0]?.scriptCode
    };

    // Dispatch the API action
    dispatch(actionCreators.GetSchemeList(body)).then(() => { })

    setVisibleRows((prev) => ({
      ...prev,
      [scriptName]: {
        ...prev[scriptName],
        [type]: !prev[scriptName]?.[type],
      },
    }));
    // Reset specific type without affecting the other
    setTxnAmountUnit((prev) => {
      const updated = { ...prev };
      if (type === "sip" && items?.cart[0]?.icid) {
        updated.sip = {}; // Reset only SIP data
      } else if (type === "lumpsum" && items?.cart[0]?.icid) {
        updated.lumpsum = {}; // Reset only Lumpsum data
      } else if (type === "redemption" && items?.cart[0]?.icid) {  //------------redemption
        updated.redemption = {}; // Reset only Lumpsum data
      }
      return updated; // Preserve other data
    });

    // Reset the start date only for SIP
    if (type === "sip" && items?.cart[0]?.icid) {
      setStartDate(null);
    }

  };

  const renderRow = (type, scriptName, item) => {
    const list = item[0];
    const scriptCode = list.scriptCode; // Extract scriptCode from the item
    const sipStartDate = startDate?.[scriptCode] || null;
    const errorMessages = validationErrors[scriptCode + type] || {};

    const handleAddToCart = async () => {
      // Initialize an object to store validation errors

      const errors = {};
      let minAmount;

      if (type === 'sip') {
        const SipFrequency = selectedSearchedValue[0]?.SipFrequency;
        const MinInvAmount = selectedSearchedValue[0]?.MinInvAmount;
        const selectedValue = "4"; // Example selected frequency
        const index = SipFrequency?.indexOf(selectedValue);
        // minAmount = index !== -1 ? MinInvAmount?.[index] : "N/A";
        minAmount = Array.isArray(MinInvAmount) && index !== -1 && MinInvAmount?.[index] !== undefined
          ? MinInvAmount?.[index]
          : "N/A";
      } else if (type === 'lumpsum') {
        minAmount = selectedSearchedValue[0]?.MinPurchaseAmt;
      } else if (type === 'redemption') {  //-----------------------------redemption 
        minAmount = selectedSearchedValue[0]?.MinRedeemAmount;
      }

      if (Number(txnAmountUnit?.[type]?.[scriptCode]) < Number(minAmount)) {
        errors[scriptCode + type] = {
          ...errors[scriptCode + type],
          amount: `Minimum amount for ${type === 'sip' ? 'SIP'
            : type === "redemption" ? "Redemption" //------------redemption
              : 'Lumpsum'} is ${minAmount}`,
        };
      }

      // Validate if the amount exists for the specified type (SIP or Lumpsum)
      if (!txnAmountUnit?.[type]?.[scriptCode]) {
        errors[scriptCode + type] = {
          ...errors[scriptCode + type],
          amount: `${type === "sip" ? "SIP"
            : type === "redemption" ? "Redemption" //------------redemption
              : "Lumpsum"} amount is required.`,
        };
      }

      // Validate if SIP start date is provided (only for "sip" type)
      if (type === "sip" && !sipStartDate) {
        errors[scriptCode + type] = {
          ...errors[scriptCode + type],
          date: "Start date is required.",
        };
      }

      // If there are any validation errors, set them and exit the function early
      if (Object.keys(errors).length > 0) {
        setValidationErrors((prev) => ({
          ...prev,
          ...errors,
        }));
        return; // Return early if validation errors exist
      }
      try {
        const payload = [];
        const isDividendValue = list?.isDividend || false;

        if (type === "lumpsum") {
          payload.push({
            icid: "",
            clientCode: list.clientCode,
            transactionType: 1,
            scriptCode: list.scriptCode,
            scriptName: list.scriptName,
            tranType: "B",
            // txnAmountUnit,
            txnAmountUnit: txnAmountUnit?.lumpsum[scriptCode],
            valueDate: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            startDate: "",
            folio: list.folio,
            orderBy: list.orderBy,
            isDividend: isDividendValue,
            dividendOption: list.dividendOption,
            source: 1,
            channelId: "Portal",
            parentChannelId: "MVPPortal",
            udfFieldValues: {}
          });
        } else if (type === "sip") {
          payload.push({
            icid: "",
            clientCode: list.clientCode,
            transactionType: 2,
            scriptCode: list.scriptCode,
            scriptName: list.scriptName,
            tranType: "B",
            txnAmountUnit: txnAmountUnit?.sip[scriptCode],
            valueDate: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            startDate: sipStartDate ? dayjs(sipStartDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') : null,
            // startDate: sipStartDate ? new Date(sipStartDate) : null,
            isDividend: isDividendValue,
            dividendOption: list.dividendOption,
            source: 1,
            channelId: "Portal",
            parentChannelId: "MVPPortal",
            udfFieldValues: {}
          });
        }
        else if (type === "redemption") {
          payload.push({
            icid: "",
            clientCode: list.clientCode,
            transactionType: 3,
            scriptCode: list.scriptCode,
            scriptName: list.scriptName,
            tranType: "S",
            // txnAmountUnit,
            txnAmountUnit: txnAmountUnit?.redemption[scriptCode],
            valueDate: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            startDate: "",
            folio: list.folio,
            orderBy: list.orderBy,
            orderUnit: list.orderUnit,
            isDividend: isDividendValue,
            dividendOption: list.dividendOption,
            source: 1,
            channelId: "Portal",
            parentChannelId: "MVPPortal",
            udfFieldValues: {}
          });
        } else if (type === "fundSwitch") {
          payload.push({
            icid: "",
            clientCode: list.clientCode,
            transactionType: 6,
            scriptCode: list.scriptCode,
            scriptName: list.scriptName,
            tranType: "S",
            txnAmountUnit: txnAmountUnit?.fundSwitch[scriptCode],
            valueDate: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            startDate: "",
            folio: list.folio,
            orderBy: list.orderBy,
            orderUnit: list.orderUnit,
            isDividend: isDividendValue,
            dividendOption: list.dividendOption,
            source: 1,
            channelId: "Portal",
            parentChannelId: "MVPPortal",
            targetSchemeCode: list.targetSchemeCode,
            targetSchemeName: list.targetSchemeName,
            targetFolio: list.targetFolio,
            udfFieldValues: {}
          });
        }

        dispatch(actionCreators.addtoCart(payload)).then((res) => {
          if (res.status === 200) {
            showModal({ show: true, text: res.data.message, icon: "success" })
            getCartList();
            setVisibleRows({ lumpsum: false, sip: false, redemption: false, });
            // setTxnAmountUnit("");
            setTxnAmountUnit({
              lumpsum: {},
              sip: {},
              redemption: {},
              fundSwitch: {}
            }); // Reset after adding to cart
            setStartDate(null);
            setValidationErrors({})
          }
        }).catch((error) => { console.log(error) })
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    return (
      <Grid container spacing={2} className={type === "lumpsum" ? "twentyadds"
        : type === "redemption" ? "twentyadds" : type === "fundSwitch" ? "twentyadds"
          : "zeroadds"}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <div className="sipdatbox  newpadsforbtn">
            <span className="">
              <img src={type === "lumpsum" ? SIPSave : type === "redemption" ? SIPSave : SIP} />
              <span className="lefcss">
                {
                  type === "lumpsum" ?
                    "Lumpsum" :
                    type === "redemption" ?
                      "Redemption" :
                      type === "fundSwitch" ?
                        "Fund Switch " :
                        "SIP on"
                }
              </span>
              {type === "sip" && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="sipday"
                    views={["day"]}
                    value={sipStartDate}
                    // onChange={(value) => setStartDate(value)}
                    onChange={(value) => handleDateChange(scriptCode, value)}
                    sx={{
                      input: {
                        cursor: 'pointer',
                      }
                    }}
                    open={addSIPOpenState}
                    onClose={() => setAddSIPOpenState(false)}
                    onOpen={() => setAddSIPOpenState(true)}
                    slotProps={{
                      textField: {
                        error: !!errorMessages.date, // Apply error styling
                        helperText: errorMessages.date, // Display error message
                        inputProps: { readOnly: true },
                        onClick: () => setAddSIPOpenState(true)
                      },
                    }}
                    renderInput={(params) => <TextField {...params} sx={{
                      "& .MuiInputBase-input": {
                        caretColor: 'transparent'
                      }
                    }} />}
                    minDate={dayjs()}
                  />
                </LocalizationProvider>
              )}
            </span>
            {type === "sip" && (
              <span className='spaccings'>
                <img src={next} className='addspacingusiimg' />
                <span className="on3px">SIP starts on </span>
                <span className="blcfon">{sipStartDate ? sipStartDate.format("DD-MM-YYYY") : ""}</span>
              </span>
            )}
          </div>
        </Grid>

        <Grid item xs={6} sm={6} md={6} lg={3} className="adjment">
          <div className="sipdatbox leftmeincell">
            <NumberFormatInput className='minhforin colsaa'
              value={txnAmountUnit[type]?.[scriptCode] || ""} // Dynamically use the state based on type and scriptCode
              onChange={(value) => {
                handleAmountChange(value, type, scriptCode)
              }
              } // Pass scriptCode to handleAmountChange
              placeholder={type === "sip" ? `Enter ${formConfig.find(field => field.dispatcherName === "SIPOrderAmount" && field.quickOrderType === "SIP")?.displayName || "SIPOrderAmount"}`
                : type === "redemption" ? `Enter ${formConfig.find(field => field.dispatcherName === "OrderAmount")?.displayName || "OrderAmount"}`
                  : type === "fundSwitch" ? `Enter ${formConfig.find(field => field.dispatcherName === "OrderAmount")?.displayName || "OrderAmount"}`
                    : `Enter ${formConfig.find(field => field.dispatcherName === "OrderAmount" && field.quickOrderType === "Lumpsum")?.displayName || "OrderAmount"}`} // Dynamically set the placeholder
              variant="outlined"
              size="small"
              error={!!errorMessages.amount}
              helperText={errorMessages.amount}
              slotProps={{
                input: {
                  onInput: handleNumericInput, // Add the handleInput function here
                },
              }}
            />
          </div>
          {type === "sip" ? (
            <>
              <span className='leftfloats'>
                {
                  // isEditing.includes(list.icid) && (
                  <>
                    <span className='subfont '>{formConfig.find(field => field.dispatcherName === "MinSIPValue")?.displayName}</span>
                    <b>
                      {
                        (() => {
                          const SipFrequency = selectedSearchedValue[0]?.SipFrequency;
                          const MinInvAmount = selectedSearchedValue[0]?.MinInvAmount;
                          const selectedValue = "4";

                          const index = SipFrequency?.indexOf(selectedValue);

                          return index !== -1 ? MinInvAmount?.[index] : "N/A";
                        })()
                      }
                    </b>
                  </>
                  // )
                }
              </span>
            </>
          ) : type === "redemption" ? (  //added for redemption
            <>
              <div className='fullsize'>
                <span className='leftfloats'>
                  {
                    // isEditing.includes(list.icid) && (
                    <>
                      <span className='subfont '>
                        {"Min. Redemption Order Value"}
                      </span>
                      <b>
                        {selectedSearchedValue[0]?.MinRedeemAmount}
                      </b>
                    </>
                    // )
                  }
                </span>
              </div>

            </>

          ) :

            (
              <>
                <div className='fullsize'>
                  <span className='leftfloats'>
                    {
                      // isEditing.includes(list.icid) && (
                      <>
                        <span className='subfont '>
                          {formConfig.find(field => field.fieldName === "Min. Order Value" && field.quickOrderType === "Lumpsum")?.displayName}
                        </span>
                        <b>
                          {selectedSearchedValue[0]?.MinPurchaseAmt}
                        </b>
                      </>
                      // )
                    }
                  </span>
                </div>
              </>
            )}
        </Grid>

        <Grid item xs={6} sm={6} md={4} lg={1}>
          <div className="sipdatbox ">
            <IconButton onClick={handleAddToCart} className="editsave" color="primary">
              <img src={Savenew} />
            </IconButton>
            <IconButton onClick={() => {
              setValidationErrors(prev => {
                const updated = { ...prev };
                delete updated[scriptCode + type]
                return updated
              })
              toggleDisplay(type, scriptName)
            }} className="editsave" color="primary">
              <img src={Delete1} />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    );
  };

  const handleEditClick = useCallback((id, scriptCode, amount, startDate, type) => {

    const body = {
      // clientCode: "35",
      clientCode: clientCode,
      userId: "integra",
      transactionType: 2,
      searchString: "",
      lastBusinessDate: new Date().toISOString(),
      getData: 1,
      schemeCode: scriptCode
    };

    // Dispatch the API action
    dispatch(actionCreators.GetSchemeList(body))
    // Populate the state with current values for editing
    const errors = {};
    let minAmount;

    if (type === 2) {
      const SipFrequency = selectedSearchedValue[0]?.SipFrequency;
      const MinInvAmount = selectedSearchedValue[0]?.MinInvAmount;
      const selectedValue = "4"; // Example selected frequency
      const index = SipFrequency?.indexOf(selectedValue);
      minAmount = index !== -1 ? MinInvAmount?.[index] : "N/A";
    } else if (type === 1) {
      minAmount = selectedSearchedValue[0]?.MinPurchaseAmt;
    }
    //redemption
    else if (type === 3) {
      minAmount = selectedSearchedValue[0]?.MinRedeemAmount;
    }
    else if (type === 6) {
      minAmount = selectedSearchedValue[0]?.MinPurchaseAmt;
    }

    if (Number(amount) < Number(minAmount)) {
      errors[id] = {
        ...errors[id],
        amount: `Minimum amount for ${type === 2 ? 'SIP'
          : type === 3 ? 'Redemption' //line added for redemption
            : 'Lumpsum'} is ${minAmount}`,
      };
    }

    // Validate if the amount exists for the specified type (SIP or Lumpsum)
    if (!amount) {
      errors[id] = {
        ...errors[id],
        amount: `${type === 2 ? "SIP"
          : type === 3 ? 'Redemption' //line added for redemption
            : "Lumpsum"} amount is required.`,
      };
    }

    // Validate if SIP start date is provided (only for "sip" type)
    if (type === 2 && !startDate) {
      errors[id] = {
        ...errors[id],
        date: "Start date is required.",
      };
    }

    // If there are any validation errors, set them and exit the function early
    if (Object.keys(errors).length > 0) {
      setValidationErrors((prev) => ({
        ...prev,
        ...errors,
      }));
      return; // Return early if validation errors exist
    }
    // setIsEditing(true);
    // setIsEditing2(true);
    setIsEditing([...isEditing, id]);

  }, []);

  const handleSaveClick = useCallback((id, scriptCode, amount, startDate, type) => {

    const body = {
      clientCode: clientCode,
      userId: "integra",
      transactionType: 2,
      searchString: "",
      lastBusinessDate: new Date().toISOString(),
      getData: 1,
      schemeCode: scriptCode
    };
    // Dispatch the API action
    dispatch(actionCreators.GetSchemeList(body));

    const errors = {
      ...validationErrors
    };


    let minAmount;

    if (type === 2) {
      const SipFrequency = selectedSearchedValue[0]?.SipFrequency;
      const MinInvAmount = selectedSearchedValue[0]?.MinInvAmount;
      const selectedValue = "4"; // Example selected frequency
      const index = SipFrequency?.indexOf(selectedValue);
      minAmount = index !== -1 ? MinInvAmount?.[index] : "N/A";
    } else if (type === 1) {
      minAmount = selectedSearchedValue[0]?.MinPurchaseAmt;
    }
    //redemption changes
    else if (type === 3) {
      minAmount = selectedSearchedValue[0]?.MinRedeemAmount;
    }
    else if (type === 6) {
      minAmount = selectedSearchedValue[0]?.MinPurchaseAmt;
    }

    if (Number(amount) < Number(minAmount)) {
      errors[id] = {
        ...errors[id],
        amount: `Minimum amount for ${type === 2 ? 'SIP'
          : type === 3 ? 'Redemption' //line added for redemption
            : 'Lumpsum'} is ${minAmount}`,
      };
    }

    // Validate if the amount exists for the specified type (SIP or Lumpsum)
    if (!amount) {
      errors[id] = {
        ...errors[id],
        amount: `${type === 2 ? "SIP"
          : type === 3 ? 'Redemption' //line added for redemption
            : "Lumpsum"} amount is required.`,
      };
    }

    // Validate if SIP start date is provided (only for "sip" type)
    if (type === 2 && !startDate) {
      errors[id] = {
        ...errors[id],
        date: "Start date is required.",
      };
    }
    // If there are any validation errors, set them and exit the function early
    if (Object.keys(errors).length > 0) {
      setValidationErrors((prev) => ({
        ...prev,
        ...errors,
      }));
      return; // Return early if validation errors exist
    }


    handeleUpdateCart(id);
    setIsEditing([...isEditing.filter((item) => item !== id)]);
    // setIsEditing(false);
    // setIsEditing2(false);
  }, [cartList]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handeleDeleteCart = (id) => {
    api.post('/InvestmentCart/removeCart',
      [{ "icid": id }]
    ).then((res) => {
      // setAlertOpen({ show: true, msg: res.data.message, type: "success" })
      showModal({ show: true, text: res.data.message, icon: "success" })
      getCartList()
    }).catch((error) => showModal({ show: true, text: error, icon: "error" }));
  }

  const handleCloseAlert = () => {
    showModal({ show: false, text: '' });
  };

  const handeleUpdateCart = (id) => {
    const data = cartList.find(item => item.icid == id)
    const payload = {
      "icid": id,
      "txnAmountUnit": data.txnAmountUnit,
      "valueDate": new Date(data.valueDate),
      "startDate": new Date(data.startDate)
    }
    api.post('/InvestmentCart/updateCartDetails', [payload]).then((res) => {
      // setCartList(res.data.data);
      showModal({ show: true, text: res.data.message, icon: "success" })
      getCartList()
    }).catch((error) => showModal({ show: true, text: error, icon: "error" }));
  }

  const getCartList = () => {
    setLoading(prev => ({ ...prev, cart: true }));
    dispatch(actionCreators.getCartList({
      // "clientCode": 35
      "clientCode": clientCode
    })).then((res) => {
      const count = res.data.data.length;
      setCartCount(count);
      setCartList(res.data.data);
      setLoading(prev => ({ ...prev, cart: false }));
    }).catch(() => {
      setLoading(prev => ({ ...prev, cart: false }));
    })
    // api.post('/InvestmentCart/getCartDetails', {
    //   "clientCode": 35
    // }).then((res) => {

    //   const count = res.data.data.length;
    //   setCartCount(count);
    //   setCartList(res.data.data);
    // });
  }

  useEffect(() => {
    getCartList();
  }, [])

  useEffect(() => {
    setCartList(cartListData)
    setCartCount(cartListData.length);
  }, [cartListData])

  const groupingCartList = useMemo(() => {
    const reducedTransactions = cartList.reduce((acc, transaction) => {
      const { scriptName } = transaction;

      if (scriptName) {
        if (!acc[scriptName]) {
          acc[scriptName] = [];
        }
        acc[scriptName].push(transaction);
      }

      return acc;
    }, {});

    // Convert object to array format if desired
    const groupedTransactions = Object.keys(reducedTransactions).map(key => ({
      scriptName: key,
      cart: reducedTransactions[key]?.sort((a, b) => {
        return b.transactionType - a.transactionType

      })
    }));

    return groupedTransactions || [];
  }, [cartList])
  const amountChangeHandler = useCallback((value, id, scriptCode, type) => {
    let minAmount;
    if (type === 2) {
      const SipFrequency = selectedSearchedValue[0]?.SipFrequency;
      const MinInvAmount = selectedSearchedValue[0]?.MinInvAmount;
      const selectedValue = "4"; // Example selected frequency
      const index = SipFrequency?.indexOf(selectedValue);
      minAmount = index !== -1 ? MinInvAmount?.[index] : "N/A";
    } else if (type === 1) {
      minAmount = selectedSearchedValue[0]?.MinPurchaseAmt;
    } else if (type === 3) {
      minAmount = selectedSearchedValue[0]?.MinRedeemAmount;
    }
    else if (type === 6) {
      minAmount = selectedSearchedValue[0]?.MinPurchaseAmt;
    }

    // Validate the user input based on the dynamic minimum values
    if (Number(value) < Number(minAmount)) {
      setValidationErrors((prev) => ({
        ...prev,
        [id]: { ...prev[id], amount: `Minimum amount for ${type === 2 ? 'SIP' : type === 1 ? 'Lumpsum' : type === 3 ? 'Redemption' : type === 6 ? 'fundSwitch' : ''} is ${minAmount}` },
      }));
    } else {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };

        if (newErrors[id] && Object.keys(newErrors[id]).length === 1) {
          delete newErrors[id];
        } else {
          delete newErrors[id]?.amount;
        }

        return newErrors;
      });
    }

    setTxnAmountUnit((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [id]: value,
      },
    }));

    // setCartList((items) => [...items.map((data) => {
    //   if (data?.icid === id) {
    //     data.txnAmountUnit = value
    //   }
    //   return data
    // })])
    // the above was causing state mutation error 
    setCartList((items) =>
      items.map((data) =>
        data?.icid === id
          ? { ...data, txnAmountUnit: value }
          : data
      )
    );
  }, [cartList])

  const dateChangeHandler = useCallback((date, id) => {
    // Validate that the date is selected
    if (!date) {
      setValidationErrors((prev) => ({
        ...prev,
        [id]: { ...prev[id], date: 'Start date is required.' },
      }));
    } else {
      // setValidationErrors((prev) => ({
      //   ...prev,
      //   [id]: { ...prev[id], date: '' }, // Clear error
      // }));
      setValidationErrors((prev) => {
        const newErrors = { ...prev };

        if (newErrors[id] && Object.keys(newErrors[id]).length === 1) {
          // If the object only contains the 'date' key, delete the entire object
          delete newErrors[id];
        } else {
          // Otherwise, just delete the 'date' key
          delete newErrors[id]?.date;
        }

        return newErrors;
      });
    }

    setStartDate((prevDates) => ({
      ...prevDates,
      [id]: date,
    }));

    const newdate = dayjs(date).format('YYYY-MM-DD')
    // return
    // setCartList((items) => [...items.map((data) => {
    //   if (data.icid == id) {
    //     data.startDate = newdate
    //   }
    //   return data

    // })])
    //Above was causing state mutation error 
    setCartList((items) =>
      items.map((data) =>
        data.icid === id ? { ...data, startDate: newdate } : data
      )
    );
  }, [cartList])

  const handleCheckboxChange = (event, id) => {
    const { checked } = event.target;
    if (checked) {
      SetselectedCheckbox([...selectedCheckbox, id]);
    } else {
      SetselectedCheckbox(selectedCheckbox.filter((item) => item !== id));
    }
  };

  const calculatePrice = useMemo(() => {
    const totalPrice = selectedCheckbox.reduce((total, id) => {
      // const item = cartList.filter((item) => item.scriptName === id && item.transactionType === 1);
      const filteredItems = cartList.filter(item =>
        selectedCheckbox.includes(item.icid) // Only include items with scriptName in selectedCheckbox
      ).map(item => item.transactionType === 1 ? ({
        icid: item.icid,
        "entityId": 1,
        "productSubClassId": "3",
        "portfolioTypeId": " 1",
        "productClassId": 1,
        "orderTypeId": 2
      }) : ({
        icid: item.icid,
        "entityId": 1,
        "productSubclassId": "3",
        "portfolioTypeId": "1",
        "productClassId": 1,
        "orderTypeId": 2
      }));

      SetselectedItems(filteredItems);
      const price = cartList.filter(item =>
        selectedCheckbox.includes(item.icid) && [1, 2].includes(item.transactionType)// Only include items with scriptName in selectedCheckbox
      ).reduce((total, item) => total + Number(item.txnAmountUnit), 0);
      // total += Number(price);
      return price;


    }, 0);
    return totalPrice;
  }, [selectedCheckbox, cartList])

  const handleAllSelected = (event) => {
    if (event.target.checked) {
      const allCheckbox = cartList.map((item) => item.icid);
      SetselectedCheckbox(allCheckbox);
    } else {
      SetselectedCheckbox([]);
    }
  };

  const handlePayNow = () => {
    dispatch(actionCreators.PlaceOrderDetails(selectedItems))
      .then((res) => {
        showModal({ show: true, text: res.data.message, icon: 'success' })
        getCartList();
      })
      .catch((error) => {
        showModal({ show: true, text: error, icon: "error" })
      });
  };

  // -----------------------------------------------SIP MANAGER API CALLING---------------------------
  const getSIPManager = () => {
    api.post('/systematicManagerConfigurator/getSIPManagerConfiguredField').then((response) => {
      setSipManagerActionData(response.data.action);
      setSipManagerConfigData(response.data.data)
    });
  }

  const getSIPManagerDataDetails = () => {
    setLoading(prev => ({ ...prev, sip: true }));
    api.post('/standingInstruction/getStandingInstructionsDetail', {
      "usrId": "integra",
      "famCode": 0,
      "headCode": "0",
      "clientCode": 35,
      "dueDateFrom": today,
      "dueDateTo": managersTimePeriod,
      "clientType": "C",
      "reportType": "detail",
      "systematicOrderType": "2",
      ...sipFilterValues
    }).then((response) => {
      setSipManagerCount(response.data.data.length)
      setSipManagerTableData(response.data.data);
      setLoading(prev => ({ ...prev, sip: false }));
    }).catch(() => {
      setLoading(prev => ({ ...prev, sip: false }));
    });
  }
  // ----------------------------------SIP MANAGER API CALLING ENDS-------------------------------

  // -----------------------------------------------STP MANAGER API CALLING---------------------------
  const getSTPManager = () => {
    api.post('/systematicManagerConfigurator/getSTPManagerConfiguredField').then((response) => {
      setStpManagerActionData(response.data.action);
      setStpManagerConfigData(response.data.data)
    });
  }

  const getSTPManagerDataDetails = () => {
    setLoading(prev => ({ ...prev, stp: true }));
    api.post('/standingInstruction/getStandingInstructionsDetail', {
      "usrId": "integra",
      "famCode": 0,
      "headCode": "0",
      "clientCode": 35,
      "dueDateFrom": today,
      "dueDateTo": managersTimePeriod,
      "clientType": "C",
      "reportType": "detail",
      "systematicOrderType": "5",
      ...stpFilterValues
    }).then((response) => {
      setStpManagerCount(response.data.data.length)
      setStpManagerTableData(response.data.data);
      setLoading(prev => ({ ...prev, stp: false }));
    }).catch(() => {
      setLoading(prev => ({ ...prev, stp: false }));
    });
  }
  // ----------------------------------STP MANAGER API CALLING ENDS-------------------------------

  // -----------------------------------------------SWP MANAGER API CALLING---------------------------
  const getSWPManager = () => {
    api.post('/systematicManagerConfigurator/getSWPManagerConfiguredField').then((response) => {
      setSwpManagerActionData(response.data.action);
      setSwpManagerConfigData(response.data.data)
    });
  }

  const getSWPManagerDataDetails = () => {
    setLoading(prev => ({ ...prev, swp: true }));
    api.post('/standingInstruction/getStandingInstructionsDetail', {
      "usrId": "integra",
      "famCode": 0,
      "headCode": "0",
      "clientCode": 35,
      "dueDateFrom": today,
      "dueDateTo": managersTimePeriod,
      "clientType": "C",
      "reportType": "detail",
      "systematicOrderType": "8",
      ...swpFilterValues
    }).then((response) => {
      setSwpManagerCount(response.data.data.length)
      setSwpManagerTableData(response.data.data);
      setLoading(prev => ({ ...prev, swp: false }));
    }).catch(() => {
      setLoading(prev => ({ ...prev, swp: false }));
    });
  }
  // ----------------------------------SWP MANAGER API CALLING ENDS-------------------------------

  const getTransactions = () => {
    setLoading(prev => ({ ...prev, transactions: true }));
    api.post('/mutualFundOrder/getTransactions', {
      userId: 2,
      // clientCode: 35,
      clientCode: clientCode,
      ...filterValues,
      sorting: {
        ...transactionsSortingState
      },
      "pageNum": transactionPaginationState.pageNum,
      "pageSize": transactionPaginationState.pageSize,
    }).then((response) => {
      const count = response?.data?.totalRecord || 0;
      setTransactionsCount(count);
      setTransactionsTableData(response.data.data);
      setTransactionTotalData(response?.data?.totalRecord);
      setLoading(prev => ({ ...prev, transactions: false }));
    }).catch(() => {
      setLoading(prev => ({ ...prev, transactions: false }));
    });
  }

  const getHolding = () => {
    setLoading(prev => ({ ...prev, holdings: true }));
    const tablebody = {
      userId: 2,
      // clientCode: 35,
      clientCode: clientCode,
      "schemeName": "",
      "orderType": "",
      "holdingDateFrom": "",
      "holdingDateTo": "",
      // "userId": "Adminchecker",
      "userType": "2",
      "userCode": "1",
      "lastBusinessDate": today,
      // "lastBusinessDate": "2025-01-28T00:00:00",
      "currencyCode": "1",
      "amountDenomination": "0",
      "accountLevel": "0",
      ...filterValues,
      sorting: {
        ...holdingSortingState
      }

    }
    dispatch(actionCreators.GetHoldingDetails(tablebody))
      .then((res) => {
        const count = res?.data?.totalRecord || 0;
        setHoldingCount(count);
        setTableData(res.data.data.schemeLevel);
        setLoading(prev => ({ ...prev, holdings: false }));
      }).catch(() => {
        setLoading(prev => ({ ...prev, holdings: false }));
      });
  }

  const GetHoldingReportConfiguredDetailsList = () => {
    const body = {
      "productClassId": 1,
      "userId": 0
    }
    dispatch(actionCreators.GetHoldingReportConfiguredDetails(body))
      .then((res) => {
        const filterData = res.data?.data.fieldsAtSchemeLevel?.filter((item) => item.isFilterApply === "Y");
        const schemeConfig = res.data?.data.fieldsAtSchemeLevel;
        setFilterConfig(filterData);
        setTableConfig(schemeConfig);
        // getHolding()
      })
      .catch((error) => {
        console.error("Error placing order", error);
      });
  };

  const handleClickOpen = (list, icid, name) => {
    setModalOpen({ list, icid, name });
  };

  const cartListComponent1 = useCallback(({ list, type = 'sip' }) => {

    return <>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6, }} >
        <div className='sipdatbox '>
          <span className='simpcheck'>
            <Checkbox checked={selectedCheckbox.includes(list.icid)} onChange={(e) => handleCheckboxChange(e, list.icid)} />
          </span>
          <span className=''>
            <img src={SIP} />
            <span className='lefcss'>{`${type.toLocaleUpperCase()} On`}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className='sipday'
                  views={['day']}
                  defaultValue={dayjs().date(5)}
                  value={dayjs(list.startDate)}
                  onChange={(value) => dateChangeHandler(value, list.icid, list.scriptCode)}
                  disabled={!isEditing.includes(list.icid)} // Disable select if not in edit mode
                  open={!!openState[list.icid]} // Use unique key for each picker
                  onClose={() => handleClose(list.icid)}
                  onOpen={() => handleOpen(list.icid)}
                  slotProps={{
                    textField: {
                      error: !!validationErrors[list.icid]?.date,
                      helperText: validationErrors[list.icid]?.date,
                      inputProps: { readOnly: true },
                      onClick: () => handleOpen(list.icid),
                    },
                  }}
                  renderInput={(params) => <TextField {...params} sx={{
                    "& .MuiInputBase-input": {
                      caretColor: 'transparent'
                    }
                  }}
                  />
                  }
                  minDate={dayjs()}
                  sx={{
                    input: {
                      cursor: 'pointer',
                    }
                  }}
                />
              </LocalizationProvider>
            </span>
          </span>
          <span>
            <span className='spaccings'>
              <img src={next} className='addspacingusiimg' />
            </span>
            <span className='on3px'>{`${type.toLocaleUpperCase()} Starts On`} </span>
            <span className='blcfon'>{dayjs(list.startDate).format('DD-MM-YYYY')}</span>
          </span>
          <Button variant="outlined"
            //  onClick={() => handleClickOpen('sip')}
            onClick={() => handleClickOpen(list, list.icid, type)}
            className='advacncebtnblank'>
            <span className='unnerlinetxt'>Advance +</span>
          </Button>
        </div>
      </Grid>
      <Grid size={{ xs: 6, sm: 6, md: 6, lg: 4, }} >
        <div className='sipdatboxcenter flomecenter'>
          {/* <Grid size={{ xs: 4, sm: 4, md: 4, lg: 2, }} >
    <div className='sipdatbox txtleftme sipdatboxcenter flomecenter'> */}
          <span className='intxts newintxts'>
            <NumberFormatInput
              className='minhforin'
              onChange={(value) => amountChangeHandler(value, list.icid, list.scriptCode, list.transactionType)}
              value={list.txnAmountUnit}

              placeholder={`Enter ${formConfig.find(field => field.dispatcherName === "SIPOrderAmount" && field.quickOrderType === "SIP")?.displayName || "SIPOrderAmount"}`}
              slotProps={{
                input: {
                  onInput: handleNumericInput, // Add the handleInput function here
                },
              }}
              disabled={!isEditing.includes(list.icid)}
              variant="outlined"
              size="small"
              error={!!validationErrors[list.icid]?.amount}
              helperText={validationErrors[list.icid]?.amount}
            />
          </span>
        </div>
        <span className=''>
          {
            isEditing.includes(list.icid) && (
              <>
                <span className='subfont '>{formConfig.find(field => field.dispatcherName === "MinSIPValue")?.displayName}</span>
                <span className='subfont'> :</span>&nbsp;
                <b>
                  {
                    (() => {
                      const SipFrequency = selectedSearchedValue[0]?.SipFrequency;
                      const MinInvAmount = selectedSearchedValue[0]?.MinInvAmount;
                      const selectedValue = "4";

                      const index = SipFrequency?.indexOf(selectedValue);

                      return index !== -1 ? MinInvAmount?.[index] : "N/A";
                    })()
                  }
                </b>
              </>
            )
          }
        </span>
      </Grid>
      <Grid size={{ xs: 6, sm: 6, md: 6, lg: 2, }} >
        <div className='sipdatbox sipdatboxcenter txtleftme'>
          {isEditing.includes(list.icid) ? (
            <IconButton onClick={() => handleSaveClick(list.icid, list.scriptCode, list.txnAmountUnit, list.startDate, list.transactionType)} className='editsave' color="primary">
              <img src={Savenew} />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleEditClick(list.icid, list.scriptCode, list.txnAmountUnit, list.startDate, list.transactionType)} className='editsave' color="primary">
              <img src={note} />
            </IconButton>
          )}
          <span>

            <IconButton onClick={() => handeleDeleteCart(list.icid)} className='editsave' color="primary">
              <img src={Delete1} />
            </IconButton>
          </span>
        </div>
      </Grid>
    </>
  }, [cartList, selectedCheckbox, isEditing, openState, selectedSearchedValue])

  const cartListComponent2 = useCallback(({ list, type = 'lumpsum' }) => {


    return <>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6, }} >
        <div className='sipdatbox sipdatboxcenter'>
          <span className='simpcheck'><Checkbox checked={selectedCheckbox.includes(list.icid)} onChange={(e) => handleCheckboxChange(e, list.icid)} /></span>

          <span>
            <img src={SIPSave} />
            <span className='lefcss'>{type.toLocaleUpperCase()}</span>
          </span>
          <span>
            <span className='spaccings'>
              <img src={next} className='addspacingusiimg' />
            </span>
            <span className='on3px'>Value Date On </span>
            <span className='blcfon'>{dayjs(list.valueDate).format("DD-MM-YYYY")}</span>
          </span>
          <Button variant="outlined" onClick={() => handleClickOpen(list, list.icid, type)} className='advacncebtnblank'>
            <span className='unnerlinetxt'>Advance +</span>
          </Button>
        </div>
      </Grid>

      <Grid size={{ xs: 6, sm: 6, md: 6, lg: 4, }} >
        <div className='  sipdatboxcenter flomecenter '>
          <span className='intxts newintxts'>

            <NumberFormatInput className='minhforin'
              value={list.txnAmountUnit}
              onChange={(value) => amountChangeHandler(value, list.icid, list.scriptCode, list.transactionType)}
              placeholder={`Enter ${formConfig.find(field => field.dispatcherName === "OrderAmount" && field.quickOrderType === "Lumpsum")?.displayName || "OrderAmount"}`}
              slotProps={{
                input: {
                  onInput: handleNumericInput, // Add the handleInput function here
                },
              }}
              disabled={!isEditing.includes(list.icid)}
              variant="outlined"
              size="small"
              error={!!validationErrors[list.icid]?.amount}
              helperText={validationErrors[list.icid]?.amount}
            />
          </span>
        </div>

        <div className='fullsize'>
          <span className=''>
            {
              isEditing.includes(list.icid) && (
                <>
                  <span className='subfont '>
                    {formConfig.find(field => field.fieldName === "Min. Order Value" && field.quickOrderType === "Lumpsum")?.displayName}
                  </span>
                  <span className='subfont'> :</span>&nbsp;
                  <b>
                    {selectedSearchedValue[0]?.MinPurchaseAmt}
                  </b>
                </>
              )
            }
          </span>
        </div>
      </Grid>
      <Grid size={{ xs: 6, sm: 6, md: 6, lg: 2, }} >
        <div className='sipdatbox txtleftmeadditional sipdatboxcenter'>
          {isEditing.includes(list.icid) ? (
            <IconButton onClick={() => handleSaveClick(list.icid, list.scriptCode, list.txnAmountUnit, list.startDate, list.transactionType)} className='editsave' color="primary">
              <img src={Savenew} />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleEditClick(list.icid, list.scriptCode, list.txnAmountUnit, list.startDate, list.transactionType)} className='editsave' color="primary">
              <img src={note} />
            </IconButton>
          )}
          {/* <span> */}
          <IconButton onClick={() => handeleDeleteCart(list.icid)} className='editsave' color="primary">
            <img src={Delete1} />
          </IconButton>
          {/* </span> */}
        </div>
        <div className='hei20px'></div>
      </Grid>
    </>
  }, [cartList, selectedCheckbox, isEditing, selectedSearchedValue])

  // ----------------------------------redemption---------------------
  const cartListComponent3 = useCallback(({ list, type = 'redemption' }) => {
    return <>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6, }} >
        <div className='sipdatbox sipdatboxcenter'>
          <span className='simpcheck'><Checkbox checked={selectedCheckbox.includes(list.icid)} onChange={(e) => handleCheckboxChange(e, list.icid)} /></span>

          <span>
            <img src={SIPSave} />
            <span className='lefcss'>{type.toLocaleUpperCase()}</span>
          </span>
          <span>
            <span className='spaccings'>
              <img src={next} className='addspacingusiimg' />
            </span>
            <span className='on3px'>Value Date On </span>
            <span className='blcfon'>{dayjs(list.valueDate).format("DD-MM-YYYY")}</span>
          </span>
          <Button variant="outlined" onClick={() => handleClickOpen(list, list.icid, type)} className='advacncebtnblank'>
            <span className='unnerlinetxt'>Advance +</span>
          </Button>
        </div>
      </Grid>

      <Grid size={{ xs: 6, sm: 6, md: 6, lg: 4, }} >
        <div className=' sipdatboxcenter flomecenter '>
          <span className='intxts newintxts'>

            <NumberFormatInput className='minhforin'
              value={list.txnAmountUnit}
              onChange={(value) => amountChangeHandler(value, list.icid, list.scriptCode, list.transactionType)}
              placeholder={`Enter Redemption Order Amt`}
              slotProps={{
                input: {
                  onInput: handleNumericInput, // Add the handleInput function here
                },
              }}
              disabled={!isEditing.includes(list.icid)}
              variant="outlined"
              size="small"
              error={!!validationErrors[list.icid]?.amount}
              helperText={validationErrors[list.icid]?.amount}
            />
          </span>
        </div>
        <div className='fullsize'>
          <span className=''>
            {
              isEditing.includes(list.icid) && (
                <>
                  <span className='subfont '>
                    {"Min. Redemption Order Value"}
                  </span>
                  <b>
                    {selectedSearchedValue[0]?.MinRedeemAmount}
                  </b>
                </>
              )
            }
          </span>
        </div>
      </Grid>
      <Grid size={{ xs: 6, sm: 6, md: 6, lg: 2, }} >
        <div className='sipdatbox txtleftmeadditional sipdatboxcenter'>
          {isEditing.includes(list.icid) ? (
            <IconButton onClick={() => handleSaveClick(list.icid, list.scriptCode, list.txnAmountUnit, list.startDate, list.transactionType)} className='editsave' color="primary">
              <img src={Savenew} />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleEditClick(list.icid, list.scriptCode, list.txnAmountUnit, list.startDate, list.transactionType)} className='editsave' color="primary">
              <img src={note} />
            </IconButton>
          )}
          {/* <span> */}
          <IconButton onClick={() => handeleDeleteCart(list.icid)} className='editsave' color="primary">
            <img src={Delete1} />
          </IconButton>
          {/* </span> */}
        </div>
        <div className='hei20px'></div>
      </Grid>
    </>
  }, [cartList, selectedCheckbox, isEditing])

  useEffect(() => {
    api.post('/orderConfigurator/transactionConfigurators', {
      "productClassId": 1
    }).then((response) => {
      setDefaultTransactionPageSize(response.data.pageSize)
      setTransactionsTableConfig(response.data.data);
      // getTransactions();
    });

    GetHoldingReportConfiguredDetailsList();

    getSIPManager();
    getSIPManagerDataDetails();

    getSTPManager();
    getSTPManagerDataDetails();

    getSWPManager();
    getSWPManagerDataDetails();
  }, []);

  useEffect(() => {
    getTransactions();
  }, [transactionsSortingState, transactionPaginationState]);

  useEffect(() => {
    getHolding();
  }, [holdingSortingState]);

  useEffect(() => {
    if (path === "sip") {
      setValue(3);
    }
    else if (path === "swp") {
      setValue(4);
    }
    else if (path === "stp") {
      setValue(5);
    }
  }, [path])

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab
          label={
            <div>
              <span>Cart</span>
              <small className='tabsspanbctxt orangetabsmall'>{cartCount}</small>
            </div>
          }
          {...a11yProps(0)}
        />
        <Tab label={
          <div>
            <span>Holdings</span>
            <small className='tabsspanbctxt orangetabsmall'>{hodingCount}</small>
          </div>
        } {...a11yProps(1)} />
        <Tab
          label={
            <div>
              <span>Transactions</span>
              <small className='tabsspanbctxt orangetabsmall'>{transactionsCount}</small>
            </div>
          } {...a11yProps(2)} />
        <Tab label={
          <div>
            <span>SIP</span>
            <small className='tabsspanbctxt orangetabsmall'>{sipManagerCount}</small>
          </div>
        } {...a11yProps(3)} />
        <Tab label={
          <div>
            <span>SWP</span>
            <small className='tabsspanbctxt orangetabsmall'>{swpManagerCount}</small>
          </div>
        } {...a11yProps(4)} />
        <Tab label={
          <div>
            <span>STP</span>
            <small className='tabsspanbctxt orangetabsmall'>{stpManagerCount}</small>
          </div>
        } {...a11yProps(5)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        {
          loading.cart ? getTabSkeleton.cart : groupingCartList.length ? (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 9, }} className='tabspadding' >
                <div className='width100 smallchecks paddselall '>
                  <FormGroup className='selectall'>
                    <FormControlLabel control={<Checkbox checked={selectedCheckbox.length == cartList.length} onChange={handleAllSelected} />} label="Select All" />
                  </FormGroup>
                </div>
                <div className='width100 extracssforgaps'>
                  <div>
                    {groupingCartList.length && groupingCartList.map((items, index) => {
                      const hasSIP = items.cart.some(list => list.transactionType === 2);
                      const hasLumpsum = items.cart.some(list => list.transactionType === 1);
                      const hasRedemption = items.cart.some(list => list.transactionType === 3); //redemption
                      return (
                        <Box key={`${items.scriptName}_${index}`} className="borderbott padsbottomadjs ">
                          <Grid container spacing={2} className='smallchecks'>
                            {/* <FormGroup className='width100 '>
                              <FormControlLabel control={<Checkbox checked={selectedCheckbox.includes(items.scriptName)} onChange={(e) => handleCheckboxChange(e, items.scriptName)} />} label={
                                <div className='divforcellp'>
                                  <strong className='fontsbold'>{items.scriptName}</strong>
                                </div>
                              } />
                            </FormGroup> */}
                            <div className='divforcellp width100 headerstabright'>
                              <strong className='fontsbold paddle5px'>{items.scriptName}</strong>
                            </div>
                            {items.cart.map((list) =>
                              <>
                                {list.transactionType === 2 ? cartListComponent1({ list, type: 'sip' })
                                  : list.transactionType === 1 ? cartListComponent2({ list, type: 'lumpsum' })
                                    : list.transactionType === 8 ? cartListComponent1({ list, type: 'swp' })
                                      : list.transactionType === 6 ? cartListComponent2({ list, type: 'fundSwitch' })
                                        : list.transactionType === 3 ? cartListComponent3({ list, type: 'redemption' })
                                          : list.transactionType === 5 ? cartListComponent1({ list, type: 'stp' }) : null
                                }
                              </>
                            )}

                            {/* --------------------------------SIP, Redemption and Lumpsum rows generation------------------------- */}
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                              {visibleRows[items.scriptName]?.sip && renderRow("sip", items.scriptName, items.cart)}
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>

                              {visibleRows[items.scriptName]?.lumpsum && renderRow("lumpsum", items.scriptName, items.cart)}
                            </Grid>
                            {/* ------redemption rows---------------------------- */}

                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>

                              {visibleRows[items.scriptName]?.redemption && renderRow("redemption", items.scriptName, items.cart)}
                            </Grid>
                            {/* ------------------------Buttons for  SIP,Redemption and Lumpsum rows generation-----------------------------------*/}
                            <div>
                              {!hasSIP && !visibleRows[items.scriptName]?.sip && (
                                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                                  <div className="sipdatbox spacpaddings negupspace">
                                    <Button className='advacncebtn'
                                      onClick={() => toggleDisplay("sip", items.scriptName, items)}
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
                              )}
                            </div>
                            <div >
                              {!hasLumpsum && !visibleRows[items.scriptName]?.lumpsum && (
                                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                                  <div className="sipdatbox negsize negspace negupspace">
                                    <Button className='advacncebtn'
                                      onClick={() => toggleDisplay("lumpsum", items.scriptName, items)}
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
                            </div>
                            {/* --------------------redemption row----------------------------------- */}
                            {/* <div >
                              {!hasRedemption && !visibleRows[items.scriptName]?.redemption && (
                                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                                  <div className="sipdatbox negsize negspace">
                                    <Button className='advacncebtn'
                                      onClick={() => toggleDisplay("redemption", items.scriptName, items)}
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
                            </div> */}
                          </Grid >
                        </Box>
                      )
                    }
                    )}
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
                    {/* <div className='dattim'><span className='graycs'>Scheduled SIP:</span><span className="bld14 "> ₹ 15,000</span><img src={infoicon} /></div> */}
                    <div className='dattim'>
                      <table>
                        <tbody>
                          <tr>
                            <td><span className='graycs'>Scheduled SIP:</span></td>
                            <td><span className="bld14 "> ₹ 15,000</span></td>
                            <td><img src={infoicon} /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
          ) : <h3>No Cart Item Found</h3>
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          loading.holdings ? getTabSkeleton.holdings : (
            <MyHoldings
              tableConfig={tableConfig}
              tableData={tableData}
              filterConfig={filterConfig}
              filterValues={filterValues}
              setFilterValues={setFilterValues}
              getHolding={getHolding}
              sortingState={holdingSortingState}
              setSortingState={setHoldingSortingState}
            />
          )
        }

      </TabPanel>
      <TabPanel value={value} index={2}>
        {
          loading.transactions ? getTabSkeleton.transactions : (
            <TransactionTab
              tableConfig={transactionsTableConfig}
              tableData={transactionsTableData}
              filterValues={filterValues}
              setFilterValues={setFilterValues}
              getTransactions={getTransactions}
              sortingState={transactionsSortingState}
              setSortingState={setTransactionsSortingState}
              transactionTotalData={transactionTotalData}
              transactionPaginationState={transactionPaginationState}
              setTransactionPaginationState={setTransactionPaginationState}
              defaultTransactionPageSize={defaultTransactionPageSize}
            />
          )
        }
      </TabPanel>
      <TabPanel value={value} index={3}>
        {
          loading.sip ? getTabSkeleton.sip : (
            <SIPTab
              sipManagerActionData={sipManagerActionData}
              sipManagerConfigData={sipManagerConfigData}
              sipManagerTableData={sipManagerTableData}
              getSIPManagerDataDetails={getSIPManagerDataDetails}
              filterValues={sipFilterValues}
              setFilterValues={setSipFilterValues}
            />
          )
        }
      </TabPanel>
      <TabPanel value={value} index={4}>
        {
          loading.swp ? getTabSkeleton.swp : (
            <SWPTab
              swpManagerActionData={swpManagerActionData}
              swpManagerConfigData={swpManagerConfigData}
              getSWPManager={getSWPManager}
              getSWPManagerDataDetails={getSWPManagerDataDetails}
              filterValues={swpFilterValues}
              setFilterValues={setSwpFilterValues}
              swpManagerTableData={swpManagerTableData}
            />
          )
        }
      </TabPanel>
      <TabPanel value={value} index={5}>
        {
          loading.stp ? getTabSkeleton.stp : (
            <STPTab
              stpManagerActionData={stpManagerActionData}
              stpManagerConfigData={stpManagerConfigData}
              stpManagerTableData={stpManagerTableData}
              getSTPManagerDataDetails={getSTPManagerDataDetails}
              filterValues={stpFilterValues}
              setFilterValues={setStpFilterValues}
            />
          )
        }
      </TabPanel>

      <AdvanceModSIP setAlertOpen={setAlertOpen} cartList={modalOpen.list} cartId={modalOpen.icid} open={modalOpen.name === 'sip'} setOpen={() => setModalOpen({})} tab={"cart"} />
      <AdvanceModSubscription setAlertOpen={setAlertOpen} cartList={modalOpen.list} cartId={modalOpen.icid} open={modalOpen.name === 'lumpsum'} setOpen={() => setModalOpen({})} tab={"cart"} />
      <AdvanceModSTP setAlertOpen={setAlertOpen} cartList={modalOpen.list} cartId={modalOpen.icid} open={modalOpen.name === 'stp'} setOpen={() => setModalOpen({})} tab={"cart"} />
      <AdvanceModFundSwitch getCartList={getCartList} setAlertOpen={setAlertOpen} cartList={modalOpen.list} cartId={modalOpen.icid} open={modalOpen.name === 'fundSwitch'} setOpen={() => setModalOpen({})} tab={"cart"} />
      <SWP_Modal setAlertOpen={setAlertOpen} cartList={modalOpen.list} cartId={modalOpen.icid} open={modalOpen.name === 'swp'} setOpen={() => setModalOpen({})} tab={"cart"} />
      <AdvModRedemption setAlertOpen={setAlertOpen} cartList={modalOpen.list} cartId={modalOpen.icid} open={modalOpen.name === 'redemption'} setOpen={() => setModalOpen({})} tab={"cart"} />
    </Box >
  );
};

export default CartTabs;
