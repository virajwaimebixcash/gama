
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import ExpandableTable from './ExpandableTable';
// import FilterComponentHolding from '../Subscription/FilterComponentHolding';
import SwipeView from './SwipeView';
import FilterComponent from '../../../Common/CustomComponents/FilterComponent';

export default function MyHoldings({ tableConfig, tableData, filterConfig, filterValues, setFilterValues, getHolding, sortingState, setSortingState }) {

    const handleSort = (columnFieldName, sortOrder) => {
        if (!sortOrder) {
            // If no sortOrder, reset the sortingState
            setSortingState(null);
        } else {
            // Update the sorting state with the current column and order
            setSortingState({ sortingField: columnFieldName, sortingOrder: sortOrder.toUpperCase() });
        }
    };

    return (
        <Box className=" zeropaddingimp marforfulltab">
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 8 }} className='thiryheight'>
                    <div className='texleft stdpadding'>
                        <span className='newhedersfnt'>My Holdings</span>
                        <span className="on3px">As on Date : </span>
                        <span className="blcfon">- 10 Dec 2024</span>
                    </div>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 2 }} className='thiryheight'>

                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 2 }} className='thiryheight'>
                    <div className='tpsspacegp '>
                        <span className='dwloption stdpadding'>
                            <FilterComponent
                                tableConfig={tableConfig}
                                filterValues={filterValues}
                                setFilterValues={setFilterValues}
                                getData={getHolding}
                                // minToDate={true}
                                requirePdf={true}
                                requireExcel={true}
                                requireFilter={false}
                            />
                        </span>
                    </div>
                </Grid>

                <SwipeView />

                <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
                    <div className='overfl'>
                        <ExpandableTable
                            tableConfig={tableConfig}
                            tableData={tableData}
                            sortingState={sortingState}
                            handleSort={handleSort}
                        />
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
}