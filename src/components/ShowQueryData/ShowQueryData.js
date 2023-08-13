import React, { useState, useEffect } from 'react';
// import './QueryForm.css'
import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// useSelector 和 useDispatch 是两个Hooks,用于连接redux store
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// 用于获取父组件在Outlet中传递的参数
import { useOutletContext } from "react-router-dom"
import axios from 'axios';

export default function ShowQueryData(props) {
    
    const { queryFormData } = useOutletContext()   
    console.log(queryFormData)
    
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 7
    });

    // 存储后端使用分页功能传过来的对象,里面包含了查询到的数据和相关分页信息
    const [responseData, setResponseData] = useState({})

    useEffect(() => {
        // 使用异步函数的心得:异步函数中,使用await获得的数据,要在异步函数里处理完,如判断,赋值等
        // 如果先调用异步函数,再在函数外处理数据,会导致处理数据的代码先生效,功能无法实现
        const getQueryDatas = async () => {
            try {
                // ...params语法,对象的扩展运算符
                const response = await axios.get('/courtOpenInfo/getInfo', { params: { ...queryFormData, PageNum: paginationModel.page, PageSize: paginationModel.pageSize } })
                console.log(response.data)
                setResponseData(response.data)
                if (response.data.list.length >= 0) {
                    response.data.list = response.data.list.map((item) => {
                        const { courtOpenTime, courtOpenInfoId } = item;
                        const { courtName, courtAdress } = item.courtInfo;

                        // 创建新的对象
                        return {
                            id: courtOpenInfoId,
                            courtOpenTime,
                            courtName,
                            courtAdress
                        };
                    })
                    console.log(response.data.list)
                    setCourtInfoList(response.data.list)
                }
                else {
                    setCourtInfoListIsNull(true)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        if (paginationModel !== null) { // 仅当 paginationModel 不为 null 时发起请求
            getQueryDatas();
        }
    }, [paginationModel, queryFormData])


    const [courtInfoList, setCourtInfoList] = useState([])

    const [courtInfoListIsNull, setCourtInfoListIsNull] = useState(false)

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
    // const courtInfoList = useSelector(state => state.courtInfoList).map((item) => {
    //     const { courtOpenTime, courtOpenInfoId } = item;
    //     const { courtName, courtAdress } = item.courtInfo;

    //     // 创建新的对象
    //     return {
    //         id: courtOpenInfoId,
    //         courtOpenTime,
    //         courtName,
    //         courtAdress
    //     };
    // });

    // 创建navigate变量,用于router跳转
    const navigate = useNavigate();
    function backToQyeryForm() {
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
                textAlign: 'lefy'
            }}>
                <Typography variant="h5" color="primary">找到{responseData.total}条记录</Typography>
                <span>
                    <Button variant="contained" onClick={backToQyeryForm}>返回</Button>
                </span>
            </div>
            {!courtInfoListIsNull && <div style={{ width: '93%', padding: '2vh' }}>
                <DataGrid
                    sx={{ border: 'none' }}
                    rows={courtInfoList}
                    columns={columns}
                    rowCount={responseData.total}
                    pageSizeOptions={[7]}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={setPaginationModel}
                />

            </div>}
        </Box>
    )
}