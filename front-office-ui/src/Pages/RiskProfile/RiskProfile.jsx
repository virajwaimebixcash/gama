import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Container, Typography, Box } from '@mui/material';

// Load the highcharts more module to use gauge chart
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

const RiskProfile = ({ data = {  } }) => {
  const options = {
    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      height: '255px',

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
        plotBands: [
          {
            from: 0,
            to: 20,
            color: '#01CC34', // Solid Green (Low Risk)
          },
          {
            from: 21,
            to: 40,
            color: '#99CB34', // Solid Yellow (Moderate Risk)
          },
          {
            from: 41,
            to: 60,
            color: '#FFCC33', // Solid Yellow (Moderate Risk)
          },
          {
            from: 61,
            to: 80,
            color: '#FF6501', // Solid Yellow (Moderate Risk)
          },
          {
            from: 81,
            to: 100,
            color: '#FE0000', // Solid Red (High Risk)
          },
        ],
    },
    // plotBands: data.riskProfileCollection,
    series: [
      {
        name: 'Risk Level',
        data: [data.totalScore],  // Current risk level
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
  };

  return (
    <Container>

      <Box display="flex" justifyContent="center">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Box>
    </Container>
  );
};

export default RiskProfile;
