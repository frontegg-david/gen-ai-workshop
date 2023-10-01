import { FC } from 'react';
import Box from '@mui/joy/Box';
import { Card, Typography } from '@mui/joy';
import ApexChart from 'react-apexcharts';
import { AxesChartCardProps } from './types';
import { fNumber } from '../utils/format';

export const AxesChartCard: FC<AxesChartCardProps> = (props) => {
  const {
    title,
    colors = [
      "#00A76F",
      "#FFAB00",
      "#00B8D9",
      "#FF5630",
      "#22C55E",
      "#B76E00",
      "#065E49",
      "#006C9C",
      "#003768"
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
    <Box display="block" textAlign="center" width='100%' mt={1}>
      <ApexChart type="line" width={'100%'} height={280} series={values} options={{

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

        dataLabels: {
          enabled: false
        },
        'states': {
          'hover': {
            'filter': { type: 'lighten', value: 0.04 }
          },
          'active': {
            'filter': { type: 'darken', value: 0.88 }
          }
        },

        // 'fill': {
        //   'opacity': 1,
        //   'gradient': {
        //     'type': 'vertical',
        //     'shadeIntensity': 0,
        //     'opacityFrom': 0.4,
        //     'opacityTo': 0,
        //     'stops': '[0, 100]',
        //     'colorStops': '[Array(2), Array(2)]'
        //   },
        //   'type': 'gradient'
        // },
        'stroke': { curve: 'smooth', lineCap: 'round', width: 3 },
        'grid': {
          'strokeDashArray': 3,
          'borderColor': 'rgba(145, 158, 171, 0.2)',
          'xaxis': {
            'lines': { show: false }
          }
        },

        'xaxis': {
          "axisBorder": {
            "show": false
          },
          "axisTicks": {
            "show": false
          },
          "categories": [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          overwriteCategories: [1,2,3,4,5,6,7,8,9,10],
        },
        // 'markers': { size: 0, strokeColors: '#FFFFFF' },
        // 'tooltip': '{theme: false, x: {…}}',
        //
        // 'plotOptions': {
        //   'bar': {
        //     'borderRadius': 4,
        //     'columnWidth': '28%',
        //     'borderRadiusApplication': 'end',
        //     'borderRadiusWhenStacked': 'last'
        //   },
        //   'pie': {
        //     'donut': '{labels: {…}}'
        //   },
        //   'radialBar': {
        //     'track': '{background: "rgba(145, 158, 171, 0.16)", strokeWid…}',
        //     'dataLabels': '{total: {…}, value: {…}}'
        //   },
        //   'radar': {
        //     'polygons': '{connectorColors: "rgba(145, 158, 171, 0.2)", fill:…}'
        //   },
        //   'polarArea': {
        //     'rings': {
        //       'strokeColor': 'rgba(145, 158, 171, 0.2)'
        //     },
        //     'spokes': '{connectorColors: "rgba(145, 158, 171, 0.2)"}'
        //   }
        // },

      }}/>
    </Box>
  </Card>
}
