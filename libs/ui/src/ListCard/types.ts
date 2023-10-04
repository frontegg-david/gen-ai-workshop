export interface ListCardProps {
  title: string;
  startColor?: string;
  endColor?: string;
  value?: number;
  chartData?: number[];
  percentage?: number;


  items: {
    avatarUrl?: string;
    text: string;
    subText?: string;
    description?: string;
    value?: string;
  }[]
}
