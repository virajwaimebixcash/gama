/* eslint-disable react/prop-types */
import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    OutlinedInput,
    FormHelperText
} from "@mui/material";
import Grid from '@mui/material/Grid2';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };
const  MenuProps={
    PaperProps: {
        style: {
            maxHeight: 200, // Limit height of dropdown options
        },
    },
};

const MyInputTypeMultiSelectDropDown = ({
    multilanguage,
    allprops,
    isTable,
    error,
    name = "",
    value = {},
    onChange,
    TextFieldLabel,
    inputProps = { 'aria-label': 'Without label' },
    inputError,
    isInvalid = false,
    menuItemLabel = TextFieldLabel,
    // menuItemLabel = 'createdynamicpage.techKnowButtonText',
    data = [{ id: "", label: "" }],
    data2 = [
        { id: "1", label: "Fund" },
        { id: "2", label: "Equity" },
        { id: "3", label: "Amount" },

    ],
    selectedCourses,


}) => {

    return (
        <Grid container>
      {!isTable&&<p>{multilanguage(TextFieldLabel)}</p>}

        <FormControl fullWidth
            error={error}

        >
            {/* <InputLabel id="demo-multiple-checkbox-label">{multilanguage(TextFieldLabel)}</InputLabel> */}
            <Select
                labelId="demo-multiple-checkbox-label"
                // id="demo-multiple-checkbox"
                id="outlined-size-small"
          size="small"
                multiple
                className='multiselectdrp'
                value={value}
                onChange={onChange}
                {...allprops}
                name={name}
                // input={<OutlinedInput label={multilanguage(TextFieldLabel)} />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <em>{multilanguage(TextFieldLabel)}</em>;
                        // return <em>{multilanguage("createdynamicpage.techKnowButtonText")}</em>;
                    }

                    return selected.join(", ");
                }}
                MenuProps={MenuProps}
                inputProps={inputProps}
            >
                <MenuItem disabled value="">
                    <em>    {multilanguage(TextFieldLabel)}</em>
                </MenuItem>
                {data2.map((name) => (
                    <MenuItem key={name.id} value={name.label}>
                        <Checkbox checked={selectedCourses.indexOf(name.label) > -1} />
                        <ListItemText primary={name.label} />
                    </MenuItem>
                ))}

            </Select>
            {isInvalid &&
                (
                    <FormHelperText>
                        {inputError}
                    </FormHelperText>

                )}
        </FormControl>
</Grid>
    );
};

export default MyInputTypeMultiSelectDropDown;
