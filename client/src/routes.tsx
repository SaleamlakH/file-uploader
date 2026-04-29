import type { RouteObject } from 'react-router';
import App from './App';
import Dashboard from './pages/dashboard/Dashboard';
import FolderView from './pages/folder-view/FolderView';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/folders/:folderId',
        element: <FolderView />,
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
