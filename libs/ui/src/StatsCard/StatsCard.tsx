import { FC } from 'react';
import Box from '@mui/joy/Box';
import { Card, Stack, Typography } from '@mui/joy';
import UpTrend from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import ApexChart from 'react-apexcharts';
import { StatsCardProps } from './types';

export const StatsCard: FC<StatsCardProps> = (props) => {
  const {
    title,
    startColor = '#5BE49B',
    endColor = '#00A76F',
  } = props

  return <Card sx={{ flexDirection: 'row' }}>
    <Box flexGrow={1}>
      <Typography level="title-sm">
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
        <UpTrend/>
        <Typography level="title-sm">
          +2.6%
        </Typography>
      </Stack>
      <Typography level="h2">
        18,765
      </Typography>
    </Box>
    <Box display="flex" alignItems="center">
      <ApexChart type="bar" width={70} series={[
        {
          'data': [
            5,
            18,
            12,
            51,
            68,
            11,
            39,
            37,
            27,
            20
          ]
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
