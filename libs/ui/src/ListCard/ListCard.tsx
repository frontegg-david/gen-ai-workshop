import { FC } from 'react';
import Box from '@mui/joy/Box';
import { Avatar, Card, Stack, Typography } from '@mui/joy';
import UpTrend from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import DownTrend from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import ApexChart from 'react-apexcharts';
import { ListCardProps } from './types';

export const ListCard: FC<ListCardProps> = (props) => {
  const {
    title,
    startColor = '#5BE49B',
    endColor = '#00A76F',
    value = 18765,
    chartData = [ 5, 18, 12, 51, 68, 11, 39, 37, 27, 20 ],
    percentage = 2.6,

    items = [],
  } = props

  return <Card sx={{
    flexDirection: 'column',
    height: '338px',
    boxSizing: 'content-box',
    pb:1,
  }}>
    <Box pb={1}>
      <Typography level="title-md" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
    <Box flex={1} width={'100%'} overflow='auto'>
      {items.map(({ avatarUrl, text, subText, description, value }, index) => {
        return <Stack key={index} direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2} mb={1}>
          {avatarUrl && <Avatar src={avatarUrl} size={'sm'}/>}
          <Stack direction={'column'} flexGrow={1}>
            <Typography level="body-sm" sx={{ fontWeight: 600 }}>
              {text}
            </Typography>
            <Typography level="body-xs" sx={{ fontWeight: 600 }}>
              {subText}
            </Typography>
          </Stack>
          <Typography level="body-sm" sx={{ fontWeight: 600 }}>
            {description}
          </Typography>
          <Typography level="body-sm" sx={{ fontWeight: 600 }}>
            {value}
          </Typography>
        </Stack>
      })}
    </Box>
  </Card>
}
