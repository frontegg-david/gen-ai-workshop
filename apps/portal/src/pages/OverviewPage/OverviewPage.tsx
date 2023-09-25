import { FC } from 'react';
import { Grid } from '@mui/joy';
import { NotificationsCard, Welcome, StatsCard } from '@genai-workshop/ui';


export const OverviewPage: FC = () => {


  return <>
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={12} lg={8}>
        <Welcome/>
      </Grid>
      <Grid xs={12} lg={4}>
        <NotificationsCard/>
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <StatsCard title={'Total Active Users\n'}/>
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <StatsCard title={'Total Active Users\n'}/>
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <StatsCard title={'Total Installed'} startColor={'#61F3F3'} endColor={'#00B8D9'}/>
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <StatsCard title={'Total Downloads\n'} startColor={'#FFD666'} endColor={'#FFAB00'}/>
      </Grid>
    </Grid>
  </>
}
