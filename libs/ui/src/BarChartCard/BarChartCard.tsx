import { FC } from 'react';
import Box from '@mui/joy/Box';
import { Card, Typography } from '@mui/joy';
import ApexChart from 'react-apexcharts';
import { BarChartCardProps } from './types';
import { fNumber } from '../utils/format';

export const BarChartCard: FC<BarChartCardProps> = (props) => {
  const {
    title,
    colors = [
      '#00A76F',
      '#FFAB00',
      '#00B8D9',
      '#FF5630',
      '#22C55E',
      '#B76E00',
      '#065E49',
      '#006C9C',
      '#003768'
    ],
    values = [ {
      name: 'series1',
      data: [ 100, 200, 150, 120, 124 ].reverse()
    }, {
      name: 'series2',
      data: [ 100, 200, 150, 120, 124 ]
    } ],
  } = props

  return <Card>
    <Box>
      <Typography level="title-md" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
    <Box display="block" textAlign="center" width="100%" mt={1}>
      <ApexChart type="bar" width={'100%'} height={280} series={values} options={{

        chart: {
          'toolbar': {
            'show': false,
          },
          'zoom': {
            'enabled': false
          },
          'foreColor': '#919EAB',
          'fontFamily': '"Public Sans", sans-serif'
        },
        dataLabels: { enabled: false },
        legend: {
          'show': true,
          'fontSize': '13px',
          'position': 'top',
          'horizontalAlign': 'right',
          'markers': { 'radius': 12 },
          height: 30,
          offsetY: 10,
          'fontWeight': 500,
          'itemMargin': { 'horizontal': 8 },
          'labels': { 'colors': '#212B36' },
        },
        stroke: {
          show: true,
          width: 1,
          curve: 'smooth',
          lineCap: 'round',
          colors: [ 'transparent' ],
        },
        tooltip: {
          fillSeriesColor: false,
          theme: 'light',
          y: {
            formatter: (value: number) => fNumber(value),
            title: {
              formatter: (seriesName: string) => `${seriesName}`,
            },
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'last',
            columnWidth: '28%'
          }
        },

        'states': {
          'hover': {
            'filter': { type: 'lighten', value: 0.04 }
          },
          'active': {
            'filter': { type: 'darken', value: 0.88 }
          }
        },
        'grid': {
          'strokeDashArray': 3,
          'borderColor': 'rgba(145, 158, 171, 0.2)',
          'xaxis': {
            'lines': { show: false }
          }
        },

        'xaxis': {
          'axisBorder': { 'show': false },
          'axisTicks': { 'show': false },
          'categories': [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          // overwriteCategories: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
        },
      }}/>
    </Box>
  </Card>
}
