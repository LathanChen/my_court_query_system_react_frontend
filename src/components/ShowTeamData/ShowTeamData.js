import { useState } from "react";
// import './QueryForm.css'
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


export default function ShowTeamData() {

    const columns = [
        { field: 'teamName', headerName: '队伍名称', width: 150 },
        { field: 'timeZone', headerName: '时间段', width: 100 },
        { field: 'regionName', headerName: '地区', sortable: false, width: 160 },

    ];

    const rows = [
        { id: 1, teamName: 'AAA', timeZone: 'XXX', regionName: 'XXX体育馆' },
        { id: 2, teamName: 'BBB', timeZone: 'YYY', regionName: 'YYY体育馆' },
        { id: 3, teamName: 'CCC', timeZone: 'HHH', regionName: 'HHH体育馆' },
        { id: 4, teamName: 'DDD', timeZone: 'AAA', regionName: 'AAA体育馆' },
        { id: 5, teamName: 'EEE', timeZone: 'BBB', regionName: 'BBB体育馆' },
        { id: 6, teamName: 'FFF', timeZone: 'CCC', regionName: 'CCC体育馆' },
        { id: 7, teamName: 'GGG', timeZone: 'DDD', regionName: 'DDD体育馆' },
        { id: 8, teamName: 'HHH', timeZone: 'EEE', regionName: 'EEE体育馆' },
        { id: 9, teamName: 'III', timeZone: 'FFF', regionName: 'FFF体育馆' },
        { id: 10, teamName: 'JJJ', timeZone: 'GGG', regionName: 'GGG体育馆' },
    ];

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
            <div style={{ padding: '2vh' }}>
                <Typography variant="h5" color="primary">XX年XX月XX日</Typography>
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