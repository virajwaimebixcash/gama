import React, { useState } from 'react';

import Grid from '@mui/material/Grid2';
import {
    TextField,
    MenuItem,
    Box
} from "@mui/material";

import { Controller, useFormContext } from 'react-hook-form';
import { handleNumericInput } from '../../../utils/commonFunction';
import DatePickerComponent from '../../FormComponent/DatePickerComponent';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';


const PrimaryDetailsSWP = ({ fixedFormConfig, tab, folioList=[] }) => {

    const methods = useFormContext();
    const { control, watch, getValues, formState: { errors } } = methods;
    const watchedValues = watch();
    const selectedSearchedValue = useSelector((state) => state.getSchemeList.data);
    const MinLumpSumAmount = selectedSearchedValue[0]?.MinPurchaseAmt
    const SipFrequency = selectedSearchedValue[0]?.SipFrequency;
    const MinInvAmount = selectedSearchedValue[0]?.MinInvAmount;
    const selectedValue = "4";
   
    const getFolioList = () => {
        const selectedFolio = folioList.map((item) => item.FolioNo);
        if (selectedFolio) {
            return selectedFolio;
        }
        return [];
    }
    const index = SipFrequency?.indexOf(selectedValue);
    // const calculatedMinInvAmount = index !== -1 ? MinInvAmount[index] : "N/A";
    const calculatedMinInvAmount = Array.isArray(MinInvAmount) && index >= 0 && index < MinInvAmount.length
      ? MinInvAmount[index]
      : "N/A";

    return (
        <Box className="maincontentprimary">

            <Grid container spacing={2}>



                <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12, }} >

                    <h2 class="headingtop" >SWP  </h2>
                </Grid>
                {/* <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12, }} >
                    <h3>Primary Details</h3>
                </Grid> */}


                <Grid container spacing={2}>
                    {
                        fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.isHide ? (
                            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth' >
                                <Controller
                                    name="MF Scheme"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.defaultValue}
                                    render={({ field }) => <input type="hidden" {...field} />}
                                />
                            </Grid>
                        ) : (
                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
                                {/* <p>{fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.displayLabel || '-'}</p> */}
                                <p
                                    style={{
                                        visibility: fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.displayLabel
                                            ? "visible"
                                            : "hidden",
                                    }}
                                >
                                    {fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.displayLabel || "-"}
                                </p>
                                <Controller
                                    name="MF Scheme"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.defaultValue}
                                    rules={{
                                        required: {
                                            value: fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.isMandatory,
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
                                                disabled={fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.isReadOnly}
                                                {...field}
                                            />
                                        );
                                    }}
                                />
                            </Grid>
                        )
                    }
                    {
                        fixedFormConfig?.find((item) => item.fieldName === "Folio")?.isHide ? (
                            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
                                <Controller
                                    name="Folio"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Folio")?.defaultValue}
                                    render={({ field }) => <input type="hidden" {...field} />}
                                />
                            </Grid>
                        ) : (
                            // <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
                                <p
                                    style={{
                                        visibility: fixedFormConfig?.find((item) => item.fieldName === "Folio")?.displayLabel
                                            ? "visible"
                                            : "hidden",
                                    }}
                                >{fixedFormConfig?.find((item) => item.fieldName === "Folio")?.displayLabel || '-'}</p>
                                <Controller
                                    name="Folio"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Folio")?.defaultValue}
                                    rules={{
                                        required: {
                                            value: fixedFormConfig?.find((item) => item.fieldName === "Folio")?.isMandatory,
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
                                                disabled={fixedFormConfig?.find((item) => item.fieldName === "Folio")?.isReadOnly}
                                                {...field}
                                            >
                                                <MenuItem value="New Folio">All</MenuItem>
                                                {
                                                    getFolioList().length !== 0 ? (
                                                        getFolioList().map((folio, index) => (
                                                            <MenuItem key={`${folio}_${index}`} value={folio}>
                                                                {folio}
                                                            </MenuItem>
                                                        ))
                                                    ) : null
                                                }
                                                {/* {fixedFormConfig?.find((item) => item.fieldName === "Folio")?.fieldValues.map((option) => (
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
                                                {fixedFormConfig?.find((item) => item.fieldName === "Order By")?.fieldValues.map((option) => (
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
                    {
                        fixedFormConfig?.find((item) => item.fieldName === "Order Amount")?.isHide ? (
                            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth' >
                                <Controller
                                    name="Order Units/Amount"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Order Amount")?.defaultValue}
                                    render={({ field }) => <input type="hidden" {...field} />}
                                />
                            </Grid>
                        ) : (
                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
                                {/* <p>{(watchedValues["Order By"] === "Amount" ? "Enter Amount" : "Enter Units") || '-'}</p> */}
                                <p
                                    style={{
                                        visibility: fixedFormConfig?.find((item) => item.fieldName === "Order Amount")?.displayLabel
                                            ? "visible"
                                            : "hidden",
                                    }}
                                >{fixedFormConfig.find((item) => item.fieldName === "Order Amount")?.displayLabel}</p>
                                <Controller
                                    name="Order Units/Amount"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Order Amount")?.defaultValue}
                                    rules={{
                                        required: {
                                            // value: fixedFormConfig?.find((item) => item.fieldName === "Order Units/Amount")?.isMandatory,
                                            value: true,
                                            message: "Order Amount is required"
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/, // Regular expression to allow only numeric values
                                            message: "Only numeric values are allowed"
                                        },
                                          min: {
                                            value: `${calculatedMinInvAmount}`,
                                            message: `Min SWP amount ${calculatedMinInvAmount}`
                                          }
                                    }}
                                    render={({ field }) => {
                                        return (
                                            <TextField
                                                id="outlined-size-small"
                                                size="small"
                                                sx={{ width: '100%' }}
                                                disabled={tab === 'cart' ? fixedFormConfig?.find((item) => item.fieldName === "Order Amount")?.isReadOnly : false}
                                                // disabled={true}
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
                    }
                    {
                        fixedFormConfig?.find((item) => item.fieldName === "SWP Frequency")?.isHide ? (
                            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth' >
                                <Controller
                                    name="SWP Frequency"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SWP Frequency")?.defaultValue}
                                    render={({ field }) => <input type="hidden" {...field} />}
                                />
                            </Grid>
                        ) : (
                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
                                <p
                                    style={{
                                        visibility: fixedFormConfig?.find((item) => item.fieldName === "SWP Frequency")?.displayLabel
                                            ? "visible"
                                            : "hidden",
                                    }}
                                >{fixedFormConfig?.find((item) => item.fieldName === "SWP Frequency")?.displayLabel || '-'}</p>
                                <Controller
                                    name="SWP Frequency"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SWP Frequency")?.defaultValue}
                                    rules={{
                                        required: {
                                            value: fixedFormConfig?.find((item) => item.fieldName === "SWP Frequency")?.isMandatory,
                                            message: "SWP Frequency is required"
                                        }
                                    }}
                                    render={({ field }) => {
                                        return (
                                            <TextField
                                                select
                                                id="outlined-size-small"
                                                size="small"
                                                sx={{ width: '100%' }}
                                                disabled={fixedFormConfig?.find((item) => item.fieldName === "SWP Frequency")?.isReadOnly}
                                                {...field}
                                            >
                                                {fixedFormConfig?.find((item) => item.fieldName === "SWP Frequency")?.fieldValues.map((option) => (
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
                    {
                        fixedFormConfig?.find((item) => item.fieldName === "SWP Date")?.isHide ? (
                            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
                                <Controller
                                    name="SWP Date"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SWP Date")?.defaultValue || dayjs()}
                                    render={({ field }) => <input type="hidden" {...field} />}
                                />
                            </Grid>
                        ) : (
                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
                                <p
                                    style={{
                                        visibility: fixedFormConfig?.find((item) => item.fieldName === "SWP Date")?.displayLabel
                                            ? "visible"
                                            : "hidden",
                                    }}
                                >{fixedFormConfig?.find((item) => item.fieldName === "SWP Date")?.displayLabel || '-'}</p>
                                <Controller
                                    name="SWP Date"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SWP Date")?.defaultValue || dayjs()}
                                    rules={{
                                        required: {
                                            value: fixedFormConfig?.find((item) => item.fieldName === "SWP Date")?.isMandatory,
                                            message: "SWP Date is required",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <DatePickerComponent
                                            {...field}
                                            onChange={(newValue) => field.onChange(newValue)}
                                            minDate={dayjs()}
                                            disabled={tab === 'cart' ? fixedFormConfig?.find((item) => item.fieldName === "SWP Date")?.isReadOnly : false}

                                        />
                                    )}

                                />
                            </Grid>
                        )
                    }
                    {
                        fixedFormConfig?.find((item) => item.fieldName === "SWP Tenor Basis")?.isHide ? (
                            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
                                <Controller
                                    name="SWP Tenor Basis"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SWP Tenor Basis")?.defaultValue}
                                    render={({ field }) => <input type="hidden" {...field} />}
                                />
                            </Grid>
                        ) : (
                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
                                <p
                                    style={{
                                        visibility: fixedFormConfig?.find((item) => item.fieldName === "SWP Tenor Basis")?.displayLabel
                                            ? "visible"
                                            : "hidden",
                                    }}
                                >{fixedFormConfig?.find((item) => item.fieldName === "SWP Tenor Basis")?.displayLabel || '-'}</p>
                                <Controller
                                    name="SWP Tenor Basis"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SWP Tenor Basis")?.defaultValue}
                                    rules={{
                                        required: {
                                            value: fixedFormConfig?.find((item) => item.fieldName === "SWP Tenor Basis")?.isMandatory,
                                            message: "SWP Tenor Basis is required"
                                        }
                                    }}
                                    render={({ field }) => {
                                        return (
                                            <TextField
                                                select
                                                id="outlined-size-small"
                                                size="small"
                                                sx={{ width: '100%' }}
                                                disabled={fixedFormConfig?.find((item) => item.fieldName === "SWP Tenor Basis")?.isReadOnly}
                                                {...field}
                                            >
                                                {fixedFormConfig?.find((item) => item.fieldName === "SWP Tenor Basis")?.fieldValues.map((option) => (
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
                    {
                        fixedFormConfig?.find((item) => item.fieldName === "SWP Period or SWP Transactions")?.isHide ? (
                            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
                                <Controller
                                    name="SWP Period or SWP Transactions"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SWP Period or SWP Transactions")?.defaultValue}
                                    render={({ field }) => <input type="hidden" {...field} disabled={watchedValues["SWP Tenor Basis"] == 'Perpetual'} />}
                                />
                            </Grid>
                        ) : (
                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
                                <p
                                    style={{
                                        visibility: fixedFormConfig?.find((item) => item.fieldName === "SWP Period or SWP Transactions")?.displayLabel
                                            ? "visible"
                                            : "hidden",
                                    }}
                                >{fixedFormConfig?.find((item) => item.fieldName === "SWP Period or SWP Transactions")?.displayLabel || '-'}</p>
                                <Controller
                                    name="SWP Period or SWP Transactions"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SWP Period or SWP Transactions")?.defaultValue}
                                    rules={{
                                        required: {
                                            value: fixedFormConfig?.find((item) => item.fieldName === "SWP Period or SWP Transactions")?.isMandatory,
                                            message: "SWP Period or SWP Transactions is required"
                                        }
                                    }}
                                    render={({ field }) => {
                                        return (
                                            <TextField
                                                // label={fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.displayLabel}
                                                id="outlined-size-small"
                                                size="small"
                                                sx={{ width: '100%' }}
                                                disabled={fixedFormConfig?.find((item) => item.fieldName === "SWP Period or SWP Transactions")?.isReadOnly || watchedValues["SWP Tenor Basis"] == 'Perpetual'}
                                                {...field}
                                            />
                                        );
                                    }}
                                />
                            </Grid>
                        )
                    }
                    {
                        fixedFormConfig?.find((item) => item.fieldName === "SWP End Date")?.isHide ? (
                            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth' >
                                <Controller
                                    name="SWP End Date"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SWP End Date")?.defaultValue}
                                    render={({ field }) => <input type="hidden" {...field} />}
                                />
                            </Grid>
                        ) : (
                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
                                <p
                                    style={{
                                        visibility: fixedFormConfig?.find((item) => item.fieldName === "SWP End Date")?.displayLabel
                                            ? "visible"
                                            : "hidden",
                                    }}
                                >{fixedFormConfig?.find((item) => item.fieldName === "SWP End Date")?.displayLabel || '-'}</p>
                                <Controller
                                    name="SWP End Date"
                                    control={control}
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SWP End Date")?.defaultValue}
                                    rules={{
                                        required: {
                                            value: fixedFormConfig?.find((item) => item.fieldName === "SWP End Date")?.isMandatory,
                                            message: "SWP End Date is required"
                                        }
                                    }}
                                    render={({ field }) => {
                                        return (
                                            <TextField
                                                // label={fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.displayLabel}
                                                id="outlined-size-small"
                                                size="small"
                                                sx={{ width: '100%' }}
                                                disabled={fixedFormConfig?.find((item) => item.fieldName === "SWP End Date")?.isReadOnly}
                                                {...field}
                                            />
                                        );
                                    }}
                                />
                            </Grid>
                        )
                    }

                    {/* -----------------CODE TO ENTER INVESTMENT CART----------------------------- */}
                    {/* {
          fixedFormConfig?.find((item) => item.fieldName === "Investment Cart")?.isHide ? (
            <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} >
              <Controller
                name="Investment Cart"
                control={control}
                defaultValue={selectedSearchedValue.latestNAV}
                // defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Investment Cart")?.defaultValue}
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, }} >
              <p
                style={{
                  visibility: fixedFormConfig?.find((item) => item.fieldName === "Investment Cart")?.displayLabel
                    ? "visible"
                    : "hidden",
                }}
              >
                {fixedFormConfig?.find((item) => item.fieldName === "Investment Cart")?.displayLabel || "-"}
              </p>
              <Controller
                name="Investment Cart"
                control={control}
                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Investment Cart")?.defaultValue}
                rules={{
                  required: {
                    value: fixedFormConfig?.find((item) => item.fieldName === "Investment Cart")?.isMandatory,
                    message: "Investment Cart is required"
                  }
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: '100%' }}
                      value={selectedSearchedValue.latestNAV}
                      disabled={fixedFormConfig?.find((item) => item.fieldName === "Investment Cart")?.isReadOnly}
                      {...field}
                    />
                  );
                }}
              />
            </Grid>
          )
        } */}

                </Grid>


                {/* <>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
                    <p>Folio *</p>
                    <Select value={selectValue2} onChange={handleSelectChange2} size="small"
                        sx={{ width: '100%' }} >

                        <MenuItem value="option2">123456</MenuItem>
                        <MenuItem value="option3">234582</MenuItem>
                    </Select>
                </Grid>


                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
                    <p>Order By *</p>
                


                    <Select value={selectValue} onChange={handleSelectChange} size="small"
                        sx={{ width: '100%' }} >

                        <MenuItem value="option2">SWP Amount</MenuItem>
                        <MenuItem value="option3">SWP Units</MenuItem>
                    </Select>

                </Grid>
                {selectValue === 'option2' && (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
                        <p>Enter Amount *</p>
                        <TextField
                            label=""
                            id="outlined-size-small"
                            defaultValue="1000"
                            size="small"
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                )}
                {selectValue === 'option3' && (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
                        <p>Enter Units *</p>
                        <TextField
                            label=""
                            id="outlined-size-small"
                            defaultValue="0"
                            size="small"
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                )}


                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
                    <p>SWP Start Date *</p>
                    <BasicDatePicker></BasicDatePicker>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
                    <p>SWP Frequency</p>
                    <Select size="small" value={selectValue4} onChange={handleSelectChange4}
                        sx={{ width: '100%' }} >

                        <MenuItem value="option2">Monthly</MenuItem>
                        <MenuItem value="option3">Quarterly</MenuItem>
                        <MenuItem value="option3">Half Yearly</MenuItem>
                        <MenuItem value="option3">Yearly</MenuItem>
                    </Select>
                </Grid>


                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
                    <p>SWP Tenure</p>
                    <Select size="small" value={selectValue3} onChange={handleSelectChange3}
                        sx={{ width: '45%', marginRight: 1 }} >

                        <MenuItem value="option2">1 Year</MenuItem>
                        <MenuItem value="option3">2 Year</MenuItem>
                    </Select>
                    <Select size="small" value={selectValue3} onChange={handleSelectChange3}
                        sx={{ width: '45%' }} >

                        <MenuItem value="option2">1 Month</MenuItem>
                        <MenuItem value="option3">2 Month</MenuItem>
                    </Select>
                </Grid>


                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
                    <p>SWP End Date *</p>
                    <BasicDatePicker></BasicDatePicker>
                </Grid>


                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
                    <p>Stepup Frequency *</p>
                    <Select size="small" value={selectValue4} onChange={handleSelectChange4}
                        sx={{ width: '100%' }} >

                        <MenuItem value="option2">Monthly</MenuItem>
                        <MenuItem value="option3">Quarterly</MenuItem>
                        <MenuItem value="option3">Half Yearly</MenuItem>
                        <MenuItem value="option3">Yearly</MenuItem>
                    </Select>
                </Grid>


                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
                    <p>Steup % *</p>
                    <TextField
                        label=""
                        id="outlined-size-small"
                        defaultValue="10%"
                        size="small"
                        sx={{ width: '100%' }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
                    <p>Setup up Amount *</p>
                    <TextField
                        label=""
                        id="outlined-size-small"
                        defaultValue="1000"
                        size="small"
                        sx={{ width: '100%' }}
                    />
                </Grid>
                </> */}
            </Grid>
        </Box>
    )
}

export default PrimaryDetailsSWP


