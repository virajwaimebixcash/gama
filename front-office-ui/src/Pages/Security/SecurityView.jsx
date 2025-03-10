import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import styled from '@mui/system/styled';
import Backbtn from '../../Common/FormComponent/Backbtn';
import FundInfoTabsComponent from './SecurityViewWidgets/TabsComponent';
import SecondTab from './SecurityViewWidgets/SecondTab';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchAutocomplete from './SearchAutocomplete';
import RiskProfile from './SecurityViewWidgets/RiskProfile';
import QuickOrder from './SecurityViewWidgets/QuickOrder';
import RiskAnalysis from './SecurityViewWidgets/RiskAnalysis';
import PeerComparison from './SecurityViewWidgets/PeerComparison';
import DividendHistory from './SecurityViewWidgets/DividendHistory';
import MoreFunds from './SecurityViewWidgets/MoreFunds';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../redux/actions/actionCreators';
import { useEffect, useState } from 'react';
import TrailingReturn from './SecurityViewWidgets/TrailingReturn';
import AssetAllocation from './SecurityViewWidgets/AssetAllocation';
import HistoricalNAV from './SecurityViewWidgets/HistoricalNAV';
import { useLocation, useNavigate } from 'react-router-dom';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
}));

const SecurityView = () => {
    const [allWidgetData, setAllWidgetData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const upcomingOffers = useLocation().state
 
    const selectedSearchedValue = useSelector((state) => {
        const data = state.getSchemeList.data;
        return Array.isArray(data) && data.length === 1 ? data[0] : null;
    });

    useEffect(() => {
        dispatch(actionCreators.GetSchemeList(null, true));
        dispatch(actionCreators.GetAllWidgetConfiguratorDetails()).then((res) => {
            if (res.status === 200) {
                setAllWidgetData(res.data.data);
            }
        })
            .catch((error) => {
                console.error("Error fetching config:", error);
            });

    }, [dispatch]);

    return (
        <Box>
            <div className='maincontent'>
                <div className='uppersear '>
                    {/* <div className='herar'>
                        <span className='activetabs'>Home -{'>'}</span>
                        <span className='activetabs'>Equity -{'>'}</span>
                        <span className='inactivetabs'>Mutual Fund</span>
                    </div> */}

                    {/* <Backbtn className="backbtn" label={
                        <div>
                            <ArrowBackIosIcon className='bckbtn' /> Back
                        </div>
                    } ></Backbtn> */}

                </div>
                <Grid container spacing={2} className="width100" size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                    <div className="width50">
                        <div className='searchbx' size={{ xs: 12, sm: 12, md: 6, lg: 5 }}>
                            <SearchAutocomplete SchemeName={upcomingOffers?.SchemeName} SchemeCode={upcomingOffers?.SchemeCode} isLoading={isLoading} setIsLoading={setIsLoading} />
                        </div>
                        <div className='width50 spacincell' size={{ xs: 12, sm: 12, md: 6, lg: 5 }}> {selectedSearchedValue?.SchemeName || "Fund Scheme Name"}</div>
                        {/* <div className='width50'> {selectedSearchedValue?.SchemeName || "Fund Scheme Name"}</div> */}
                    </div>
                </Grid>
                {
                    // isLoading ? (
                    //     <SecurityViewSkeleton />
                    // ) :
                    selectedSearchedValue?.SchemeName ?
                        (
                            <Grid container spacing={2} >

                                {/* Historical NAV & Returns start */}
                                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 5 }}>
                                    <Item className='fixheights mostly-customized-scrollbar'>
                                        <HistoricalNAV fundInfoData={allWidgetData.find((item) => item.widgetName == '1NAV')} fundValue={selectedSearchedValue?.fundInfo} />
                                    </Item>
                                </Grid>
                                {/* Historical NAV & Returns end */}

                                {/* Fund Information and Fund manager start */}
                                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                                    <Item className='fixheights mostly-customized-scrollbar'>
                                        <FundInfoTabsComponent fundInfoData={allWidgetData.find((item) => item.widgetName == '2FundInfo')} fundValue={selectedSearchedValue?.fundInfo} />
                                    </Item>
                                </Grid>
                                {/* Fund Information and Fund manager end */}

                                {/* Quick Order start */}
                                <QuickOrder />
                                {/* Quick Order end */}

                                {/* What is in the fund start */}
                                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                                    <Item className='fixheights mostly-customized-scrollbar'>
                                        <SecondTab fundInfoData={allWidgetData.find((item) => item.widgetName == 'SectorSecurityWiseHolding')} fundValue={selectedSearchedValue?.fundInfo} />
                                    </Item>
                                </Grid>
                                {/* What is in the fund end */}

                                {/* Asset Allocation start */}
                                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                                    <Item className='fixheights mostly-customized-scrollbar'>
                                        <AssetAllocation fundInfoData={allWidgetData.find((item) => item.widgetName == 'FundAlloAssetWise')} fundValue={selectedSearchedValue?.fundInfo} />
                                    </Item>
                                </Grid>
                                {/* Asset Allocation end */}

                                {/* Trailing Returns start */}
                                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                                    <Item className='fixheights mostly-customized-scrollbar'>
                                        <TrailingReturn fundInfoData={allWidgetData.find((item) => item.widgetName == 'TrailingReturn')} fundValue={selectedSearchedValue?.fundInfo} />
                                    </Item>
                                </Grid>
                                {/* Trailing Returns end */}

                                {/* Risk Analysis start*/}
                                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                                    <Item className='riskanalysisheight mostly-customized-scrollbar'>
                                        <RiskAnalysis fundInfoData={allWidgetData.find((item) => item.widgetName == 'RiskAnalysis')} fundValue={selectedSearchedValue?.fundInfo} />
                                    </Item>
                                </Grid>
                                {/* Risk Analysis end*/}

                                {/* Peer Comparison start */}
                                <PeerComparison fundInfoData={allWidgetData.find((item) => item.widgetName == 'PeerComparision')} fundValue={selectedSearchedValue?.fundInfo} selectedScheme={selectedSearchedValue} />
                                {/* Peer Comparison end */}

                                {/* Dividend History start */}
                                <DividendHistory />
                                {/* Dividend History end */}

                                {/* Risk Profile start */}
                                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                                    <Item className='fixheights mostly-customized-scrollbar'>
                                        <RiskProfile fundInfoData={allWidgetData.find((item) => item.widgetName == 'RiskoMeter')} fundValue={selectedSearchedValue?.fundInfo} />
                                    </Item>
                                </Grid>
                                {/* Risk Profile end */}

                                {/* More Funds start */}
                                <MoreFunds fundInfoData={allWidgetData.find((item) => item.widgetName == 'MoreFunds')} fundValue={selectedSearchedValue?.fundInfo} />
                                {/* More Funds end */}

                            </Grid >
                        ) : null
                }
            </div >
        </Box >
    )
}

export default SecurityView