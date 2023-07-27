import React, { useState, useEffect } from 'react';
// import './QueryForm.css'
import { Box, Typography, Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// useSelector 和 useDispatch 是两个Hooks,用于连接redux store
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';

export default function ShowTodayEvent() {
    useEffect(() => {
        if(todayEventsList.length === 0){
            setTodayEventsListIsNull(true)
        }
    },[])

    const [todayEventsListIsNull,setTodayEventsListIsNull] = useState(false)

    const columns = [
        { field: 'courtName', headerName: '场地', width: 140 },
        { field: 'courtOpenTime', headerName: '时间段', width: 100 },
        { field: 'courtAdress', headerName: '地址', sortable: false, width: 150 },

    ];

    // 数据的获取方式一：
    // 旧方式，通过接收父组件传递过来的列表，展示查询到的信息
    // const rows = props.showQueryData.map((item) => {
    //     const { courtOpenTime,courtOpenInfoId } = item;
    //     const { courtName, courtAdress } = item.courtInfo;

    //     // 创建新的对象
    //     return {
    //         id:courtOpenInfoId,
    //         courtOpenTime,
    //         courtName,
    //         courtAdress    
    //     };
    // });

    // function setFlg(data,flg){
    //     props.setShowFlag(null,false)
    // }

    // 数据的获取方式二：
    // 使用 useSelector hook 来获取 Redux store 中的状态，并返回给组件使用
    const routerparam = useParams()
    console.log(routerparam)

    // 如果useSelector和useEffect都在同一个函数组件中，useSelector会在useEffect之前执行。
    const todayEventsList = useSelector(state => state.todayEvents[routerparam.itemAndStatus]).map((item) =>{
        console.log(item)
        console.log(routerparam.itemAndStatus)
        const { courtOpenTime,courtOpenInfoId } = item;
        const { courtName, courtAdress } = item.courtInfo;

        // 创建新的对象
        return {
            id:courtOpenInfoId,
            courtOpenTime,
            courtName,
            courtAdress    
        };
    })

    // console.log(courtInfoList)
        // const { courtOpenTime,courtOpenInfoId } = item;
        // const { courtName, courtAdress } = item.courtInfo;

        // // 创建新的对象
        // return {
        //     id:courtOpenInfoId,
        //     courtOpenTime,
        //     courtName,
        //     courtAdress    
        // };
    
    
    // 创建navigate变量,用于router跳转
    const navigate = useNavigate();
    function backToQyeryForm(){
        navigate('/homepage')
    }

    return (
        <Box sx={{
            // 开启flex布局
            // display: 'flex',
            // 改变felx主轴方向
            // flexDirection: 'column',
            // 主轴的对齐方式
            // justifyContent: 'center',
            // 交叉轴的对齐方式
            // alignItems: 'center',
            // width: '100%',
            height: 'calc(100% - 2px)',
            // padding: '15px',
            // marginLeft: '50px',
            // marginTop:'50px',
            border: '1px solid skyblue',
            overflow: 'hidden'

        }}>
            <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2vh',
                textAlign:'lefy' }}>
                <span>
                <Button variant="contained" onClick={backToQyeryForm}>返回</Button>
                </span>
            </div>
            {!todayEventsListIsNull ? (<div style={{ width: '93%', padding: '2vh' }}>
                <DataGrid
                    sx={{ border: 'none' }}
                    rows={todayEventsList}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 7 },
                        },
                    }}
                    pageSizeOptions={[7]}
                />
            </div>):
            (<div style={{ width: '93%', padding: '2vh' }}>
                <Typography variant="h5" color="primary">暂无数据！</Typography>
            </div>)}
        </Box>
    )
}