import { useState, useEffect, useCallback } from "react";
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import api from '../../api';
// import axios from 'axios'; //部署用
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useVerifyTokenExpiration } from '../../common/verifyTokenexpiration';
import { breadcrumbNameMap } from '../../common/data/breadcrumbNameMap';

const drawerWidth = 240;


// 首先，我们调用 styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })，
// 这是一个部分应用的过程。styled 函数接受两个参数：被样式化的组件（这里是 MuiAppBar）和一个配置对象。这个部分应用的过程返回一个新的函数，即样式化组件的定义函数。
// 接着，我们立即调用这个新函数，并传入定义函数的参数 ({ theme, open }) => ({ ... })。这个定义函数接收 { theme, open } 作为参数，并返回一个对象，该对象包含样式规则。
// 通过这种柯里化的方式，我们可以将样式化组件的定义过程分解为两个步骤。首先，使用 styled(MuiAppBar, 
// { shouldForwardProp: (prop) => prop !== 'open' }) 部分应用 styled 函数，得到一个新的函数。然后，调用这个新函数并传入定义函数，生成最终的样式化组件。
// theme 是一个通过 styled 函数的回调函数参数传递进来的对象。它代表了 Material-UI 的主题对象，包含了各种样式和配置信息。
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AdminHeader(props) {

  const isLogin = useSelector(state => state.isLogin);
  // useLocation hooks =>返回包含有关当前url信息的Location 对象
  const location = useLocation();

  // 通用函数，验证目前的登陆是否有效
  const verifyTokenExpiration = useVerifyTokenExpiration();

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    props.handleSliderOpen()
  };

  // const dispatch = useDispatch();

  const changeIsLogin = () => {
    const fetchData = async () => {
      try {
        const response = await api.get('/user/logout');
        // 请求成功后的操作
        if (response.data.code === 200) {
          // localStorage.removeItem("token");
          // console.log(localStorage);
          enterHomePage()
        }
        else {

        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const enterHomePage = () => navigate('/IndexPage')
  // console.log(props.routerMes)

  // 由于获取当前路由地址的动作是在AdminPage文件的useEffect函数中进行的，
  // 而useEffect先执行的是一个一秒的定时器（里面执行了axios请求和加载动画），
  // 再执行获取路由地址 => 获取路由的中文名称 =>通过props传给本组件（没高兴把这些代码定时器里）
  // 由于js是单线程，所以必须等定时器里的执行完后才能进行下面的动作
  // 所以会造成本组件在加载时，props没有值
  const [routerMes, setRouterMes] = useState([])

  //   const authFetch = async () => {
  //     try {
  //         console.log('try')
  //         const response = await api.get('/user/authority');
  //         if (response.data.code === 200) {
  //             console.log(response.data)
  //             for (const element of response.data.data) {
  //                 if (element === "test") {
  //                     dispatch({
  //                         type: "LOGIN",
  //                         payload: true,
  //                     })
  //                     break
  //                 }
  //             }
  //             let timer
  //             await new Promise((resolve) => {
  //               setTimeout(() => {
  //                 props.handleLoading(false)
  //                 resolve()
  //               },500)
  //             })
  //             clearTimeout(timer)
  //             return true
  //         }
  //         else {
  //             dispatch({
  //                 type: "LOGOUT",
  //                 payload: false,
  //             })
  //             localStorage.removeItem("token");
  //             navigate('/ErrorMsg')
  //             return false
  //         }

  //     } 
  //     catch (error) {
  //         console.error(error);
  //     }
  // };


  // useEffect(() => {
  //   verifyTokenExpiration()
  // }, [verifyTokenExpiration])

  useEffect(() => {
    let newBreadcrumbs
    // props.handleLoading(true)
    const getVrifyTokenExpirationResult = async() => {
      if(await verifyTokenExpiration()) {
      // debugger
      // props.handleLoading(false)
      const pathnames = location.pathname.split('/').filter((x) => x);
      // console.log(pathnames)
      // _,省略之前的参数
      newBreadcrumbs = pathnames.map((_, index) => {
        // slice()是JavaScript中数组的一个方法，它用于从原始数组中提取指定范围的元素，并返回一个新的数组，不会修改原始数组。
        // 在 JavaScript 中，join() 方法是数组对象的一个方法，它用于将数组中的所有元素转换成一个字符串，并通过指定的分隔符连接起来。
        // 这里生成了若干个对象，第一次：pathnames数组的第一个元素，然后查找breadcrumbNameMap中对应的路径名称
        // 第二次：pathnames数组的第一个和第二个元素，通过'/'将两个元素连接，然后查找breadcrumbNameMap中对应的路径名称
        // 以此类推，就可以获得从一级路由到当前页面的所有路由地址的名称
        const url = `${pathnames.slice(0, index + 1).join('/')}`;
        return {
          url,
          name: breadcrumbNameMap[url],
        };
      })
      if (newBreadcrumbs) {
        const _routerMes = newBreadcrumbs.filter((value) => value.name !== undefined);
        setRouterMes(_routerMes)
      }
      }
      else { 
        navigate('/ErrorMsg')
      }
    }
    getVrifyTokenExpirationResult()
  }, [location.pathname, navigate,verifyTokenExpiration])

  // console.log(routerMes[1].url)

  return (
    <AppBar position="fixed" open={props.open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(props.open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <div role="presentation">
          {(routerMes && <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white' }}>
            {routerMes.map((routerInfo, index) => (
              (index === routerMes.length - 1) ? (
                <Typography key={routerInfo.url} color="white">
                  {routerInfo.name}
                </Typography>
              ) : (
                <Link
                  key={routerInfo.url}
                  underline="hover"
                  color="inherit"
                  to={`/${routerInfo.url}`}
                  style={{ color: 'white' }}
                >
                  {routerInfo.name}
                </Link>
              ))
            )}
          </Breadcrumbs>)}
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <IconButton
            aria-label="more"
            aria-controls="icon-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <SettingsIcon size="large" />
          </IconButton>
          <Menu
            id="icon-menu"
            // 菜单的锚点元素，它表示菜单在哪里弹出。通常情况下，你需要在触发菜单弹出的按钮或图标上设置这个属性，以便菜单能够在按钮或图标的位置弹出。
            anchorEl={anchorEl}
            // 这是一个布尔值，用于控制菜单是否处于打开状态。如果 open 属性为 true，则菜单会显示在页面上；如果为 false，则菜单会隐藏。
            open={Boolean(anchorEl)}
            // 这是一个回调函数，用于在菜单关闭时触发。当用户点击菜单项或点击菜单以外的区域时，
            // 菜单会自动关闭，同时会调用 onClose 函数。在 onClose 函数中，你可以执行一些操作，比如更新组件的状态以关闭菜单。
            onClose={handleMenuClose}
          >
            <MenuItem onClick={enterHomePage}>返回首页</MenuItem>
            <MenuItem onClick={changeIsLogin}>退 出</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}