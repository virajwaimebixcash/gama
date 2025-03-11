import { Box } from '@mui/material';
import DynamicTabsStaticContent from './DynamicTabsStaticContent';

function WatchList({ WatchListWidgetDetails, ParameterListData }) {

  return (
    <Box sx={{ width: '100%' }} className='texttranssmal'>
      <DynamicTabsStaticContent WatchListTabData={WatchListWidgetDetails?.watchListTab} WatchListFieldData={WatchListWidgetDetails?.watchListField}
        ParameterListData={ParameterListData} />
    </Box>
  );
}

export default WatchList;
