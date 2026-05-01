import type { RouteObject } from 'react-router';
import RootLayout from './layout/root-layout/RootLayout';
import Dashboard from './pages/dashboard/Dashboard';
import FolderView from './pages/folder-view/FolderView';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { rootLoader } from './layout/root-layout/rootLoader';
import { authLoader } from './layout/require-auth/auth-loader';
import RequireAuth from './layout/require-auth/RequireAuth';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      {
        element: <RequireAuth />,
        loader: authLoader,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'folders/:folderId',
            element: <FolderView />,
          },
        ],
      },
      {
        path: '/shares/:token',
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export default routes;
