import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Components from '../../Common/UdfRenderer/componentsMapping';
import { useTranslation } from "react-i18next";
import { findInputError } from "../../utils/findInputError"
import { isFormInvalid } from "../../utils/isFormInvalid";
import { useFormContext } from 'react-hook-form';
import 'dayjs/locale/hi';
import 'dayjs/locale/ar';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getFileInfo } from '../../utils/commonFunction';


const parseValueByType = (value, valueType) => {
    try {
        switch (valueType) {
            case 'Number':
                return Number(value); // Convert to number
            case 'Boolean':
                return value === 'true' || value === true; // Convert to boolean
            case 'Date':
                return new Date(dayjs(value).date()).getTime(); // Convert to date
            case 'String':
            default:
                return String(value); // Convert to string
        }
    } catch (error) {
        console.error(`Error parsing value: ${value} to type: ${valueType}`, error);
        return null; // Return null for invalid conversions
    }
};

// Utility function to evaluate conditions based on value type and comparison
const evaluateCondition = (valueType, fieldValue, targetValue, comparisonType) => {
    const parsedFieldValue = parseValueByType(fieldValue, valueType);
    const parsedTargetValue = parseValueByType(targetValue, valueType);

    // Handle invalid parsed values
    if (parsedFieldValue === null || parsedTargetValue === null) {
        console.warn('Invalid parsed values for comparison', { parsedFieldValue, parsedTargetValue });
        return false;
    }

    switch (comparisonType) {
        case 'equals':
            return parsedFieldValue === parsedTargetValue;
        case 'notEquals':
            return parsedFieldValue !== parsedTargetValue;
        case 'greaterThan':
            return parsedFieldValue > parsedTargetValue;
        case 'lessThan':
            return parsedFieldValue < parsedTargetValue;
        case 'greaterThanOrEquals':
            return parsedFieldValue >= parsedTargetValue;
        case 'lessThanOrEquals':
            return parsedFieldValue <= parsedTargetValue;
        default:
            // Fallback for unsupported comparison types
            return parsedFieldValue === parsedTargetValue;
    }
};

