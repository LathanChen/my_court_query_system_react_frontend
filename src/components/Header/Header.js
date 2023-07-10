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
                        <SettingsIcon size="large" />
                    </div>
                </div>

            ) : (
                <div id="header">
                    <span style={{ lineHeight: '8vh' }}>{mes}</span>
                    {/* <Button variant="contained" size="small" onClick={userLogin}>登录</Button> */}
                    <span style={{ lineHeight: '8vh' }}><Link to='/login' style={{ color: 'white' }}>登录</Link></span>
                    <span style={{ lineHeight: '8vh' }}>或</span>
                    <span style={{ lineHeight: '8vh' }}><Link to='/register' style={{ color: 'white' }}>注册</Link></span>
                    <div>
                        <SettingsIcon size="large" />
                    </div>
                </div>
            )}
        </AppBar>

    )
}