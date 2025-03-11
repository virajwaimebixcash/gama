import validationConfiguration from "../assets/ValidationConfig.json";

const reverseJsonParser = (jsonData) => {
    let formValues = {};
    let componentValue = jsonData.component;

    const extractValidation = (validation) => {
        const extracted = {};

        if (validation?.required) {
            extracted['Mandatory'] = validation.required.value;
        }
        if (validation?.minLength) {
            extracted['Min character'] = validation.minLength.value;
        }
        if (validation?.maxLength) {
            extracted['Max character'] = validation.maxLength.value;
        }

        if (validation?.pattern) {
            const patternValue = validation.pattern.value;
            const message = validation.pattern.message;

            const selectedValidation = validationConfiguration.find(
                (config) => config.value === patternValue
            );

            if (selectedValidation) {
                extracted['Select Validation Type'] = selectedValidation.name;
                extracted['Validation Message'] = message !== selectedValidation.message
                    ? message
                    : '';
            } else {
                extracted['Select Validation Type'] = "Custom Validation";

                extracted['Customize Validation Pattern'] = patternValue;
                extracted['Validation Message'] = message;
            }
        }

        return extracted;
    };

    switch (componentValue) {
        case 'text':
            formValues = {
                Label: jsonData.label,
                Placeholder: jsonData.placeholder,
                defaultValue: jsonData.defaultValue,
                entityName: jsonData.dispatchername.replace(/([a-z])([A-Z])/g, '$1 $2'),
                ...extractValidation(jsonData.validation),
            };
            break;

        case 'featuredtext':
            formValues = {
                Label: jsonData.label,
                Placeholder: jsonData.placeholder,
                entityName: jsonData.dispatchername.replace(/([a-z])([A-Z])/g, '$1 $2'),
                Type: jsonData.type,
                'Decimal Precision': jsonData.decimalPrecision || '',
                'Thousand Separator': jsonData.thousandSeparator || false,
                Prefix: jsonData.prefix || '',
                Suffix: jsonData.suffix || '',
                ...extractValidation(jsonData.validation),
            };
            break;

        case 'dropdown':
            formValues = {
                Label: jsonData.label,
                'API Url': jsonData.fetchdataapiurl,
                entityName: jsonData.dispatchername.replace(/([a-z])([A-Z])/g, '$1 $2'),
                Required: jsonData.validation?.required?.value || false,
                defaultValue: jsonData.defaultValue,
                requestParam: jsonData.requestParam,
                Value: jsonData.responseParam?.Value,
                Text: jsonData.responseParam?.Text,
                "Relative Third Party API Url": jsonData.relativeTPAPIUrl,
            };
            break;

        case 'staticDropdown':
            formValues = {
                Label: jsonData.label,
                entityName: jsonData.dispatchername.replace(/([a-z])([A-Z])/g, '$1 $2'),
                Required: jsonData.validation?.required?.value || false,
                options: jsonData.options
            };
            break;

        case 'checkbox':
            formValues = {
                Label: jsonData.label,
                'Default Value': jsonData.checkeddefaultval ? 'Checked' : 'Unchecked',
                entityName: jsonData.dispatchername.replace(/([a-z])([A-Z])/g, '$1 $2'),
                "Check box text": jsonData.checkboxtext || '',
            };
            break;

        case 'multiselect':
            formValues = {
                Label: jsonData.label,
                'API URL': jsonData.fetchdataapiurl,
                entityName: jsonData.dispatchername.replace(/([a-z])([A-Z])/g, '$1 $2'),
                Required: jsonData.validation?.required?.value || false,
                'Min Selections': jsonData.validation?.validate || '',
            };
            break;

        case 'date':
            formValues = {
                Label: jsonData.label,
                Placeholder: jsonData.placeholder,
                entityName: jsonData.dispatchername.replace(/([a-z])([A-Z])/g, '$1 $2'),
                'Max Age': jsonData.maxAge || '',
                'Min Age': jsonData.minAge || '',
                Mandatory: jsonData.validation?.required?.value || false,
                "Max Rules": jsonData?.dynamicRules['Max Rules'] ? true : false,
                ...jsonData?.dynamicRules['Max Rules'] && {
                    "Max value Depends On": jsonData.dynamicRules['Max Rules'].dependsOn || '',
                    'Max value Condition': jsonData.dynamicRules['Max Rules'].condition || '',
                    "Max value Compute logic": jsonData.dynamicRules['Max Rules'].compute || '',
                    "Max value in days": jsonData.dynamicRules['Max Rules'].value || '',
                },

                "Min Rules": jsonData?.dynamicRules['Min Rules'] ? true : false,
                ...jsonData?.dynamicRules['Min Rules'] && {
                    "Min value Depends On": jsonData.dynamicRules['Min Rules'].dependsOn || '',
                    'Min value Condition': jsonData.dynamicRules['Min Rules'].condition || '',
                    "Min value Compute logic": jsonData.dynamicRules['Min Rules'].compute || '',
                    "Min value in days": jsonData.dynamicRules['Min Rules'].value || '',

                },
            };
            break;



        case 'radio':
            formValues = {
                entityName: jsonData.radiogroup.replace(/([a-z])([A-Z])/g, '$1 $2'),
                value: [{ value: jsonData.label }, ...jsonData.radiooptions.map((option) => ({
                    data: option.option1,
                    value: option.optionlabel,
                }))],
                DefaultSelected: jsonData.defaultValue,
            };
            break;

        case 'autoSuggestion':
            formValues = {
                Label: jsonData.label,
                'API Url': jsonData.fetchdataapiurl,
                'API Query Parameter Name': jsonData.paramName,
                'Min Selections': jsonData.minCharsToSearch || 2,
                entityName: jsonData.dispatchername.replace(/([a-z])([A-Z])/g, '$1 $2'),
                Required: jsonData.validation?.required?.value || false,
                requestParam: jsonData.requestParam,
                Value: jsonData.responseParam?.Value,
                Text: jsonData.responseParam?.Text,
                "Relative Third Party API Url": jsonData.relativeTPAPIUrl,
            };
            break;

        case 'hidden':
            formValues = {
                Label: jsonData.label,
                ID: jsonData.id,
                defaultValue: jsonData.defaultValue,
                entityName: jsonData.dispatchername.replace(/([a-z])([A-Z])/g, '$1 $2'),
            };
            break;

        case 'fileUpload':
            formValues = {
                Label: jsonData.label,
                'Max Size (MB)': jsonData.maxSize ? jsonData.maxSize / (1024 * 1024) : 5,
                'Allow Type': jsonData.allowedTypes,
                entityName: jsonData.dispatchername.replace(/([a-z])([A-Z])/g, '$1 $2'),
                Required: jsonData.validation?.required?.value || false,
            };
            break;


        default:
            formValues = {};
    }

    const payLoad = {
        "Disable": jsonData?.dynamicBehavior?.['disable'] ? true : false,
        ...jsonData?.dynamicBehavior?.['disable'] && {
            "Disable Depends On": jsonData.dynamicBehavior['disable'].dependsOn || '',
            'Disable Condition': jsonData.dynamicBehavior['disable'].condition || '',
            "Disable value": jsonData.dynamicBehavior['disable'].value || '',
            "Disable value Type": jsonData.dynamicBehavior['disable'].valueType || '',

            // "Max value in days": jsonData.dynamicBehavior['Max Rules'].value || '',
        },

        "Reset": jsonData?.dynamicBehavior?.['reset'] ? true : false,
        ...jsonData?.dynamicBehavior?.['reset'] && {
            "Reset Depends On": jsonData.dynamicBehavior['reset'].dependsOn || '',
            'Reset Condition': jsonData.dynamicBehavior['reset'].condition || '',
            "Reset value": jsonData.dynamicBehavior['reset'].value || '',
            "Reset value Type": jsonData.dynamicBehavior['reset'].valueType || '',

        },
        "Mandatory Rule": jsonData?.dynamicBehavior?.['mandatory'] ? true : false,
        ...jsonData?.dynamicBehavior?.['mandatory'] && {
            "Mandatory Depends On": jsonData.dynamicBehavior['mandatory'].dependsOn || '',
            'Mandatory Condition': jsonData.dynamicBehavior['mandatory'].condition || '',
            "Mandatory value": jsonData.dynamicBehavior['mandatory'].value || '',
            "Mandatory value Type": jsonData.dynamicBehavior['mandatory'].valueType || '',

        }
    }

    return { ...formValues, ...payLoad };
};

export default reverseJsonParser;
