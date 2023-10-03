import { StatsCard, PieChartCard, AxesChartCard, BgStatsCard, BarChartCard } from '@genai-workshop/ui';
import { Grid } from '@mui/joy';

export const buildBlock = (block: any) => {

  switch (block.type) {
    case 'List':
      return null;
    case 'StatsCard':
      return <Grid key={block.id} md={block.cols} xs={12}>
        <StatsCard  {...block}/>
      </Grid>;
    case 'PieChartCard':
      return <Grid key={block.id} md={block.cols} xs={12}>
        <PieChartCard  {...block}/>
      </Grid>
    case 'AxesChartCard':
      return <Grid key={block.id} md={block.cols} xs={12}>
        <AxesChartCard  {...block}/>
      </Grid>
    case 'BgStatsCard':
      return <Grid key={block.id} md={block.cols} xs={12}>
        <BgStatsCard  {...block}/>
      </Grid>
    case 'BarChartCard':
      return <Grid key={block.id} md={block.cols} xs={12}>
        <BarChartCard  {...block}/>
      </Grid>
    default:
      return null;
  }
}
