import type { RouteObject } from 'react-router';
import App from './App';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signup',
  },
  {
    path: '/login',
  },
  {
    path: '/folders/:folderId',
  },
  {
    path: '/shares/:token',
  },
];

export default routes;
