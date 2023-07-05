import { useState } from "react";
import './Header.css'
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
// useNavigate用于实现路由跳转
import { Link  } from 'react-router-dom';

export default function Header(props) {
    const [mes] = useState('你好，请')
    // 创建navigate变量,用于router跳转
    // const navigate = useNavigate();
    // const userLogin = () => {
    //     props.showLogin(!props.shouldShowLogin)
    //     navigate('/login');
    // }

    return (
        <AppBar>
            <div id="header">
                <span style={{ lineHeight: '8vh', }}>{mes}</span>
                {/* <Button variant="contained" size="small" onClick={userLogin}>登录</Button> */}
                <span style={{ lineHeight: '8vh', }}><Link to='/login' style={{ color: 'white' }}>登录</Link></span>
                <span style={{ lineHeight: '8vh', }}>或</span>
                <span style={{ lineHeight: '8vh', }}><Link to='/login' style={{ color: 'white' }}>注册</Link></span>
                <div>
                    <SettingsIcon size="large" />
                </div>
            </div>
        </AppBar>
    )
}