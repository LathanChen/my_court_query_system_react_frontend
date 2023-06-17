import React, { useState, useEffect } from 'react';
import { Box,Typography } from '@mui/material';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';

export default function TodayEvent() {

    return (
        <Box sx={{
            height: '260px',
            // padding: '10px',
            // marginLeft: '50px',
            // marginTop: '50px',
            border: '1px solid skyblue'
        }}>
            <div style={{
                // 开启flex布局
            display: 'flex',
            // 改变felx主轴方向
            // flexDirection: 'column',
            // 主轴的对齐方式
            justifyContent: 'space-between',
            // 交叉轴的对齐方式
            alignItems: 'center',
            flexWrap: 'wrap',
            }}>


            <div style={{padding:'10px'}}>
            <Typography variant="h5" color="primary">
                    本日活动
                    </Typography>
                <div style={{
                    marginTop: '20px'
                }}>
                    <SportsHandballIcon style={{ fontSize: '120px', color: 'rgb(25, 118, 210)' }}></SportsHandballIcon>
                </div>
            </div>

            <div style={{
                display:'flex',
                // flexDirection: 'column',
                width:'65%',
                flexWrap:'wrap',
                marginTop:'30px'
                // justifySelf: 'center'
            }}>
                <div style={{
                    width:'40%',
                    height:'80px',
                    margin:'3%',
                    padding:'1%',
                    border:'1px solid skyblue',
                    fontSize:'20px'}}>
                    <div>
                    <span>
                        篮球
                    </span>
                    </div>
                    <div>
                        <span style={{fontSize: '14px'}}>
                            未开始
                        </span>
                    </div>
                    <div>
                        <span style={{fontSize: '14px'}}>
                            已结束
                        </span>
                    </div>                  
                </div>
                <div style={{
                    width:'40%',
                    height:'80px',
                    margin:'3%',
                    padding:'1%',
                    border:'1px solid skyblue',
                    fontSize:'20px'}}>
                    <div>
                    <span>
                        乒乓球
                    </span>
                    </div>
                    <div>
                        <span style={{fontSize: '14px'}}>
                            未开始
                        </span>
                    </div>
                    <div>
                        <span style={{fontSize: '14px'}}>
                            已结束
                        </span>
                    </div>                  
                </div>
                <div style={{
                    width:'40%',
                    height:'80px',
                    margin:'3%',
                    padding:'1%',
                    border:'1px solid skyblue',
                    fontSize:'20px'}}>
                    <div>
                    <span>
                        羽毛球
                    </span>
                    </div>
                    <div>
                        <span style={{fontSize: '14px'}}>
                            未开始
                        </span>
                    </div>
                    <div>
                        <span style={{fontSize: '14px'}}>
                            已结束
                        </span>
                    </div>                  
                </div>
                <div style={{
                    width:'40%',
                    height:'80px',
                    margin:'3%',
                    padding:'1%',
                    border:'1px solid skyblue',
                    fontSize:'20px'}}>
                    <div>
                    <span>
                        排球
                    </span>
                    </div>
                    <div>
                        <span style={{fontSize: '14px'}}>
                            未开始
                        </span>
                    </div>
                    <div>
                        <span style={{fontSize: '14px'}}>
                            已结束
                        </span>
                    </div>                  
                </div>

                </div>

            </div>
        </Box>
    )
}