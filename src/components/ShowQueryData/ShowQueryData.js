import { useState } from "react";
// import './QueryForm.css'
import { Box, Typography, Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


export default function ShowQueryData(props) {

    const columns = [
        { field: 'courtName', headerName: '场地', width: 150 },
        { field: 'courtOpenTime', headerName: '时间段', width: 100 },
        { field: 'courtAdress', headerName: '地址', sortable: false, width: 160 },

    ];

    const rows = props.showQueryData.map((item) => {
        const { courtOpenTime,courtOpenInfoId } = item;
        const { courtName, courtAdress } = item.courtInfo;

        // 创建新的对象
        return {
            id:courtOpenInfoId,
            courtOpenTime,
            courtName,
            courtAdress    
        };
    });

    function setFlg(data,flg){
        props.setShowFlag(null,false)
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
            height: '100%',
            // padding: '15px',
            // marginLeft: '50px',
            // marginTop:'50px',
            border: '1px solid skyblue',
            overflow: 'auto'

        }}>
            <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2vh',
                textAlign:'lefy' }}>
                <Typography variant="h5" color="primary">找到{rows.length}条记录</Typography>
                <span>
                <Button variant="contained" onClick={setFlg}>返回</Button>
                </span>
            </div>
            <div style={{ width: '93%', padding: '2vh' }}>
                <DataGrid
                    sx={{ border: 'none' }}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 7 },
                        },
                    }}
                    pageSizeOptions={[7]}
                />
            </div>
        </Box>
    )
}