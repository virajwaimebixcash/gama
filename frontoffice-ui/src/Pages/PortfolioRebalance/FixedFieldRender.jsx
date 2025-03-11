import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
    TextField,
    MenuItem,
} from "@mui/material";
import DatePickerComponent from '../../Common/FormComponent/DatePickerComponent';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { handleNumericInput } from '../../utils/commonFunction';
import { useSelector } from 'react-redux';
import NumberFormatInput from '../../Common/CustomComponents/NumberFormatterInput';

const FixedFieldRender = ({ fixedFormConfig, tab, folioList = [], displayLabel,indexNumber}) => {

    console.log(fixedFormConfig, 'fixedFormConfig')
    const methods = useFormContext();
    const { control, watch, setValue, formState: { errors } } = methods;
    const watchedValues = watch();
    const selectedSearchedValue = useSelector((state) => state.getSchemeList.data);
    const MinLumpSumAmount = selectedSearchedValue[0]?.MinPurchaseAmt
    const SipFrequency = selectedSearchedValue[0]?.SipFrequency;
    const MinInvAmount = selectedSearchedValue[0]?.MinInvAmount;
    const selectedValue = "4";

    console.log(watch(),"watch")
    const getFolioList = () => {
        const selectedFolio = folioList?.map((item) => item.FolioNo);
        if (selectedFolio) {

            return ["New Folio", ...selectedFolio];
        }
        return [];
    }

    const indexofsip = SipFrequency?.indexOf(selectedValue);
    // const calculatedMinInvAmount = index !== -1 ? MinInvAmount[index] : "N/A";
    const minimumOrderamount = Array.isArray(MinInvAmount) && index >= 0 && indexofsip < MinInvAmount.length
        ? MinInvAmount[indexofsip]
        : "N/A";

    return (
        < >
            {
                fixedFormConfig?.find((item) => item.fieldName === "MF Scheme") &&
                <Grid >
                    {/* <p>{fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.displayLabel || '-'}</p> */}
                    <p
                        style={{
                            visibility: fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.displayLabel
                                ? "visible"
                                : "hidden",
                        }}
                    >
                        {displayLabel&&fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.displayLabel}
                    </p>
                    <Controller
                        name={`table[${indexNumber}]['MF Scheme']`}
                        control={control}
                        defaultValue={fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.defaultValue}
                        rules={{
                            required: {
                                value: fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.isMandatory,
                                message: "MF Scheme is required"
                            }
                        }}
                        render={({ field }) => {
                            console.log(field)
                            // if(!displayLabel){
                            //     field.name=''
                            // }
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

            }
            {
                fixedFormConfig?.find((item) => item.fieldName === "Folio") &&
                // <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, }} >
                <Grid  >
                    <p
                        style={{
                            visibility: fixedFormConfig?.find((item) => item.fieldName === "Folio")?.displayLabel
                                ? "visible"
                                : "hidden",
                        }}
                    >{displayLabel&&fixedFormConfig?.find((item) => item.fieldName === "Folio")?.displayLabel }</p>


                    <Controller
                        // name="Folio"
                        name={`table[${indexNumber}]['Folio']`}
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
                                    defaultValue={fixedFormConfig?.find((item) => item.fieldName === "Folio")?.defaultValue}
                                    disabled={fixedFormConfig?.find((item) => item.fieldName === "Folio")?.isReadOnly}
                                    {...field}

                                >
                                    {/* <MenuItem value="New Folio">New Folio</MenuItem> */}
                                    {
                                        getFolioList().length !== 0 ? (
                                            getFolioList().map((folio, index) => (
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

            }




            {
                fixedFormConfig?.find((item) => item.fieldName === "Order By") && <Grid  >
                    <p
                        style={{
                            visibility: fixedFormConfig?.find((item) => item.fieldName === "Order By")?.displayLabel
                                ? "visible"
                                : "hidden",
                        }}
                    >{displayLabel&&fixedFormConfig?.find((item) => item.fieldName === "Order By")?.displayLabel}</p>
                    <Controller
                        // name="Order By"
                        name={`table[${indexNumber}]['Order By']`}
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

            }

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

                    return (<Grid
                            key={fieldName}
                        
                        >
                            <p
                                style={{
                                    visibility: fieldConfig?.displayLabel ? "visible" : "hidden",
                                }}
                            >
                                {displayLabel&&(fieldConfig?.displayLabel || fieldName)}
                            </p>
                            <Controller
                                // name={fieldName}
                                name={`table[${indexNumber}][${fieldName}]`}
                                control={control}
                                defaultValue={fieldConfig?.defaultValue}
                                // rules={{
                                //     required: isMandatory
                                //         ? {
                                //             value: true,
                                //             message: `${fieldName} is required`,
                                //         }
                                //         : false,
                                //     pattern: {
                                //         value: /^[0-9]*$/,
                                //         message: "Only numeric values are allowed",
                                //     },
                                //     min: {
                                //         value: `${minimumOrderamount}`,
                                //         message: `Min SIP amount ${minimumOrderamount}`
                                //     },
                                // }}
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
                        </Grid>)
                    
                })()
            }
            {
                fixedFormConfig?.find((item) => item.fieldName === "SIP Frequency") &&
                <Grid  >
                    <p
                        style={{
                            visibility: fixedFormConfig?.find((item) => item.fieldName === "SIP Frequency")?.displayLabel
                                ? "visible"
                                : "hidden",
                        }}
                    >{displayLabel&&fixedFormConfig?.find((item) => item.fieldName === "SIP Frequency")?.displayLabel}</p>
                    <Controller
                        // name="SIP Frequency"
                        name={`table.${indexNumber}.SIP Frequency`}
                        control={control}
                        defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SIP Frequency")?.defaultValue}
                        rules={{
                            required: {
                                value: fixedFormConfig?.find((item) => item.fieldName === "SIP Frequency")?.isMandatory,
                                message: "SIP Frequency is required"
                            }
                        }}
                        render={({ field }) => {
                          
                            return (
                                <TextField
                                    select
                                    id="outlined-size-small"
                                    size="small"
                                    sx={{ width: '100%' }}
                                    disabled={fixedFormConfig?.find((item) => item.fieldName === "SIP Frequency")?.isReadOnly}
                                    {...field}
                                >
                                    {fixedFormConfig?.find((item) => item.fieldName === "SIP Frequency")?.fieldValues.map((option) => (
                                        <MenuItem key={option.id} value={option.values}>
                                            {option.values}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            );
                        }}
                    />
                </Grid>

            }
            {
                fixedFormConfig?.find((item) => item.fieldName === "SIP Date") &&
                <Grid >
                    <p
                        style={{
                            visibility: fixedFormConfig?.find((item) => item.fieldName === "SIP Date")?.displayLabel
                                ? "visible"
                                : "hidden",
                        }}
                    >{displayLabel&&fixedFormConfig?.find((item) => item.fieldName === "SIP Date")?.displayLabel}</p>
                    <Controller
                        // name="SIP Date"
                        name={`table[${indexNumber}]['SIP Date']`}
                        control={control}
                        // defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SIP Date")?.defaultValue || dayjs()}
                        rules={{
                            required: {
                                value: fixedFormConfig?.find((item) => item.fieldName === "SIP Date")?.isMandatory,
                                message: "SIP Date is required",
                            },
                        }}
                        render={({ field }) => (
                            <DatePickerComponent
                                {...field}
                                onChange={(newValue) => field.onChange(newValue)}
                                minDate={dayjs()}
                                disabled={tab === 'cart' ? fixedFormConfig?.find((item) => item.fieldName === "SIP Date")?.isReadOnly : false}

                            />
                        )}

                    />
                </Grid>

            }
            {
                fixedFormConfig?.find((item) => item.fieldName === "SIP Tenor Basis") &&
                <Grid  >
                    <p
                        style={{
                            visibility: fixedFormConfig?.find((item) => item.fieldName === "SIP Tenor Basis")?.displayLabel
                                ? "visible"
                                : "hidden",
                        }}
                    >{displayLabel&&fixedFormConfig?.find((item) => item.fieldName === "SIP Tenor Basis")?.displayLabel}</p>
                    <Controller
                        // name="SIP Tenor Basis"
                        name={`table.${indexNumber}.SIP Tenor Basis`}
                        control={control}
                        defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SIP Tenor Basis")?.defaultValue}
                        rules={{
                            required: {
                                value: fixedFormConfig?.find((item) => item.fieldName === "SIP Tenor Basis")?.isMandatory,
                                message: "SIP Tenor Basis is required"
                            }
                        }}
                        render={({ field }) => {
                            console.log(field, "field")
                            return (
                                <TextField
                                    select
                                    id="outlined-size-small"
                                    size="small"
                                    sx={{ width: '100%' }}
                                    disabled={fixedFormConfig?.find((item) => item.fieldName === "SIP Tenor Basis")?.isReadOnly}
                                    {...field}
                                >
                                    {fixedFormConfig?.find((item) => item.fieldName === "SIP Tenor Basis")?.fieldValues.map((option) => (
                                        <MenuItem onClick={() => { setValue('SIP Period or SIP Transactions', '') }} key={option.id} value={option.values}>
                                            {option.values}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            );
                        }}
                    />
                </Grid>

            }
            {
                fixedFormConfig?.find((item) => item.fieldName === "SIP Period or SIP Transactions") &&
                <Grid  >
                    <p
                        style={{
                            visibility: fixedFormConfig?.find((item) => item.fieldName === "SIP Period or SIP Transactions")?.displayLabel
                                ? "visible"
                                : "hidden",
                        }}
                    >{displayLabel&&fixedFormConfig?.find((item) => item.fieldName === "SIP Period or SIP Transactions")?.displayLabel}</p>
                    <Controller
                        // name="SIP Period or SIP Transactions"
                        name={`table[${indexNumber}]['SIP Period or SIP Transactions']`}
                        control={control}
                        defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SIP Period or SIP Transactions")?.defaultValue}
                        rules={{
                            required: {
                                value: fixedFormConfig?.find((item) => item.fieldName === "SIP Period or SIP Transactions")?.isMandatory,
                                message: "SIP Period or SIP Transactions is required"
                            }
                        }}
                        render={({ field }) => {
                            return (
                                <TextField
                                    // label={fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.displayLabel}
                                    id="outlined-size-small"
                                    size="small"
                                    sx={{ width: '100%' }}
                                    disabled={fixedFormConfig?.find((item) => item.fieldName === "SIP Period or SIP Transactions")?.isReadOnly || watchedValues["SIP Tenor Basis"] == 'Perpetual'}
                                    {...field}
                                />
                            );
                        }}
                    />
                </Grid>

            }
            {
                fixedFormConfig?.find((item) => item.fieldName === "SIP End Date") &&
                <Grid  >
                    <p
                        style={{
                            visibility: fixedFormConfig?.find((item) => item.fieldName === "SIP End Date")?.displayLabel
                                ? "visible"
                                : "hidden",
                        }}
                    >{displayLabel&&fixedFormConfig?.find((item) => item.fieldName === "SIP End Date")?.displayLabel}</p>
                    <Controller
                        // name="SIP End Date"
                        name={`table[${indexNumber}]['SIP End Date']`}
                        control={control}
                        defaultValue={fixedFormConfig?.find((item) => item.fieldName === "SIP End Date")?.defaultValue}
                        rules={{
                            required: {
                                value: fixedFormConfig?.find((item) => item.fieldName === "SIP End Date")?.isMandatory,
                                message: "SIP End Date is required"
                            }
                        }}
                        render={({ field }) => {
                            return (
                                <TextField
                                    // label={fixedFormConfig?.find((item) => item.fieldName === "MF Scheme")?.displayLabel}
                                    id="outlined-size-small"
                                    size="small"
                                    sx={{ width: '100%' }}
                                    disabled={fixedFormConfig?.find((item) => item.fieldName === "SIP End Date")?.isReadOnly}
                                    {...field}
                                />
                            );
                        }}
                    />
                </Grid>

            }


        </>
    )
}

export default FixedFieldRender