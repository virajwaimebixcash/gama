import React, { useState } from "react";
import {
  FormControl,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import blueinfo from '../../images/blueinfo.png'
import bluerupee from '../../images/bluerupee.png'
import { TextField } from '@mui/material';
const RadioTextBand = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <TableContainer component={Paper} sx={{ width:"98%" }} className="forsvgcss">
      <FormControl component="fieldset">
        <RadioGroup value={selectedValue} onChange={handleChange}>
          <Table className="tbewidts"> 
            <TableBody>
              {/* Option 1 */}
              <TableRow className="blueradio48">
                <TableCell sx={{ width: "48%" }} className="noleftside">Monthly</TableCell>
                <TableCell align="right" sx={{ width: "45%" }} className="norightside">
                  <Radio value="option1" />
                </TableCell>
              </TableRow>
              <TableRow className="grybac">
                <TableCell colSpan={2}>
                  <Box sx={{ width: "100%", p: 2, borderRadius: "8px", margin: "auto" }}>
                    <Typography >
            
                    <Grid container spacing={1} >
                        <Grid className="minhegt50 twentyfromtop" size={{  xs:12, sm: 12,  md: 12, lg: 11, }} >
                        <span className="bldfullblc">6,843.72</span><span className="subblcs">Investment required to achive goal</span>
                        <br/>
                       <table>
                        <tr>
                          <td><img src= {blueinfo} className="fivetop"/></td>
                          <td> <span className="notcss">Note:</span><span className="grinsmall">Goal plan will be created with Investment Style -</span><span className="notcss">Monthly</span></td>
                        </tr>
                       </table>
                       
                        </Grid>
                        <Grid className="minhegt50 twentyfromtop"  size={{  xs: 12, sm: 12,  md: 12, lg: 1, }} >
                        <img src= {bluerupee} />
                        </Grid>
                    </Grid>    
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell sx={{ width: "100%" , height:"5px"}} className="gabintabels"></TableCell>
                
              </TableRow>
              {/* Option 2 */}
              <TableRow className="blueradio48">
                <TableCell sx={{ width: "48%" }} className="noleftside">Lumpsum</TableCell>
                <TableCell align="right" sx={{ width: "48%" }} className="norightside">
                  <Radio value="option2" />
                </TableCell>
              </TableRow>
              <TableRow className="grybac">
                <TableCell colSpan={2}>
                  <Box sx={{ width: "100%", p: 2, borderRadius: "8px", margin: "auto" }}>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                    <Grid container spacing={1} >
                        <Grid className="minhegt50 twentyfromtop" size={{  xs:12, sm: 12,  md: 12, lg: 11, }} >
                        <span className="bldfullblc">211,935.42</span><span className="subblcs">Investment required to achive goal</span>
                        <br/>
                       <table>
                        <tr>
                          <td><img src= {blueinfo} className="fivetop"/></td>
                          <td> <span className="notcss">Note:</span><span className="grinsmall">Goal plan will be created with Investment Style -</span><span className="notcss">Monthly</span></td>
                        </tr>
                       </table>
                       
                        </Grid>
                        <Grid className="minhegt50 twentyfromtop"  size={{  xs: 12, sm: 12,  md: 12, lg: 1, }} >
                        <img src= {bluerupee} />
                        </Grid>
                    </Grid>    
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell sx={{ width: "100%" , height:"5px"}} className="gabintabels"></TableCell>
                
              </TableRow>
              {/* Option 3 */}
              <TableRow className="blueradio48">
                <TableCell sx={{ width: "48%" }} className="noleftside">Flexible</TableCell>
                <TableCell align="right" sx={{ width: "48%" }} className="norightside">
                  <Radio value="option3" />
                </TableCell>
              </TableRow>
              <TableRow className="grybac">
                <TableCell colSpan={2}>
                  <Box sx={{ width: "100%", p: 2, borderRadius: "8px", margin: "auto" }}>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                    <Grid container spacing={1} >
                        <Grid className="minhegt50 twentyfromtop" size={{  xs:12, sm: 12,  md: 12, lg: 1.5, }} >
                       <span className="subblcs valibasmid">Monthly</span>
                        </Grid>
                        <Grid className="minhegt50 twentyfromtop" size={{  xs:12, sm: 12,  md: 12, lg: 3.5, }} >
                        <TextField size='small'
                                  variant="outlined"
                                  className='inboxes'
                             />
                        </Grid>
                        <Grid className="minhegt50 twentyfromtop anddiv"  size={{  xs: 12, sm: 12,  md: 12, lg: 1, }} >
                        &
                        </Grid>
                        <Grid className="minhegt50 twentyfromtop" size={{  xs:12, sm: 12,  md: 12, lg: 1.7, }} >
                        <span className="subblcs valibasmid">Lumpsum</span>
                        </Grid>
                        <Grid className="minhegt50 twentyfromtop" size={{  xs:12, sm: 12,  md: 12, lg: 3.3, }} >
                       <TextField size='small'
                                 variant="outlined"
                                 className='inboxes'
                            />
                        </Grid>
                        <Grid className="minhegt50 twentyfromtop"  size={{  xs: 12, sm: 12,  md: 12, lg: 1, }} >
                        <img src= {bluerupee} />
                        </Grid>
                        <Grid className="minhegt50 twentyfromtop"  size={{  xs: 12, sm: 12,  md: 12, lg: 12, }} >
                       <span className="subblcs">Investment required to achive goal</span>
                        <br/>
                        <table>
                        <tr>
                          <td><img src= {blueinfo} className="fivetop"/></td>
                          <td> <span className="notcss">Note:</span><span className="grinsmall">Goal plan will be created with Investment Style -</span><span className="notcss">Monthly</span></td>
                        </tr>
                       </table>
                        </Grid>
                    </Grid>    
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="minspain2tabels"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </RadioGroup>
      </FormControl>
    </TableContainer>
  );
};

export default RadioTextBand;







