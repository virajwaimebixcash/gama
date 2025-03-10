import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Container } from '@mui/material';
import riskprofile from "../../../images/riskprofile.png";

// Load the highcharts more module to use gauge chart
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

const riskOrder = [
  "low",
  "lowtomoderate",
  "moderate",
  "moderatelyhigh",
  "high",
  "veryhigh",
];

// Risk level to numeric mapping
const riskLevelToValue = {
  low: 10,               // Low -> 10%
  lowtomoderate: 25, // Low to Moderate -> 25%
  moderate: 50,          // Moderate -> 50%
  moderatelyhigh: 75, // Moderately High -> 75%
  high: 85,              // High -> 85%
  veryhigh: 95,       // Very High -> 95%
};

// Helper function to assign colors to risk levels dynamically
const getColor = (riskLevel) => {
  switch (riskLevel?.toLowerCase()) {
    case "low":
      return "#01CC34"; // Green
    case "lowtomoderate":
      return "#92D050"; // Light Green
    case "moderate":
      return "#FFCC33"; // Yellow
    case "moderatelyhigh":
      return "#FFA500"; // Orange
    case "high":
      return "#FF6501"; // Dark Orange
    case "veryhigh":
      return "#FE0000"; // Red
    default:
      return "#C0C0C0"; // Grey (fallback)
  }
};

const RiskProfile = ({ fundInfoData, fundValue }) => {
  const widgetDetails = fundInfoData?.widgetDetail || [];

  // Sort widgetDetails based on the predefined order in riskOrder
  const sortedWidgetDetails = widgetDetails?.sort((a, b) => {
    return (
      riskOrder.indexOf(a.fieldName.toLowerCase().replace(/\s+/g, "")) -
      riskOrder.indexOf(b.fieldName.toLowerCase().replace(/\s+/g, ""))
    );
  });

  // Map the sorted widgetDetails to dynamic plot bands
  const dynamicPlotBands = sortedWidgetDetails.map((item, index, array) => {
    const total = array.length;
    const bandWidth = 100 / total; // Divide range equally among risk levels

    return {
      from: bandWidth * index,
      to: bandWidth * (index + 1),
      color: getColor(item.fieldName.toLowerCase().replace(/\s+/g, "")),
    };
  });

  // Resolve string risk level to numeric value
  const riskGradeValue = fundValue?.[widgetDetails?.[0]?.dispatcherName];
  const resolvedRiskValue = riskLevelToValue[riskGradeValue?.toLowerCase().replace(/\s+/g, "")] || 0;  

  const options = {
    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      height: '210px',
    },
    title: {
      text: '',
    },
    pane: {
      startAngle: -90, // Start at -90 degrees (left)
      endAngle: 90,    // End at 90 degrees (right)
      background: null, // No background
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,     // No border line
      tickWidth: 0,     // No ticks
      minorTickInterval: null,
      tickAmount: 2,    // Show only min and max ticks
      labels: {
        enabled: false, // Hide labels
      },
      // labels: {
      //   enabled: true, // Enable labels
      //   distance: 40,
      //   style: {
      //     color: '#000', // Set the color for the labels
      //     fontSize: '12px', // Set font size for labels
      //   },
      //   formatter: function () {
      //     // Custom label formatter to show risk levels
      //     if (this.value <= 25) return "Low";
      //     if (this.value <= 50) return "Low to Moderate";
      //     if (this.value <= 75) return "Moderate";
      //     if (this.value <= 85) return "Moderately High";
      //     if (this.value <= 95) return "High";
      //     return "Very High";
      //   },  // Adjust position vertically
      // },
      plotBands: dynamicPlotBands,
    },
    series: [
      {
        name: 'Risk Level',
        data: [resolvedRiskValue],  // Current risk level
        dial: {
          radius: '100%', // Extend dial to outer edge
          backgroundColor: 'black', // Needle color
          baseWidth: 10,  // Width of the needle base
          topWidth: 1,    // Width of the needle tip
          baseLength: '0%',  // Start from the center
          rearLength: '0%',  // No rear length
        },
        tooltip: {
          valueSuffix: ' %',
        },
        dataLabels: {
          enabled: false,
        }
      },
    ],
    plotOptions: {
      gauge: {
        dial: {
          radius: '100%',
        },
        pivot: {
          radius: 0, // Hide the pivot
        },
      },
    },
    tooltip: {
      enabled: false, // Disable global tooltip
    },
  };

  return (
    <>
      <div className='fullsize logospac'>
        <div className="negatops">
          <div className="divwithoutsec">
            <div className="texleft">
              <img src={riskprofile} />
            </div>
          </div>
          <div className="width60">
            <div className="padds12">
              <div className="texleft newimgtop">
                <span className="">{fundInfoData?.widgetDisplayName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <Box display="flex" justifyContent="center">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
      </Container>
      <div className='medium clsforposition' style={{ background: getColor(riskGradeValue?.toLowerCase().replace(/\s+/g, "")) }}>{riskGradeValue}</div>
      <div className='subfont subfontdivchart'>{`As provided by the fund house documents , this risk is specific to this fund category (Equity). To know the risk of this fund perticularly , check 'Risk Vs Category'.`}</div>
    </>
  );
};

export default RiskProfile;
