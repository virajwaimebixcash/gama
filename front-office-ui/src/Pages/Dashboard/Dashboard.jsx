import * as React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux/actions/actionCreators';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import StandingInstructionsSummaryWidget from './DashboardWidgets/StandingInstructionsSummaryWidget';
import DashBordTopBottom from './DashboardWidgets/DashboardTopBottom';
import PortInvestAssetAllocation from './DashboardWidgets/PortInvestAssetAllocation';
import UpCommimg from './DashboardWidgets/UpCommimg';
import WatchList from './DashboardWidgets/WatchList';
import smallboxdemo from "../../images/smallboxdemo.png";
import api from '../../APIs/interceptor';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const UserId = import.meta.env.VITE_USER_ROLE_ID
const UserRoleId = import.meta.env.VITE_USER_ROLE_ID
const clientCode = parseInt(import.meta.env.VITE_CLIENT_CODE);

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

export default function Dashboard() {
  const [allWidgetData, setAllWidgetData] = useState([{}]);
  const [upcomingOfferingsData, setUpcomingOfferingsData] = useState();
  const [standingInstructionsData, setStandingInstructionsData] = useState();
  const [portfolioPerformersTopData, setPortfolioPerformersTopData] = useState();
  const [portfolioPerformersBottomData, setPortfolioPerformersBottomData] = useState();
  const data = useSelector(state => state.addWatchListTab)
  const dispatch = useDispatch();

  const allList = React.useMemo(() => {
    const WatchListData = allWidgetData?.find((item) => item.dashWidgetDispatcherName === "WatchList")
    const AssetAllocationData = allWidgetData?.find((item) => item.dashWidgetDispatcherName === "AssetAllocation")
    const StandingInstructionsSummaryData = allWidgetData?.find((item) => item.dashWidgetDispatcherName === "StandingInstructionsSummary")
    const PortfolioPerformersData = allWidgetData?.find((item) => item.dashWidgetDispatcherName === "PortfolioPerformers")
    const UpcomingOfferingsData = allWidgetData?.find((item) => item.dashWidgetDispatcherName === "Upcomingofferings")

    return { WatchListData, AssetAllocationData, PortfolioPerformersData, UpcomingOfferingsData, StandingInstructionsSummaryData }
  }, [allWidgetData])

  useEffect(() => {
    const body = {
      "userRoleId": UserRoleId,
      "userId": UserId,
    }
    dispatch(actionCreators.GetAllDashboardWidgetsConfiguration(body)).then((res) => {
      if (res.status === 200) {
        setAllWidgetData(res.data.data)
      }
    })
      .catch((error) => {
        console.error("Error fetching config:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  
  useEffect(() => {
    if (allList?.UpcomingOfferingsData) {
      const body = {
        clientCode: clientCode,
        userId: "integra",
        transactionType: 2, //pass value which is used in string search api for scheme
        searchString: "",
        lastBusinessDate: new Date().toISOString(),
        getData: 0, //pass 0 for only NFO details
        schemeCode: "",
        multipleSchemeCode: ""
      };

      api.post(`/schemes`, body).then((res) => {
        setUpcomingOfferingsData(res.data);
      }).catch((error) => {
        console.error("Error fetching config:", error);
      });
    }
  }, [allList?.UpcomingOfferingsData])

  useEffect(() => {
    if (allList?.StandingInstructionsSummaryData?.parameterList) {
      const standingInstructionsSummaryPeriod = allList?.StandingInstructionsSummaryData?.parameterList.find((para) => para.paraName === "standingInstructionsSummaryPeriod");
      const fromDate = dayjs().format('YYYY/MM/DD')
      const toDate = dayjs().add(standingInstructionsSummaryPeriod.paraValue - 1, 'day').format('YYYY/MM/DD');

      const body = {
        "usrId": "integra",
        "famCode": 0,
        "headCode": "0",
        "clientCode": 35,
        "dueDateFrom": fromDate,
        "dueDateTo": toDate,
        "clientType": "C",
        "reportType": "summary"
      };

      api.post(`/standingInstruction/getStandingInstructionsSummary`, body).then((res) => {
        setStandingInstructionsData(res.data.data);
      }).catch((error) => {
        console.error("Error fetching config:", error);
      });
    }
  }, [allList?.StandingInstructionsSummaryData])

  useEffect(() => {
    if (allList?.PortfolioPerformersData) {
      const bodyTop = {
        userId: UserId,
        clientCode: clientCode,
        schemeName: "",
        sortBy: "Desc"
      };
      const bodyBottom = {
        userId: UserId,
        clientCode: clientCode,
        schemeName: "",
        sortBy: "Asc"
      };

      api.post(`/dashboard/getSchemeWiseHolding`, bodyTop).then((res) => {
        setPortfolioPerformersTopData(res.data.data);
      }).catch((error) => {
        console.error("Error fetching config:", error);
      });

      api.post(`/dashboard/getSchemeWiseHolding`, bodyBottom).then((res) => {
        setPortfolioPerformersBottomData(res.data.data);
      }).catch((error) => {
        console.error("Error fetching config:", error);
      });
    }
  }, [allList?.PortfolioPerformersData])

  return (
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={2} className="maincontent1">
        <Grid size={{ xs: 12, md: 6, lg: 4, sm: 12 }} className="nobackg fixheightsdashboard">
          <Item className='fixheightsdashboard whitebgs'>
            <Grid container spacing={2} >
              <Grid size={{ xs: 12, md: 12 }} sx={{ minHeight: '180px', backgroundColor: '#fff' }}>
                {
                  allList.StandingInstructionsSummaryData?.dashWidgetDispatcherName === "StandingInstructionsSummary" ?
                    <Item sx={{ minHeight: '180px', backgroundColor: '#fff' }}>
                      <div className="fontsbold texleft spacegap darkblackclr">{allList?.StandingInstructionsSummaryData?.dashWidgetDisplayName}</div>
                      <StandingInstructionsSummaryWidget
                        StandingInstructionsSummaryConfig={allList?.StandingInstructionsSummaryData?.dashWidgetDetail}
                        StandingInstructionsData={standingInstructionsData}
                      />
                    </Item>
                    :
                    <div>Component not found</div>
                }

              </Grid>
              <Grid size={{ xs: 12, md: 12 }} sx={{ minHeight: '100px', backgroundColor: '#fff' }}>
                <Item sx={{ minHeight: '100px', backgroundColor: '#fff' }}>
                  <img src={smallboxdemo} style={{ width: '95%' }} />
                </Item>
              </Grid>
            </Grid>
          </Item>
        </Grid>

        {allList.PortfolioPerformersData?.dashWidgetDispatcherName === "PortfolioPerformers" ?
          <Grid size={{ xs: 12, md: 6, lg: 4, sm: 12 }} >
            <Item className='fixheights'>
              <div className='fontsbold texleft darkblackclr tabheadersintabsspac'>{allList?.PortfolioPerformersData?.dashWidgetDisplayName}</div>
              <DashBordTopBottom PortfolioPerformersWidgetDetails={allList?.PortfolioPerformersData.dashWidgetDetail} PortfolioPerformersTopData={portfolioPerformersTopData} PortfolioPerformersBottomData={portfolioPerformersBottomData} />
            </Item>
          </Grid>
          :
          <div>Component not found</div>
        }

        {allList.AssetAllocationData?.dashWidgetDispatcherName === "AssetAllocation" ?
          <Grid size={{ xs: 12, md: 6, lg: 4, sm: 12 }}>
            <Item className='fixheights'>
              <div className="fontsbold texleft darkblackclr bottpadds">{allList?.AssetAllocationData?.dashWidgetDisplayName}</div>
              <PortInvestAssetAllocation AssetAllocationWidgetDetails={allList?.AssetAllocationData.dashWidgetDetail} />
            </Item>
          </Grid>
          :
          <div>Component not found</div>
        }

        {allList.UpcomingOfferingsData?.dashWidgetDispatcherName === "Upcomingofferings" ?
          <Grid size={{ xs: 12, md: 6, lg: 4, sm: 12 }}>
            <Item className='fixheights'>
              <div className="fontsbold texleft darkblackclr bottpadds">{allList?.UpcomingOfferingsData?.dashWidgetDisplayName}</div>
              <UpCommimg UpcomingOfferingsWidgetDetails={allList?.UpcomingOfferingsData.dashWidgetDetail} UpcomingOfferingsData={upcomingOfferingsData} />
            </Item>
          </Grid>
          :
          <div>Component not found</div>
        }

        {allList.WatchListData?.dashWidgetDispatcherName === "WatchList" ?
          <>
            <Grid size={{ xs: 12, md: 6, lg: 4, sm: 12 }}>
              <Item className='fixheights'>
                <div className="fontsbold texleft darkblackclr bottpadds">{allList?.WatchListData?.dashWidgetDisplayName}</div>
                <WatchList WatchListWidgetDetails={allList?.WatchListData.dashWidgetDetail} ParameterListData={allList?.WatchListData?.parameterList} />
              </Item>
            </Grid>
          </> :
          <div>Component not found</div>
        }
      </Grid>
    </Box>
  );
}