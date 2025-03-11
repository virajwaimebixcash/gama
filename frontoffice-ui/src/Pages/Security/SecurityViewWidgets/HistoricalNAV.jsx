import Grid from '@mui/material/Grid2';
import styled from '@mui/system/styled';
import sidelogo1 from "../../../images/sidelogo1.png"
import HighchartsReact from 'highcharts-react-official';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../../redux/actions/actionCreators';
import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsStock from 'highcharts/modules/stock';
import dayjs from 'dayjs';

// Initialize the stock module
HighchartsStock(Highcharts);

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid',
  borderColor: '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

const HistoricalNAV = ({ fundInfoData, fundValue }) => {
  const fontFamily = '"Poppins", sans-serif';

  const dispatch = useDispatch();
  const [navDetailsData, setNavDetailsData] = useState([]);
  const [chartType, setChartType] = useState(
    fundInfoData?.widgetDetail?.find((config) => config.defaultPeriod === 'Y')?.fieldName || '1M'
  );

  // Mapping of chart types to display labels
  // const chartTypeLabels = {
  //   "1M": "1 Month Returns",
  //   "3M": "3 Months Returns",
  //   "6M": "6 Months Returns",
  //   "1Y": "1 Year Returns",
  //   "3Y": "3 Years Returns",
  //   "5Y": "5 Years Returns",
  //   ALL: "All Time Returns",
  // };

  // Dynamically generate range selector buttons based on widgetDetail
  const rangeSelectorButtons = fundInfoData?.widgetDetail?.map((config) => ({
    type: config.fieldName,
    text: config.displayFieldHeader,
  })) ?? [];

  const defaultSelectedIndex = rangeSelectorButtons?.findIndex(
    (item) => item.type === chartType
  ) ?? 0;

  // Helper function to calculate date ranges
  const calculateDateRange = (type) => {
    const today = new Date();
    let fromDate = new Date(today);

    switch (type) {
      case '1M':
        fromDate.setMonth(today.getMonth() - 1);
        break;
      case '3M':
        fromDate.setMonth(today.getMonth() - 3);
        break;
      case '6M':
        fromDate.setMonth(today.getMonth() - 6);
        break;
      case '1Y':
        fromDate.setFullYear(today.getFullYear() - 1);
        break;
      case '3Y':
        fromDate.setFullYear(today.getFullYear() - 3);
        break;
      case '5Y':
        fromDate.setFullYear(today.getFullYear() - 5);
        break;
      case 'ALL':
        // fromDate = null; // No specific date range for ALL
        fromDate = new Date(1970, 0, 1);
        break;
      default:
        break;
    }
    return {
      fromDate: fromDate ? fromDate.toISOString().split('T')[0] : null,
      toDate: today.toISOString().split('T')[0],
    };
  };

  useEffect(() => {
    const { fromDate, toDate } = calculateDateRange(chartType);

    const body = {
      schemeCode: fundValue?.SchemeCode,
      fromDate,
      toDate,
      chartType,
    };

    dispatch(actionCreators.GetNAVDetails(body))
      .then((res) => {
        if (res.status === 200) {
          setNavDetailsData(res.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching NAV details:', error);
      });
  }, [dispatch, fundValue?.SchemeCode, chartType]);

  const options = {
    rangeSelector: {
      buttons: rangeSelectorButtons.map((btn) => ({
        type: 'all',
        text: btn.text,
        events: {
          click: () => setChartType(btn.type),
        },
      })),
      selected: defaultSelectedIndex,
      buttonTheme: {
        width: "20px",
      },
    },
    chart: {
      height: 260,
      style: {
        fontFamily: fontFamily,
      },
    },

    series: [
      {
        name: 'NAV Returns',
        data: navDetailsData?.NavData?.map((dt) => [new Date(dt.NavDate).getTime(), dt.NavReturns]),
        tooltip: { valueDecimals: 2 },
      },
      {
        name: 'Benchmark Returns',
        data: navDetailsData?.NavData?.map((dt) => [new Date(dt.NavDate).getTime(), dt.BenchmarkReturns]),
        tooltip: { valueDecimals: 2 },
      },
      {
        name: 'Category Returns',
        data: navDetailsData?.NavData?.map((dt) => [new Date(dt.NavDate).getTime(), dt.CategoryReturns]),
        tooltip: { valueDecimals: 2 },
      },

    ],

  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 9 }}>
          <Item>
            <div className='negatops'>
              <div className='width10'>
                <div className='texleft'>
                  <img src={sidelogo1} className='negleft' />
                </div>
              </div>
              <div className='width60'>
                <div className='padds12'>
                  <div className='texleft'><span className='forceleft'>{fundInfoData?.widgetDisplayName || 'Historical NAV & Returns'}</span>
                  </div>
                  <div className='texleft'><span className='subfont12'>Nav on {dayjs(navDetailsData.AsOnDate).format('MMM DD YYYY')} :
                    <span className='textinheads blacktext'> {navDetailsData.AsOnDateNav} </span>
                  </span> <span className='subfont12 subfontpad'>1 D Returns :
                      <span className="bld14 redcss"> -0.22%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <Item>
            <table className='rightfloats martp tab100wid'>
              <tr >
                {/* <td className='texleft subfont12'><div>{chartTypeLabels[chartType]}</div> */}
                <td className='texleft subfont12 centtextintabel'><div>3 Years Returns</div>
                  <div className='texcenter greencss'>+39.37 </div></td>
                {/* <td className='rightfloats'><TransitionsModal></TransitionsModal></td> */}
              </tr>
            </table>
          </Item>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 12 }}  >
          <Item>
            <div className='widimg'>
              <div className='widimg'>
                <Box display="flex" justifyContent="center">
                  <HighchartsReact highcharts={Highcharts} constructorType="stockChart" options={options} key={JSON.stringify(navDetailsData)} />
                </Box>
              </div>
            </div>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default HistoricalNAV;
