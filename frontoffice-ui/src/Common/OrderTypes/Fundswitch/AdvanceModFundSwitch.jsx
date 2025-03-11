import { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FundSwitchView from './FundSwitchView';
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

export default function AdvanceModFundSwitch({ cartId, cartList, setAlertOpen, open, setOpen, tab }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const methods = useForm({ defaultValues: {} });
    const [formConfig, setFormConfig] = useState([]);
    const [udfConfig, setUdfConfig] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [folioList, setFolioList] = useState([]);
    const [isReady, setIsReady] = useState(false);

    const cartDetails = useSelector((state) => state.GetCustomizeCartOrderDetails.data);
    const investData = useSelector((state) => state.investNowAction.data);
    const navigate = useNavigate();

    const { reset, handleSubmit, watch, setValue, formState: { errors } } = methods;

    const clientCode = import.meta.env.VITE_CLIENT_CODE;

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

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
                "Source Scheme": cartList?.scriptName || cartList.schemeName,
                "Source Folio": investDataObject?.folio || cartList?.folio,
                "Target Scheme": { SchemeCode: investDataObject.targetSchemeCode, SchemeName: investDataObject.targetSchemeName },
                // "Target Scheme": investDataObject?.targetSchemeName,
                "Target Folio": investDataObject?.targetFolio,
                "Order By": cartList?.orderBy || investDataObject?.orderBy,
                "Order Amount": investDataObject?.txnAmountUnit || cartList?.txnAmountUnit,
                "Order Unit": investDataObject?.txnAmountUnit || cartList?.txnAmountUnit,
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


    const handleClose = () => {
        setOpen(null);
        dispatch(actionCreators.GetSchemeListForTargetScheme(null, true));
        dispatch(actionCreators.GetCustomizeCartOrderDetails(null, true));
    };



    useEffect(() => {
        const fetchConfigsAndAutofill = async () => {
            try {
                const fixedFieldsBody = {
                    "productClassId": 1,
                    "productSubClassIds": [
                        3
                    ],
                    "orderTypeIds": 6,
                    "portfolioTypeIds": [
                        1
                    ]
                };

                const UdfBody = {
                    "entityId": 1,
                    "productSubclassId": 3,
                    "portfolioTypeId": 1,
                    "productClassId": 1,
                    "orderTypeId": 6,
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
                    // getSchemeDetails();

                    // Autofill UDF data once configurations are loaded
                    autofillUdfData();
                    setIsReady(true); // Indicate readiness for rendering fields
                } else {
                    console.error("Error in fetching configurations");
                }
            } catch (error) {
                console.error("Error fetching configurations or autofilling data:", error);
            }
        };

        if (open) {
            fetchConfigsAndAutofill();
        }
    }, [dispatch, open]);




    const getCartDetails = () => {
        if (cartId) {
            const payload = {
                "icid": cartId,
                "entityId": 1,
                "productClassId": 1,
                "orderTypeId": 6,
                "productSubClassId": 3,
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
                "transactionType": cartList?.transactionType || 6,
                "scriptCode": cartList?.scriptCode,
                "scriptName": cartList?.scriptName,
                "tranType": cartList?.tranType || "S",
                // "txnAmountUnit": data['Order Amount'] || cartList?.txnAmountUnit,
                "txnAmountUnit": data?.["Order By"] === "Amount" ? data?.["Order Amount"] : data?.["Order Units"],
                "valueDate": cartList?.valueDate,
                "startDate": new Date().toISOString(),
                "nextInstallmentDate": null,
                "isDividend": cartList?.isDividend || false,
                "dividendOption": cartList?.dividendOption || "",
                "source": 1,
                "folio": data?.['Source Folio'] || cartList?.folio,
                "orderBy": data?.['Order By'] || cartList?.orderBy,
                // "orderBy": data?.['Order By'],
                frequency: "",
                tenorBasis: "",
                periodOrNoOfTransactions: "" || 0,
                EndDate: "",
                targetSchemeCode: data['Target Scheme']?.SchemeCode || cartList?.targetSchemeCode,
                targetSchemeName: data['Target Scheme']?.SchemeName || cartList?.targetSchemeName,
                targetFolio: data['Target Folio'] || cartList?.targetFolio,
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
            } ``

            if (location.pathname === '/investnow') {
                dispatch(actionCreators.investNowAction(payload))
                setOpen(false)
            }
            else if (location.pathname === '/investmentcarts' || isInvestmentCartPath) {
                if (tab == 'cart') {
                    api.post('/InvestmentCart/saveCustomizeCartOrderDetails', payload)
                        .then(res => {
                            dispatch(actionCreators.getCartList({ clientCode: clientCode }))
                            setAlertOpen({ show: true, msg: res.data.message , type: 'success' })
                            setOpen(false)
                        })
                        .catch(error => {
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
                        "transactionType": 6,
                        "scriptCode": "97576",
                        // "scriptCode": cartList?.commonScripCode,
                        "scriptName": cartList.schemeName,
                        "tranType": "S",
                        "txnAmountUnit": data?.['Order Amount'],
                        "valueDate": new Date(),
                        "startDate": new Date(dayjs(data?.['SIP Date']).format('DD-MM-YYYY')),
                        "nextInstallmentDate": null,
                        "isDividend": cartList?.isDividend || false,
                        "dividendOption": cartList?.dividendOption,
                        "source": 1,
                        "orderBy": formConfig?.find((item) => item.fieldName === "Order By")?.defaultValue,
                        "folio": data?.['Source Folio'],
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
                                        // Clear the SchemeListForTargetScheme after cart list is updated
                                        dispatch(actionCreators.GetSchemeListForTargetScheme(null, true));

                                    })
                            })
                            .catch((error) => {
                                setAlertOpen({ show: true, msg: error, type: 'error' });
                            })

                    } else {
                        dispatch(actionCreators.PlaceOrderDetailsForInvestNow([payload]))
                            .then((res) => {
                                if (res.status === 200 || res.status === 201) {
                                    setAlertOpen({ show: true, msg: res.data.message || "Order placed successfully", type: 'success' });
                                    setOpen(false);
                                    // Clear the SchemeListForTargetScheme after cart list is updated
                                    dispatch(actionCreators.GetSchemeListForTargetScheme(null, true));
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

    if (open && !isReady) return <div>Loading...</div>;

    return (
        <FormProvider {...methods}>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth={false}
                sx={{
                    '& .MuiPaper-root': {
                        width: '100%',
                        maxWidth: '100%',
                    },
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Fund Switch
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
                    <FundSwitchView
                        tableData={tableData}
                        setTableData={setTableData}
                        fixedFormConfig={formConfig}
                        udfConfig={udfConfig}
                        folioList={folioList}
                        tab={tab}
                        cartList={cartList}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant="contained" color="secondary" className='fixbtnsize paybtns mr10'
                        onClick={handleSubmit((data) => handleSaveSubmit(data, 'addtoCart'))}
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