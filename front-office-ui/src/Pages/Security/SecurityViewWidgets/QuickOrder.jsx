import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import styled from '@mui/system/styled';
import largetick from "../../../images/largetick.png";
import Typography from '@mui/material/Typography';
import infoicon from "../../../images/info.png";
import SelectTextFields from '../../../Common/FormComponent/SelectTextFields';
import BasicDatePicker from '../../../Common/FormComponent/BasicDatePicker';
import ToggleSwitch from './ToggleSwitch';
import { actionCreators } from '../../../redux/actions/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { handleNumericInput } from '../../../utils/commonFunction';
import api from '../../../APIs/interceptor';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid',
  borderColor: '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',

}));
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

const clientCode = import.meta.env.VITE_CLIENT_CODE;

const QuickOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm(); // Initialize form methods
  // const {control, formState: { errors } } = useFormContext();
  const { handleSubmit, getValues, formState: { errors }, control, watch } = methods; // Destructure required methods
  const [formConfig, setFormConfig] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const selectedSearchedValue = useSelector((state) => state.getSchemeList.data);
  const addtoCartPayload = useSelector((state) => state.addtoCart);
  const [minLumpSumAmount, setMinLumpSumAmount] = useState(0);

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  useEffect(() => {
    dispatch(actionCreators.GetQuickOrderConfiguratorDetails()).then((res) => {
      if (res.status === 200) {
        getLumpSumPayloadParchaseAmount()
        setFormConfig(res.data.data); // Set the fields from the API response
      }
    })
      .catch((error) => {
        console.error("Error fetching config:", error);
      });

  }, [dispatch]);


  // const getPayload = (data) => {
  //   const value = selectedSearchedValue[0]
  //   const isDividendValue = selectedSearchedValue[0].IsDividend === 1 ? true : false;
  //   const payload = [{
  //     "icid": "",
  //     clientCode: 35,
  //     transactionType: 2,
  //     scriptCode: value?.SchemeCode,
  //     scriptName: value?.SchemeName,
  //     tranType: "B",
  //     txnAmountUnit: data.SIPOrderAmount,
  //     valueDate: new Date(),
  //     startDate: new Date(data.SIPDate),
  //     // isDividend: true,
  //     isDividend: isDividendValue,
  //     dividendOption: data.DividendOption,
  //     source: 1,
  //     channelId: "Portal",
  //     parentChannelId: "MVPPortal"
  //   }]
  //   if (data.OrderAmount) {
  //     payload.push({
  //       "icid": "",
  //       clientCode: 35,
  //       transactionType: 1,
  //       scriptCode: value?.SchemeCode,
  //       scriptName: value?.SchemeName,
  //       tranType: "B",
  //       txnAmountUnit: data.OrderAmount,
  //       valueDate: new Date(),
  //       startDate: '',
  //       // isDividend: true,
  //       isDividend: isDividendValue,
  //       dividendOption: data.DividendOption,
  //       source: 1,
  //       channelId: "Portal",
  //       parentChannelId: "MVPPortal"
  //     })
  //   }
  //   return payload;
  // }

  const getPayload = (data) => {
    const value = selectedSearchedValue?.[0];
    if (!value) {
      console.error("Selected search value is not available");
      return [];
    }
    const defaultValue = formConfig.find(config => config.dispatcherName === "DividendOption" && config.quickOrderType === "All")?.defaultValue;
    // Map the default value to "P" or "R"
    const mappedDefaultValue = defaultValue === "PAYOUT" ? "P" : defaultValue === "REINVEST" ? "R" : "";
    const isDividendValue = value.IsDividend === "1" ? true : false;
    const commonPayload = {
      icid: "",
      // clientCode: 35,
      clientCode: clientCode,
      scriptCode: value?.SchemeCode,
      scriptName: value?.SchemeName,
      tranType: "B",
      isDividend: isDividendValue,
      // dividendOption: data.DividendOption ,
      dividendOption: isDividendValue ? (data.DividendOption || mappedDefaultValue) : "",
      source: 1,
      channelId: "Portal",
      parentChannelId: "MVPPortal",
      orderBy: "A", //new values added
      frequency: "",//new values added
      targetSchemeCode: "",//new values added
      udfFieldValues: {}
    };

    const payload = [];

    // Add SIP order to payload
    if (data.SIPOrderAmount) {
      payload.push({
        ...commonPayload,
        transactionType: 2, // SIP transaction type
        txnAmountUnit: data.SIPOrderAmount,
        valueDate: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        startDate: dayjs(data.SIPDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      });
    }

    // Add Lumpsum order to payload
    if (data.OrderAmount) {
      payload.push({
        ...commonPayload,
        transactionType: 1, // Lumpsum transaction type
        txnAmountUnit: data.OrderAmount,
        valueDate: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        startDate: "",
      });
    }

    return payload;
  };

  const getLumpSumPayloadParchaseAmount = () => {
    if (!selectedSearchedValue[0]?.SchemeCode) return
    const payLoad = {
      clientCode: import.meta.env.VITE_CLIENT_CODE,
      userId: "integra",
      transactionType: 1,
      searchString: '',
      lastBusinessDate: new Date().toISOString(),
      getData: 1,
      schemeCode: selectedSearchedValue[0]?.SchemeCode
    }
    api.post('/schemes', payLoad).then((res) => {
      setMinLumpSumAmount(res.data[0].MinInvAmount)
    }).catch((error) => { console.log(error) })
  }
  const handleAddToCart = (data) => {
    const payload = getPayload(data)
    dispatch(actionCreators.addtoCart(payload)).then((res) => {
      if (res.status === 200) {
        handleOpen()
        navigate('/securityview');
        return
      }
    }).catch((error) => { console.log(error) })
  }

  const handleInvestNow = (data) => {
    const payload = getPayload(data)

    // return
    dispatch(actionCreators.addtoCartPayload(payload)).then(() => {
      navigate('/investnow');
    }).catch((error) => { console.log(error) })
  }



  // -----previous code--Determine form validity based on the conditions
  // const isFormValid =
  //   (SIPOrderAmount && SIPDate) || (OrderAmount && !SIPOrderAmount && !SIPDate) || (SIPOrderAmount && SIPDate && OrderAmount);
  // Extract values for SipFrequency and MinInvAmount


  // Watch the values of SIPOrderAmount and SIPDate
  const SIPOrderAmount = watch("SIPOrderAmount");
  const SIPDate = watch("SIPDate");
  const OrderAmount = watch("OrderAmount");

  const SipFrequency = selectedSearchedValue[0]?.SipFrequency;
  const MinInvAmount = selectedSearchedValue[0]?.MinInvAmount;
  const MinPurchaseAmt = minLumpSumAmount;
  const selectedValue = "4";

  const index = SipFrequency?.indexOf(selectedValue);
  // const calculatedMinInvAmount = index !== -1 ? MinInvAmount[index] : "N/A";
  const calculatedMinInvAmount = (MinInvAmount && index !== -1 && index < MinInvAmount.length)
    ? MinInvAmount[index]
    : "N/A";



  const checkIsButtonDisabled = () => {
    // Check if none of the relevant fields are present
    if (!(SIPOrderAmount || SIPDate || OrderAmount)) {
      return true;
    }

    // Check if SIPOrderAmount exists and meets its conditions
    if (SIPOrderAmount) {
      if (Number(SIPOrderAmount) < Number(calculatedMinInvAmount)) {
        return true;
      }
      if (!SIPDate) {
        return true;
      }
    }

    // Check if LumpSum (OrderAmount) exists and meets its condition
    if (OrderAmount) {
      if (Number(OrderAmount) < Number(MinPurchaseAmt)) {
        return true;
      }
    }

    // Check if SIPDate exists independently and its condition
    if (SIPDate) {
      if (!SIPOrderAmount) {
        return true;
      }
      if (Number(SIPOrderAmount) < Number(calculatedMinInvAmount)) {
        return true;
      }
    }

    return false;
  };

  const isButtonDisabled = checkIsButtonDisabled();



  return (
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} >
      <Item className='fixheights mostly-customized-scrollbar'>
        <FormProvider {...methods}>
          <div className='bcwhite heightforipboxes'>

            <div className='gapstodiv'>
              {
                Number(selectedSearchedValue[0]?.IsDividend) ? (
                  <div>
                    <div className=''>
                      <div className='textinheads tp10 halfdiv'>
                        {formConfig.find(config => config.dispatcherName === "DividendOption" && config.quickOrderType === "All")?.displayName || "DividendOption"}
                      </div>

                      <div className='halfdiv'>
                        <Controller
                          name="DividendOption"
                          control={control}
                          defaultValue={formConfig.find(field => field.dispatcherName === "DividendOption" && field.quickOrderType === "All")?.defaultValue || ''}
                          // defaultValue="P"
                          render={({ field }) => {

                            const fieldConfig = formConfig.find(config => config.dispatcherName === "DividendOption" && config.quickOrderType === "All");

                            const defaultValue = formConfig.find(config => config.dispatcherName === "DividendOption" && config.quickOrderType === "All")?.defaultValue;
                            // Map the default value to "P" or "R"
                            const mappedDefaultValue = defaultValue === "PAYOUT" ? "P" : defaultValue === "REINVEST" ? "R" : "";

                            return (
                              // <div >
                              <ToggleSwitch

                                value={field.value}
                                error={false} // No validation error shown
                                helperText="" // No helper text
                                // defaultValue={field.value || 'P'}
                                defaultValue={mappedDefaultValue}
                                // {...field}
                                onChange={(value) => {
                                  field.onChange(value);
                                }} // Update field value
                              />
                              // </div>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : null
              }


            </div>
            <div className='clearfix'></div>
            <div className='divwrap'>
              <div className='heightforipboxes'>
                <div className='halfdiv minh120'>
                  <div className='textinheads'>
                    {formConfig.find(field => field.dispatcherName === "SIPOrderAmount" && field.quickOrderType === "SIP")?.displayName || "SIPOrderAmount"}
                  </div>
                  <Controller
                    name="SIPOrderAmount" className="sipdatetxt"
                    control={control}
                    //  defaultValue={formConfig.find(field => field.dispatcherName === "SIPOrderAmount" && field.quickOrderType === "SIP")?.defaultValue || ''}
                    rules={{
                      // required: formConfig.find(field => field.dispatcherName === "SIPOrderAmount" && field.quickOrderType === "SIP")?.isMandatory ? 'SIP Amount is required' : false,
                      // required: SIPDate ? "SIP Amount is required." : false,

                    }}
                    render={({ field }) => {
                      // Find the field configuration for "OrderAmount"
                      const fieldConfig = formConfig.find(config => config.dispatcherName === "SIPOrderAmount" && config.quickOrderType === "SIP");
                      const label = fieldConfig?.displayName || fieldConfig?.fieldName;
                      return (
                        <SelectTextFields sx={{ width: '100%' }}
                          // label={label}  // Dynamic label
                          // value={field.value}
                          error={!!errors.SIPOrderAmount}
                          helperText={errors.SIPOrderAmount?.message}
                          handleInput={handleNumericInput}
                          //  defaultValue={field.value || formConfig.find(field => field.dispatcherName === "SIPOrderAmount" && field.quickOrderType === "SIP")?.defaultValue}
                          {...field}
                        // placeholder={formConfig.find(field => field.dispatcherName === "SIPOrderAmount" && field.quickOrderType === "SIP")?.displayName || "SIPOrderAmount"}


                        />
                      );
                    }}
                  />
                  <span className='leftfloats'><span className='subfont '>{formConfig.find(field => field.dispatcherName === "MinSIPValue")?.displayName}</span>
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
                  </span>

                </div>

                <div className='halfdiv minh120 dastquick'>
                  <div className='textinheads botpaddinfordate'>
                    {formConfig.find(field => field.dispatcherName === "SIPDate" && field.quickOrderType === "SIP")?.displayName || "SIPDate"}
                  </div>
                  <Controller
                    name="SIPDate"
                    control={control}
                    defaultValue={
                      formConfig.find(field => field.dispatcherName === "SIPDate")?.defaultValue
                        ? dayjs(formConfig.find(field => field.dispatcherName === "SIPDate").defaultValue).format('DD/MM/YY')
                        : ''
                    }
                    rules={{
                      // required: formConfig.find(field => field.dispatcherName === "SIPDate" && field.quickOrderType === "SIP")?.isMandatory ? 'SIP Date is required' : false,
                      // required: SIPOrderAmount ? "SIP Date is required." : false,
                    }}
                    render={({ field }) => {
                      const fieldConfig = formConfig.find(config => config.dispatcherName === "SIPDate" && config.quickOrderType === "SIP");
                      const label = fieldConfig?.displayName || fieldConfig?.fieldName;
                      return (
                        // <BasicDatePicker
                        //   error={!!errors.SIPDate}
                        //   helperText={errors.SIPDate?.message}
                        //   value={field.value ? dayjs(field.value, 'DD/MM/YY') : null} //insert by nidhi
                        //   minDate={dayjs()}
                        //   onChange={(newValue) => {
                        //     const formattedDate = newValue ? dayjs(newValue).format('DD/MM/YY') : '';
                        //     field.onChange(formattedDate); // Update with formatted date

                        //   }}

                        //   {...field}
                        // />
                        <BasicDatePicker
                          error={!!errors.SIPDate}
                          helperText={errors.SIPDate?.message}
                          value={field.value}
                          minDate={dayjs()}
                          onChange={(newValue) => {
                            field.onChange(newValue); // Update with formatted date
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className='clearfix'>
                <div className='wid10per paddignsforspac'>
                  <img src={infoicon} className='texleft' />
                </div>

                <div className='nignt paddignsforspac subfont'>
                  {formConfig.find(field => field.dispatcherName === "UserDefinedNote")?.displayName}
                  {/* {formConfig.find(field => field.dispatcherName === "UserDefinedNote" && field.quickOrderType === "Lumpsum")?.displayName} */}
                </div>
              </div>
            </div>


            <div className='fullsize'>
              <div className='texleft textinheads'>
                {formConfig.find(field => field.dispatcherName === "OrderAmount" && field.quickOrderType === "Lumpsum")?.displayName || "OrderAmount"}
              </div>
            </div>
            <div className='fullsize'>
              <Controller
                name="OrderAmount"
                control={control}

                rules={{
                }}
                render={({ field }) => {
                  // Find the field configuration for "OrderAmount"
                  const fieldConfig = formConfig.find(config => config.dispatcherName === "OrderAmount" && config.quickOrderType === "Lumpsum");
                  const label = fieldConfig?.displayName || fieldConfig?.fieldName;
                  return (
                    <SelectTextFields
                      // label={label}
                      error={errors.OrderAmount}
                      helperText={errors.OrderAmount?.message}
                      handleInput={handleNumericInput}
                      // defaultValue={field.value || formConfig.find(field => field.fieldName === "OrderAmount")?.defaultValue}
                      {...field}
                    // placeholder={formConfig.find(field => field.dispatcherName === "OrderAmount" && field.quickOrderType === "Lumpsum")?.displayName || "OrderAmount"}

                    />
                  );
                }}
              />
            </div>

            <div className='fullsize minh20'>
              <span className='leftfloats'>
                <span className='subfont '>
                  {formConfig.find(field => field.fieldName === "Min. Order Value" && field.quickOrderType === "Lumpsum")?.displayName}
                </span> <b>
                  {minLumpSumAmount}
                  {/* {formatter.format(selectedSearchedValue[0]?.MinPurchaseAmt)} */}
                </b></span>
            </div>

            <div className='fullsize'>
              <Button variant="contained" color="primary" className='fixbtnsize addtocartbtn mr10'
                onClick={handleSubmit(handleAddToCart)}
                disabled={isButtonDisabled}
              >
                Add to Cart

              </Button>
              <Button variant="contained" color="secondary" className='fixbtnsize Darkbtn'
                onClick={handleSubmit(handleInvestNow)}
                disabled={isButtonDisabled}
              // disabled={!isFormValid}

              >
                Invest
              </Button>

            </div>

          </div>
        </FormProvider>
      </Item>
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
    </Grid>

  )
}

export default QuickOrder