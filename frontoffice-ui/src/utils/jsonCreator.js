/* eslint-disable no-constant-binary-expression */
import validationConfiguration from "../assets/ValidationConfig.json";

const jsonCreator = (formValues, componentValue, targetTable) => {
    var dataArray = {};
    var dispatcherValue = "";

    if (componentValue == "radio") {
        var radioValues = formValues.value.map((item) => {
            let obj = {
                "option1": item.data,
                "option1id": item.data,
                "checked": false,
                "optionlabel": item.value
            }
            return obj;
        })
    }

    const createValidation = (formValues) => {
        const validation = {
            required: {
                value: formValues['Mandatory'] || false,
                // message: `${formValues.entityName.toLowerCase()} is required`,
                message: `${formValues.Label.toLowerCase()} is required`,
            },
            minLength: {
                value: formValues['Min character'] || 0,
                message: `Minimum length is ${formValues['Min character'] || 0} characters`,
            },
            maxLength: {
                value: formValues['Max character'] || 100,
                message: `Maximum length is ${formValues['Max character'] || 100} characters`,
            },
        };

        if (formValues['Customize Validation Pattern']) {
            validation.pattern = {
                value: formValues['Customize Validation Pattern'],
                message: formValues['Validation Message'] || 'Invalid format',
            };
        } else if (formValues['Select Validation Type']) {
            const selectedValidation = validationConfiguration.find(
                (config) => config.name === formValues['Select Validation Type']
            );
            if (selectedValidation) {
                validation.pattern = {
                    value: selectedValidation.value,
                    message: formValues['Validation Message'] || selectedValidation.message,
                };
            }
        }
        return validation;
    };

    if (targetTable != undefined && targetTable != null) {
        dispatcherValue = `${formValues.entityName}_${targetTable}`;

    }
    else {
        dispatcherValue = `${formValues.entityName}`;

    }
    const payload = {
        "dynamicBehavior": {
            "disable": formValues['Disable'] ? {
                "dependsOn": formValues['Disable Depends On'],
                "condition": formValues['Disable Condition'],
                "value": formValues['Disable value'],
                "valueType": formValues['Disable value Type'],
                // "message": "Value Date must be within 7 days of Reference Date"
            } : null,

            "reset": formValues['Reset'] ? {
                "dependsOn": formValues['Reset Depends On'],
                "condition": formValues['Reset Condition'],
                "value": formValues['Reset value'],
                "valueType": formValues['Reset value Type'],
                // "message": "Value Date cannot be after Settlement Date"
            } : null,
            "mandatory": formValues['Mandatory Rule'] ? {
                "dependsOn": formValues['Mandatory Depends On'],
                "condition": formValues['Mandatory Condition'],
                "value": formValues['Mandatory value'],
                "valueType": formValues['Mandatory value Type'],
                // "message": "Value Date cannot be after Settlement Date"
            } : null
        }
    }
    switch (componentValue) {
        case 'text':
            return dataArray = {
                "label": formValues.Label,
                "component": componentValue,
                "placeholder": formValues.Placeholder,
                "defaultValue": formValues.defaultValue,
                "dispatchername": dispatcherValue ? dispatcherValue.toLowerCase().split(" ").join("") : formValues.entityName.toLowerCase().split(" ").join(""),
                "validation": createValidation(formValues),
                ...payload
            } || {};

        case "featuredtext":
            return dataArray = {
                "label": formValues.Label,
                "component": componentValue,
                "placeholder": formValues.Placeholder,
                // "dispatchername": formValues.entityName.toLowerCase().split(" ").join(""),
                "dispatchername": dispatcherValue ? dispatcherValue.toLowerCase().split(" ").join("") : formValues.entityName.toLowerCase().split(" ").join(""),
                "type": formValues.Type,
                "decimalPrecision": formValues['Decimal Precision'] || "",
                "thousandSeparator": formValues['Thousand Separator'] || false,
                "prefix": formValues['Prefix'] || "",
                "suffix": formValues['Suffix'] || "",
                "validation": createValidation(formValues),
                ...payload

            } || {};

        case 'dropdown':
            return dataArray = {
                label: formValues.Label,
                component: componentValue, // or any other name you give for dropdown
                "fetchdataapiurl": formValues['API Url'],
                options: (formValues.options || []).map(option => ({
                    label: option.label,
                    value: option.value
                })),
                defaultValue: formValues.defaultValue,
                dispatchername: dispatcherValue ? dispatcherValue.toLowerCase().split(" ").join("") : formValues.entityName.toLowerCase().split(" ").join(""),

                // dispatchername: formValues.entityName ? formValues.entityName.toLowerCase() : '',
                validation: {
                    required: {
                        value: formValues.Required,
                        message: `${formValues.Label} is required`
                    }
                },
                "requestParam": formValues.requestParam,
                "responseParam": {
                    "Value": formValues.Value,
                    "Text": formValues.Text
                },
                "relativeTPAPIUrl": formValues?.['Relative Third Party API Url'],
                ...payload,
            } || {}

        case 'staticDropdown':
            return dataArray = {
                label: formValues.Label,
                component: componentValue,
                options: (formValues.options || []),
                dispatchername: dispatcherValue ? dispatcherValue.toLowerCase().split(" ").join("") : formValues.entityName.toLowerCase().split(" ").join(""),
                validation: {
                    required: {
                        value: formValues.Required,
                        message: `${formValues.Label} is required`
                    }
                },
                ...payload,
            } || {}

        case 'checkbox':
            return dataArray = {
                "label": formValues.Label,
                "component": componentValue,
                "checkboxid": "chkActive",
                "checkboxname": "chkActive",
                "checkeddefaultval": formValues['Default Value'] === "Checked" ? true : false,
                "checklabel": "Active",
                "dispatchername": dispatcherValue ? dispatcherValue.toLowerCase().split(" ").join("") : formValues.entityName.toLowerCase().split(" ").join(""),
                "checkboxtext": formValues["Check box text"],

                ...payload     // "dispatchername": formValues.entityName.toLowerCase().split(" ").join("")
            } || {}

        case 'multiselect':
            return dataArray = {
                "label": formValues.Label,
                "component": componentValue,
                "fetchdataapiurl": formValues['API URL'],
                "dispatchername": dispatcherValue ? dispatcherValue.toLowerCase().split(" ").join("") : formValues.entityName.toLowerCase().split(" ").join(""),
                // "dispatchername": formValues.entityName.toLowerCase().split(" ").join(""),
                "validation": {
                    "required": {
                        "value": formValues['Required'] || false,
                        "message": `Please select at least ${formValues['Min Selections'] || 'one'} option`
                    },
                    "validate": formValues['Min Selections']
                },
                ...payload
            } || {}

        case 'date':
            return dataArray = {
                "label": formValues.Label,
                "component": componentValue,
                "placeholder": formValues.Placeholder,
                "dispatchername": dispatcherValue ? dispatcherValue.toLowerCase().split(" ").join("") : formValues.entityName.toLowerCase().split(" ").join(""),
                // "dispatchername": formValues.entityName.toLowerCase().split(" ").join(""),
                "maxAge": formValues['Max Age'],
                "minAge": formValues['Min Age'],
                "validation": {
                    "required": {
                        "value": formValues['Mandatory'] || false,
                        // "message": `${formValues.entityName.toLowerCase()} is required`
                        "message": `${formValues.Label.toLowerCase()} is required`

                    }
                },
                "dynamicRules": {
                    "Max Rules": formValues['Max Rules'] ? {
                        "dependsOn": formValues['Max value Depends On'],
                        "condition": formValues['Max value Condition'],
                        "compute": formValues['Max value Compute logic'],
                        "value": formValues['Max value in days'],
                        // "message": "Value Date must be within 7 days of Reference Date"
                    } : null,

                    "Min Rules": formValues['Min Rules'] ? {
                        "dependsOn": formValues['Min value Depends On'],
                        "condition": formValues['Min value Condition'],
                        "compute": formValues['Min value Compute logic'],
                        "value": formValues['Min value in days'],
                        // "message": "Value Date cannot be after Settlement Date"
                    } : null
                },
                ...payload
            } || {}

        case 'radio':
            return dataArray = {
                "label": formValues.value[0].value,
                "component": componentValue,
                "defaultValue": radioValues[1].option1id,
                "radiooptions": radioValues.slice(1),
                "radiogroup": formValues.entityName.toLowerCase(),
                // "dispatchername": formValues.entityName.toLowerCase().split(" ").join("")
                "dispatchername": dispatcherValue ? dispatcherValue.toLowerCase().split(" ").join("") : formValues.entityName.toLowerCase().split(" ").join(""),
                ...payload
            } || {}

        case 'autoSuggestion':
            return dataArray = {
                "label": formValues.Label,
                "component": componentValue,
                "fetchdataapiurl": formValues['API Url'],
                "dispatchername": dispatcherValue ? dispatcherValue.toLowerCase().split(" ").join("") : formValues.entityName.toLowerCase().split(" ").join(""),
                // "dispatchername": formValues.entityName.toLowerCase().split(" ").join(""),
                "paramName": formValues['API Query Parameter Name'],
                "minCharsToSearch": formValues['Min Selections'] || 2,
                "validation": {
                    "required": {
                        "value": formValues['Required'] || false,
                        // "message": `Select ${formValues.entityName.toLowerCase()}`
                        "message": `Select ${formValues?.Label?.toLowerCase()}`

                    }
                },
                "requestParam": formValues.requestParam,
                "responseParam": {
                    "Value": formValues.Value,
                    "Text": formValues.Text
                },
                "relativeTPAPIUrl": formValues['Relative Third Party API Url'],
                ...payload
            } || {}

        case 'hidden':
            return dataArray = {
                "label": formValues.Label,
                "component": componentValue,
                "id": formValues.ID,
                "defaultValue": formValues.defaultValue,
                "dispatchername": dispatcherValue ? dispatcherValue.toLowerCase().split(" ").join("") : formValues.entityName.toLowerCase().split(" ").join(""),
                // "dispatchername": formValues.entityName.toLowerCase().split(" ").join("")
                ...payload
            } || {};

        case 'fileUpload':
            const maxSizeInBytes = formValues['Max Size (MB)'] ? parseInt(formValues['Max Size (MB)'], 10) * 1024 * 1024 : 5242880;
            return dataArray = {
                "label": formValues.Label,
                "component": componentValue,
                "dispatchername": dispatcherValue ? dispatcherValue.toLowerCase().split(" ").join("") : formValues.entityName.toLowerCase().split(" ").join(""),
                // "dispatchername": formValues.entityName.toLowerCase().split(" ").join(""),
                "validation": {
                    "required": {
                        "value": formValues['Required'] || false,
                        "message": `${formValues.entityName.toLowerCase()} is required`
                    }
                },
                "allowedTypes": formValues['Allow Type'] || ["image/jpeg", "image/png", "image/jpg"],
                "maxSize": maxSizeInBytes,
                // ...payload
            } || {};

        default:
            return {};
    }
}

export default jsonCreator;