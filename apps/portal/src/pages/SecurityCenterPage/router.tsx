import { lazy } from 'react';
import SecurityCenterIcon from '@mui/icons-material/LocalPoliceRounded';
import { NavigationRouteObject } from '../../router/types';

const SecurityCenterPage = lazy(() => import('./index'));
export const SecurityCenterPageRouter: NavigationRouteObject = {
  id: 'security_center_page',
  path: '/security-center',
  index: true,
  disabled: true,
  element: <SecurityCenterPage/>,
  icon: <SecurityCenterIcon/>,
  label: 'Security Center'
}
