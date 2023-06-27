import QueryForm from './components/QueryForm/QueryForm';
import ShowQueryData from './components/ShowQueryData/ShowQueryData';
import ShowTeamData from './components/ShowTeamData/ShowTeamData';
import TestDiv from './components/TestDiv/TestDiv';
import HomePage from './pages/HomePage/HomePage';
import LoginForm from './components/LoginForm/LoginForm';

const routes = [
  {
    path: '/homepage',
    element: <HomePage/>,
    children: [
      {
        path: '',
        element: <QueryForm/>,
      },
      {
        path: 'ShowQueryData',
        element: <ShowQueryData/>,
      },
      {
        path: 'ShowTeamData',
        element: <ShowTeamData/>,
      },
      {
        path: 'TestDiv',
        element: <TestDiv/>,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginForm/>,
  }
];

export default routes;
