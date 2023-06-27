import { useState } from "react";
import './Header.css'
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
// useNavigate用于实现路由跳转
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
const [mes] = useState('你好，请')
// 创建navigate变量,用于router跳转
const navigate = useNavigate();
const userLogin = () =>{
    props.showLogin(!props.shouldShowLogin)
    navigate('/login');
}

return(
    <div id="header">
        <span style={{lineHeight:'8vh',}}>{mes}</span>          
        <Button variant="contained" size="small" onClick={userLogin}>登录</Button>
        <div>
            <SettingsIcon size="large"/>
        </div> 
    </div>
)
}