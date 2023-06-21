import React, { useState, useEffect } from 'react';
import { Box,Typography } from '@mui/material';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';

export default function TodayEvent() {

    return (
        <Box sx={{
            height: '32vh',
            padding: '1vh',
            // marginLeft: '50px',
            // marginTop: '50px',
            border: '1px solid skyblue',
            overflow:'hidden'
        }}>
            <div style={{
                // 开启flex布局
            display: 'flex',
            // 改变felx主轴方向
            // flexDirection: 'column',
            // 主轴的对齐方式
            justifyContent: 'space-between',
            // 交叉轴的对齐方式
            // alignItems: 'center',
            // flexWrap: 'wrap',
            }}>


            <div style={{padding:'1vh'}}>
            <Typography variant="h5" color="primary">
                    本日活动
                    </Typography>
                <div style={{
                    marginTop: '2vh'
                }}>
                    <SportsHandballIcon style={{ fontSize: '17vh', color: 'rgb(25, 118, 210)' }}></SportsHandballIcon>
                </div>
            </div>

            <div style={{
                display:'flex',
                // flexDirection: 'column',
                width:'65%',
                flexWrap:'wrap',
                marginTop:'1vh'
                // justifySelf: 'center'
            }}>
                <div style={{
                    width:'40%',
                    height:'12vh',
                    margin:'3%',
                    padding:'1%',
                    border:'1px solid skyblue',
                    fontSize:'3vh'}}>
                    <div>
                    <span>
                        篮球
                    </span>
                    </div>
                    <div>
                        <span style={{fontSize: '2vh'}}>
                            未开始
                        </span>
                    </div>
                    <div>
                        <span style={{fontSize: '2vh'}}>
                            已结束
                        </span>
                    </div>                  
                </div>
                <div style={{
                    width:'40%',
                    height:'12vh',
                    margin:'3%',
                    padding:'1%',
                    border:'1px solid skyblue',
                    fontSize:'3vh'}}>
                    <div>
                    <span>
                        乒乓球
                    </span>
                    </div>
                    <div>
                        <span style={{fontSize: '2vh'}}>
                            未开始
                        </span>
                    </div>
                    <div>
                        <span style={{fontSize: '2vh'}}>
                            已结束
                        </span>
                    </div>                  
                </div>
                <div style={{
                    width:'40%',
                    height:'12vh',
                    margin:'3%',
                    padding:'1%',
                    border:'1px solid skyblue',
                    fontSize:'3vh'}}>
                    <div>
                    <span>
                        羽毛球
                    </span>
                    </div>
                    <div>
                        <span style={{fontSize: '2vh'}}>
                            未开始
                        </span>
                    </div>
                    <div>
                        <span style={{fontSize: '2vh'}}>
                            已结束
                        </span>
                    </div>                  
                </div>
                <div style={{
                    width:'40%',
                    height:'12vh',
                    margin:'3%',
                    padding:'1%',
                    border:'1px solid skyblue',
                    fontSize:'3vh'}}>
                    <div>
                    <span>
                        排球
                    </span>
                    </div>
                    <div>
                        <span style={{fontSize: '2vh'}}>
                            未开始
                        </span>
                    </div>
                    <div>
                        <span style={{fontSize: '2vh'}}>
                            已结束
                        </span>
                    </div>                  
                </div>

                </div>

            </div>
        </Box>
    )
}