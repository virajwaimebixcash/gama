import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  TextField,
  MenuItem
} from "@mui/material";
import { Controller, useFormContext } from 'react-hook-form';
import { handleNumericInput } from '../../../utils/commonFunction';
import { useSelector } from 'react-redux';

const RedemptionPrimaryDetails = ({ fixedFormConfig, tab, folioList, cartList, isOrderAmountDisabled }) => {
  const methods = useFormContext();
  const { control, watch, formState: { errors } } = methods;
  const watchedValues = watch();
  const selectedSearchedValue = useSelector((state) => state.getSchemeList.data);
  // const MinOrderAmt = selectedSearchedValue[0]?.MinPurchaseAmt
  const minimumOrderamount = selectedSearchedValue[0]?.MinInvAmount

  const MaxOrderAmt = cartList?.unitAtSchemeLevel
  const MinRedemAmount = selectedSearchedValue[0]?.MinRedeemAmount

  const getFolioList = () => {
    const selectedFolio = folioList?.map((item) => item.FolioNo);
    if (selectedFolio) {
      return selectedFolio;
    }
    return [];
  };


  return (
    <Box className="maincontentprimary">
      <Grid container spacing={2}>
        {
          fixedFormConfig.find((item) => item.fieldName === "MF Scheme")?.isHide ? (
            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
              <Controller
                name="MF Scheme"
                control={control}
                defaultValue={fixedFormConfig.find((item) => item.fieldName === "MF Scheme")?.defaultValue}
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, }} >
              <p
                style={{
                  visibility: fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.displayLabel
                    ? "visible"
                    : "hidden",
                }}
              >{fixedFormConfig.find((item) => item.fieldName === "MF Scheme")?.displayLabel || '-'}</p>
              <Controller
                name="MF Scheme"
                control={control}
                defaultValue={fixedFormConfig.find((item) => item.fieldName === "MF Scheme")?.defaultValue}
                rules={{
                  required: {
                    value: fixedFormConfig.find((item) => item.fieldName === "MF Scheme")?.isMandatory,
                    message: "MF Scheme is required"
                  }
                }}

                render={({ field }) => {
                  return (
                    <TextField
                      // label={fixedFormConfig.find((item) => item.fieldName === "MF Scheme")?.displayLabel}
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: '100%' }}
                      // disabled={fixedFormConfig.find((item) => item.fieldName === "MF Scheme")?.isReadOnly }
                      disabled={true}
                      {...field}
                    />
                  );
                }}
              />
            </Grid>
          )
        }
        {
          fixedFormConfig.find((item) => item.fieldName === "Folio")?.isHide ? (
            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
              <Controller
                name="Folio"
                control={control}
                defaultValue={fixedFormConfig.find((item) => item.fieldName === "Folio")?.defaultValue}
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3.8, }} >
              <p
                style={{
                  visibility: fixedFormConfig?.find((item) => item.fieldName === "Folio")?.displayLabel
                    ? "visible"
                    : "hidden",
                }}
              >{fixedFormConfig.find((item) => item.fieldName === "Folio")?.displayLabel || '-'}</p>
              <Controller
                name="Folio"
                control={control}
                defaultValue={fixedFormConfig.find((item) => item.fieldName === "Folio")?.defaultValue || ''}
                rules={{
                  required: {
                    value: fixedFormConfig.find((item) => item.fieldName === "Folio")?.isMandatory,
                    message: "Folio is required"
                  }
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      select
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: '100%' }}
                      // disabled={fixedFormConfig.find((item) => item.fieldName === "Folio")?.isReadOnly}
                      {...field}
                    >
                      {/* <MenuItem value="All Folio">All</MenuItem>
                      {
                        getFolioList().length !== 0 ? (
                          getFolioList()?.map((folio, index) => (
                            <MenuItem key={`${folio}_${index}`} value={folio}>
                              {folio}
                            </MenuItem>
                          ))
                        ) : null
                      } */}

                      <MenuItem value="All Folio">All</MenuItem>
                      {
                        getFolioList()?.length !== 0 ? (
                          getFolioList()?.map((folio, index) => (
                            <MenuItem key={`${folio}_${index}`} value={folio}>
                              {folio}
                            </MenuItem>
                          ))
                        ) : null
                      }


                      {/* {fixedFormConfig.find((item) => item.fieldName === "Folio")?.fieldValues.map((option) => (
                        <MenuItem key={option.id} value={option.values}>
                          {option.values}
                        </MenuItem>
                      ))} */}
                    </TextField>
                  );
                }}
              />
            </Grid>
          )
        }
        {
          fixedFormConfig.find((item) => item.fieldName === "Order By")?.isHide ? (
            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
              <Controller
                name="Order By"
                control={control}
                defaultValue={fixedFormConfig.find((item) => item.fieldName === "Order By")?.defaultValue}
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3.8, }} >
              <p
                style={{
                  visibility: fixedFormConfig?.find((item) => item.fieldName === "Order By")?.displayLabel
                    ? "visible"
                    : "hidden",
                }}
              >{fixedFormConfig.find((item) => item.fieldName === "Order By")?.displayLabel || '-'}</p>
              <Controller
                name="Order By"
                control={control}
                defaultValue={fixedFormConfig.find((item) => item.fieldName === "Order By")?.defaultValue}
                rules={{
                  required: {
                    value: fixedFormConfig.find((item) => item.fieldName === "Order By")?.isMandatory,
                    message: "Order By is required"
                  }
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      select
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: '100%' }}
                      disabled={fixedFormConfig.find((item) => item.fieldName === "Order By")?.isReadOnly}
                      {...field}
                    >
                      {fixedFormConfig.find((item) => item.fieldName === "Order By")?.fieldValues?.map((option) => (
                        <MenuItem key={option.id} value={option.values}>
                          {option.values}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                }}
              />
            </Grid>
          )
        }
        {/* -------------------Order Units field--------------------------------- */}
        {
          fixedFormConfig.find((item) => item.fieldName === "Order Units")?.isHide ? (
            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
              <Controller
                name="Order Units"
                control={control}
                defaultValue={fixedFormConfig.find((item) => item.fieldName === "Order Units")?.defaultValue}
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, }} >
              {/* <p>{(watchedValues["Order By"] === "Amount" ? "Enter Amount" : "Enter Units") || '-'}</p> */}
              <p
                style={{
                  visibility: fixedFormConfig?.find((item) => item.fieldName === "Order Units")?.displayLabel
                    ? "visible"
                    : "hidden",
                }}
              >{fixedFormConfig.find((item) => item.fieldName === "Order Units")?.displayLabel || '-'}</p>
              <Controller
                name="Order Units"
                control={control}
                defaultValue={fixedFormConfig.find((item) => item.fieldName === "Order Units")?.defaultValue}
                rules={{
                  required: {
                    // value: fixedFormConfig.find((item) => item.fieldName === "Order Units/Amount")?.isMandatory,
                    value: watchedValues['Order By'] !== 'Partial Amount' ? true : false,
                    message: "Order Units is required"
                  },
                  validate: (value) => {
                    if (watchedValues['Order By'] === 'Partial Units') {
                      if (value <= 0) {
                        return "Order Units should be greater than 0";
                      }
                      if (value >= cartList?.unitAtSchemeLevel) {
                        return `Order Units should be less than ${cartList?.unitAtSchemeLevel}`;
                      }
                    }
                    return true; // No errors
                  },
                  max: {
                    value: `${MaxOrderAmt}`,
                    message: `Order units should be less than ${MaxOrderAmt}`,
                  },
                  min: {
                    value: 0,
                    message: `Order units should not be less than 0`,
                  },


                }}
                render={({ field }) => {


                  return (
                    // <TextField
                    //   id="outlined-size-small"
                    //   size="small"
                    //   sx={{ width: '100%' }}
                    //   disabled={tab === 'cart' ? (fixedFormConfig?.find((item) => item.fieldName === "Order Units")) && (isOrderAmountDisabled)?.isReadOnly : false}
                    //   // disabled={fixedFormConfig.find((item) => item.fieldName === "Order Units/Amount")?.isReadOnly}
                    //   {...field}
                    //   error={errors['Order Units']}
                    //   helperText={errors['Order Units']?.message}
                    //   slotProps={{
                    //     input: {
                    //       onInput: handleNumericInput,
                    //     },
                    //   }}

                    // />
                    <TextField
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: '100%' }}
                      disabled={
                        isOrderAmountDisabled ||  // Disable when Order By is 'Full Redemption'
                        (tab === 'cart' ? fixedFormConfig?.find((item) => item.fieldName === "Order Units")?.isReadOnly : false) || watchedValues['Order By'] === 'Partial Amount'
                      }
                      {...field}
                      error={errors['Order Units']}
                      helperText={errors['Order Units']?.message}
                      slotProps={{
                        input: {
                          onInput: handleNumericInput,
                        },
                      }}
                    />
                  );
                }}
              />
            </Grid>
          )
        }
        {/* -------------------Order Amount field--------------------------------- */}
        {
          fixedFormConfig.find((item) => item.fieldName === "Order Amount")?.isHide ? (
            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
              <Controller
                name="Order Amount"
                control={control}
                defaultValue={fixedFormConfig.find((item) => item.fieldName === "Order Amount")?.defaultValue}
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, }} >
              {/* <p>{(watchedValues["Order By"] === "Amount" ? "Enter Amount" : "Enter Units") || '-'}</p> */}
              <p
                style={{
                  visibility: fixedFormConfig?.find((item) => item.fieldName === "Order Amount")?.displayLabel
                    ? "visible"
                    : "hidden",
                }}
              >{fixedFormConfig.find((item) => item.fieldName === "Order Amount")?.displayLabel || '-'}</p>
              <Controller
                name="Order Amount"
                control={control}
                defaultValue={fixedFormConfig.find((item) => item.fieldName === "Order Amount")?.defaultValue}
                rules={{
                  required: {
                    // value: fixedFormConfig.find((item) => item.fieldName === "Order Units/Amount")?.isMandatory,
                    value: watchedValues['Order By'] === 'Partial Amount' ? true : false,
                    message: "Order Amount is required"
                  },
                  validate: (value) => {
                    if (watchedValues['Order By'] === 'Partial Amount') {
                      if (value <= 0) {
                        return "Order Amount should be greater than 0";
                      }
                      if (value < selectedSearchedValue[0]?.MinRedeemAmount) {
                        return `Order Amount should be less than ${selectedSearchedValue[0]?.MinRedeemAmount}`;
                      }
                      if (value >= cartList?.marketValue) {
                        return `Order Amount should be less than ${cartList?.marketValue}`;
                      }
                    }
                    return true; // No errors
                  },
                  max: {
                    value: `${cartList?.marketValue}`,
                    message: `Order Amount should be less than ${cartList?.marketValue}`,
                  },
                  min: {
                    value: (watchedValues['Order By'] === 'Partial Units' || watchedValues['Order By'] === 'Full Redemption') ? 0 : minimumOrderamount,
                    message: `Order Amount should not be less than ${minimumOrderamount}`,
                  },


                }}
                render={({ field }) => {
                  return (
                    <TextField
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: '100%' }}
                      disabled={(tab === 'cart' ? fixedFormConfig?.find((item) => item.fieldName === "Order Amount")?.isReadOnly : false) || watchedValues['Order By'] === 'Full Redemption' || watchedValues['Order By'] === 'Partial Units'}
                      // disabled={fixedFormConfig.find((item) => item.fieldName === "Order Units/Amount")?.isReadOnly}
                      {...field}
                      error={errors['Order Amount']}
                      helperText={errors['Order Amount']?.message}
                      slotProps={{
                        input: {
                          onInput: handleNumericInput,
                        },
                      }}

                    />
                  );
                }}
              />
            </Grid>
          )
        }



      </Grid>
    </Box>
  )
}

export default RedemptionPrimaryDetails