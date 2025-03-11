import Grid from '@mui/material/Grid2';
import styled from '@mui/system/styled';
import Box from '@mui/material/Box';
import SIPInner from './SIPInner';
import FilterComponent from '../../../Common/CustomComponents/FilterComponent';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#ced7e0',
    padding: theme.spacing(0),
    borderRadius: '4px',
    textAlign: 'center',
}));


const SIPTab = ({ sipManagerActionData, sipManagerConfigData, sipManagerTableData, filterValues, setFilterValues, getSIPManagerDataDetails }) => {

    return (
        <>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>

                <div className='commonfilter'>
                    <FilterComponent
                        tableConfig={sipManagerConfigData}
                        filterValues={filterValues}
                        setFilterValues={setFilterValues}
                        getData={getSIPManagerDataDetails}
                        onlyCustom={true}
                        // minFromDate={true}
                        minToDate={true}
                        requirePdf={false}
                        requireExcel={false}
                        requireFilter={true}
                    />
                </div>


                <Item className=''>
                    <div className="container1">
                        <Box sx={{ flexGrow: 1 }}>
                            <SIPInner
                                sipManagerActionData={sipManagerActionData}
                                sipManagerConfigData={sipManagerConfigData}
                                sipManagerTableData={sipManagerTableData}
                            />
                        </Box>
                    </div>
                </Item>
            </Grid>
        </>
    );
};

export default SIPTab