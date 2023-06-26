import { useState } from "react";
// import './QueryForm.css'
import { Box, Typography,Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ShowTeamData() {

    const columns = [
        { field: 'teamName', headerName: '队伍名称', width: 100 },
        { field: 'planningTime', headerName: '时间段', width: 120 },
        { field: 'courtName', headerName: '地区', sortable: false, width: 180 },

    ];

    const teamPlanningInfo = useSelector(state => state.teamPlanningInfo).map((item) => {
        const { teamName } = item.teamInfo;
        const { planningTime,planningInfoId } = item;
        const { courtName} = item.courtInfo;

        // 创建新的对象
        return {
            id:planningInfoId,
            teamName,
            planningTime,
            courtName    
        };
    });

    const navigate = useNavigate()
    const backToQyeryForm =() => {
        navigate('/')
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
            alignItems: 'center',
            // width: '100%',
            height: '100%',
            // padding: '15px',
            // marginLeft: '50px',
            // marginTop:'50px',
            border: '1px solid skyblue',
            overflow:'auto'

        }}>
            <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2vh',
                textAlign:'lefy' }}>
                <Typography variant="h5" color="primary">XX年XX月XX日</Typography>
                <span>
                <Button variant="contained" onClick={backToQyeryForm}>返回</Button>
                </span>
            </div>
            <div style={{ width: '93%', padding: '2vh' }}>
                <DataGrid
                    sx={{ border: 'none' }}
                    rows={teamPlanningInfo}
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