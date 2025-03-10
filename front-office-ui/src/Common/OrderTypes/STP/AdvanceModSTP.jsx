import { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import STPView from './STPView';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../../APIs/interceptor';
import { actionCreators } from '../../../redux/actions/actionCreators';

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

export default function CustomizedDialogs({ cartId, cartList, setAlertOpen, open, setOpen, tab }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const methods = useForm({ defaultValues: {} });
  const [formConfig, setFormConfig] = useState([]);
  const [udfConfig, setUdfConfig] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [folioList, setFolioList] = useState([]);

  const cartDetails = useSelector((state) => state.GetCustomizeCartOrderDetails.data);
  const investData = useSelector((state) => state.investNowAction.data);
  const navigate = useNavigate();

  const { reset, handleSubmit, watch, setValue, formState: { errors } } = methods;

  const clientCode = import.meta.env.VITE_CLIENT_CODE;
  const searchParams = new URLSearchParams(location.search);
  const pathParam = searchParams.get("path");

  const isInvestmentCartPath =
  location.pathname === "/investmentcarts" &&
  (!pathParam || ["sip", "swp", "stp"].includes(pathParam));

const isValidTab = ["holding", "sipManager", "stpManager", "swpManager"].includes(tab);

  const autofillUdfData = () => {
    try {
      // let copyObject;

      let investDataObject;
      if (location.pathname == '/investnow') {
        investDataObject = investData
      } else if (location.pathname == '/investmentcarts' || isInvestmentCartPath) {
        if (tab == 'cart') {
          investDataObject = cartDetails;
        } else if (tab == 'holding') {
          investDataObject = cartDetails;
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

      const newData = {
        "Source Scheme": cartList.scriptName || cartList.schemeName,
        "Source Folio": investDataObject?.folio || '',
        "Target Scheme": investDataObject?.targetSchemeName,
        "Target Folio": investDataObject?.targetFolio || '',
        "Order By": cartList?.orderBy || "",
        "STP Frequency": investDataObject?.frequency || '',
        "STP End Date": cartList?.EndDate,
        "STP Tenor Basis": investDataObject?.tenorBasis || '',
        "STP Date": dayjs(cartList?.startDate) || investDataObject?.startDate,
        "Order Amount": cartList?.txnAmountUnit,
        "STP Period or STP Transactions": investDataObject?.periodOrNoOfTransactions
      }
      data = { ...data, ...newData }
      if (investDataObject?.udfFieldValues?.['multiselectdropdown']) data.multiselectdropdown = [cartDetails?.udfFieldValues?.['multiselectdropdown']]
      setTableData(tableDataObject)
      reset(data)
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (open) {

      autofillUdfData()
    }
  }, [cartDetails, udfConfig, open])

  const watchedValues = watch()



  useEffect(() => {
    try {
      // Apply logic only if "STP Frequency" is "Monthly"
      if (watchedValues['STP Frequency'] === 'Monthly' || watchedValues['STP Frequency'] === '') {

        // Handle 'Perpetual' case
        if (watchedValues['STP Tenor Basis'] === 'Perpetual') {
          const stpPeriodYears = 50; // Default to 50 years
          const stpPeriodMonths = stpPeriodYears * 12; // Convert years to months
          setValue('STP Period or STP Transactions', stpPeriodMonths.toString()); // Set in months for 'Perpetual'
          const startDate = dayjs(cartList?.startDate);
          const stpEndDate = startDate.add(stpPeriodMonths, 'month').format('DD/MM/YYYY'); // Add months
          setValue('STP End Date', stpEndDate);
        }

        // Handle 'Months' case
        if (watchedValues['STP Tenor Basis'] === 'Months') {
          const stpPeriodMonths = Number(watchedValues['STP Period or STP Transactions']) || 1;
          const startDate = dayjs(cartList?.startDate);
          const stpEndDate = startDate.add(stpPeriodMonths, 'month').format('DD/MM/YYYY');
          setValue('STP End Date', stpEndDate);
        }
        // Handle 'Months' case
        if (watchedValues['STP Tenor Basis'] === 'No of Transactions') {
          const stpPeriodMonths = Number(watchedValues['STP Period or STP Transactions']) || 1;
          const startDate = dayjs(cartList?.startDate);
          const stpEndDate = startDate.add(stpPeriodMonths, 'month').format('DD/MM/YYYY');
          setValue('STP End Date', stpEndDate);
        }
        // Handle 'Years' case
        if (watchedValues['STP Tenor Basis'] === 'Years') {
          const stpPeriodYears = Number(watchedValues['STP Period or STP Transactions']);
          if (stpPeriodYears) { // Ensure that the user has entered a value
            const startDate = dayjs(cartList?.startDate);
            const stpEndDate = startDate.add(stpPeriodYears, 'year').format('DD/MM/YYYY'); // Add years
            setValue('STP End Date', stpEndDate);
          }
        }
      }
    } catch (e) {
      console.error("Error calculating STP End Date:", e);
    }
  }, [
    watchedValues['STP Tenor Basis'],
    watchedValues['STP Period or STP Transactions'],
    watchedValues['STP Frequency'],
    cartList?.startDate
  ]);

  const handleClose = () => {
    setOpen(null);
  };

  // useEffect(() => {
  //   if (open) {
  //     const fixedFieldsBody = {
  //       "productClassId": 1,
  //       "productSubClassIds": [
  //         3
  //       ],
  //       "orderTypeIds": 5,
  //       "portfolioTypeIds": [
  //         1
  //       ]
  //     };

  //     const UdfBody = {
  //       "entityId": 1,
  //       "productSubclassId": 3,
  //       "portfolioTypeId": 1,
  //       "productClassId": 1,
  //       "orderTypeId": 5
  //     };
  //     //  const UdfBody = {
  //     //   "entityId": 1,
  //     //   "productClassId": 1,
  //     //   "orderTypeId": 3,
  //     //   "productSubclassId": 2,
  //     //   "portfolioTypeId": 2
  //     // };


  //     dispatch(actionCreators.GetOrderViewConfiguratorDetails(fixedFieldsBody)).then((res) => {
  //       if (res.status === 200) {
  //         setFormConfig(res.data.data); // Set the fields from the API response
  //       }
  //     })
  //       .catch((error) => {
  //         console.error("Error fetching config:", error);
  //       });

  //     dispatch(actionCreators.GetOrderViewUdfConfiguratorDetails(UdfBody)).then((res) => {
  //       if (res.status === 200) {
  //         setUdfConfig(res.data.data.udfConfig);
  //         getCartDetails();
  //         getSchemeDetails();
  //       }
  //     })
  //       .catch((error) => {
  //         console.error("Error fetching config:", error);
  //       });

  //   }

  // }, [dispatch, open]);


  useEffect(() => {

    const fetchConfigsAndAutofill = async () => {
      try {
        const fixedFieldsBody = {
          "productClassId": 1,
          "productSubClassIds": [
            3
          ],
          "orderTypeIds": 5,
          "portfolioTypeIds": [
            1
          ]
        };
        const UdfBody = {
          "entityId": 1,
          "productSubclassId": 3,
          "portfolioTypeId": 1,
          "productClassId": 1,
          "orderTypeId": 5
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
          autofillUdfData();
          // setIsReady(true); // Indicate readiness for rendering fields
        } else {
          console.error("Error in fetching configurations");
        }
      } catch (error) {
        console.error("Error fetching configurations or autofilling data:", error);
      }
    };
   
    if (open) {
      fetchConfigsAndAutofill();
      getSchemeDetails();
    }
  }, [dispatch, open]);


  const getCartDetails = () => {

    if (cartId) {
      const payload = {
        "icid": cartId,
        "entityId": 1,
        "productClassId": 1,
        // "orderTypeId": 3,
        "orderTypeId": 2,
        // "productSubClassId": 2,
        "productSubClassId": 3,
        // "portfolioTypeId": 2
        "portfolioTypeId": 1,
      }
      dispatch(actionCreators.GetCustomizeCartOrderDetails(payload)).then((res) => {
        if (res.status === 200) {

          // setFormConfig(res.data.data); // Set the fields from the API response
        }
      })
        .catch((error) => {
          console.error("Error fetching config:", error);
        });
    } else {
      dispatch(actionCreators.GetCustomizeCartOrderDetails(null, true))
    }

  }

  const handleSaveSubmit = (data, type) => {
    try {
      let payload;
      payload = {
        "icid": cartList?.icid,
        "icdid": cartDetails.icdid || "",
        "clientCode": cartList?.clientCode,
        "transactionType": cartList?.transactionType,
        "scriptCode": cartList?.scriptCode,
        "scriptName": cartList?.scriptName,
        "tranType": cartList?.tranType,
        "txnAmountUnit": cartList?.txnAmountUnit || data['Order Amount'],
        "valueDate": cartList?.valueDate,
        "startDate": cartList?.startDate || data['STP Date'],
        "nextInstallmentDate": null,
        "isDividend": cartList?.isDividend || false,
        "dividendOption": cartList?.dividendOption || "",
        "source": 1,
        "folio": data?.['Source Folio'],
        // orderBy: "A",
        "orderBy": formConfig?.find((item) => item.fieldName === "Order By")?.defaultValue,
        frequency: data['STP Frequency'],
        tenorBasis: data['STP Tenor Basis'],
        periodOrNoOfTransactions: data['STP Period or STP Transactions'],
        EndDate: data['STP End Date'],
        targetSchemeCode: data['Target Scheme']?.SchemeCode,
        targetSchemeName: data['Target Scheme']?.SchemeName,
        targetFolio: data['Target Folio'],
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
          if (field.component == 'multipleSelect') {
            payload.udfFieldValues[field.dispatchername] = data[field.dispatchername]?.join(',')
          } else {
            payload.udfFieldValues[field.dispatchername] = data[field.dispatchername]
          }
        }
      }

      if (location.pathname === '/investnow') {
        dispatch(actionCreators.investNowAction(payload))
        setOpen(false)
      }
      else if (location.pathname === '/investmentcarts' || isInvestmentCartPath) {
        if (tab == 'cart') {
          api.post('/InvestmentCart/saveCustomizeCartOrderDetails', payload)
            .then(res => {
              setAlertOpen({ show: true, msg: res.data.message , type: 'success' })
              setOpen(false)
            })
            .catch(error =>{
              setAlertOpen({ show: true, msg: error, type: 'error' });
            })
        }
        else if (tab == 'holding' || isValidTab) {

          payload = {
            ...payload,
            "icid": "",
            "icdid": '',
            // "clientCode": 35,
            "clientCode": clientCode,
            "transactionType": 5,
            "scriptCode": cartList.commonScripCode,
            "scriptName": cartList.schemeName,
            "tranType": "B",
            "txnAmountUnit": data?.['Order Amount'],
            "valueDate": new Date(),
            
            "startDate": data?.['STP Date'] ? new Date(dayjs(data?.['STP Date']).format('YYYY-MM-DD')) : cartList?.startDate,
            // "startDate": data?.['STP Date'] || cartList?.startDate,
            "nextInstallmentDate": null,
            "isDividend": cartList?.isDividend || false,
            "dividendOption": cartList?.dividendOption,
            "source": 1,
            "folio": data?.["Source Folio"],
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
                    // const count = res.data.data.length;

                  })
              })
              .catch((error) => {
                setAlertOpen({ show: true, msg: error, type: 'error' });
              })
            // dispatch(actionCreators.addtoCart([payload])).then(res => {
            //   setAlertOpen({ show: true, msg: res.data.message || "Add to cart successfully", type: 'success' })
            //   setOpen(false)
            //   dispatch(actionCreators.getCartList({ clientCode: 35 }))
            //     .then(res => {
            //       const count = res.data.data.length;

            //     })
            // }).catch(() => {
            //   setAlertOpen({ show: true, msg: "Something went wrong", type: 'Failure' })
            //   setOpen(false)

            // })
          } else {
            // dispatch(actionCreators.addtoCartPayload([payload])).then(() => {
            //   dispatch(actionCreators.investNowAction(payload)).then(() => {

            //     navigate('/investnow');
            //   })
            // }).catch((error) => { console.log(error) })
            dispatch(actionCreators.PlaceOrderDetailsForInvestNow([payload]))
              .then((res) => {
                if (res.status === 200 || res.status === 201) {
                  setAlertOpen({ show: true, msg: res.data.message || "Order placed successfully", type: 'success' });
                  setOpen(false);
                }
              })
              .catch((error) => {
                setAlertOpen({ show: true, msg: error, type: 'error' });
              });
          }

        }
      }
    }
    catch (e) {
      console.log(e)
    }
  };
  useEffect(() => {
    if (open) {
        api.post('/mutualFundOrder/folios', {
            "clientCode": cartList?.clientCode,
            "transactionType": cartList?.transactionType || 2,
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
}, [cartList, open])
 
  const getSchemeDetails = () => {
    const body = {
      // clientCode: "35",
      clientCode:clientCode,
      userId: "integra",
      transactionType: 5,
      searchString: "",
      lastBusinessDate: new Date().toISOString(),
      getData: 1,
      // schemeCode: cartList?.scriptCode || cartList?.scriptCode
      schemeCode: tab === "cart" ? cartList?.scriptCode : cartList?.commonScripCode
    };

    dispatch(actionCreators.GetSchemeList(body)).then((res) => {
      if (res.status === 200) {
        // const MinLumpSumAmount = res.data[0].MinPurchaseAmt
        // const StpFrequency = res.data[0]?.StpFrequency;
        // const MinInvAmount = res.data[0]?.MinInvAmount;
        // const selectedValue = "4";

        // const index = StpFrequency?.indexOf(selectedValue);
        // const calculatedMinInvAmount = index !== -1 ? MinInvAmount[index] : "N/A";
        // // setCalculatedMinInvAmount(calculatedMinInvAmount);
        // setMinLumpSumAmount(MinLumpSumAmount);

        // const initialTxnAmount = parseFloat(cartdata.stpData?.txnAmountUnit || "0");
        // if (initialTxnAmount && initialTxnAmount >= calculatedMinInvAmount) {
        //   setIsSaveDisabled(false);
        //   setError({ stp: "" });
        // } else {
        //   setIsSaveDisabled(true);
        //   setError({ stp: initialTxnAmount ? `Min. STP amount is ${calculatedMinInvAmount}` : "STP Amount is required" });
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

        // if (!cartdata?.stpData?.startDate) {
        //   setError((prev) => ({
        //     ...prev,
        //     stpDate: "STP Date is required",
        //   }));
        //   setIsSaveDisabled(true);
        // } else {
        //   setError((prev) => ({ ...prev, stpDate: "" }));
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
  return (
    <FormProvider {...methods}>
      {/* <Button variant="outlined" onClick={handleClickOpen} className='advacncebtn'>
        <span className='adva'>Advance +</span>
      </Button> */}
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
          STP
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
          <STPView
            tableData={tableData}
            setTableData={setTableData}
            fixedFormConfig={formConfig}
            udfConfig={udfConfig}
            folioList={folioList}
            tab={tab}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus variant="contained" color="secondary" className='fixbtnsize paybtns' */}
          <Button variant="contained" color="secondary" className='fixbtnsize mr10'
            onClick={handleSubmit((data) => handleSaveSubmit(data, 'addtoCart'))}
            sx={{
              display: isInvestmentCartPath && isValidTab ? "block" : "none",
            }}  >
            Add to Cart
          </Button>
          <Button autoFocus variant="contained" color="secondary" className='fixbtnsize paybtns'
            onClick={handleSubmit(handleSaveSubmit)}>
              {isInvestmentCartPath && isValidTab ? "Place Order" : "Save"}
           
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </FormProvider>
  );
}