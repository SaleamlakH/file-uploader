import type { RouteObject } from 'react-router';
import App from './App';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
      },
      {
        path: '/folders/:folderId',
      },
      {
        path: '/shares/:token',
      },
    ],
  },
  {
    path: '/signup',
  },
  {
    path: '/login',
  },
];

export default routes;
