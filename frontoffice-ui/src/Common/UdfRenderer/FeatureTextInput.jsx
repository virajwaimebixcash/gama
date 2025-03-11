import React from 'react';
import { NumericFormat } from 'react-number-format';
import MyInputTypeText from './MyInputTypeText';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, value, ...other } = props

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            value={value}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
        />
    );
});

const AlphabeticFormatCustom = React.forwardRef(function AlphabeticFormatCustom(props, ref) {
    const { onChange, value, ...other } = props;

    const handleAlphabeticChange = (e) => {
        const alphabeticValue = e.target.value.replace(/[^a-zA-Z]/g, '');
        if (e.target.value !== alphabeticValue) {
            e.target.value = alphabeticValue;
        }
        onChange({
            target: {
                name: props.name,
                value: alphabeticValue,
            },
        });
    };

    return (
        <input
            {...other}
            ref={ref}
            value={value}
            onChange={handleAlphabeticChange}
        />
    );
});

const DynamicInputTextWrapper = ({
    type = "decimal",
    decimalPrecision = 2,
    prefix = "",
    suffix = "",
    multilanguage,
    allprops = {},
    TextFieldLabel,
    placeholder,
    error,
    helperText,
    autoComplete = "off",
    name = "",
    sx = {},
    handleChange,
    thousandSeparator = ',',
    value
}) => {

    const createMask = () => {
        if (type === "decimal" || type === "numeric") {
            return {
                thousandSeparator: thousandSeparator,
                decimalScale: decimalPrecision,
                fixedDecimalScale: true,
                allowNegative: false,
                prefix: prefix,
                suffix: suffix
            };
        }
        else
            return {};
    };

    // const formatProps = createMask();   
    const formatProps = React.useMemo(() => createMask(), [type, decimalPrecision, prefix, suffix, thousandSeparator]); 

    return (
        <MyInputTypeText
            allprops={{
                ...allprops,
                InputProps: {
                    inputComponent: type === "alphabetical" ? AlphabeticFormatCustom : NumberFormatCustom,
                    inputProps: formatProps,
                },
                value: value
            }}
            multilanguage={multilanguage}
            TextFieldLabel={TextFieldLabel}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            autoComplete={autoComplete}
            type="text"
            name={name}
            sx={sx}
            onChange={handleChange}
            inputComponent={type === "alphabetical" ? AlphabeticFormatCustom : NumberFormatCustom}
            inputProps={formatProps}
            value={value}
        />
    );
};

export default DynamicInputTextWrapper;
