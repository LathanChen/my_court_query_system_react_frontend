import { useState, useEffect } from "react";
import './Header.css'
import SettingsIcon from '@mui/icons-material/Settings';
// import {Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
// useNavigate用于实现路由跳转
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import api from '../../api';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
    const [mes] = useState('你好，请')
    // const [loginFlg, setLoginFlg] = useState()
    const isLogin = useSelector(state => state.isLogin);

    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            console.log(localStorage.getItem("token"))
            dispatch({
                type: "LOGIN",
                payload: true,
            })
        }
        else {
            // dispatch({
            //     type:"LOGOUT",
            //     payload:false,
            // })          
        }
    }, [isLogin])

    // 创建navigate变量,用于router跳转
    // const navigate = useNavigate();
    // const userLogin = () => {
    //     props.showLogin(!props.shouldShowLogin)
    //     navigate('/login');
    // }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    const changeIsLogin = () => {
        const fetchData = async () => {
            try {
                const response = await api.get('/user/logout');
                console.log(response.data);

                // 请求成功后的操作
                dispatch({
                    type: "LOGOUT",
                    payload: false,
                });
                // Storage 对象是用于访问浏览器的本地存储（例如 localStorage 或 sessionStorage）的接口。无论你存储的是什么类型的值，
                // 在存储过程中都会被自动转换为字符串。当你从存储中获取值时，这些字符串会被原样返回。
                // 所以这里实际存入的是"null"字符串
                localStorage.removeItem("token");
                console.log(localStorage);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }

    const navigate = useNavigate();
    const enterAdminPage = () => navigate('/adminpage')

    return (
        <AppBar>
            {isLogin ? (
                <div id="header">
                    {/* <span style={{ lineHeight: '8vh' }}>{mes}</span> */}
                    {/* <Button variant="contained" size="small" onClick={changeIsLogin}>退出</Button> */}
                    <span style={{ lineHeight: '8vh' }}>您已成功登录，</span>
                    <span style={{ lineHeight: '8vh' }}>点击</span>
                    <span style={{ lineHeight: '8vh' }}><Link to='/homepage' onClick={changeIsLogin} style={{ color: 'white' }}>退出</Link></span>
                    <div>
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
                            <MenuItem onClick={enterAdminPage}>进入管理界面</MenuItem>
                            <MenuItem onClick={handleMenuClose}>敬请期待！</MenuItem>
                            <MenuItem onClick={handleMenuClose}>敬请期待！</MenuItem>
                        </Menu>
                    </div>
                </div>

            ) : (
                <div id="header">
                    <span style={{ lineHeight: '8vh' }}>{mes}</span>
                    {/* <Button variant="contained" size="small" onClick={userLogin}>登录</Button> */}
                    <span style={{ lineHeight: '8vh' }}><Link to='/login' style={{ color: 'white' }}>登录</Link></span>
                    <span style={{ lineHeight: '8vh' }}>或</span>
                    <span style={{ lineHeight: '8vh',paddingRight:'10px' }}><Link to='/register' style={{ color: 'white' }}>注册</Link></span>
                </div>
            )}
        </AppBar>

    )
}