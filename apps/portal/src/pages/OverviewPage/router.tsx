import { lazy } from 'react';
import { NavigationRouteObject } from '../../router/types';
import OverviewIcon from '@mui/icons-material/SpaceDashboardRounded';

const OverviewPage = lazy(() => import('./index'));
export const OverviewPageRouter: NavigationRouteObject = {
  id:'overview-page',
  path: '/',
  index: true,
  element: <OverviewPage/>,
  icon: <OverviewIcon/>,
  label: 'Overview'
}
