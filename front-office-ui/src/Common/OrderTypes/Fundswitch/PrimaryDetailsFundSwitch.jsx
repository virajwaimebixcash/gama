import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  TextField,
  MenuItem,
} from "@mui/material";
import { Controller, useFormContext } from 'react-hook-form';
import { handleNumericInput } from '../../../utils/commonFunction';
import { useSelector } from 'react-redux';
import DebouncedAutocomplete from '../../CustomComponents/Autocomplete';

const PrimaryDetailsFundSwitch = ({ fixedFormConfig, tab, folioList ,cartList}) => {
  const methods = useFormContext();
  const { control, watch, getValues, formState: { errors } } = methods;
  const watchedValues = watch();
  const selectedSearchedValue = useSelector((state) => state.getSchemeListForTargetScheme?.data);
  const MinSwitchAmount = selectedSearchedValue[0]?.MinPurchaseAmt
  const minSwitchUnit = selectedSearchedValue[0]?.MinSWPUnit;
  const MaxOrderAmt = cartList?.marketValue
  const MaxOrderUnit = cartList?.unitAtSchemeLevel

  const getFolioList = () => {
    const selectedFolio = folioList?.map((item) => item.FolioNo);
    if (selectedFolio) {
      return selectedFolio;
    }
    return [];
  }  

  return (
    <Box className="maincontentprimary">
      <Grid container spacing={2}>
        {
          fixedFormConfig?.find((item) => item.fieldName === "Source Scheme")?.isHide ? (
            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth' >
              <Controller
                name="Source Scheme"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Source Scheme")?.defaultValue}
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
              <p
                style={{
                  visibility: fixedFormConfig?.find((item) => item.fieldName === "Source Scheme")?.displayLabel
                    ? "visible"
                    : "hidden",
                }}
              >
                {fixedFormConfig?.find((item) => item.fieldName === "Source Scheme")?.displayLabel || "-"}
              </p>
              <Controller
                name="Source Scheme"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Source Scheme")?.defaultValue}
                rules={{
                  required: {
                    value: fixedFormConfig?.find((item) => item.fieldName === "Source Scheme")?.isMandatory,
                    message: "Source Scheme is required"
                  }
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: '100%' }}
                      // disabled={fixedFormConfig?.find((item) => item.fieldName === "Source Scheme")?.isReadOnly}
                      {...field}
                      disabled={true}
                    />
                  );
                }}
              />
            </Grid>
          )
        }
        {/* ----------------------------------source folio----------------------- */}
        {
          fixedFormConfig?.find((item) => item.fieldName === "Source Folio")?.isHide ? (
            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
              <Controller
                name="Source Folio"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Source Folio")?.defaultValue}
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
              <p
                style={{
                  visibility: fixedFormConfig?.find((item) => item.fieldName === "Source Folio")?.displayLabel
                    ? "visible"
                    : "hidden",
                }}
              >{fixedFormConfig?.find((item) => item.fieldName === "Source Folio")?.displayLabel || '-'}</p>
              <Controller
                name="Source Folio"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Source Folio")?.defaultValue}
                rules={{
                  required: {
                    value: fixedFormConfig?.find((item) => item.fieldName === "Source Folio")?.isMandatory,
                    message: "Source Folio is required"
                  }
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      select
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: '100%' }}
                      disabled={fixedFormConfig?.find((item) => item.fieldName === "Source Folio")?.isReadOnly}
                      {...field}
                    >
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

                    </TextField>
                  );
                }}
              />
            </Grid>
          )
        }
        {/* ----------------------------------Target Scheme----------------------- */}
        {
          fixedFormConfig?.find((item) => item.fieldName === "Target Scheme")?.isHide ? (
            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth' >
              <Controller
                name="Target Scheme"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Target Scheme")?.defaultValue}
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
              <p
                style={{
                  visibility: fixedFormConfig?.find((item) => item.fieldName === "Target Scheme")?.displayLabel
                    ? "visible"
                    : "hidden",
                }}
              >
                {fixedFormConfig?.find((item) => item.fieldName === "Target Scheme")?.displayLabel || "-"}
              </p>
              <Controller
                name="Target Scheme"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Target Scheme")?.defaultValue}
                rules={{
                  required: {
                    value: fixedFormConfig?.find((item) => item.fieldName === "Target Scheme")?.isMandatory,
                    message: "Target Scheme is required"
                  }
                }}
                render={({ field }) => {
                  return (
                    <DebouncedAutocomplete
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: '100%' }}
                      disabled={fixedFormConfig?.find((item) => item.fieldName === "Target Scheme")?.isReadOnly}
                      selectedSchemeCode={getValues("Target Scheme") ? getValues("Target Scheme")?.SchemeCode : null}
                      {...field}
                    />
                    // tab === 'holding' ? <DebouncedAutocomplete
                    //   id="outlined-size-small"
                    //   size="small"
                    //   sx={{ width: '100%' }}
                    //   disabled={fixedFormConfig?.find((item) => item.fieldName === "Target Scheme")?.isReadOnly}
                    //   {...field}

                    // /> : <TextField
                    //   id="outlined-size-small"
                    //   size="small"
                    //   sx={{ width: '100%' }}
                    //   {...field}
                    //   disabled={true}
                    // />
                  );
                }}
              />
            </Grid>
          )
        }

        {/* ----------------------------------source folio----------------------- */}
        {
          fixedFormConfig?.find((item) => item.fieldName === "Target Folio")?.isHide ? (
            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
              <Controller
                name="Target Folio"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Target Folio")?.defaultValue}
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
              <p
                style={{
                  visibility: fixedFormConfig?.find((item) => item.fieldName === "Target Folio")?.displayLabel
                    ? "visible"
                    : "hidden",
                }}
              >{fixedFormConfig?.find((item) => item.fieldName === "Target Folio")?.displayLabel || '-'}</p>
              <Controller
                name="Target Folio"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Target Folio")?.defaultValue}
                rules={{
                  required: {
                    value: fixedFormConfig?.find((item) => item.fieldName === "Target Folio")?.isMandatory,
                    message: "Target Folio is required"
                  }
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      select
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: '100%' }}
                      disabled={fixedFormConfig?.find((item) => item.fieldName === "Target Folio")?.isReadOnly}
                      {...field}
                    >
                      <MenuItem value="New Folio">New</MenuItem>
                      {
                        getFolioList().length !== 0 ? (
                          getFolioList()?.map((folio, index) => (
                            <MenuItem key={`${folio}_${index}`} value={folio}>
                              {folio}
                            </MenuItem>
                          ))
                        ) : null
                      }

                    </TextField>
                  );
                }}
              />
            </Grid>
          )
        }
        {/* ----------------------------------order by----------------------- */}
        {
          fixedFormConfig?.find((item) => item.fieldName === "Order By")?.isHide ? (
            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth' >
              <Controller
                name="Order By"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Order By")?.defaultValue}
                render={({ field }) => { <input type="hidden" {...field} /> }}
              />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
              <p
                style={{
                  visibility: fixedFormConfig?.find((item) => item.fieldName === "Order By")?.displayLabel
                    ? "visible"
                    : "hidden",
                }}
              >{fixedFormConfig?.find((item) => item.fieldName === "Order By")?.displayLabel || '-'}</p>


              <Controller
                name="Order By"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Order By")?.defaultValue}
                rules={{
                  required: {
                    value: fixedFormConfig?.find((item) => item.fieldName === "Order By")?.isMandatory,
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
                      disabled={fixedFormConfig?.find((item) => item.fieldName === "Order By")?.isReadOnly}
                      {...field}
                    >
                      {fixedFormConfig?.find((item) => item.fieldName === "Order By")?.fieldValues?.map((option) => (
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
        {/* ----------------------------------order amount----------------------- */}
        {/* {
          fixedFormConfig?.find((item) => item.fieldName === "Order Amount")?.isHide ? (
            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth' >
              <Controller
                name="Order Amount"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Order Amount")?.defaultValue}
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
              <p
                style={{
                  visibility: fixedFormConfig?.find((item) => item.fieldName === "Order Amount")?.displayLabel
                    ? "visible"
                    : "hidden",
                }}
              >{fixedFormConfig.find((item) => item.fieldName === "Order Amount")?.displayLabel}</p>
              <Controller
                name="Order Amount"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Order Amount")?.defaultValue}
                rules={{
                  required: {
                    value: true,
                    message: "Order Amount is required"
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Only numeric values are allowed"
                  },
                  min: {
                    value: `${MinLumpSumAmount}`,
                    message: `Min order amount ${MinLumpSumAmount}`
                  }
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: '100%' }}
                      disabled={tab === 'cart' ? fixedFormConfig?.find((item) => item.fieldName === "Order Amount")?.isReadOnly : false}
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
        } */}

        {/* ----------------------------------order units----------------------- */}
        {/* {
          fixedFormConfig?.find((item) => item.fieldName === "Order Units")?.isHide ? (
            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth' >
              <Controller
                name="Order Units"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Order Units")?.defaultValue}
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
              <p
                style={{
                  visibility: fixedFormConfig?.find((item) => item.fieldName === "Order Units")?.displayLabel
                    ? "visible"
                    : "hidden",
                }}
              >{fixedFormConfig.find((item) => item.fieldName === "Order Units")?.displayLabel}</p>
              <Controller
                name="Order Units"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Order Units")?.defaultValue}
                // rules={{
                //   required: {
                //     value: true,
                //     message: "Order Units is required"
                //   },
                //   pattern: {
                //     value: /^[0-9]*$/,
                //     message: "Only numeric values are allowed"
                //   },
                //   min: {
                //     value: `${calculatedMinInvAmount}`,
                //     message: `Min SIP amount ${calculatedMinInvAmount}`
                //   }
                // }}
                render={({ field }) => {
                  return (
                    <TextField
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: '100%' }}
                      disabled={tab === 'cart' ? fixedFormConfig?.find((item) => item.fieldName === "Order Units")?.isReadOnly : false}
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
            const maxValue =
              fieldName === "Order Amount"
                ? MaxOrderAmt
                : MaxOrderUnit;

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
                      value: 1, // Ensure the value is at least 1
                      message: "Value must be greater than zero",
                    },
                    validate: {
                      withinRange: (value) => {
                        const minValue = fieldName === "Order Amount" ? MaxOrderAmt : MaxOrderUnit;
                        const marketLimit =
                          fieldName === "Order Amount" ? MaxOrderAmt : MaxOrderUnit;
                  
                        if (value > minValue) {
                          return `Value must be greater than or equal to ${minValue}`;
                        }
                        if (value > marketLimit) {
                          return `Value cannot exceed the market ${fieldName.toLowerCase()} (${marketLimit})`;
                        }
                        return true; // Valid value
                      },
                    },
                  }}
                  
                  
                  render={({ field }) => (
                    <TextField
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

export default PrimaryDetailsFundSwitch