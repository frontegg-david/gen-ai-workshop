import { FC } from 'react';
import Box from '@mui/joy/Box';
import { Card, Typography } from '@mui/joy';
import ApexChart from 'react-apexcharts';
import { BgStatsCardProps } from './types';
import { fCurrency } from '../utils/format';

export const BgStatsCard: FC<BgStatsCardProps> = (props) => {
  const {
    title,
    bgColor = '#daf8e8',
    lineColor = '#00A76F',
    prefix = '$',
    value = 18765,
    size = 'md',
    chartData = [ 5, 18, 12, 51, 68, 11, 39, 37, 27, 20 ],
  } = props

  return <Card sx={{ backgroundColor: bgColor, p: 0, pb: 2, height: size === 'lg' ? '387px' : undefined }}>
    <Box p={3}>
      <Typography level="title-md" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>

      <Typography level="h2" mt={2}>
        {fCurrency(value)}
      </Typography>

    </Box>
    <Box width="100%" height={100}>
      <ApexChart type="line" height={size === 'lg' ? 200 : 100} width="100%" series={[
        {
          'data': chartData
        }
      ]} options={{

        'chart': {
          'sparkline': {
            'enabled': true
          },
          foreColor: '#919EAB',
          toolbar: { show: false },
        },

        colors: [ lineColor, bgColor ],
        fill: {
          gradient: {
            'type': 'vertical',
            'shadeIntensity': 0,
            'opacityFrom': 0.4,
            'opacityTo': 0,
            'stops': [
              0,
              100
            ]
          }, opacity: 1
        },
        'stroke': {
          'curve': 'smooth',
          'width': 3,
          lineCap: 'round'
        },
        tooltip: {

          fillSeriesColor: false,
          theme: 'light',

          y: {
            formatter: (value: number) => fCurrency(value, prefix),
            title: {
              formatter: (seriesName: string) => `${seriesName}`,
            },
          },
        },


      }}/>
    </Box>
  </Card>
}
