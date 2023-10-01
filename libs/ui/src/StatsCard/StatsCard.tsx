import { FC } from 'react';
import Box from '@mui/joy/Box';
import { Card, Stack, Typography } from '@mui/joy';
import UpTrend from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import DownTrend from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import ApexChart from 'react-apexcharts';
import { StatsCardProps } from './types';

export const StatsCard: FC<StatsCardProps> = (props) => {
  const {
    title,
    startColor = '#5BE49B',
    endColor = '#00A76F',
    value = 18765,
    chartData = [ 5, 18, 12, 51, 68, 11, 39, 37, 27, 20 ],
    percentage = 2.6
  } = props

  return <Card sx={{ flexDirection: 'row' }}>
    <Box flexGrow={1}>
      <Typography level="title-sm" sx={{fontWeight:600}}>
        {title}
      </Typography>
      <Stack
        direction="row"
        justifyContent="start"
        alignItems="center"
        spacing={1}
        mt={2}
        mb={1}
      >
        {percentage > 0 ?
          <UpTrend color="success"/>
          :
          <DownTrend sx={{ '--Icon-color': 'red' }}/>
        }
        <Typography level="title-sm">
          {percentage < 0 ? `${percentage}%` : `+${percentage}%`}
        </Typography>
      </Stack>
      <Typography level="h2">
        {value.toLocaleString()}
      </Typography>
    </Box>
    <Box display="flex" alignItems="center">
      <ApexChart type="bar" width={70} series={[
        {
          'data': chartData
        }
      ]} options={{
        'colors': [
          '5',
          '0'
        ],
        'fill': {
          'type': 'gradient',
          'gradient': {
            'colorStops': [
              {
                'offset': 0,
                'color': startColor
              },
              {
                'offset': 100,
                'color': endColor
              }
            ]
          }
        },
        'chart': {
          'sparkline': {
            'enabled': true
          }
        },
        'plotOptions': {
          'bar': {
            'columnWidth': '68%',
            'borderRadius': 4
          }
        },
        'tooltip': {
          'x': { 'show': false },
          'y': {
            'title': {
              formatter(): string {
                return ''
              }
            }
          },
          'marker': {
            'show': false
          }
        }
      }}/>
    </Box>
  </Card>
}
