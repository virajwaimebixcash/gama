import React from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import Grid from '@mui/material/Grid2';
import { TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const MyDate = ({
  dispatchername,
  validation,
  name,
  multilanguage,
  TextFieldLabel,
  handleOnChange,
  mindate,
  setCleared,
  maxdate,
  control,
  i18n,
  isInvalid,
  inputError,
  dobPlaceHolder,
  format,
  helperText,
  dateAdapter,
  dayjs,
  defaultValue,
  isTable,
  disable
}) => {


  return (
    <>
      {!isTable && <p>{multilanguage(TextFieldLabel)}</p>}
      {/* <div className="input-wrapper date-input"> */}
        <Controller
          control={control}
          name={dispatchername}
          rules={validation}
          // defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => {
            return (
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                // adapterLocale={'en'}
              >
                <DatePicker
                  name={name}
                  disabled={disable}
                  // label={multilanguage(TextFieldLabel)}
                  // className="input-field date-picker"
                  onChange={(date) => {
                    onChange(date);
                    // handleOnChange(date);
                  }}
                  value={value ? dayjs(value) : null}
                  format={format}
                  placeholder={multilanguage(dobPlaceHolder)}
                  minDate={mindate}
                  maxDate={maxdate}
                  views={["year", "month", "day"]}
                  slotProps={{
                    textField: {
                      error: isInvalid,
                      helperText: helperText,
                      size: "small"
                    },
                    field: { clearable: true, onClear: () => setCleared(true) },
                  }}
                  // renderInput={(params) => <TextField {...params} size="small" />}
                  sx={{ width: '100%' }}
                  id="outlined-size-small"
                />
              </LocalizationProvider>
            );
          }}
        />
      {/* </div> */}
    </>
  );
};

export default MyDate;

