import { createBrowserRouter } from 'react-router-dom';
import App from '../app';
import { navigationMainRoutes, navigationManagementRoutes } from './navigation-routes';


const router = createBrowserRouter([
  {
    path: '/',
    id: 'App',
    element: <App/>,
    children: [
      ...navigationMainRoutes,
      ...navigationManagementRoutes
    ]
  }
])


export default router;
