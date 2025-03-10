import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SubscriptionView from './SubscriptionView';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { actionCreators } from '../../../redux/actions/actionCreators';
import api from '../../../APIs/interceptor';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    maxHeight: '70vh', // Set a max height for the dialog content
    overflowY: 'auto', // Enable vertical scrolling when content overflows
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({ cartId, cartList, setAlertOpen, open, setOpen, tab, orderType }) {

  const dispatch = useDispatch();
  const methods = useForm();
  const cartDetails = useSelector((state) => state.GetCustomizeCartOrderDetails.data);
  const location = useLocation();
  const navigate = useNavigate();

  const defaultValues = {};

  const [formConfig, setFormConfig] = useState([]);
  const [udfConfig, setUdfConfig] = useState([])
  const [tableData, setTableData] = useState([]);
  const [folioList, setFolioList] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const { reset, handleSubmit } = methods;
  const investData = useSelector((state) => state.investNowLumpSumAction.data);
  const clientCode = import.meta.env.VITE_CLIENT_CODE;

  const handleClose = () => {
    setOpen(null);
  };

  //--------------for checking path ---------------------------
  const searchParams = new URLSearchParams(location.search);
  const pathParam = searchParams.get("path");

  const isInvestmentCartPath =
  location.pathname === "/investmentcarts" &&
  (!pathParam || ["sip", "swp", "stp"].includes(pathParam));

const isValidTab = ["holding", "sipManager", "stpManager", "swpManager"].includes(tab);
// -----------------------------------------------------------

  const autofillUdfData = () => {
    try {
      let investDataObject;
      if (location.pathname == '/investnow') {
        investDataObject = investData
      } else if (location.pathname == '/investmentcarts' || isInvestmentCartPath) {
        if (tab == 'cart') {
          investDataObject = cartDetails;
        } else if (tab == 'holding') {
          investDataObject = cartList;
        } else if (isValidTab) {
          investDataObject = cartList;
        }
      }
      
      const tableDataObject = {};
      let data = {}

      for (const key in investDataObject?.udfFieldValues) {
        if (key == 'dynamicTables') {
          for (const tablekey in investDataObject.udfFieldValues.dynamicTables) {
            const rowId = Math.floor(Math.random() * 1000000000);
            tableDataObject[tablekey] = [{
              "rowId": rowId,
              "value": {}
            }];
            investDataObject.udfFieldValues.dynamicTables[tablekey].forEach((item) => {
              for (const itemkey in item) {
                data[itemkey + '_' + rowId] = item[itemkey];
              }
            });
          }

        } else {
          for (const udfKey in udfConfig.formElementsConfig) {
            const element = udfConfig.formElementsConfig[udfKey]
            if (element.dispatchername == key) {
              data[key] = investDataObject.udfFieldValues[key]
            }
          }
        }
      }

      for (const key in formConfig) {
        defaultValues[formConfig[key].fieldName] = formConfig[key].defaultValue
      }

      const newData = {
        "MF Scheme": cartList.scriptName || cartList.schemeName,
        "Folio": investDataObject?.folio || defaultValues['Folio'],
        "Order By": cartList.orderBy || defaultValues['Order By'],
        "Order Amount": cartList.txnAmountUnit || defaultValues['Order Amount'],
        "Order Units": cartList.txnAmountUnit || defaultValues['Order Units'],
      }
      data = { ...data, ...newData }
      // if (cartDetails.udfFieldValues['multiselectdropdown']) data.multiselectdropdown = [cartDetails.udfFieldValues['multiselectdropdown']]
      if (investDataObject?.udfFieldValues?.['multiselectdropdown']) data.multiselectdropdown = [cartDetails?.udfFieldValues?.['multiselectdropdown']]
      setTableData(tableDataObject)
      reset(data)
      setIsReady(true);
    }
    catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const fetchConfigsAndAutofill = async () => {
      try {
        const fixedFieldsBody = {
          productClassId: 1,
          productSubClassIds: [3],
          orderTypeIds: 1,
          portfolioTypeIds: [1],
        };

        const UdfBody = {
          entityId: 1,
          productSubclassId: 3,
          portfolioTypeId: 1,
          productClassId: 1,
          orderTypeId: 1,
        };

        // Fetch both configurations simultaneously
        const [fixedFieldsResponse, udfResponse] = await Promise.all([
          dispatch(actionCreators.GetOrderViewConfiguratorDetails(fixedFieldsBody)),
          dispatch(actionCreators.GetOrderViewUdfConfiguratorDetails(UdfBody)),
        ]);

        // Check if both calls were successful
        if (
          fixedFieldsResponse?.status === 200 &&
          udfResponse?.status === 200
        ) {
          setFormConfig(fixedFieldsResponse.data.data);
          setUdfConfig(udfResponse.data.data.udfConfig);

          // Fetch cart details and scheme details if required
          await getCartDetails();

          // Autofill UDF data once configurations are loaded

          // Indicate readiness for rendering fields
        } else {
          console.error("Error in fetching configurations");
        }
      } catch (error) {
        console.error("Error fetching configurations or autofilling data:", error);
      }
    };

    if (open) {
      // fetchConfigsAndAutofill();
      // getSchemeDetails();

      Promise.all([fetchConfigsAndAutofill(), getSchemeDetails()]).then(() => {
        autofillUdfData();
      })
    }
  }, [dispatch, open,]);

  useEffect(() => {
    if (cartDetails) {
      autofillUdfData();
    }
  }, [cartDetails]);

  const getCartDetails = () => {
    if (cartId) {
      const payload = {
        "icid": cartId,
        "entityId": 1,
        "productSubClassId": "3",
        "portfolioTypeId": 1,
        "productClassId": 1,
        "orderTypeId": 1,
      }
      dispatch(actionCreators.GetCustomizeCartOrderDetails(payload)).then((res) => {
        if (res.status === 200) {
          // console.log(res);
        }
      })
        .catch((error) => {
          console.error("Error fetching config:", error);
        });
    }
  }

  const handleSaveSubmit = (data, type) => {
    try {
      let payload;
      payload = {
        "icid": cartList.icid,
        "icdid": cartDetails.icdid || "",
        "clientCode": cartList.clientCode,
        "transactionType": cartList.transactionType,
        "scriptCode": cartList.scriptCode,
        "scriptName": cartList.scriptName,
        "tranType": "B",
        "txnAmountUnit": data?.["Order By"] === "A" ? data?.["Order Amount"] : data?.["Order Units"],
        "valueDate": cartList.valueDate,
        "startDate": '',
        "nextInstallmentDate": null,
        "isDividend": cartList.isDividend,
        "dividendOption": cartList.dividendOption,
        "source": 1,
        "folio": data.Folio,
        orderBy: "A",
        frequency: "",
        tenorBasis: "",
        periodOrNoOfTransactions: "",
        EndDate: "",
        targetSchemeCode: "",
        targetSchemeName: "",
        targetFolio: "",
        udfFieldValues: { dynamicTables: {} }
      }

      const copyObject = { ...data }
      for (const key in tableData) {
        const rows = tableData[key];
        if (rows) {
          const tableDetailsValue = rows.map((row) => {
            const tableDetails = {}
            for (const dataKey in data) {
              if (dataKey.includes(row.rowId)) {
                delete copyObject[dataKey]
                const newKey = dataKey.replace(`_${row.rowId}`, '')
                tableDetails[newKey] = data?.[dataKey]
              }
            }
            return tableDetails
          })
          payload.udfFieldValues.dynamicTables[key] = tableDetailsValue
        }
      }

      for (const key in udfConfig?.formElementsConfig) {
        const field = udfConfig.formElementsConfig[key]
        if (field.component !== 'dynamicTable') {
          if (field.component == 'multiselect') {
            payload.udfFieldValues[field.dispatchername] = data[field.dispatchername]?.join(',')
          } else {
            payload.udfFieldValues[field.dispatchername] = data[field.dispatchername]
          }

        }
      }
      if (location.pathname === '/investnow') {
        dispatch(actionCreators.investNowLumpSumAction(payload)).
        setOpen(false)
      }
      else if (location.pathname === '/investmentcarts' || isInvestmentCartPath) {
        if (tab == 'cart') {
          api.post('/InvestmentCart/saveCustomizeCartOrderDetails', payload)
            .then(res => {
              setAlertOpen({ show: true, msg: res.data.message, type: 'success' })
              setOpen(false)
              dispatch(actionCreators.getCartList({ clientCode: clientCode }))
            })
            .catch((error) => {
              setAlertOpen({ show: true, msg: error, type: 'error' })

            })
        }

        if (tab == 'holding' || isValidTab) {
          payload = {
            ...payload,
            "icid": "",
            "icdid": '',
            "clientCode": clientCode,
            "transactionType": 1,
            "scriptCode": cartList.commonScripCode,
            "scriptName": cartList.schemeName,
            "tranType": "B",
            "txnAmountUnit": data?.["Order By"] === "Amount" ? data?.["Order Amount"] : data?.["Order Units"],
            "valueDate": new Date(),
            "startDate": data?.startDate,
            "nextInstallmentDate": null,
            "isDividend": cartList?.isDividend || false,
            "dividendOption": cartList?.dividendOption,
            "source": 1,
            "folio": data.Folio,
            channelId: "Portal",
            parentChannelId: "MVPPortal",
          };
          if (type === "addtoCart") {
            api.post('/InvestmentCart/saveCustomizeCartOrderDetails', payload)
              .then(res => {
                setAlertOpen({ show: true, msg: res.data.message || "cart updated successfully", type: 'success' })
                setOpen(false)
                dispatch(actionCreators.getCartList({ clientCode: clientCode }))
                  .then(res => {
                    const count = res.data.data.length;
                  })
              })
              .catch((error) => {
                setAlertOpen({ show: true, msg: error, type: 'error' })
              })
          } else {
            dispatch(actionCreators.addtoCartPayload([payload])).then(() => {
              dispatch(actionCreators.investNowLumpSumAction(payload)).then(() => {
                navigate('/investnow');
              })
            }).catch((error) => { console.log(error) })
          }

        }
      }
    }
    catch (error) {
      console.log(error)
    };
  }

  useEffect(() => {
    if (open) {
      api.post('/mutualFundOrder/folios', {
        "clientCode": cartList?.clientCode,
        "transactionType": cartList?.transactionType || 1,
        "fundCode": cartList?.scriptCode || "97576"
      }).then((response) => {
        if (Array.isArray(response) && response.length > 0) {
          setFolioList(response);
        }
        else {
          setFolioList([
            {
              "AssetClassCode": "-1",
              "AssetClassName": "Other",
              "FolioNo": "6594",
              "SchemeCode": "119856",
              "SchemeName": "Kotak Gold ETF",
              "CostOfCurrentInvestment": 73230,
              "CostOfInvestment": 73230,
              "CurrentUnits": 542.4445,
              "LatestNAV": 52.7483,
              "CurrentFundValue": 28613.03,
              "DividendReceived": 0,
              "AbsoluteReturn": -60.9271,
              "AnnualisedReturn": 0,
              "MinInvAmount": 100,
              "LotSize": "1",
              "ValueResearchRating": "0",
              "FundOption": "Dividend Payout",
              "FundRiskRating": null,
              "SipStartDates": null,
              "Source": "M",
              "MinSWPUnit": 0,
              "MinRedeemUnit": 0,
              "AwaitingHoldingUnit": 0,
              "AwaitingHoldingFundValue": 0,
              "ExistingAmount": 0,
              "ExistingUnits": 0,
              "IsDividend": null,
              "DividendOption": null,
              "PurchaseAllowed": null,
              "SIPAllowed": null,
              "RedeemAllowed": null,
              "SWPAllowed": null,
              "SwitchOutAllowed": null,
              "STPAllowed": null,
              "SIPAggrAmt": 0,
              "AddPurchaseMinAmt": null
            },
            {
              "AssetClassCode": "-1",
              "AssetClassName": "Other",
              "FolioNo": "6595",
              "SchemeCode": "119856",
              "SchemeName": "Kotak Gold ETF",
              "CostOfCurrentInvestment": 73230,
              "CostOfInvestment": 73230,
              "CurrentUnits": 542.4445,
              "LatestNAV": 52.7483,
              "CurrentFundValue": 28613.03,
              "DividendReceived": 0,
              "AbsoluteReturn": -60.9271,
              "AnnualisedReturn": 0,
              "MinInvAmount": 100,
              "LotSize": "1",
              "ValueResearchRating": "0",
              "FundOption": "Dividend Payout",
              "FundRiskRating": null,
              "SipStartDates": null,
              "Source": "M",
              "MinSWPUnit": 0,
              "MinRedeemUnit": 0,
              "AwaitingHoldingUnit": 0,
              "AwaitingHoldingFundValue": 0,
              "ExistingAmount": 0,
              "ExistingUnits": 0,
              "IsDividend": null,
              "DividendOption": null,
              "PurchaseAllowed": null,
              "SIPAllowed": null,
              "RedeemAllowed": null,
              "SWPAllowed": null,
              "SwitchOutAllowed": null,
              "STPAllowed": null,
              "SIPAggrAmt": 0,
              "AddPurchaseMinAmt": null
            },
            {
              "AssetClassCode": "-1",
              "AssetClassName": "Other",
              "FolioNo": "6596",
              "SchemeCode": "119856",
              "SchemeName": "Kotak Gold ETF",
              "CostOfCurrentInvestment": 73230,
              "CostOfInvestment": 73230,
              "CurrentUnits": 542.4445,
              "LatestNAV": 52.7483,
              "CurrentFundValue": 28613.03,
              "DividendReceived": 0,
              "AbsoluteReturn": -60.9271,
              "AnnualisedReturn": 0,
              "MinInvAmount": 100,
              "LotSize": "1",
              "ValueResearchRating": "0",
              "FundOption": "Dividend Payout",
              "FundRiskRating": null,
              "SipStartDates": null,
              "Source": "M",
              "MinSWPUnit": 0,
              "MinRedeemUnit": 0,
              "AwaitingHoldingUnit": 0,
              "AwaitingHoldingFundValue": 0,
              "ExistingAmount": 0,
              "ExistingUnits": 0,
              "IsDividend": null,
              "DividendOption": null,
              "PurchaseAllowed": null,
              "SIPAllowed": null,
              "RedeemAllowed": null,
              "SWPAllowed": null,
              "SwitchOutAllowed": null,
              "STPAllowed": null,
              "SIPAggrAmt": 0,
              "AddPurchaseMinAmt": null
            },
            {
              "AssetClassCode": "-1",
              "AssetClassName": "Other",
              "FolioNo": "6597",
              "SchemeCode": "119856",
              "SchemeName": "Kotak Gold ETF",
              "CostOfCurrentInvestment": 73230,
              "CostOfInvestment": 73230,
              "CurrentUnits": 542.4445,
              "LatestNAV": 52.7483,
              "CurrentFundValue": 28613.03,
              "DividendReceived": 0,
              "AbsoluteReturn": -60.9271,
              "AnnualisedReturn": 0,
              "MinInvAmount": 100,
              "LotSize": "1",
              "ValueResearchRating": "0",
              "FundOption": "Dividend Payout",
              "FundRiskRating": null,
              "SipStartDates": null,
              "Source": "M",
              "MinSWPUnit": 0,
              "MinRedeemUnit": 0,
              "AwaitingHoldingUnit": 0,
              "AwaitingHoldingFundValue": 0,
              "ExistingAmount": 0,
              "ExistingUnits": 0,
              "IsDividend": null,
              "DividendOption": null,
              "PurchaseAllowed": null,
              "SIPAllowed": null,
              "RedeemAllowed": null,
              "SWPAllowed": null,
              "SwitchOutAllowed": null,
              "STPAllowed": null,
              "SIPAggrAmt": 0,
              "AddPurchaseMinAmt": null
            },
          ])
        }
      });
    }
  }, [cartList, open]);

  const getSchemeDetails = () => {

    const body = {
      // clientCode: "35",
      clientCode: clientCode,
      userId: "integra",
      transactionType: 1,
      searchString: "",
      lastBusinessDate: new Date().toISOString(),
      getData: 1,
      schemeCode: tab === "cart" ? cartList?.scriptCode : cartList?.commonScripCode
    };

    dispatch(actionCreators.GetSchemeList(body)).then((res) => {
      if (res.status === 200) {
        // const MinLumpSumAmount = res.data[0].MinPurchaseAmt
        // const SipFrequency = res.data[0]?.SipFrequency;
        // const MinInvAmount = res.data[0]?.MinInvAmount;
        // const selectedValue = "4";

        // const index = SipFrequency?.indexOf(selectedValue);
        // const calculatedMinInvAmount = index !== -1 ? MinInvAmount[index] : "N/A";
        // // setCalculatedMinInvAmount(calculatedMinInvAmount);
        // setMinLumpSumAmount(MinLumpSumAmount);

        // const initialTxnAmount = parseFloat(cartdata.sipData?.txnAmountUnit || "0");
        // if (initialTxnAmount && initialTxnAmount >= calculatedMinInvAmount) {
        //   setIsSaveDisabled(false);
        //   setError({ sip: "" });
        // } else {
        //   setIsSaveDisabled(true);
        //   setError({ sip: initialTxnAmount ? `Min. SIP amount is ${calculatedMinInvAmount}` : "SIP Amount is required" });
        // }

        // // Validate initial lumpsum amount
        // const initialLumpSumAmount = parseFloat(cartdata.lumpsumData?.txnAmountUnit || "0");
        // if (!initialLumpSumAmount || initialLumpSumAmount < MinLumpSumAmount) {
        //   setError((prev) => ({
        //     ...prev,
        //     lumpsum: initialLumpSumAmount
        //       ? `Min. Lumpsum amount is ${MinLumpSumAmount}`
        //       : "Lumpsum Amount is required",
        //   }));
        //   setIsSaveDisabled(true);
        // } else {
        //   setError((prev) => ({ ...prev, lumpsum: "" }));
        // }

        // if (!cartdata?.sipData?.startDate) {
        //   setError((prev) => ({
        //     ...prev,
        //     sipDate: "SIP Date is required",
        //   }));
        //   setIsSaveDisabled(true);
        // } else {
        //   setError((prev) => ({ ...prev, sipDate: "" }));
        // }
      }

    })

    // Set the editing state
    // if (val === 1) {
    //   setIsEditing(true);
    // } else if (val === 2) {
    //   setIsEditing2(true);
    // }
  };

  if (open && !isReady) return <div>Subscription...</div>;

  return (
    <FormProvider {...methods}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth={false} // Disable the maxWidth setting to allow full width
        sx={{
          '& .MuiPaper-root': {
            width: '100%', // Make the dialog paper full width
            maxWidth: '100%',
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Subscription
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <SubscriptionView
            tableData={tableData}
            setTableData={setTableData}
            fixedFormConfig={formConfig}
            udfConfig={udfConfig}
            folioList={folioList}
          />
        </DialogContent>
        <DialogActions >
          <Button autoFocus variant="contained" color="secondary" className='fixbtnsize paybtns mr10'
            onClick={handleSubmit((data) => handleSaveSubmit(data, 'addtoCart'))}
            // sx={{ display: location.pathname === '/investmentcarts' && ["holding", "sipManager", "stpManager", "swpManager"].includes(tab) ? 'block' : 'none' }} 
            sx={{
              display: isInvestmentCartPath && isValidTab ? "block" : "none",
            }} 
            >
            Add to Cart

          </Button>

          <Button autoFocus variant="contained" color="secondary" className='fixbtnsize paybtns' onClick={handleSubmit(handleSaveSubmit)}>
              {isInvestmentCartPath && isValidTab ? "Place Order" : "Save"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </FormProvider>
  );
}