import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, useTheme } from '@mui/material/styles';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import AdminMain from '../../components/AdminMain/AdminMain';
import AdminSlider from '../../components/AdminSlider/AdminSlider';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';

export default function AdminPage() {
    // // useLocation hooks =>返回包含有关当前url信息的Location 对象
    // const location = useLocation();

    // const breadcrumbNameMap = {
    //     'adminpage': '信息列表',
    //     'adminpage/addinfo': '添加信息',
    //     'adminpage/editinfo': '编辑信息',
    // };

    const dispatch = useDispatch();

    const adminHasLogin = useSelector(state => state.isLogin);
    // 一旦路由链接有变化，调用useEffect函数取得url并生成新的链接名称字符串，并通过父组件传给AdminHeader
    useEffect(() => {
        // console.log('useEffect')
        setLoading(true)
        setTimeout(() => {
            // console.log('setTimeout')
            const fetchData = async () => {
                // console.log('async')
                try {
                    // console.log('try')
                    const response = await api.get('/user/authority');
                    if (response.data.code === 200) {
                        console.log(response.data)
                        for (const element of response.data.data) {
                            if (element === "test") {
                                dispatch({
                                    type: "LOGIN",
                                    payload: true,
                                })
                                break
                            }
                        }
                    }
                    else {
                        dispatch({
                            type: "LOGOUT",
                            payload: false,
                        })
                        localStorage.removeItem("token");
                    }
                    
                } catch (error) {
                    console.error(error);
                }
                finally {
                    // setOpen(true) // 请求完成后将侧边栏打开
                    setLoading(false); // 请求完成后更新加载状态
                }
            };
            fetchData();
        }, 500); // 设置停止显示的时间，这里是 1 秒
        // setRouterMes([])
        // 按'/'分割当前的路径名，
        // (x) => x是为了去除数组中可能的空元素
        // const pathnames = location.pathname.split('/').filter((x) => x);
        // // console.log(pathnames)
        // // _,省略之前的参数
        // const newBreadcrumbs = pathnames.map((_, index) => {
        //     // slice()是JavaScript中数组的一个方法，它用于从原始数组中提取指定范围的元素，并返回一个新的数组，不会修改原始数组。
        //     // 在 JavaScript 中，join() 方法是数组对象的一个方法，它用于将数组中的所有元素转换成一个字符串，并通过指定的分隔符连接起来。
        //     // 这里生成了若干个对象，第一次：pathnames数组的第一个元素，然后查找breadcrumbNameMap中对应的路径名称
        //     // 第二次：pathnames数组的第一个和第二个元素，通过'/'将两个元素连接，然后查找breadcrumbNameMap中对应的路径名称
        //     // 以此类推，就可以获得从一级路由到当前页面的所有路由地址的名称
        //     const url = `${pathnames.slice(0, index + 1).join('/')}`;
        //     return {
        //         url,
        //         name: breadcrumbNameMap[url],
        //     };
        // });
        // // console.log(newBreadcrumbs)
        // setRouterMes(newBreadcrumbs);

    }, []);

    const [loading, setLoading] = useState(true); // 添加加载状态

    const theme = useTheme();
    const [open, setOpen] = useState(true);

    const handleSliderOpen = () => {
        setOpen(true);
    };

    const handleSliderClose = () => {
        setOpen(false);
    };

    // 用于储存AdminMain组件中，当前跳转到的路由组件的url等信息
    const [routerMes, setRouterMes] = useState([])

    // 与AdminMain组件通信，将获取到的路由组件信息存到本组件的状态中
    const getMainRouterMes = (data) => {
        console.log(data)
        setRouterMes(data)
    }

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
                <AdminSlider open={open} handleSliderClose={handleSliderClose} />
                {/* 引入加载动画 */}
                <CircularProgress />
            </Box>
        ) : (
            adminHasLogin && !loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AdminHeader open={open} handleSliderOpen={handleSliderOpen} routerMes={routerMes} />
                    <AdminSlider open={open} handleSliderClose={handleSliderClose} />
                    <AdminMain open={open} getMainRouterMes={getMainRouterMes} />
                </Box>
            ) : (
                <ErrorMsg />
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
