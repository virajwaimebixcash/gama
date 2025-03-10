import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  TextField,
  MenuItem
} from "@mui/material";
import { Controller, useFormContext } from 'react-hook-form';
import { handleNumericInput } from '../../../utils/commonFunction';
import { useSelector } from 'react-redux';
import NumberFormatInput from '../../CustomComponents/NumberFormatterInput';
// import NumberFormatInput from '../../CustomComponents/NumberFormatterInput';

const PrimaryDetails = ({ fixedFormConfig, tab, folioList }) => {
  const methods = useFormContext();
  const { control, watch, formState: { errors } } = methods;

  const watchedValues = watch();
  const selectedSearchedValue = useSelector((state) => state.getSchemeList.data);
  
  const MinLumpSumAmount = selectedSearchedValue[0]?.MinPurchaseAmt
  const minimumOrderamount = watchedValues['Folio'] == 'New Folio' ? selectedSearchedValue[0]?.MinInvAmount : selectedSearchedValue[0]?.MinPurchaseAmt;
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
                      <MenuItem value="New Folio">New Folio</MenuItem>
                      {
                        getFolioList().length !== 0 ? (
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
        {/* {
          fixedFormConfig.find((item) => item.fieldName === "Order Units/Amount")?.isHide ? (
            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
              <Controller
                name="Order Units/Amount"
                control={control}
                defaultValue={fixedFormConfig.find((item) => item.fieldName === "Order Units/Amount")?.defaultValue}
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, }} >
              <p
                style={{
                  visibility: fixedFormConfig?.find((item) => item.fieldName === "Order Units/Amount")?.displayLabel
                    ? "visible"
                    : "hidden",
                }}
              >{fixedFormConfig.find((item) => item.fieldName === "Order Units/Amount")?.displayLabel || '-'}</p>
              <Controller
                name="Order Units/Amount"
                control={control}
                defaultValue={fixedFormConfig.find((item) => item.fieldName === "Order Units/Amount")?.defaultValue}
                rules={{
                  required: {
                    // value: fixedFormConfig.find((item) => item.fieldName === "Order Units/Amount")?.isMandatory,
                    value: true,
                    message: "Order Units/Amount is required"
                  },
                  pattern: {
                    value: /^[0-9]*$/, // Regular expression to allow only numeric values
                    message: "Only numeric values are allowed"
                  },
                  min: {
                    value: `${MinLumpSumAmount}`,
                    message: `Min LumpSum amount ${MinLumpSumAmount}`
                  }
                }}
                render={({ field }) => {                  
                  return (
                    <TextField
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: '100%' }}
                      disabled={tab === 'cart' ? fixedFormConfig?.find((item) => item.fieldName === "Order Units/Amount")?.isReadOnly : false}
                      // disabled={fixedFormConfig.find((item) => item.fieldName === "Order Units/Amount")?.isReadOnly}
                      {...field}
                      error={errors['Order Units/Amount']}
                      helperText={errors['Order Units/Amount']?.message}
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
        } */}
        {
          (() => {
            const orderByConfig = fixedFormConfig?.find((item) => item.fieldName === "Order By");
            const orderByDefaultValue = orderByConfig?.defaultValue;
            const fieldName = orderByDefaultValue === "Amount" ? "Order Amount" : "Order Units";
            const fieldConfig = fixedFormConfig?.find((item) => item.fieldName === fieldName);

            if (!fieldConfig) return null; // If no config found, don't render

            const isHidden = fieldConfig?.isHide;
            const isMandatory = true; // Adjust dynamically if needed
            const isReadOnly = tab === "cart" ? fieldConfig?.isReadOnly : false;
            const minValue = MinLumpSumAmount;
            // const minValue =
            //   fieldName === "Order Amount"
            //     ? MinLumpSumAmount
            //     : MinLumpsumhUnit;

            return isHidden ? (
              <Grid
                key={fieldName}
                size={{ xs: 0, sm: 0, md: 0, lg: 0 }}
                className="zerowidth"
              >
                <Controller
                  name={fieldName}
                  control={control}
                  defaultValue={fieldConfig?.defaultValue}
                  render={({ field }) => <input type="hidden" {...field} />}
                />
              </Grid>
            ) : (
              <Grid
                key={fieldName}
                size={{ xs: 12, sm: 6, md: 6, lg: 4 }}
              >
                <p
                  style={{
                    visibility: fieldConfig?.displayLabel ? "visible" : "hidden",
                  }}
                >
                  {fieldConfig?.displayLabel || fieldName}
                </p>
                <Controller
                  name={fieldName}
                  control={control}
                  defaultValue={fieldConfig?.defaultValue}
                  rules={{
                    required: isMandatory
                      ? {
                        value: true,
                        message: `${fieldName} is required`,
                      }
                      : false,
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Only numeric values are allowed",
                    },
                    min: {
                      value: minimumOrderamount,
                      message: `Minimum value is ${minimumOrderamount}`,
                    },
                  }}
                  render={({ field }) => (
                    <NumberFormatInput
                      id={`outlined-${fieldName}`}
                      size="small"
                      sx={{ width: "100%" }}
                      disabled={isReadOnly}
                      {...field}
                      error={errors[fieldName]}
                      helperText={errors[fieldName]?.message}
                      slotProps={{
                        input: {
                          onInput: handleNumericInput,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            );
          })()
        }
      </Grid>
    </Box>
  )
}

export default PrimaryDetails

