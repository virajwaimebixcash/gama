import { useState, useEffect, useRef } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, IconButton
} from "@mui/material";
import closewhite from '../../images/closewhite.png';
import { TextField, FormControl, Select, MenuItem } from "@mui/material";
import SwitchforModel from './SwitchforModel';
import { useFieldArray, Controller, useFormContext } from "react-hook-form";
import api from '../../APIs/interceptor';

const ModelPortfolioParentTab = () => {
  const methods = useFormContext();
  const { register, control, setValue, watch, formState: { errors }, clearErrors, getValues } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "childMapping" });
  const [equalWeight, setEqualWeight] = useState(false); // Track switch state
  const [childDropdownList, setChildDropdownList] = useState([]);
  const lastCustomAllocations = useRef({});

  const distributeEqualWeight = () => {
    if (fields.length > 0) {
      const weight = (100 / fields.length).toFixed(2);
      fields.forEach((_, index) => {
        setValue(`childMapping.${index}.allocationPer`, weight);
      });
    }
  };

  const handleModeChange = (isEqualWeight) => {
    setEqualWeight(isEqualWeight);
    setValue("weightageType", isEqualWeight ? 1 : 2);
    if (isEqualWeight) {
      fields.forEach((_, index) => {
        lastCustomAllocations.current[index] = watch(`childMapping.${index}.allocationPer`);
      });
      distributeEqualWeight();
      clearErrors("childMapping");
    } else {
      fields.forEach((_, index) => {
        setValue(`childMapping.${index}.allocationPer`, lastCustomAllocations.current[index] || "");
      });
    }
  };

  // Validate total allocation
  const validateTotalAllocation = () => {
    const total = fields.reduce(
      (sum, _, i) => sum + (parseFloat(watch(`childMapping[${i}].allocationPer`)) || 0),
      0
    );
    if (total === 100) {
      clearErrors("childMapping");
    }
  };

  // Add a new row
  const addRow = () => {
    if (fields.length < 10) {
      append({ childModelPortfolioId: "0", fromAllocationPer: "", fromTolerancePer: "" });
    }
  };

  // Remove a row
  const removeRow = (index) => {
    remove(index);
  };

  useEffect(() => {
    if (equalWeight) {
      distributeEqualWeight();
    }
  }, [fields.length, equalWeight]); // Recalculate when rows change

  useEffect(() => {
    const body = {
      modelType: 2,
    };

    api.post(`/ModelPortfolio/getPortfolioDataByModelType`, body).then((res) => {
      setChildDropdownList(res.data.data);
    }).catch((error) => {
      console.error("Error fetching config:", error);
    });
  }, [])

  return (
    <div style={{ margin: "auto" }} className="fullw gpfromtops">
      {/* Table */}
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table className="modeltabelcss">
          <TableHead>
            <TableRow className="tabheadersgry">
              <TableCell className="paddingforheaders" sx={{ width: "35%" }}>Map Child Model</TableCell>
              <TableCell className="paddingforheaders" sx={{ width: "35%" }}>
                <div className="tgswitch topzeroimp">
                  <SwitchforModel onModeChange={handleModeChange} value={getValues("weightageType")} />
                </div>
              </TableCell>
              <TableCell className="paddingforheaders" sx={{ width: "30%" }}> </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="paddingforheaders" sx={{ width: "35%" }}></TableCell>
              <TableCell className="paddingforheaders" sx={{ width: "35%" }}>
                Allocation
              </TableCell>
              <TableCell className="paddingforheaders" sx={{ width: "30%" }}>Tollerance (+/-) </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>
                  <FormControl fullWidth>
                    <Controller
                      control={control}
                      name={`childMapping.${index}.childModelPortfolioId`} // Bind to the dynamic row's childType
                      defaultValue={field.childModelPortfolioId} // Set default value if available
                      render={({ field }) => (
                        <Select
                          {...field} // Spread the field props provided by Controller
                          size="small"
                          sx={{ width: '80%' }}
                          className='slectwithcloseinparent'
                        >
                          <MenuItem value="0">Select</MenuItem>
                          {childDropdownList.map((child) => (
                            <MenuItem key={child.modelPortfolioID} value={child.modelPortfolioID}>
                              {child.modelName}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <TextField
                    {...register(`childMapping.${index}.allocationPer`, {
                      required: "Please enter the allocation %",
                      validate: () => {
                        if (!equalWeight) {
                          const total = fields.reduce(
                            (sum, _, i) => sum + (parseFloat(watch(`childMapping[${i}].allocationPer`)) || 0),
                            0
                          );
                          if (total > 100) return "Total allocation cannot exceed 100%";
                          if (total < 100) return "Total allocation must be exactly 100%";
                          return true;
                        }
                      },
                      onBlur: validateTotalAllocation, // Validate on blur
                      onChange: validateTotalAllocation, // Validate on change
                    })}
                    disabled={equalWeight}
                    label=""
                    id="outlined-size-small"
                    placeholder=''
                    size="small"
                    className='tabelsinsadd1 newposcss'
                    inputProps={{
                      inputMode: "numeric", // Shows numeric keyboard on mobile
                      pattern: "[0-9]*", // Prevents non-numeric characters
                      maxLength: 3, // Limits input to 3 characters
                      onInput: (e) => {
                        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3); // Removes non-numeric characters and limits to 3 digits
                      }
                    }}
                    error={!!errors.childMapping?.[index]?.allocationPer}
                    helperText={errors.childMapping?.[index]?.allocationPer?.message}
                  />
                </TableCell>
                <TableCell className="extbottomgray">
                  <TextField
                    {...register(`childMapping[${index}].tolerancePer`)}
                    label=""
                    id="outlined-size-small"
                    placeholder=''
                    size="small"
                    className='slectmaindd1 '
                  />
                  <IconButton onClick={() => removeRow(index)} color="error" >
                    <img src={closewhite} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow>
            <TableCell className="extzeroallside">
              {fields.length < 10 && (
                <Button
                  variant="contained"
                  className="Generatebtn nexprebutton"
                  onClick={addRow}
                >
                  Add
                </Button>
              )}
            </TableCell>
            <TableCell className="threebords extzeroallside">
              <TextField
                {...register("totalAllocation")}
                disabled
                defaultValue="100%"
                label=""
                id="outlined-size-small"
                placeholder=''
                size="small"
                className='tabelsinsadd2 newposcss disgray80'
              />
            </TableCell>
            <TableCell className="borsrights extzeroallside">
            </TableCell>
            <TableCell className="borsleft extzeroallside"></TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ModelPortfolioParentTab;