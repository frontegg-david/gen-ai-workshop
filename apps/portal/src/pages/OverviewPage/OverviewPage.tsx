import { FC } from 'react';
import { CircularProgress, Grid } from '@mui/joy';

import { NotificationsCard, Welcome } from '@genai-workshop/ui';
import { useQuery } from 'react-query';
import { getOverviewBlocks } from '../../api';
import { useDummyData } from '../../dummy';
import { buildBlock } from './blocks';
import Box from '@mui/joy/Box';


export const OverviewPage: FC = () => {

  const dummyData = useDummyData();
  const { isLoading, data } = useQuery('overview', getOverviewBlocks(dummyData), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const { sections, summary } = data || { sections: [], summary: '' };
  console.log(sections, summary, isLoading)
  return <>
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={12} lg={8}>
        <Welcome summary={summary} user={dummyData.user}/>
      </Grid>

      <Grid xs={12} lg={4}>
        <NotificationsCard notifications={dummyData.recentNotifications}/>
      </Grid>

      {isLoading ?
        <Box textAlign="center" p={12} width="100%">
          <CircularProgress sx={{
            '--CircularProgress-trackColor': '#dbf4e6',
            '--CircularProgress-progressColor': '#01a76f',
          }}/>
        </Box>
        :
        <>
          {sections.map(buildBlock)}
        </>
      }

      {/*<Grid lg={4} md={6} xs={12}>*/}
      {/*  <StatsCard title={'Total Active Users\n'}/>*/}
      {/*</Grid>*/}
      {/*<Grid lg={4} md={6} xs={12}>*/}
      {/*  <StatsCard title={'Total Active Users\n'}/>*/}
      {/*</Grid>*/}
      {/*<Grid lg={4} md={6} xs={12}>*/}
      {/*  <StatsCard title={'Total Installed'} startColor={'#61F3F3'} endColor={'#00B8D9'}/>*/}
      {/*</Grid>*/}
      {/*<Grid lg={4} md={6} xs={12}>*/}
      {/*  <StatsCard title={'Total Downloads\n'} startColor={'#FFD666'} endColor={'#FFAB00'}/>*/}
      {/*</Grid>*/}
      {/*<Grid lg={4} md={6} xs={12}>*/}
      {/*  <StatsCard title={'Total Installed'} startColor={'#61F3F3'} endColor={'#00B8D9'}/>*/}
      {/*</Grid>*/}
      {/*<Grid lg={4} md={6} xs={12}>*/}
      {/*  <StatsCard title={'Total Downloads\n'} startColor={'#FFD666'} endColor={'#FFAB00'}/>*/}
      {/*</Grid>*/}
      {/*<Grid lg={4} md={6} xs={12}>*/}
      {/*  <StatsCard title={'Total Installed'} startColor={'#61F3F3'} endColor={'#00B8D9'}/>*/}
      {/*</Grid>*/}
      {/*<Grid lg={4} md={6} xs={12}>*/}
      {/*  <StatsCard title={'Total Downloads\n'} startColor={'#FFD666'} endColor={'#FFAB00'}/>*/}
      {/*</Grid>*/}
    </Grid>
  </>
}
