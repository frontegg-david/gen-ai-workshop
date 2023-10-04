import { StatsCard, PieChartCard, AxesChartCard, BgStatsCard, BarChartCard, ListCard } from '@genai-workshop/ui';
import { Grid } from '@mui/joy';

export const buildBlock = (block: any) => {

  switch (block.type) {
    case 'List':
      return null;
    case 'StatsCard':
      return <Grid key={block.id} lg={block.cols} md={12}>
        <StatsCard  {...block}/>
      </Grid>;
    case 'PieChartCard':
      return <Grid key={block.id} lg={block.cols} md={12}>
        <PieChartCard  {...block}/>
      </Grid>
    case 'AxesChartCard':
      return <Grid key={block.id} lg={block.cols} md={12}>
        <AxesChartCard  {...block}/>
      </Grid>
    case 'BgStatsCard':
      return <Grid key={block.id} lg={block.cols} md={12}>
        <BgStatsCard  {...block}/>
      </Grid>
    case 'BarChartCard':
      return <Grid key={block.id} lg={block.cols} md={12}>
        <BarChartCard  {...block}/>
      </Grid>
    case 'ListCard':
      return <Grid key={block.id} lg={block.cols} md={12}>
        <ListCard  {...block}/>
      </Grid>
    default:
      return null;
  }
}
