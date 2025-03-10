import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Container, Typography, Box } from '@mui/material';

const PositiveAndNegativeBarChart = () => {
  // Highcharts options for a vertical bar (column) chart
  const options = {
    chart: {
      type: 'column',  // Vertical bar chart
      height: 330,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Sales (in $)',
      },
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Product A',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      },
      {
        name: 'Product B',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3],
      },
      {
        name: 'Product C',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3],
      },
    ],
  };

  return (
    <Container>
     
      <Box display="flex" justifyContent="center">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Box>
    </Container>
  );
};

export default PositiveAndNegativeBarChart;
