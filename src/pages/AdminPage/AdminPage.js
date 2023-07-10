import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, useTheme } from '@mui/material/styles';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import AdminMain from '../../components/AdminMain/AdminMain';
import AdminSlider from '../../components/AdminSlider/AdminSlider';
import React, { useState, useEffect } from 'react';
import api from '../../api';

export default function AdminPage() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/user/authority');
                if (response.data.code==200){
                    console.log(response.data.data)
                    for (const element of response.data.data) {
                        if (element == "test"){
                            setAdminHasLogin(true)
                            break
                        }
                      }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [adminHasLogin, setAdminHasLogin] = useState(false);

    const handleSliderOpen = () => {
        setOpen(true);
    };

    const handleSliderClose = () => {
        setOpen(false);
    };

    return (
        adminHasLogin ?
        (<Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AdminHeader open={open} handleSliderOpen={handleSliderOpen} />
        <AdminSlider open={open} handleSliderClose={handleSliderClose} />
        <AdminMain open={open} />
        </Box>)
         : (<div><span>对不起，您没有访问权限</span></div>)

    );
}
