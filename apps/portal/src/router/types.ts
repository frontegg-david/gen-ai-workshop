import { RouteObject } from 'react-router-dom';
import { ReactNode } from 'react';

export type NavigationRouteObject = RouteObject & {
  id: string;
  path: string;
  icon: ReactNode;
  label: ReactNode;
  disabled?: boolean;
}
