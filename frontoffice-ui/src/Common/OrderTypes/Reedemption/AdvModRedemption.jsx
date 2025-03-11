import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import RedemptionView from './RedemptionView';
import dayjs from 'dayjs';
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
    const methods = useForm();
    const cartDetails = useSelector((state) => state.GetCustomizeCartOrderDetails.data);
    const location = useLocation();
    const navigate = useNavigate();
    const [formConfig, setFormConfig] = useState([]);
    const [udfConfig, setUdfConfig] = useState([])
    const [tableData, setTableData] = useState([]);
    const [folioList, setFolioList] = useState([]);
    const [isOrderAmountDisabled, setIsOrderAmountDisabled] = useState(false);
    const { reset, handleSubmit, watch, setValue, formState: { errors } } = methods;

    // const { reset, handleSubmit } = methods;
    // const investData = useSelector((state) => state.investNowLumpSumAction.data);
    const investData = useSelector((state) => state.investNowAction.data);
    const clientCode = import.meta.env.VITE_CLIENT_CODE;


    const handleClose = () => {
        setOpen(null);
    };

    const searchParams = new URLSearchParams(location.search);
    const pathParam = searchParams.get("path");

    const isInvestmentCartPath =
        location.pathname === "/investmentcarts" &&
        (!pathParam || ["sip", "swp", "stp"].includes(pathParam));

    const isValidTab = ["holding", "sipManager", "stpManager", "swpManager"].includes(tab);

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
                        const rowId = new Date().getTime();
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
                "Order Amount": cartList.txnAmountUnit,
                "Order By": investDataObject?.orderBy || "",
                "Units": investDataObject.orderUnits
            }

            data = { ...data, ...newData }
            if (investDataObject?.udfFieldValues?.['multiselectdropdown']) data.multiselectdropdown = [cartDetails?.udfFieldValues?.['multiselectdropdown']]
            setTableData(tableDataObject)
            reset(data)
        }

        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (open) {
            autofillUdfData()
        }
    }, [cartDetails, open])

    const watchedValues = watch()

    useEffect(() => {
        try {
            if (watchedValues['Order By'] === 'Full Redemption') {
                setValue('Order Units', cartList.unitAtSchemeLevel);
                setValue('Order Amount', 0);
                setIsOrderAmountDisabled(true);  // Disable Order Amount
            } else if (watchedValues['Order By'] === 'Partial Units') {
                setValue('Order Units', "");
                setIsOrderAmountDisabled(false); // Enable Order Amount
            } else if (watchedValues['Order By'] === 'Partial Amount') {
                setValue('Order Units', 0);
                setValue('Order Amount', "");

            } else {
                setIsOrderAmountDisabled(false); // Default case
            }
        } catch (e) {
            console.error("Error calculating STP End Date:", e);
        }
    }, [
        watchedValues['Order By'],
        // watchedValues['Order Units'],
    ]);

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
    }, [cartList, open])

    useEffect(() => {
        if (open) {
            getSchemeDetails();
            const body = {
                "productClassId": 1,
                "productSubClassIds": [
                    3
                ],
                "orderTypeIds": 3,
                "portfolioTypeIds": [
                    1
                ]
            };
            const UdfBody = {
                "entityId": 1,
                "productSubclassId": 3,
                "portfolioTypeId": 1,
                "productClassId": 1,
                "orderTypeId": 3
            };

            // for use of qa
            // const UdfBody = {
            //     "entityId": 1,
            //     "productSubclassId": 3,
            //     "portfolioTypeId": 3,
            //     "productClassId": 1,
            //     "orderTypeId": 3
            // };

            dispatch(actionCreators.GetOrderViewUdfConfiguratorDetails(UdfBody)).then((res) => {
                if (res.status === 200) {
                    setUdfConfig(res.data.data.udfConfig);
                    getCartDetails();

                }
            })
                .catch((error) => {
                    console.error("Error fetching config:", error);
                });

            dispatch(actionCreators.GetOrderViewConfiguratorDetails(body)).then((res) => {
                if (res.status === 200) {
                    setFormConfig(res.data.data); // Set the fields from the API response
                }
            })
                .catch((error) => {
                    console.error("Error fetching config:", error);
                });
        }
    }, [dispatch, open]);

    const getCartDetails = () => {
        if (cartId) {
            const payload = {
                "icid": cartId,
                "entityId": 1,
                "productSubclassId": 3,
                "portfolioTypeId": 1,
                "productClassId": 1,
                "orderTypeId": 1
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
                "icdid": cartDetails?.icdid || "",
                "clientCode": cartList?.clientCode || clientCode,
                "transactionType": cartList?.transactionType || 3,
                "scriptCode": cartList?.scriptCode,
                "scriptName": cartList?.scriptName,
                "tranType": "S",
                "txnAmountUnit": data?.['Order Amount'],
                "orderUnit": data?.['Order Units'],
                // "txnAmountUnit": cartList?.txnAmountUnit || data['Order Units/Amount'],
                "valueDate": cartList?.valueDate || new Date(),
                "startDate": '',
                "nextInstallmentDate": null,
                "isDividend": cartList?.isDividend,
                "dividendOption": cartList?.dividendOption,
                "source": 1,
                "folio": data.Folio,
                orderBy: cartList?.orderBy || data['Order By'],
                frequency: "",
                tenorBasis: "",
                periodOrNoOfTransactions: "" || 0,
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
                            setAlertOpen({ show: true, msg: res.data.message || "cart updated successfully", type: 'success' })
                            setOpen(false)
                        })
                        .catch((error) => {
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
                        "transactionType": 3,
                        "scriptCode": "97576",
                        "scriptName": cartList?.schemeName,
                        "tranType": "S",
                        "orderBy": data?.['Order By'],
                        "txnAmountUnit": data?.['Order Amount'],
                        "orderUnit": data?.['Order Units'],
                        "valueDate": new Date(),
                        "startDate": new Date(dayjs(data?.['SIP Date']).format('YYYY-MM-DD')),
                        "nextInstallmentDate": null,
                        "isDividend": cartList?.isDividend || false,
                        "dividendOption": cartList?.dividendOption,
                        "source": 1,
                        "folio": data?.Folio,
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
                                setAlertOpen({ show: true, msg: error, type: 'error' });
                            })

                    } else {
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
        catch (error) {
            console.log(error)
        };
    }

    const getSchemeDetails = () => {
        const body = {
            // clientCode: "35",
            clientCode: clientCode,
            userId: "integra",
            transactionType: 3,
            searchString: "",
            lastBusinessDate: new Date().toISOString(),
            getData: 1,
            schemeCode: tab === "cart" ? cartList?.scriptCode : cartList?.commonScripCode

        };

        dispatch(actionCreators.GetSchemeList(body)).then((res) => {
            if (res.status === 200) {
                // console.log(res)
            }
        })
    };

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
                        width: '100%',
                        maxWidth: '100%',
                    },
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Redemption
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
                    <RedemptionView tableData={tableData} cartList={cartList}
                        setTableData={setTableData} fixedFormConfig={formConfig} udfConfig={udfConfig} folioList={folioList} isOrderAmountDisabled={isOrderAmountDisabled} />
                </DialogContent>
                <DialogActions >
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
