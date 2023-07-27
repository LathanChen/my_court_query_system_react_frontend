import QueryForm from './components/QueryForm/QueryForm';
import ShowQueryData from './components/ShowQueryData/ShowQueryData';
import ShowTeamData from './components/ShowTeamData/ShowTeamData';
import ShowTodayEvent from './components/ShowTodayEvent/ShowTodayEvent';
import TestDiv from './components/TestDiv/TestDiv';
import Test2 from './components/Test2/Test2';
import InfoListSearch from './components/InfoListSearch/InfoListSearch';
import HomePage from './pages/HomePage/HomePage';
import AdminPage from './pages/AdminPage/AdminPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AdminPageInfoShow from './pages/AdminPageInfoShow/AdminPageInfoShow';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AdminPageAddItempage from './pages/AdminPageAddItempage/AdminPageAddItempage';
import AdminPageEditItempage from './pages/AdminPageEditItempage/AdminPageEditItempage';

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
        path: 'ShowTodayEvent/:itemAndStatus',
        element: <ShowTodayEvent/>,
      },
      // {
      //   path: 'TestDiv',
      //   element: <TestDiv/>,
      // },
    ],
  },
  {
    path: '/adminpage',
    element: <AdminPage/>,
    children: [
      {
        path: '',
        element: <AdminPageInfoShow/>,
      },
      {
        path: 'addinfo',
        element: <AdminPageAddItempage/>,
      },
      {
        path: 'editinfo/:infoid',
        element: <AdminPageEditItempage/>,
      },
    ]
  },
  {
    path: '/login',
    element: <LoginPage/>,
  },
  {
    path: '/register',
    element: <RegisterPage/>,
  }
];

export default routes;
