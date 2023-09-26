import QueryForm from './components/QueryForm/QueryForm';
import ShowQueryData from './components/ShowQueryData/ShowQueryData';
import ShowTeamData from './components/ShowTeamData/ShowTeamData';
import ShowTodayEvent from './components/ShowTodayEvent/ShowTodayEvent';
import TestDiv from './components/TestDiv/TestDiv';
import Test2 from './components/Test2/Test2';
import ImageCarousel from './components/ImageCarousel/ImageCarousel';
import EvaluateZone from './components/EvaluateZone/EvaluateZone';
import InfoListSearch from './components/InfoListSearch/InfoListSearch';
import HomePage from './pages/HomePage/HomePage';
import AdminPage from './pages/AdminPage/AdminPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AdminPageInfoShow from './pages/AdminPageInfoShow/AdminPageInfoShow';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AdminPageAddItempage from './pages/AdminPageAddItempage/AdminPageAddItempage';
import AdminPageEditItempage from './pages/AdminPageEditItempage/AdminPageEditItempage';
import AdminPageAddCourtInfo from './pages/AdminPageAddCourtInfo/AdminPageAddCourtInfo';
import AdminPageEditCourtInfoPage from './pages/AdminPageEditCourtInfoPage/AdminPageEditCourtInfoPage';
import AdminPageCourtInfoListPage from './pages/AdminPageCourtInfoListPage/AdminPageCourtInfoListPage';

import CourtInfoPage from './pages/CourtInfoPage/CourtInfoPage';
import ErrorMsg from './components/ErrorMsg/ErrorMsg';

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
      //   path: 'ImageCarousel',
      //   element: <ImageCarousel/>,
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
      {
        path: 'addcourtinfo',
        element: <AdminPageAddCourtInfo/>,
      },
      {
        path: 'courtinfolist',
        element: <AdminPageCourtInfoListPage/>,
      },
      {
        path: 'editcourtinfo/:courtInfoId',
        element: <AdminPageEditCourtInfoPage/>,
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
  },
  {
    path: 'courtInfoPage/:courtId',
    element: <CourtInfoPage/>,
  },
  {
    path: '/ErrorMsg',
    element: <ErrorMsg/>,
  }
];

export default routes;
