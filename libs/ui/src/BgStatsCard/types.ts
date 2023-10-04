export interface BgStatsCardProps {
  title: string;
  bgColor?: string;
  lineColor?: string;
  prefix?: string;
  value?: number;
  size?: 'lg' |'md';

  chartData?: number[];
}
