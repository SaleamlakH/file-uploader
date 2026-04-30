import type { RouteObject } from 'react-router';
import App from './App';
import Dashboard from './pages/dashboard/Dashboard';
import FolderView from './pages/folder-view/FolderView';
import Login from './pages/Login';
import Signup from './pages/Signup';

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
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export default routes;
