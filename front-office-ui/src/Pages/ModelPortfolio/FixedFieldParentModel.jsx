import Grid from '@mui/material/Grid2';
import { TextField } from "@mui/material";
import DatePickerComponent from '../../Common/FormComponent/DatePickerComponent';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

const FixedFieldParentModel = ({ fixedFieldConfig }) => {
    const methods = useFormContext();
    const { control, formState: { errors } } = methods;

    return (
        <>
            {
                fixedFieldConfig?.find((item) => item.dispatcherName === "modelName")?.isHide === "Y" ? (
                    <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth' >
                        <Controller
                            name="modelName"
                            control={control}
                            defaultValue={fixedFieldConfig?.find((item) => item.dispatcherName === "modelName")?.defaultValue}
                            render={({ field }) => <input type="hidden" {...field} />}
                        />
                    </Grid>
                ) : (
                    <Grid className="minhegt50" size={{ xs: 12, sm: 12, md: 6, lg: 3 }} >
                        <p
                            style={{
                                visibility: fixedFieldConfig?.find((item) => item.dispatcherName === "modelName")?.displayName
                                    ? "visible"
                                    : "hidden",
                            }}
                        >
                            {fixedFieldConfig?.find((item) => item.dispatcherName === "modelName")?.displayName || "-"}
                        </p>
                        <Controller
                            name="modelName"
                            control={control}
                            defaultValue={fixedFieldConfig?.find((item) => item.dispatcherName === "modelName")?.defaultValue}
                            rules={{
                                required: {
                                    value: fixedFieldConfig?.find((item) => item.dispatcherName === "modelName")?.isMandatory === "Y",
                                    message: "Model Name is required"
                                }
                            }}
                            render={({ field }) => {
                                return (
                                    <TextField
                                        // label={fixedFieldConfig.find((item) => item.dispatcherName === "modelName")?.displayName}
                                        id="outlined-size-small"
                                        size="small"
                                        sx={{ width: '100%' }}
                                        disabled={fixedFieldConfig?.find((item) => item.dispatcherName === "modelName")?.isReadOnly === "Y"}
                                        error={!!errors.modelName} // Show error styling
                                        helperText={errors.modelName?.message} // Show error message
                                        {...field}
                                    />
                                );
                            }}
                        />
                    </Grid>
                )
            }

            {
                fixedFieldConfig?.find((item) => item.dispatcherName === "effectiveDate")?.isHide === "Y" ? (
                    <Grid size={{ xs: 0, sm: 0, md: 0, lg: 0 }} className='zerowidth'>
                        <Controller
                            name="effectiveDate"
                            control={control}
                            defaultValue={fixedFieldConfig?.find((item) => item.dispatcherName === "effectiveDate")?.defaultValue || dayjs()}
                            render={({ field }) => <input type="hidden" {...field} />}
                        />
                    </Grid>
                ) : (
                    <Grid className="minhegt50" size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
                        <p
                            style={{
                                visibility: fixedFieldConfig?.find((item) => item.dispatcherName === "effectiveDate")?.displayName
                                    ? "visible"
                                    : "hidden",
                            }}
                        >{fixedFieldConfig?.find((item) => item.dispatcherName === "effectiveDate")?.displayName || '-'}</p>
                        <Controller
                            name="effectiveDate"
                            control={control}
                            defaultValue={fixedFieldConfig?.find((item) => item.dispatcherName === "effectiveDate")?.defaultValue || dayjs()}
                            rules={{
                                required: {
                                    value: fixedFieldConfig?.find((item) => item.dispatcherName === "effectiveDate")?.isMandatory === "Y",
                                    message: "Effective Date is required",
                                },
                            }}
                            render={({ field }) => (
                                <DatePickerComponent
                                    {...field}
                                    onChange={(newValue) => field.onChange(newValue)}
                                    // minDate={dayjs()}
                                    disabled={fixedFieldConfig?.find((item) => item.dispatcherName === "effectiveDate")?.isReadOnly === "Y"}
                                    error={!!errors.effectiveDate} // Show error styling
                                    helperText={errors.effectiveDate?.message} // Show error message
                                />
                            )}

                        />
                    </Grid>
                )
            }
        </>
    )
}

export default FixedFieldParentModel