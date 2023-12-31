import { lazy } from 'react';
import { NavigationRouteObject } from '../../router/types';
import AnalyticsIcon from '@mui/icons-material/InsightsRounded';

const AnalyticsPage = lazy(() => import('./index'));
export const AnalyticsPageRouter: NavigationRouteObject = {
  id: 'analytics_page',
  label: 'Analytics',
  path: '/analytics',
  element: <AnalyticsPage/>,
  disabled: true,
  icon: <AnalyticsIcon/>
}
