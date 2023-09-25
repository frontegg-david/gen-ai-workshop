import { OverviewPageRouter } from '../pages/OverviewPage/router';
import { AnalyticsPageRouter } from '../pages/AnalyticsPage/router';
import { SecurityCenterPageRouter } from '../pages/SecurityCenterPage/router';
import { NavigationRouteObject } from './types';
import { UsersPageRouter } from '../pages/UsersPage/router';



export const navigationMainRoutes: NavigationRouteObject[] = [
  OverviewPageRouter,
  AnalyticsPageRouter,
  SecurityCenterPageRouter
]



export const navigationManagementRoutes: NavigationRouteObject[] = [
  UsersPageRouter,
  // AnalyticsPageRouter,
  // SecurityCenterPageRouter
]


