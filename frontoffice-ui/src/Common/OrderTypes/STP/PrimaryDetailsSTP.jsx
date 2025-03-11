import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
    TextField,
    MenuItem,
} from "@mui/material";
import DatePickerComponent from '../../FormComponent/DatePickerComponent';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { handleNumericInput } from '../../../utils/commonFunction';
import { useSelector } from 'react-redux';
import DebouncedAutocomplete from '../../CustomComponents/Autocomplete';

const PrimaryDetailsSTP = ({ fixedFormConfig, tab, folioList }) => {
    const methods = useFormContext();
    const { control, watch, formState: { errors } } = methods;
    const watchedValues = watch();
    const selectedSearchedValue = useSelector((state) => state.getSchemeList.data);
    const MinLumpSumAmount = selectedSearchedValue[0]?.MinPurchaseAmt
    const StpFrequency = selectedSearchedValue[0]?.StpFrequency;
    const MinInvAmount = selectedSearchedValue[0]?.MinInvAmount;
    const selectedValue = "4";

    const getFolioList = () => {
        const selectedFolio = folioList.map((item) => item.FolioNo);
        if (selectedFolio) {
            return selectedFolio;
        }
        return [];
    }

    const index = StpFrequency?.indexOf(selectedValue);
    // const calculatedMinInvAmount = index !== -1 ? MinInvAmount[index] : "N/A";
    const calculatedMinInvAmount = Array.isArray(MinInvAmount) && index >= 0 && index < MinInvAmount.length
        ? MinInvAmount[index]
        : "N/A";

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
                            {/* <p>{fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.displayLabel || '-'}</p> */}
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
                                            // label={fixedFormConfig.find((item) => item.fieldName === "MF Scheme")?.displayLabel}
                                            id="outlined-size-small"
                                            size="small"
                                            sx={{ width: '100%' }}
                                            disabled={fixedFormConfig?.find((item) => item.fieldName === "Source Scheme")?.isReadOnly}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                        </Grid>
                    )
                }
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
                        // <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
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
                                            <MenuItem value="New Folio">New</MenuItem>
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
                                            {...field}
                                        />
                                    );
                                }}
                            />
                        </Grid>
                    )
                }
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
                        // <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
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
                {/* Conditional rendering based on the value of Folio */}
                {/* {watch("Folio") === "New Folio" && (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <p>New Folio Text</p>
                    <Controller
                    name="NewFolioText"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                        id="new-folio-text"
                        placeholder="Enter New Folio Details"
                        variant="outlined"
                        size="small"
                        sx={{ width: '100%' }}
                        {...field}
                        />
                    )}
                    />
                </Grid>
                )} */}

                {/* {watch("Folio") === "Latest Folio" && (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <p>Latest Folio Select</p>
                    <Controller
                    name="LatestFolioSelect"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                        select
                        id="latest-folio-select"
                        placeholder="Select Latest Folio Options"
                        variant="outlined"
                        size="small"
                        sx={{ width: '100%' }}
                        {...field}
                        >
                  <MenuItem value="Option 1">Option 1</MenuItem>
                  <MenuItem value="Option 2">Option 2</MenuItem>
                </TextField>
                    )}
                    />
                </Grid>
                )} */}
                {/* 
                {watch("Folio") === "Oldest Folio" && (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <p>Oldest Folio Text</p>
                    <Controller
                    name="OldestFolioText"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                        id="oldest-folio-text"
                        placeholder="Enter Oldest Folio Details"
                        variant="outlined"
                        size="small"
                        sx={{ width: '100%' }}
                        {...field}
                        />
                    )}
                    />
                </Grid>
                )} */}
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
                                        value: /^[0-9]*$/, // Regular expression to allow only numeric values
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
                }
                {
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
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Order Units is required"
                                    },
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: "Only numeric values are allowed"
                                    },
                                    min: {
                                        value: `${calculatedMinInvAmount}`,
                                        message: `Min SIP amount ${calculatedMinInvAmount}`
                                    }
                                }}
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
                        const minValue =
                            fieldName === "Order Amount"
                                ? MinLumpSumAmount
                                : MinLumpSumAmount;

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
                                            value: minValue,
                                            message: `Minimum value is ${minValue}`,
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
                {
                    fixedFormConfig?.find((item) => item.fieldName === "STP Frequency")?.isHide ? (
                        <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth' >
                            <Controller
                                name="STP Frequency"
                                control={control}
                                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "STP Frequency")?.defaultValue}
                                render={({ field }) => <input type="hidden" {...field} />}
                            />
                        </Grid>
                    ) : (
                        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
                            <p
                                style={{
                                    visibility: fixedFormConfig?.find((item) => item.fieldName === "STP Frequency")?.displayLabel
                                        ? "visible"
                                        : "hidden",
                                }}
                            >{fixedFormConfig?.find((item) => item.fieldName === "STP Frequency")?.displayLabel || '-'}</p>
                            <Controller
                                name="STP Frequency"
                                control={control}
                                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "STP Frequency")?.defaultValue}
                                rules={{
                                    required: {
                                        value: fixedFormConfig?.find((item) => item.fieldName === "STP Frequency")?.isMandatory,
                                        message: "STP Frequency is required"
                                    }
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            select
                                            id="outlined-size-small"
                                            size="small"
                                            sx={{ width: '100%' }}
                                            disabled={fixedFormConfig?.find((item) => item.fieldName === "STP Frequency")?.isReadOnly}
                                            {...field}
                                        >
                                            {fixedFormConfig?.find((item) => item.fieldName === "STP Frequency")?.fieldValues.map((option) => (
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
                    fixedFormConfig?.find((item) => item.fieldName === "STP Date")?.isHide ? (
                        <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
                            <Controller
                                name="STP Date"
                                control={control}
                                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "STP Date")?.defaultValue || dayjs()}
                                render={({ field }) => <input type="hidden" {...field} />}
                            />
                        </Grid>
                    ) : (
                        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
                            <p
                                style={{
                                    visibility: fixedFormConfig?.find((item) => item.fieldName === "STP Date")?.displayLabel
                                        ? "visible"
                                        : "hidden",
                                }}
                            >{fixedFormConfig?.find((item) => item.fieldName === "STP Date")?.displayLabel || '-'}</p>
                            <Controller
                                name="STP Date"
                                control={control}
                                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "STP Date")?.defaultValue || dayjs()}
                                rules={{
                                    required: {
                                        value: fixedFormConfig?.find((item) => item.fieldName === "STP Date")?.isMandatory,
                                        message: "STP Date is required",
                                    },
                                }}
                                render={({ field }) => (
                                    <DatePickerComponent
                                        {...field}
                                        onChange={(newValue) => field.onChange(newValue)}
                                        minDate={dayjs()}
                                        disabled={tab === 'cart' ? fixedFormConfig?.find((item) => item.fieldName === "STP Date")?.isReadOnly : false}

                                    />
                                )}

                            />
                        </Grid>
                    )
                }
                {
                    fixedFormConfig?.find((item) => item.fieldName === "STP Tenor Basis")?.isHide ? (
                        <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
                            <Controller
                                name="STP Tenor Basis"
                                control={control}
                                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "STP Tenor Basis")?.defaultValue}
                                render={({ field }) => <input type="hidden" {...field} />}
                            />
                        </Grid>
                    ) : (
                        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
                            <p
                                style={{
                                    visibility: fixedFormConfig?.find((item) => item.fieldName === "STP Tenor Basis")?.displayLabel
                                        ? "visible"
                                        : "hidden",
                                }}
                            >{fixedFormConfig?.find((item) => item.fieldName === "STP Tenor Basis")?.displayLabel || '-'}</p>
                            <Controller
                                name="STP Tenor Basis"
                                control={control}
                                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "STP Tenor Basis")?.defaultValue}
                                rules={{
                                    required: {
                                        value: fixedFormConfig?.find((item) => item.fieldName === "STP Tenor Basis")?.isMandatory,
                                        message: "STP Tenor Basis is required"
                                    }
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            select
                                            id="outlined-size-small"
                                            size="small"
                                            sx={{ width: '100%' }}
                                            disabled={fixedFormConfig?.find((item) => item.fieldName === "STP Tenor Basis")?.isReadOnly}
                                            {...field}
                                        >
                                            {fixedFormConfig?.find((item) => item.fieldName === "STP Tenor Basis")?.fieldValues.map((option) => (
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
                    fixedFormConfig?.find((item) => item.fieldName === "STP Period or STP Transactions")?.isHide ? (
                        <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
                            <Controller
                                name="STP Period or STP Transactions"
                                control={control}
                                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "STP Period or STP Transactions")?.defaultValue}
                                render={({ field }) => <input type="hidden" {...field} disabled={watchedValues["STP Tenor Basis"] == 'Perpetual'} />}
                            />
                        </Grid>
                    ) : (
                        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
                            <p
                                style={{
                                    visibility: fixedFormConfig?.find((item) => item.fieldName === "STP Period or STP Transactions")?.displayLabel
                                        ? "visible"
                                        : "hidden",
                                }}
                            >{fixedFormConfig?.find((item) => item.fieldName === "STP Period or STP Transactions")?.displayLabel || '-'}</p>
                            <Controller
                                name="STP Period or STP Transactions"
                                control={control}
                                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "STP Period or STP Transactions")?.defaultValue}
                                rules={{
                                    required: {
                                        value: fixedFormConfig?.find((item) => item.fieldName === "STP Period or STP Transactions")?.isMandatory,
                                        message: "STP Period or STP Transactions is required"
                                    }
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            // label={fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.displayLabel}
                                            id="outlined-size-small"
                                            size="small"
                                            sx={{ width: '100%' }}
                                            disabled={fixedFormConfig?.find((item) => item.fieldName === "STP Period or STP Transactions")?.isReadOnly || watchedValues["STP Tenor Basis"] == 'Perpetual'}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                        </Grid>
                    )
                }
                {
                    fixedFormConfig?.find((item) => item.fieldName === "STP End Date")?.isHide ? (
                        <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth' >
                            <Controller
                                name="STP End Date"
                                control={control}
                                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "STP End Date")?.defaultValue}
                                render={({ field }) => <input type="hidden" {...field} />}
                            />
                        </Grid>
                    ) : (
                        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, }} >
                            <p
                                style={{
                                    visibility: fixedFormConfig?.find((item) => item.fieldName === "STP End Date")?.displayLabel
                                        ? "visible"
                                        : "hidden",
                                }}
                            >{fixedFormConfig?.find((item) => item.fieldName === "STP End Date")?.displayLabel || '-'}</p>
                            <Controller
                                name="STP End Date"
                                control={control}
                                defaultValue={fixedFormConfig?.find((item) => item.fieldName === "STP End Date")?.defaultValue}
                                rules={{
                                    required: {
                                        value: fixedFormConfig?.find((item) => item.fieldName === "STP End Date")?.isMandatory,
                                        message: "STP End Date is required"
                                    }
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            // label={fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.displayLabel}
                                            id="outlined-size-small"
                                            size="small"
                                            sx={{ width: '100%' }}
                                            disabled={fixedFormConfig?.find((item) => item.fieldName === "STP End Date")?.isReadOnly}
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
        </Box>
    )
}

export default PrimaryDetailsSTP