import { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SIPView from './SIPView';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
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

export default function CustomizedDialogs({ cartId, cartList, setAlertOpen, open, setOpen, tab }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const methods = useForm({ defaultValues: {} });
  const [formConfig, setFormConfig] = useState([]);
  const [udfConfig, setUdfConfig] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [folioList, setFolioList] = useState([]);
  const [isReady, setIsReady] = useState(false)

 


  const cartDetails = useSelector((state) => state.GetCustomizeCartOrderDetails.data);
  const investData = useSelector((state) => state.investNowAction.data);
  const navigate = useNavigate();
  const clientCode = import.meta.env.VITE_CLIENT_CODE;


  const { reset, getValues, handleSubmit, watch, setValue, formState: { errors } } = methods;

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
          investDataObject = cartDetails;
        }else if (isValidTab) {
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
      const defaultValues = {};
      for (const key in formConfig) {
        defaultValues[formConfig[key].fieldName] = formConfig[key].defaultValue
      }

      const newData = {
        "MF Scheme": cartList.scriptName || cartList.schemeName,
        "Folio": investDataObject?.folio || defaultValues['Folio'],
        "Order By": cartList?.orderBy || defaultValues['Order By'],
        "SIP Frequency": investDataObject?.frequency || defaultValues['SIP Frequency'],
        "SIP End Date": cartList?.EndDate,
        "SIP Tenor Basis": investDataObject?.tenorBasis || defaultValues['SIP Tenor Basis'],
        "SIP Date": dayjs(cartList?.startDate),
        // "SIP Date": dayjs(cartList.startDate),
        "Order Amount": cartList.txnAmountUnit || defaultValues['Order Amount'],
        "Order Units": cartList.txnAmountUnit || defaultValues['Order Units'],
        // "Order Units/Amount": cartList?.txnAmountUnit,
        "SIP Period or SIP Transactions": investDataObject?.periodOrNoOfTransactions || defaultValues['SIP Period or SIP Transactions'],
      }

      data = { ...data, ...newData }
      if (investDataObject?.udfFieldValues?.['multiselectdropdown']) {
        data.multiselectdropdown = [cartDetails?.udfFieldValues?.['multiselectdropdown']]
      }
      setTableData(tableDataObject);

      reset(data);
      setIsReady(true);
      return true;
    }
    catch (e) {
      console.log(e);
      return false;
    }
  }

 



  const watchedValues = watch()

  const getCartDetails = (reset = false) => {
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
      dispatch(actionCreators.GetCustomizeCartOrderDetails(payload,reset)).then((res) => {
        if (res.status === 200) {

          // setFormConfig(res.data.data); // Set the fields from the API response
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
        "icid": cartList?.icid,
        "icdid": cartDetails.icdid || "",
        "clientCode": cartList?.clientCode,
        "transactionType": cartList?.transactionType,
        "scriptCode": cartList?.scriptCode,
        "scriptName": cartList?.scriptName,
        "tranType": cartList?.tranType,
        "txnAmountUnit": data?.["Order By"] === "A" ? data?.["Order Amount"] : data?.["Order Units"],
        // "txnAmountUnit": cartList?.txnAmountUnit,
        "valueDate": cartList?.valueDate,
        "startDate": cartList?.startDate,
        "nextInstallmentDate": null,
        "isDividend": cartList?.isDividend,
        "dividendOption": cartList?.dividendOption,
        "source": 1,
        "folio": data.Folio,
        orderBy: " A",
        frequency: data['SIP Frequency'],
        tenorBasis: data['SIP Tenor Basis'],
        periodOrNoOfTransactions: data['SIP Period or SIP Transactions'],
        EndDate: data['SIP End Date'],
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
              dispatch(actionCreators.getCartList({ clientCode: clientCode }))
              reset();
            
              setAlertOpen({ show: true, msg: res.data.message || "cart updated successfully", type: 'success' })
              setOpen(false)

            })
            .catch(error => {
              setAlertOpen({ show: true, msg: error, type: 'error' })
            
            })
        }
        else if (tab == 'holding' || isValidTab) {

          payload = {
            ...payload,
            "icid": "",
            "icdid": '',
            // "clientCode": 35,
            "clientCode": clientCode,
            "transactionType": 2,
            "scriptCode": "97576",
            "scriptName": cartList.schemeName,
            "tranType": "B",
            "txnAmountUnit": data?.["Order By"] === "Amount" ? data?.["Order Amount"] : data?.["Order Units"],
            // "txnAmountUnit": data?.['Order Units/Amount'],
            "valueDate": new Date(),
            "startDate": new Date(dayjs(data?.['SIP Date']).format('YYYY-MM-DD')),
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
            dispatch(actionCreators.addtoCartPayload([payload])).then(() => {
              dispatch(actionCreators.investNowAction(payload)).then(() => {
                navigate('/investnow');
              })
            }).catch((error) => { console.log(error) })
          }

        }
      }
     
    }
    catch (e) {
      console.log(e)
    }
  };
  const getSchemeDetails = () => {

    const body = {
      // clientCode: "35",
      clientCode: clientCode,
      userId: "integra",
      transactionType: 2,
      searchString: "",
      lastBusinessDate: new Date().toISOString(),
      getData: 1,
      // schemeCode: cartList?.scriptCode || cartList?.scriptCode
      schemeCode: tab === "cart" ? cartList?.scriptCode : cartList?.commonScripCode

    };

    dispatch(actionCreators.GetSchemeList(body)).then(() => {})
  };


  // useEffect(() => {

  //   if (watchedValues['SIP Tenor Basis'] === 'Months' || watchedValues['SIP Tenor Basis'] === 'Years' || watchedValues['SIP Tenor Basis'] === 'No of Transactions') {
  //     setValue('SIP Period or SIP Transactions', ''); // Set in months for 'Perpetual'

  //   }
  // }, [watchedValues['SIP Tenor Basis']]);
  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    try {
      // Apply logic only if "SIP Frequency" is "Monthly"
      if (watchedValues['SIP Frequency'] === 'Monthly' || watchedValues['SIP Frequency'] === '') {

        // Handle 'Perpetual' case
        if (watchedValues['SIP Tenor Basis'] === 'Perpetual') {
          const sipPeriodYears = 50; // Default to 50 years
          const sipPeriodMonths = sipPeriodYears * 12; // Convert years to months
          setValue('SIP Period or SIP Transactions', sipPeriodMonths.toString()); // Set in months for 'Perpetual'
          const startDate = dayjs(cartList?.startDate);
          const sipEndDate = startDate.add(sipPeriodMonths, 'month').format('DD/MM/YYYY'); // Add months
          setValue('SIP End Date', sipEndDate);
        }

        // Handle 'Months' case
        if (watchedValues['SIP Tenor Basis'] === 'Months') {
          const sipPeriodMonths = Number(watchedValues['SIP Period or SIP Transactions']) || 1;
          // setValue('SIP Period or SIP Transactions', "");
          const startDate = dayjs(cartList?.startDate);
          const sipEndDate = startDate.add(sipPeriodMonths, 'month').format('DD/MM/YYYY');
          setValue('SIP End Date', sipEndDate);
        }
        // Handle 'Months' case
        if (watchedValues['SIP Tenor Basis'] === 'No of Transactions') {
          const sipPeriodMonths = Number(watchedValues['SIP Period or SIP Transactions']) || 1;
          // setValue('SIP Period or SIP Transactions', "");
          const startDate = dayjs(cartList?.startDate);
          const sipEndDate = startDate.add(sipPeriodMonths, 'month').format('DD/MM/YYYY');
          setValue('SIP End Date', sipEndDate);
        }
        // Handle 'Years' case
        if (watchedValues['SIP Tenor Basis'] === 'Years') {
          const sipPeriodYears = Number(watchedValues['SIP Period or SIP Transactions']);
          if (sipPeriodYears) { // Ensure that the user has entered a value
            const startDate = dayjs(cartList?.startDate);
            const sipEndDate = startDate.add(sipPeriodYears, 'year').format('DD/MM/YYYY'); // Add years
            setValue('SIP End Date', sipEndDate);
          }
        }
      }
    } catch (e) {
      console.error("Error calculating SIP End Date:", e);
    }
  }, [
    watchedValues['SIP Tenor Basis'],
    watchedValues['SIP Period or SIP Transactions'],
    watchedValues['SIP Frequency'],
    cartList?.startDate
  ]);
  useEffect(() => {
    const fetchConfigsAndAutofill = async () => {
      try {
        const fixedFieldsBody = {
          productClassId: 1,
          productSubClassIds: [3],
          orderTypeIds: 2,
          portfolioTypeIds: [1],
        };

        const UdfBody = {
          entityId: 1,
          productSubclassId: 3,
          portfolioTypeId: 1,
          productClassId: 1,
          orderTypeId: 2,
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
  }, [dispatch, open]);



  useEffect(() => {
    if (open) {
      api.post('/mutualFundOrder/folios', {
        // "clientCode": 4,
        "clientCode": cartList?.clientCode,
        // "transactionType": 1,
        "transactionType": cartList?.transactionType || 2,
        // "fundCode": "119856"
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


  useEffect(() => {
    if (open) {
      autofillUdfData();
    }
  }, [cartDetails]);

  if (open && !isReady) return <div>SIP...</div>;

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
          SIP
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
          <SIPView
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
            }} 
            >
            Add to Cart
          </Button>

          <Button autoFocus variant="contained" color="secondary" className='fixbtnsize paybtns'
            onClick={handleSubmit(handleSaveSubmit)}>
            {/* {
              location.pathname === '/investmentcarts' ? tab === 'holding' ? "Place Order" : "Save" : "Save"
            } */}
              {isInvestmentCartPath && isValidTab ? "Place Order" : "Save"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </FormProvider>
  );
}