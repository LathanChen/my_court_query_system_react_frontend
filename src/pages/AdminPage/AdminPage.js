import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, useTheme } from '@mui/material/styles';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import AdminMain from '../../components/AdminMain/AdminMain';
import AdminSlider from '../../components/AdminSlider/AdminSlider';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useLocation } from 'react-router-dom';

export default function AdminPage() {

    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get('/user/authority');
                    if (response.data.code === 200) {
                        console.log(response.data)
                        for (const element of response.data.data) {
                            if (element === "test") {
                                setAdminHasLogin(true)
                                break
                            }
                        }
                    }
                    setLoading(false); // 请求完成后更新加载状态
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }, 1000); // 设置停止显示的时间，这里是 1 秒

    }, [location.pathname]);
    const [loading, setLoading] = useState(true); // 添加加载状态

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
        loading ? (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh', // 可根据实际情况调整高度
                }}
            >
                <AdminHeader open={open} handleSliderOpen={handleSliderOpen} />
                {/* 引入加载动画 */}
                <CircularProgress />
            </Box>
        ) : (
            adminHasLogin&&!loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AdminHeader open={open} handleSliderOpen={handleSliderOpen} />
                    <AdminSlider open={open} handleSliderClose={handleSliderClose} />
                    <AdminMain open={open} />
                </Box>
            ) : (
                <ErrorMsg/>
            )
        )
    );


    // return (

    //     <Box sx={{ display: 'flex',justifyContent: 'center',alignItems: 'center', }}>
    //         <CssBaseline />
    //         <AdminHeader open={open} handleSliderOpen={handleSliderOpen} />
    //         <AdminSlider open={open} handleSliderClose={handleSliderClose} />
    //         <AdminMain open={open} hasLogin={adminHasLogin} loading={loading}/>
    //     </Box>

    // );
}
