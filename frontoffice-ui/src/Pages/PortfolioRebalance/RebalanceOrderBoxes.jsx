import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
// import ActualRebalanceSelect from './ActualRebalanceSelect';
import { Button } from "@mui/material";
import {
  TextField,

} from "@mui/material";
import RebalanceSelect from './RebalanceSelect';
import Render from '../../Common/UdfRenderer/Render';
import { useState } from 'react';
import FixedFieldRender from './FixedFieldRender';
import UdfFieldRender from './UdfFieldRender';
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

export default function RebalanceOrderBoxes({ selectedTabDetails = { udfFieldConfigToApply: [], fixedFieldConfigToApply: [] } }) {
  const [selectedUdfFields, setSelectedUdfFields] = useState('executionmode');
  const [selectedFixFields, setSlectedFixFields] = useState('MF Scheme');
  const udfFieldConfig = selectedTabDetails.udfFieldConfigToApply.find(item => item.dispatchername === selectedUdfFields);
  const fixedFieldConfig = selectedTabDetails.fixedFieldConfigToApply.find(item => item.fieldName === selectedFixFields);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6} >
          <Item sx={{ boxShadow: 0 }}>

            <div >
              <div className='aligmelefts'>
                <table>
                  <tr>
                    <td className='gapsintrs'>
                      <p>Folio</p>
                      <RebalanceSelect selectedUdfFields={selectedUdfFields} setSlectedFixFields={setSlectedFixFields} type={'fixedFieldConfigToApply'} selectedTabDetails={selectedTabDetails} />
                    </td>
                    <td className='gapsintrs'>
                      <div className='perinpboxfull' style={{ width: '100%' }}>
                        {/* <p>Order Amount</p> */}
                        {/* <TextField
                          label=""
                          id="outlined-size-small"
                          placeholder=''
                          size="small"
                          value=""
                          sx={{ width: '100%' }}
                        /> */}
                        <FixedFieldRender  displayLabel={true}  fixedFormConfig={[fixedFieldConfig] }/>
                      </div>

                    </td>
                    <td className='gapsintrs top17'>
                      <Button variant="contained" className="Generatebtn" sx={{ float: 'left' }}>
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
          <Item sx={{ boxShadow: 0 }}>
            
            <div >
              <div className='aligmelefts'>
                <table>
                  <tr>
                    <td className='gapsintrs'>
                    <div className='aligmelefts forsubheasnew'>UDF</div>
                      <RebalanceSelect selectedFixFields={selectedFixFields} type={'udfFieldConfigToApply'} setSelectedUdfFields={setSelectedUdfFields} selectedTabDetails={selectedTabDetails} />
                      {/* <ActualRebalanceSelect></ActualRebalanceSelect> */}
                    </td>
                    <td className='gapsintrs'>
                      <div className='perinpboxfull'>
                        <UdfFieldRender  displayLabel={true}  config={udfFieldConfig}
                          index={0}
                          disabledform={false}
                          isTable={false}
                        />
                        {/* <ActualRebalanceSelect></ActualRebalanceSelect> */}
                      </div>

                    </td>
                    <td className='gapsintrs'>
                      <Button variant="contained" className="Generatebtn" sx={{ float: 'left' }}>
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
