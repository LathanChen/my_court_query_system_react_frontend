import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AdminMain(props) {
  // // 存储AdminPage各路由链接的中文名称
  // const breadcrumbNameMap = {
  //   '/adminpage': '信息列表',
  //   '/adminpage/addinfo': '添加信息',
  //   '/adminpage/editinfo': '编辑信息',
  // };

  // const location = useLocation();

  // // 一旦路由链接有变化，调用useEffect函数取得url并生成新的链接名称字符串，并通过父组件传给AdminHeader
  // useEffect(() => {
  //   const pathnames = location.pathname.split('/').filter((x) => x);

  //   const newBreadcrumbs = pathnames.map((_, index) => {
  //     const url = `/${pathnames.slice(0, index + 1).join('/')}`;
  //     return {
  //       url,
  //       name: breadcrumbNameMap[url],
  //     };
  //   });
  //   console.log(newBreadcrumbs)
  //   props.getMainRouterMes(newBreadcrumbs);
  // }, [location]);

  return (
    <Main open={props.open} sx={{ overflow: 'auto' }}>
      <DrawerHeader />
      <Outlet />
    </Main>
  );
}