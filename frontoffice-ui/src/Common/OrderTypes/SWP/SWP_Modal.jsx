import { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { actionCreators } from '../../../redux/actions/actionCreators';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../../APIs/interceptor';
import SWP_View from './SWP_View';
// import PrimaryDetailsSWP from './SWP_PrimaryDetails';

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

export default function SWP_Modal({ cartId, cartList, setAlertOpen, open, setOpen, tab }) {
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

      const newData = {
        "MF Scheme": cartList?.scriptName || cartList?.schemeName,
        "Folio": investDataObject?.folio || '',
        "Order By": cartList?.orderBy || "",
        "SWP Frequency": investDataObject?.frequency || '',
        "SWP End Date": cartList?.EndDate,
        "SWP Tenor Basis": investDataObject?.tenorBasis || '',
        "SWP Date": dayjs(cartList?.startDate),
        // "SWP Date": dayjs(cartList.startDate),
        "Order Units/Amount": cartList?.txnAmountUnit,
        "SWP Period or SWP Transactions": investDataObject?.periodOrNoOfTransactions
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
      // Apply logic only if "SWP Frequency" is "Monthly"
      if (watchedValues['SWP Frequency'] === 'Monthly' || watchedValues['SWP Frequency'] === '') {

        // Handle 'Perpetual' case
        if (watchedValues['SWP Tenor Basis'] === 'Perpetual') {
          const sipPeriodYears = 50; // Default to 50 years
          const sipPeriodMonths = sipPeriodYears * 12; // Convert years to months
          setValue('SWP Period or SWP Transactions', sipPeriodMonths.toString()); // Set in months for 'Perpetual'
          const startDate = dayjs(cartList?.startDate);
          const sipEndDate = startDate.add(sipPeriodMonths, 'month').format('DD/MM/YYYY'); // Add months
          setValue('SWP End Date', sipEndDate);
        }

        // Handle 'Months' case
        if (watchedValues['SWP Tenor Basis'] === 'Months') {
          const sipPeriodMonths = Number(watchedValues['SWP Period or SWP Transactions']) || 1;
          const startDate = dayjs(cartList?.startDate);
          const sipEndDate = startDate.add(sipPeriodMonths, 'month').format('DD/MM/YYYY');
          setValue('SWP End Date', sipEndDate);
        }
        // Handle 'Months' case
        if (watchedValues['SWP Tenor Basis'] === 'No of Transactions') {
          const sipPeriodMonths = Number(watchedValues['SWP Period or SWP Transactions']) || 1;
          const startDate = dayjs(cartList?.startDate);
          const sipEndDate = startDate.add(sipPeriodMonths, 'month').format('DD/MM/YYYY');
          setValue('SWP End Date', sipEndDate);
        }
        // Handle 'Years' case
        if (watchedValues['SWP Tenor Basis'] === 'Years') {
          const sipPeriodYears = Number(watchedValues['SWP Period or SWP Transactions']);
          if (sipPeriodYears) { // Ensure that the user has entered a value
            const startDate = dayjs(cartList?.startDate);
            const sipEndDate = startDate.add(sipPeriodYears, 'year').format('DD/MM/YYYY'); // Add years
            setValue('SWP End Date', sipEndDate);
          }
        }
      }
    } catch (e) {
      console.error("Error calculating SWP End Date:", e);
    }
  }, [
    watchedValues['SWP Tenor Basis'],
    watchedValues['SWP Period or SWP Transactions'],
    watchedValues['SWP Frequency'],
    cartList?.startDate
  ]);

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    if (open) {
      const fixedFieldsBody = {
        "productClassId": 1,
        "productSubClassIds": [
          3
        ],
        "orderTypeIds": 4,
        "portfolioTypeIds": [
          1
        ]
      }

      const UdfBody = {
        "entityId": 1,
        "productSubclassId": 3,
        "portfolioTypeId": 2,
        "productClassId": 1,
        "orderTypeId": 4
      };
      //  const UdfBody = {
      //   "entityId": 1,
      //   "productClassId": 1,
      //   "orderTypeId": 3,
      //   "productSubclassId": 2,
      //   "portfolioTypeId": 2
      // };


      dispatch(actionCreators.GetOrderViewConfiguratorDetails(fixedFieldsBody)).then((res) => {
        if (res.status === 200) {
          setFormConfig(res.data.data); // Set the fields from the API response
        }
      })
        .catch((error) => {
          console.error("Error fetching config:", error);
        });

      dispatch(actionCreators.GetOrderViewUdfConfiguratorDetails(UdfBody)).then((res) => {
        if (res.status === 200) {
          setUdfConfig(res.data.data.udfConfig);
          getCartDetails();

        }
      })
        .catch((error) => {
          console.error("Error fetching config:", error);
        });
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
        "txnAmountUnit": cartList?.txnAmountUnit,
        "valueDate": cartList?.valueDate,
        "startDate": cartList?.startDate,
        "nextInstallmentDate": null,
        "isDividend": cartList?.isDividend,
        "dividendOption": cartList?.dividendOption,
        "source": 1,
        "folio": data.Folio,
        orderBy: "A",
        frequency: data['SWP Frequency'],
        tenorBasis: data['SWP Tenor Basis'],
        periodOrNoOfTransactions: data['SWP Period or SWP Transactions'],
        EndDate: data['SWP End Date'],
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
              setAlertOpen({ show: true, msg: res.data.message , type: 'success' })
              setOpen(false)
            })
            .catch(error => { setAlertOpen({ show: true, msg: error, type: 'error' }) })
        }
        else if (tab == 'holding' || isValidTab) {

          payload = {
            ...payload,
            "icid": "",
            "icdid": '',
            // "clientCode": 35,
            "clientCode": clientCode,
            "transactionType": 8,
            "scriptCode": cartList.commonScripCode,
            "scriptName": cartList.schemeName,
            "tranType": "B",
            "txnAmountUnit": data?.['Order Units/Amount'],
            "valueDate": new Date(),
            "startDate": new Date(dayjs(data?.['SWP Date']).format('YYYY-MM-DD')),
            //  "startDate": dayjs(data?.['SWP Date']).format('DD/MM/YYYY'),
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
            // return 
            dispatch(actionCreators.PlaceOrderDetailsForInvestNow([payload]))
              .then((res) => {
                if (res.status === 200 || res.status === 201) {
                  setAlertOpen({ show: true, msg: res.data.message || "Order placed successfully", type: 'success' });
                  setOpen(false);
                }
              })
              .catch((error) => {
                // const errorMessage = error.response?.data?.message || "Something went wrong";
                setAlertOpen({ show: true, msg: error, type: 'error' });
              });
            // dispatch(actionCreators.addtoCartPayload([payload])).then(() => {
            //   dispatch(actionCreators.investNowAction(payload)).then(() => {

            //     navigate('/investnow');
            //   })
            // }).catch((error) => { console.log(error) })
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
        // "clientCode": 4,
        "clientCode": cartList?.clientCode,
        // "transactionType": 1,
        "transactionType": cartList?.transactionType || 8,
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

  const getSchemeDetails = () => {
    const body = {
      // clientCode: "35",
      clientCode: clientCode,
      userId: "integra",
      transactionType: 8,
      searchString: "",
      lastBusinessDate: new Date().toISOString(),
      getData: 1,
      schemeCode: tab === "cart" ? cartList?.scriptCode : cartList?.commonScripCode
    };

    dispatch(actionCreators.GetSchemeList(body)).then((res) => {
      if (res.status === 200) {
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
        {/* <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          SWP
        </DialogTitle> */}
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
          <SWP_View
            tableData={tableData}
            setTableData={setTableData}
            fixedFormConfig={formConfig}
            udfConfig={udfConfig}
            folioList={folioList}
            tab={tab}
          />
          {/* <PrimaryDetailsSWP tab={tab} fixedFormConfig={formConfig} folioList={folioList} /> */}
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus variant="contained" color="secondary" className='fixbtnsize paybtns' */}
          <Button variant="contained" color="secondary" className='fixbtnsize mr10'
            onClick={handleSubmit((data) => handleSaveSubmit(data, 'addtoCart'))}
            sx={{
              display: isInvestmentCartPath && isValidTab ? "block" : "none",
            }}   >
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