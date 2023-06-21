import { useState } from "react";
import './Header.css'
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Header() {
const [mes] = useState('你好，请')

return(
    <div id="header">
        <span style={{lineHeight:'8vh',}}>{mes}</span>          
        <Button variant="contained" size="small">登录</Button>
        <div>
            <SettingsIcon size="large"/>
        </div> 
    </div>
)
}