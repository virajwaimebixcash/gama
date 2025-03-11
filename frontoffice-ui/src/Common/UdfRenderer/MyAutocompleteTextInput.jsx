import { FormControl, TextField, Autocomplete } from "@mui/material";

const MyAutocomplete = ({
  multilanguage = (e) => e,
  allprops,
  label,
  placeholder,
  error,
  onChange,
  name = "",
  isTable,
  sx = {},
  data = [],
  inputValue,
  setInputValue,
  value = null,
  helperText
}) => {

  return (
    <FormControl sx={{ width: "100%" }}>
      {!isTable && <p>{label}</p>}
      <Autocomplete
        freeSolo
        options={data}
        getOptionLabel={(option) => (typeof option === "string" ? option : option.text || "")}
        isOptionEqualToValue={(option, value) => option?.value === value?.value}
        value={value}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(event, newValue) => {
          onChange({
            target: {
              name,
              value: newValue?.value || "", // Send only the value of the selected option
            },
          });
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              placeholder={multilanguage(placeholder)}
              error={error}
              helperText={helperText}
              {...allprops}
              name={name}
              sx={sx}
              size='small'
            />
          )
        }}
      />
    </FormControl>
  );
};

export default MyAutocomplete;
