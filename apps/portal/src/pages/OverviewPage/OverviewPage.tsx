import { FC } from 'react';
import { CircularProgress, Grid } from '@mui/joy';

import { NotificationsCard, Welcome } from '@genai-workshop/ui';
import { useQuery } from 'react-query';
import { getOverviewBlocks } from '../../api';
import { useDummyData } from '../../dummy';
import { buildBlock } from './blocks';


export const OverviewPage: FC = () => {

  const dummyData = useDummyData();
  const { isLoading, data, error } = useQuery('overview', getOverviewBlocks(dummyData))

  console.log(isLoading, data, error);
  return <>
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={12} lg={8}>
        <Welcome/>
      </Grid>



      <Grid xs={12} lg={4}>
        <NotificationsCard/>
      </Grid>

      {isLoading ?
        <CircularProgress/>
        :
        <>
          {data.map(buildBlock)}
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
    </Grid>
  </>
}
