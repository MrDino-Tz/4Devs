import { createBrowserRouter } from 'react-router-dom';

// project imports
import MainRoutes from './MainRoutes';
import LandingPage from 'pages/landing';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <LandingPage />
    },
    MainRoutes
  ],
  { basename: import.meta.env.BASE_URL }
);

export default router;
