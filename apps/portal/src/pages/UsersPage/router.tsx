import { lazy } from 'react';
import { NavigationRouteObject } from '../../router/types';
import UsersIcon from '@mui/icons-material/SwitchAccountRounded';

const UsersPage = lazy(() => import('./index'));
const CreateNewUserPage = lazy(() => import('./CreateNewUserPage'));
const CreateBulkUsersPage = lazy(() => import('./CreateBulkUsersPage'));

export const UsersPageRouter: NavigationRouteObject = {
  id: 'users_page',
  path: '/users',
  icon: <UsersIcon/>,
  label: 'Users',
  children: [ {
    index: true,
    path: '',
    element: <UsersPage/>,
  }, {
    path: '/users/new',
    element: <CreateNewUserPage/>,
  } ,{
    path: '/users/new-bulk',
    element: <CreateBulkUsersPage/>,
  } ]
}
