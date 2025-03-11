import Carosole1 from './Carosole1'
import Testimonials from './Testimonials'
import boximg from '../../images/boximg.png';
import link from '../../images/link.png';
import manstanding from '../../images/manstanding.png';
import wp from '../../images/wp.png';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import styled from '@mui/system/styled';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
}));

const FundExplorerFooter = () => {
    return (
        <div className='fullw whitebackfrdiv'>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 12, lg: 12, sm: 12 }}>
                        <Item>
                            <div className='manimgbox'>
                                <div className='stndman twentcss'><img src={manstanding} /></div>
                                <div className='fortycss speechdiv'>
                                    <div className='alintxtnote'>
                                        <div className='lagfont1'>Note</div>
                                        <div className='newspacetb'><b>a)</b> Values should be displayed based on Category selected. Kindly refer to the table for value</div>
                                        <div className='newspacetb'><b>b)</b> If the category is not selected, then user should be able to explore funds accross categories </div>
                                        <div className='newspacetb'><b>c)</b> If the subcategory is not selected, then user should be able to explore funds accross sub categories </div>
                                    </div>
                                </div>
                                <div className='fortycss1'>
                                    <table>
                                        <tr>
                                            <td className='lagfont'>Realted Blogs</td>
                                            <td><img src={wp} /></td>
                                            <td><img src={link} /></td>
                                        </tr>
                                    </table>

                                    <div><img src={boximg} className='imgfullwid' /></div>
                                </div>
                            </div>
                            <div className='tableborder'></div>
                        </Item>
                    </Grid>
                    <Grid size={{ xs: 12, md: 12, lg: 8, sm: 12 }} >
                        <Item>
                            <div className='lagfont lefttextalign newspacesinblock1' >Investment Calculator</div>
                            <Carosole1></Carosole1>
                        </Item>
                    </Grid>
                    <Grid size={{ xs: 12, md: 12, lg: 4, sm: 12 }}>
                        <Item>
                            <div className='lagfont lefttextalign leftme35'>View 15+ Mutual Fund Partners</div>
                            <Testimonials></Testimonials>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default FundExplorerFooter