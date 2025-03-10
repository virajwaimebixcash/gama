import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import DetailPageGridSection from './DetailPageGridSection';
import { Button, MenuItem, Select ,InputAdornment } from "@mui/material";
import {
  TextField,

} from "@mui/material";
import { handleDynamicDecimalInput } from "../../utils/commonFunction";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const UpperboxinRebalanceDetail = ({ config ,gridData,selectedModelData}) => {
  const headerConfig = config?.headerField;
  // console.log(headerConfig, ">>>>>>>>>>>>");

  const [selectedOption, setSelectedOption] = useState("% of deviation amount"); // Default selection
  // const location = useLocation();
  // console.log(location.state);
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Item>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} >
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, }} >
                  <Item sx={{ boxShadow: 0 }}>
                    <div className='aligmelefts forsubheas'>
                      {config.headerField?.find((items) => items.dispatcherName === "approvedValueAmtCal")?.displayName}

                    </div>
                    <div >
                      <div className='aligmelefts'>
                        <Grid container spacing={2} >
                          <Grid className="minhegt50" size={{ xs: 8, sm: 8, md: 6, lg: 4, }} >
                            <Select
                              labelId="dropdown-label"
                              value={selectedOption} 
                              onChange={handleChange}
                              sx={{
                                height: "32px",
                                width: "200px",
                                border: "1px solid #ddd",
                                color: "#000",
                                fontSize: "12px",
                                backgroundColor: "#fff",
                                borderRadius: "4px",
                                ".MuiSelect-select": {
                                  padding: "0 8px",
                                },
                              }}
                            >
                              <MenuItem value="% of deviation amount" >% of deviation amount</MenuItem>
                              <MenuItem value="% of actual Holdings amount" >% of actual Holdings amount</MenuItem>
                              <MenuItem value="% of target amount">% of target amount</MenuItem>
                            </Select>
                          </Grid>
                          <Grid className="minhegt50" size={{ xs: 4, sm: 4, md: 6, lg: 1, }} >
                            <div className='perinpbox'>
                              <TextField
                                label=""
                                id="outlined-size-small"
                                placeholder=''
                                size="small"
                                // value="12%"
                                onInput={(e) => handleDynamicDecimalInput(e, 2, 100)}
                                sx={{ width: '100%' }}
                               
                              />
                            </div>
                          </Grid>
                          <Grid className="minhegt50" size={{ xs: 12, sm: 12, md: 6, lg: 3, }} >
                            <Button variant="contained" className="Generatebtn" sx={{ float: 'left' }}>
                              Calculate
                            </Button>
                          </Grid>
                        </Grid>
                        <div>
                        </div>
                      </div>
                    </div>
                  </Item>
                </Grid>
                <Grid size={6} className="lemeright">
                  <Item sx={{ boxShadow: 0 }}>
                    <Grid container spacing={2} className="leftfloats" >
                      <Grid className="minhegt50" size={{ xs: 6, sm: 6, md: 6, lg: 3.8, }} >
                        <span className="fon13nrllatest spacebetw">
                          {config.headerField?.find((items) => items.dispatcherName === "portfolioType")?.displayName} :
                        </span>
                      </Grid>
                      <Grid className="minhegt50" size={{ xs: 6, sm: 6, md: 4, lg: 3.5, }} >
                        <span className="fullblcspan spacebetw">
                          {/* Executionary */}
                          {selectedModelData?.portfolioType}
                          </span>
                      </Grid>
                      <Grid className="minhegt50" size={{ xs: 6, sm: 6, md: 4, lg: 3.5, }} >
                        <span className="fon13nrllatest left30pix spacebetw">
                          {config.headerField?.find((items) => items.dispatcherName === "orderType")?.displayName}:
                        </span>
                      </Grid>
                      <Grid className="minhegt50" size={{ xs: 6, sm: 6, md: 4, lg: 1, }} >
                        <span className="fullblcspan spacebetw"><span className="greenredbacksrebalance">
                          {/* Buy */}{selectedModelData?.orderType}
                          </span></span>
                      </Grid>
                    </Grid>

                  </Item>
                </Grid>

              </Grid>
            </Box>
          </Item>
        </Grid>
      </Grid>
      <Grid size={12} className="spaceintwotab"></Grid>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Item >
            <DetailPageGridSection gridconfigdDetail={config?.gridColumnFields}  gridData={gridData}/>
          </Item>
        </Grid>

      </Grid>
    </Box>
  );
}
export default UpperboxinRebalanceDetail;