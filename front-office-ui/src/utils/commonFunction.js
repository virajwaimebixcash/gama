import dayjs from "dayjs";

export const convertTableToObjectArray = (table, columns, tableData) => {
    const tableEntries = Object.entries(table);
    const result = [];

    // Filter out dynamic table entries and group them by row ID
    const dynamicTableEntries = tableEntries?.filter(([key]) =>
        columns?.some(column => key.startsWith(column.dispatchername.split(".")[1]) || tableData.some(e => key.includes(e.id)))
    ).reduce((acc, [key, value]) => {
        const rowId = key.split('_')[1];
        const field = key.split('_')[0];
        if (!acc[rowId]) acc[rowId] = {};
        acc[rowId][field] = value;
        return acc;
    }, {});


    // Convert grouped entries to array of objects
    for (const rowId in dynamicTableEntries) {
        result.push(dynamicTableEntries[rowId]);
    }

    return result;
};

export const formatDispatcherName = (name) => {
    return name.replace(/\s+/g, '').toUpperCase();
};

export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export function getFileInfo(base64String) {
    // Separate the MIME type and Base64 data
    const matches = base64String?.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        return { error: 'Invalid Base64 string' };
    }

    // Extract MIME type
    const mimeType = matches[1];

    // Extract the Base64 data
    const base64Data = matches[2];

    // Calculate the file size in bytes
    // 1 character of Base64 equals 3/4 bytes, so we multiply by 3/4 (or 0.75)
    const fileSizeInBytes = Math.round((base64Data.length * 0.75));

    return {
        mimeType: mimeType,
        fileSizeInBytes: fileSizeInBytes
    };
}

export const transformData = (data, returnType = 'transformed') => {
    const result = {};
    let counter = 0;  // Counter to ensure unique IDs even within the same millisecond

    // Helper function to generate unique IDs
    const generateUniqueId = () => `${Date.now()}${counter++}`;

    // Helper function to add unique IDs to each object in the array
    const addUniqueIdToObjects = (array) => {
        return array.map((item) => {
            const uniqueId = generateUniqueId();
            return {
                ...item,
                rowId: uniqueId
            };
        });
    };

    // Helper function to transform arrays of objects
    const transformArray = (array) => {
        array.forEach((item) => {
            const uniqueId = item.rowId;  // Use the existing unique ID
            Object.keys(item).forEach((key) => {
                if (item[key] !== undefined && item[key] !== null) {
                    result[`${key}_${uniqueId}`] = item[key];
                }
            });
        });
    };

    // Array to store all modified arrays when returnType is 'modified'
    const modifiedArrays = [];

    // Iterate through each key in the data
    Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
            const modifiedArray = addUniqueIdToObjects(data[key]);

            if (returnType === 'transformed') {
                // Transform arrays of objects
                transformArray(modifiedArray);
            } else if (returnType === 'modified') {
                // Store the modified array under its key
                modifiedArrays.push(...modifiedArray);
            }
        } else if (typeof data[key] === 'object' && data[key] !== null) {
            // Preserve other objects without transformation
            result[key] = data[key];
        } else {
            // Copy simple values as is
            result[key] = data[key];
        }
    });

    return returnType === 'modified' ? modifiedArrays : result;
};

export const sanitizeNumericInput = (value) => {
    return value?.replace(/[^0-9]/g, ''); // Only allow numeric values (0-9)
};

export const handleNumericInput = (event) => {

    const sanitizedValue = sanitizeNumericInput(event.target.value); // Sanitize input to allow only numeric values
    // Manually update the input value without changing onChange in parent
    event.target.value = sanitizedValue; // Set sanitized value back into input element
};

export function ExportformatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0'); 

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function getformatDate(dateString) {
    const isoString = dateString.replace(" ", "T") + "Z";
    return new Date(isoString);
}

const transactionDefaultDays = 7;

export const defaultToDate = dayjs().format("YYYY-MM-DD");
export const defaultFromDate = dayjs().subtract(transactionDefaultDays - 1, "days").format("YYYY-MM-DD");  

export const formatNumberSeperator = (num) => {
    if (num === null || num === undefined) return "N/A"; // Handle null or undefined
    if (isNaN(num)) return num; // Return as-is if not a number
    return num.toString().replace(/(\d)(?=(\d\d)+\d$)/g, '$1,'); // Apply thousand separator
};

export const formatWithDecimals = (num) => {
    if (isNaN(num) || num === "" || num === null) return "0.00"; 
    return Number(num).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

export const today = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')



export const handleDynamicDecimalInput = (event, maxDecimals = 4, maxValue = 100) => {
    let inputValue = event.target.value;
  
    // Create a regex pattern dynamically based on maxDecimals (default 4)
    const regexPattern = new RegExp(`^\\d*\\.?\\d{0,${maxDecimals}}$`);
  
    // Allow only numbers with up to maxDecimals decimal places
    if (regexPattern.test(inputValue)) {
      const numericValue = parseFloat(inputValue);
  
      // Ensure value is within the valid range (maxValue) and allow empty input
      if (numericValue <= maxValue || inputValue === "") {
        event.target.value = inputValue; // Set sanitized value back into input element
      } else {
        event.target.value = maxValue.toString(); // If greater than maxValue, set it to maxValue
      }
    } else {
      event.target.value = inputValue.slice(0, -1); // Remove last character if invalid
    }
  };
  