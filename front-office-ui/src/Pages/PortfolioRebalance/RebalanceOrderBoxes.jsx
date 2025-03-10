import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
// import ActualRebalanceSelect from './ActualRebalanceSelect';
import { Button } from "@mui/material";
import {
    TextField,
    
  } from "@mui/material";
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

export default function RebalanceOrderBoxes() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid size={6} >
            <Item sx={{ boxShadow: 0}}>
            
                <div >
                 <div className='aligmelefts'>
                   <table>
                    <tr>
                        <td className='gapsintrs'>
                        <p>Folio</p>
                            {/* <ActualRebalanceSelect></ActualRebalanceSelect> */}
                            </td>
                        <td className='gapsintrs'>
                        <div className='perinpboxfull'>
                        <p>Order Amount</p>
                            <TextField
                                    label=""
                                    id="outlined-size-small"
                                    placeholder=''
                                    size="small"
                                    value=""
                                    sx={{ width: '100%' }}
                                />
                        </div>

                        </td>
                        <td className='gapsintrs top17'>
                        <Button variant="contained"  className="Generatebtn" sx={{float:'left'}}>
                            Apply To All
                        </Button>

                        </td>
                    </tr>
                   </table>
                   
                    
                   
                    <div>
                   
                    </div>
                    
                    
                    </div>


                </div>
            </Item>
            </Grid>
        <Grid size={6}>
        <Item sx={{ boxShadow: 0}}>
        <div className='aligmelefts forsubheasnew'>UDF</div>
            <div >
             <div className='aligmelefts'>
               <table>
                <tr>
                    <td className='gapsintrs'>
                    
                        {/* <ActualRebalanceSelect></ActualRebalanceSelect> */}
                        </td>
                    <td className='gapsintrs'>
                    <div className='perinpboxfull'>
                    
                    {/* <ActualRebalanceSelect></ActualRebalanceSelect> */}
                    </div>

                    </td>
                    <td className='gapsintrs'>
                    <Button variant="contained"  className="Generatebtn" sx={{float:'left'}}>
                        Apply To All
                    </Button>

                    </td>
                </tr>
               </table>
               
                
               
                <div>
               
                </div>
                
                
                </div>


            </div>
        </Item>
        </Grid>
      
      </Grid>
    </Box>
  );
}
