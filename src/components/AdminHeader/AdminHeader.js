import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../../api';

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

  const handleDrawerOpen = () => {
    props.handleSliderOpen()
  };

  const dispatch = useDispatch();
  const changeIsLogin = () => {
    const fetchData = async () => {
        try {
            const response = await api.get('/user/logout');
            // 请求成功后的操作
            if(response.data.code === 200){
               dispatch({
                type: "LOGOUT",
                payload: false,
            });
            // Storage 对象是用于访问浏览器的本地存储（例如 localStorage 或 sessionStorage）的接口。无论你存储的是什么类型的值，
            // 在存储过程中都会被自动转换为字符串。当你从存储中获取值时，这些字符串会被原样返回。
            // 所以这里实际存入的是"null"字符串
            localStorage.removeItem("token");
            console.log(localStorage);
            }
            else{

            }                       
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
}

  return (
    <AppBar position="fixed" open={props.silderOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(props.silderOpen && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Persistent drawer
        </Typography>
        <div style={{ marginLeft: 'auto' }}>
          <Link to='/homepage' onClick={changeIsLogin} style={{ color: 'white' }}>退出</Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}