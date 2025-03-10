import { useEffect, useState } from "react";
import { Select, MenuItem, Box } from "@mui/material";
import DatePickerComponent from "../../FormComponent/DatePickerComponent";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";

const predefinedDifferences = [7, 15, 30, 60]; //todo assign differences from api

const DateFilter = ({ filter, filterValues, setFilterValues, defaultValue = "", onlyCustom = false, minFromDate = false, minToDate = false,error ,filterErrors}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [customFromDate, setCustomFromDate] = useState(null);
  const [customToDate, setCustomToDate] = useState(null);  

  const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");

  const handleOptions = () => {
    const options = !onlyCustom ? [...predefinedDifferences, "custom"] : ["custom"];

    return options.map((option, index) => (
      <MenuItem key={`${option}_${index}`} value={option}>
        {option === "custom" ? "Custom" : `Last ${option} Days`}
      </MenuItem>
    ))
  }

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    const today = dayjs().format("YYYY-MM-DD");
    let updatedFilterValues = { ...filterValues };

    if (value !== "custom") {
      updatedFilterValues[`${filter.fieldName}From`] = formatDate(dayjs().subtract(value - 1, "days"));
      updatedFilterValues[`${filter.fieldName}To`] = today;
    } else {
      updatedFilterValues[`${filter.fieldName}From`] = "";
      updatedFilterValues[`${filter.fieldName}To`] = "";
      setCustomFromDate(null);
      setCustomToDate(null);
    }

    setFilterValues(updatedFilterValues);
  };

  const handleCustomDateChange = (field, date) => {
    const updatedFilterValues = { ...filterValues };

    if (field === "From") {
      setCustomFromDate(date);

      // Ensure 'toDate' is not less than 'fromDate'
      if (customToDate && dayjs(date).isAfter(customToDate)) {
        setCustomToDate(date); // Reset to match fromDate if it's invalid
        updatedFilterValues[`${filter.fieldName}To`] = formatDate(date);
      }
    } else {
      if (customFromDate && dayjs(date).isBefore(customFromDate)) {
        return; // Prevent setting an invalid toDate
      }
      setCustomToDate(date);
    }

    updatedFilterValues[`${filter?.fieldName}${field}`] = formatDate(date);
    setFilterValues(updatedFilterValues);
  };
  

  useEffect(() => {
    const fromValue = filterValues?.[`${filter.fieldName}From`];
    const toValue = filterValues?.[`${filter.fieldName}To`];

    if (fromValue && toValue) {
      const fromDate = dayjs(fromValue, "YYYY-MM-DD");
      const toDate = dayjs(toValue, "YYYY-MM-DD");
      const today = dayjs();

      const difference = today.diff(fromDate, "days");

      const matchedOption = predefinedDifferences.includes(difference + 1) ? (difference + 1).toString() : "custom";

      setSelectedOption(matchedOption);

      if (matchedOption === "custom") {
        setCustomFromDate(fromDate);
        setCustomToDate(toDate);
      }
    }
  }, [filter.fieldName, filterValues]);

  return (
    <div>
      <Select
        size="small"
        value={selectedOption}
        onChange={handleSelectChange}
        sx={{ width: "100%" }}
        displayEmpty
      >
        <MenuItem value="">
          <em>Select</em>
        </MenuItem>
        {handleOptions()}
      </Select>

      {selectedOption === "custom" && (
        <Box sx={{ marginTop: "16px" }}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <p>From Date</p>
              <DatePickerComponent
                value={customFromDate}
                onChange={(date) => handleCustomDateChange("From", date)}
                minDate={minFromDate ? dayjs() : null}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-error": {
                      borderColor: "red",
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    color: "red",
                  },
                }}
              />
              {error?.from && <p className="error-text notappicon">{error.from}</p>}
            </Grid>
            <Grid xs={12} sm={6}>
              <p>To Date</p>
              <DatePickerComponent
                value={customToDate}
                onChange={(date) => handleCustomDateChange("To", date)}
                // minDate={minToDate ? customFromDate : null}
                minDate={customFromDate ? customFromDate : (minToDate ? dayjs() : null)}
               
              />
              {error?.to && <p className="error-text notappicon">{error.to}</p>}
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default DateFilter;