const UdfFieldRender = ({ config, index, entityName, tableData, setTableData, disabledform, userData, isTable ,displayLabel}) => {

   
    const hiddenInputRef = useRef(null);
    const { t, i18n } = useTranslation();
    const [cleared, setCleared] = useState(false);
    const url = config.fetchdataapiurl
    const mindate = config.maxAge ? dayjs().subtract(Number(config.maxAge), 'year') : undefined;
    const maxdate = config.minAge ? dayjs().subtract(Number(config.minAge), 'year') : undefined;
    const { dynamicBehavior } = config;
    // const hiddenInputRef = useRef(null);
    const {
        register,
        control,
        formState: { errors },
        getValues,
        setValue,
        watch
    } = useFormContext();
    const watchFields = watch();
    var inputError = findInputError(errors, config.dispatchername);
    var isInvalid = isFormInvalid(inputError);

    const disableRule = dynamicBehavior?.disable;
    let isDisabled = false;

    if (disableRule) {
        const { valueType, dependsOn, value, comparisonType = 'equals' } = disableRule;
        isDisabled = evaluateCondition(
            valueType,
            watchFields?.[dependsOn],
            value,
            comparisonType
        );
    }

    // Handle dynamic reset with useEffect
    const resetRule = dynamicBehavior?.reset;
    useEffect(() => {
        if (resetRule) {
            const { valueType, dependsOn, value, condition = 'equals' } = resetRule;
            // Evaluate reset condition
            const shouldReset = evaluateCondition(
                valueType,
                watchFields?.[dependsOn],
                value,
                condition
            );

            if (shouldReset) {
                setValue(config.entityName, ""); // Reset the field value
            }
        }
    }, [
        watchFields?.[resetRule?.dependsOn], // Dependency on the watched field
        resetRule,
        config.entityName,
        setValue
    ]);

    const validateRenderCondition = (renderCondition) => {
        if (!renderCondition || !renderCondition.dependsOn) {
            // console.error('Mandatory render condition is missing or invalid:', renderCondition);
            return ({
                required: config.validation?.required
            });
        }
        const { valueType, dependsOn, value, condition = 'equals' } = renderCondition;

        return ({
            required: {
                value: evaluateCondition(valueType, watchFields?.[dependsOn], value, condition) || config.validation.required.value,
                message: config.validation?.required?.message
            }


        })
    };

    const renderCondition = dynamicBehavior?.mandatory;
    const shouldRender = validateRenderCondition(renderCondition);

    const handleAddRow = (tableName) => {
        if (!tableData[tableName]) {
            const object = [{ rowId: Date.now(), data: {} }];
            setTableData(prevTableData => ({ ...prevTableData, [tableName]: object }));

        } else {
            const object = new Object(tableData[tableName]);
            object.push({ rowId: Date.now(), data: {} });
            setTableData(prevTableData => ({ ...prevTableData, [tableName]: object }));
        }
    };

    const handleRemoveRow = (rowId, tableName) => {
        const updatedTableData = { ...tableData };
        const updatedRows = updatedTableData[tableName].filter(row => row.rowId !== rowId);
        updatedTableData[tableName] = updatedRows;
        setTableData(updatedTableData);
    };

    const refValue = watch(config.refdispatchername); // Watch the referenced field value

    const shouldRenderConditionalField = () => {
        // Check if the field is a conditional field
        if (config.component !== "conditionalfield") return true;
        // Render only if the condition is met
        return refValue === config.condition;
    };

    // useEffect(()=>{
    //     shouldRenderConditionalField()

    // },[refValue === config.condition])
    const handleOnChange = () => {
        const values = watch();
    };

    useEffect(() => {
        const parant = watch(config.parentField?.toLowerCase())
        if (config.dynamicApiUrlTemplate) {
            setUrl(config.fetchdataapiurl.replace('replace', parant))
        }
    }, [watch(config.parentField?.toLowerCase())])

    const computeDate = (compute, baseDate, value = 0) => {
        if (!baseDate) return null;
        const date = dayjs(baseDate);
        if (compute === "date.addDays") {
            return dayjs(date.add(Number(value), "day").toDate());
        } else if (compute === "date.subtractDays") {
            return dayjs(date.subtract(Number(value), "day").toDate());
        }
        return null;
    };

    const getComponentProps = () => {
        const commonProps = {
            multilanguage: t,
            TextFieldLabel:!displayLabel?"" :config.label,
            placeholder: config.placeholder,
            // onChange: handleOnChange,
            disabled: isDisabled,
            name: config.dispatchername,
            sx: config.sx,
            // index: index,
            config: config,
            isTable
        }
        switch (config?.component) {
            case "text":
                return {
                    ...commonProps,
                    error: isInvalid,
                    allprops: {
                        ...register(config.dispatchername, {
                            ...config.validation,
                            ...shouldRender,

                            pattern: {
                                ...config.validation?.pattern,
                                value: new RegExp(config.validation?.pattern?.value, "u"),
                            },
                            // onChange: handleOnChange,
                        }),
                        disabled: disabledform || isDisabled,
                    },
                    helperText: isInvalid && inputError.error.message,
                    type: config.type,
                    defaultValue: config.defaultValue
                };
            case "conditionalfield":
                return {
                    ...commonProps,
                    error: isInvalid,
                    allprops: {
                        ...register(config.dispatchername, {
                            ...config.validation,

                            pattern: {
                                ...config.validation?.pattern,
                                value: new RegExp(config.validation?.pattern?.value, "u"),
                            },
                            // onChange: handleOnChange,
                        }),
                        disabled: disabledform || isDisabled,
                    },
                    helperText: isInvalid && inputError.error.message,
                    type: config.type,
                    defaultValue: config.defaultvalue
                };
            case "radio":
                return {
                    ...commonProps,
                    row: true,
                    data: config.radiooptions,
                    defaultValue: watch(config.dispatchername) || config.defaultValue,
                    disabled: disabledform || isDisabled,
                    allprops: {
                        ...register(config.dispatchername, {
                            ...shouldRender,
                            // onChange: (e) => {
                            //     // setGender(e.target.value);
                            //     handleOnChange(e);
                            // }
                        })
                    }
                };
            case "checkbox":
                return {
                    ...commonProps,
                    checkboxtext: config.checkboxtext,
                    allprops: {
                        ...register(config.dispatchername, {
                            ...shouldRender,
                            // onChange: (e) => {
                            //     // setCheckedVal(e.target.checked);
                            //     // handleOnChange(e);
                            // }
                        }),
                        disabled: disabledform || isDisabled,
                        checked: getValues(config?.dispatchername),
                    }
                };
            case "dropdown":
                return {
                    ...commonProps,
                    error: isInvalid,
                    id: "emo-simple-select",
                    labelId: "demo-simple-select-label",
                    label: "Select language",
                    allprops: {
                        ...register(config.dispatchername, {
                            ...config.validation,
                            ...shouldRender,
                            // onChange: (e) => {
                            //     setValue(e.target.name, e.target.value);
                            //     handleOnChange(e);
                            // },
                        }),
                        disabled: disabledform || isDisabled,
                        // value: getValues(config?.dispatchername),
                    },
                    url: url,
                    isInvalid: isInvalid,
                    inputError: inputError?.error?.message,
                    value: getValues(config?.dispatchername) || config?.defaultValue,
                    allValues: getValues()
                };
            case "staticDropdown":
                {
                    const defaultFromOptions = config?.options ? config?.options.find((option) => (option?.isDefaultOption === true))?.value : '';
                    return {
                        ...commonProps,
                        error: isInvalid,
                        id: "emo-simple-select",
                        labelId: "demo-simple-select-label",
                        label: "Select language",
                        allprops: {
                            ...register(config.dispatchername, {
                                ...config.validation,
                                ...shouldRender,
                                // onChange: (e) => {
                                //     setValue(e.target.name, e.target.value);
                                //     handleOnChange(e);
                                // },
                            }),
                            disabled: disabledform || isDisabled,
                            // value: getValues(config?.dispatchername),
                        },
                        url: url,
                        isInvalid: isInvalid,
                        inputError: inputError?.error?.message,
                        value: getValues(config?.dispatchername) || config?.defaultValue || defaultFromOptions,
                        allValues: getValues()
                    };
                }
            case "DependentDropdown":
                return {
                    ...commonProps,
                    error: isInvalid,
                    id: "emo-simple-select",
                    labelId: "demo-simple-select-label",
                    label: "Select language",
                    allprops: {
                        ...register(config.dispatchername, {
                            ...config.validation,

                            // onChange: (e) => {
                            //     // setDropdownData({ ...dropdownData, [e.target.name]: e.target.value });
                            //     handleOnChange(e);
                            // },
                        }),
                        disabled: disabledform || isDisabled,
                        value: getValues(config?.dispatchername),
                    },
                    url: `${url}${config.dynamicApiUrlTemplate ? '&' : '?'}lng=en`,
                    // url: `${config.fetchdataapiurl}?lng=${i18n.language}`,
                    isInvalid: isInvalid,
                    inputError: inputError?.error?.message,
                    defaultValue: userData?.[config.dispatchername] ?? ''
                };
            case "multiselect":
                return {
                    ...commonProps,
                    allprops: {
                        ...register(config.dispatchername, {
                            ...config.validation,
                            ...shouldRender,
                            // onChange: (e) => {
                            //     // setSelectedCourses(
                            //     //     typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value
                            //     // );
                            //     handleOnChange(e);
                            // },
                        }),
                        disabled: disabledform || isDisabled,
                    },
                    error: isInvalid,
                    value: getValues(config?.dispatchername) || [],
                    // value: selectedCourses.length ? selectedCourses : getValues(config?.dispatchername) || [],
                    inputProps: { "aria-label": "Without label" },
                    url: `${config.fetchdataapiurl}`,
                    inputError: inputError?.error?.message,
                    isInvalid: isInvalid,
                    selectedCourses: getValues(config?.dispatchername) || [],
                    // selectedCourses: selectedCourses.length ? selectedCourses : getValues(config?.dispatchername) || [],
                };
            case "date":
                {
                    const maxRule = config?.dynamicRules?.['Max Rules']
                    const minRule = config?.dynamicRules?.['Min Rules']

                    const maxDate = maxRule &&
                        computeDate(
                            maxRule.compute,
                            getValues(maxRule.dependsOn),
                            maxRule.value
                        ) || maxdate
                    const minDate =
                        minRule &&
                        computeDate(
                            minRule.compute,
                            getValues(minRule.dependsOn),
                            minRule.value
                        ) || mindate
                    return {
                        ...commonProps,
                        control: control,
                        dispatchername: config.dispatchername,
                        validation: { ...config.validation, ...shouldRender, },
                        mindate: minDate,
                        maxdate: maxDate,
                        i18n: i18n,
                        isInvalid: isInvalid,
                        inputError: inputError,
                        helperText: isInvalid ? inputError.error.message : '',
                        dobPlaceHolder: "createdynamicpage.dobPlaceHolder",
                        format: "DD-MM-YYYY",
                        // handleOnChange: handleOnChange,
                        dateAdapter: AdapterDayjs,
                        dayjs: dayjs,
                        setCleared: setCleared,
                        disable: disabledform || isDisabled,
                        defaultValue: config?.defaultValue || ""
                    };
                }
            case "autoSuggestion":
                return {
                    ...commonProps,
                    control: control,
                    dispatchername: config.dispatchername,
                    validation: config.validation,
                    url: `${config.fetchdataapiurl}`,
                    paramName: config.paramName,
                    label: config.label,
                    minCharsToSearch: config.minCharsToSearch,
                    defaultValue: getValues(config.dispatchername),
                    // defaultValue: userData?.[config.dispatchername],
                    allValues: getValues(),
                    error: isInvalid,
                    helperText: isInvalid && inputError.error.message,
                    onChange: function (e) {
                        setValue(config.dispatchername, e.target.value);
                    },
                    allprops: {
                        // ...register(config.dispatchername, 
                        //     {
                        //     ...config.validation,
                        //     pattern: {
                        //         ...config.validation?.pattern,
                        //         value: new RegExp(config.validation?.pattern?.value, "u"),
                        //     },
                        // }),
                        disabled: config.isReadOnly ? true : false,
                    },
                }
            case "featuredtext":
                return {
                    ...commonProps,
                    error: isInvalid,
                    helperText: isInvalid && inputError.error.message,
                    type: config.type,
                    decimalPrecision: config.decimalPrecision,
                    prefix: config.prefix,

                    suffix: config.suffix,
                    value: watch(config.dispatchername),
                    thousandSeparator: config.thousandSeparator,
                    // handleChange: handleOnChange,
                    handleChange: (e) => {
                        // setValue(e.target.name, e.target.value);
                        handleOnChange(e)
                    },
                    allprops: {
                        ...register(config.dispatchername, {
                            ...config.validation,
                            ...shouldRender,
                            pattern: {
                                ...config.validation?.pattern,
                                value: new RegExp(config.validation?.pattern?.value, "u"),
                            },
                            handleChange: (e) => {
                                // setValue(e.target.name, e.target.value);
                                handleOnChange(e)
                            }
                        }),

                        disabled: config.isReadOnly ? true : false,

                    },

                };
            case "fileUpload":
                return {
                    ...commonProps,
                    allprops: {
                        ...register(config.dispatchername, {
                            ...config.validation,
                            validate: {
                                fileType: (value) => config.allowedTypes.includes(getFileInfo(value).mimeType) || "Invalid file type.",
                                fileSize: (value) => getFileInfo(value).fileSizeInBytes <= config.maxSize || "File size exceeds the limit."
                            },
                        }),
                        disabled: disabledform || isDisabled,
                    },
                    disable: config.isReadOnly ? true : false,

                    isInvalid: isInvalid,
                    inputError: inputError?.error?.message,
                    allowedTypes: config.allowedTypes,
                    maxSize: config.maxSize,
                }
            case "hidden":
                return {
                    error: isInvalid,
                    allprops: {
                        ...register(config.dispatchername, {
                            ...config.validation,
                            // onChange: handleOnChange,
                        }),
                        disabled: config.isReadOnly ? true : false,

                        // Style to hide the element but keep it in the DOM without taking up space
                    },
                    sx: {
                        display: 'none',
                        visibility: 'hidden',
                        position: 'absolute',
                    },
                    // helperText: isInvalid && inputError.error.message,
                    type: config.type,

                    ref: hiddenInputRef,  // Pass ref here
                    defaultValue: config.defaultvalue,
                    id: config.id
                };
            default:
                return {};
        }
        // }
    };

    const DisplayElements = () => {
        if (typeof Components[config.component] !== "undefined") {
            const Component = Components[config.component];

            // Only render the conditional field if the condition is satisfied
            if (!shouldRenderConditionalField()) {
                return null;
            }

            // console.log("Component", getComponentProps());
            return <Component {...getComponentProps()} />;
        }
        else {
            return (
                <Box key={index} sx={{ padding: 2, border: '1px solid #f44336', borderRadius: 1, backgroundColor: '#ffebee' }}>
                    <Typography variant="body1" color="error">
                        Cannot find {config.component} component
                    </Typography>
                </Box>
            );
        }
    };

    return (
        <DisplayElements />
    );
};

export default UdfFieldRender;
