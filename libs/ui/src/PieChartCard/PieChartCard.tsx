import { FC } from 'react';
import Box from '@mui/joy/Box';
import { Card, Typography } from '@mui/joy';
import ApexChart from 'react-apexcharts';
import { PicChartCardProps } from './types';
import { fNumber } from '../utils/format';

export const PieChartCard: FC<PicChartCardProps> = (props) => {
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
    values = [ 18765, 18765 ],
    labels = [ 'label1', 'label2' ],
  } = props

  return <Card>
    <Box>
      <Typography level="title-md" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
    <Box display="flex" justifyContent="center" mt={1} >
      <ApexChart type="donut" width={'100%'} height={330} series={values} options={{

        chart: {
          sparkline: {
            enabled: true,
          },
        },
        colors,
        legend: {
          'show': true,
          'fontSize': '13px',
          'position': 'bottom',
          'horizontalAlign': 'center',
          'markers': { 'radius': 12 },
          height: 40,
          offsetY:10,
          'fontWeight': 500,
          'itemMargin': { 'horizontal': 8 },
          'labels': { 'colors': '#212B36' },
          'floating': false
        }
        ,
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
          pie: {
            'donut': {
              'labels': {
                'show': true,
                'value': {
                  'offsetY': 8,
                  'color': '#212B36',
                  'fontSize': '1.5rem',
                  'fontWeight': 700,
                  formatter: (value: number | string) => fNumber(value),
                },
                'total': {
                  'show': true,
                  'label': 'Total',
                  'color': '#637381',
                  'fontSize': '0.875rem',
                  'fontWeight': 600,
                  formatter: (w: { globals: { seriesTotals: number[] } }) => {
                    const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                    return fNumber(sum);
                  },
                }
              },
              'size': '85%'
            }
          }
        },
        labels,
        dataLabels: {
          enabled: false
        },
      }}/>
    </Box>
  </Card>
}
