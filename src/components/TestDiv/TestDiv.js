import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';

export default function TodayEvent() {
    return (
        <Box sx={{
            height: '260px',
            // width:'400px',
            border: '1px solid skyblue'
        }}>
            <div style={{
                display:'flex'
            }}>
                <div style={{
                    width:'40%',
                    height:'80px',
                    // margin:'5px',
                    border:'1px solid skyblue',
                    fontSize:'20px'}}>
                    <span>
                        篮球
                    </span>
                </div>
                <div style={{
                    width:'40%',
                    height:'80px',
                    // margin:'5px',
                    border:'1px solid skyblue',
                    fontSize:'20px'}}>
                    <span>
                        篮球
                    </span>
                </div>
                <div style={{
                    width:'40%',
                    height:'80px',
                    // margin:'5px',
                    border:'1px solid skyblue',
                    fontSize:'20px'}}>
                    <span>
                        篮球
                    </span>
                </div>
                <div style={{
                    width:'40%',
                    height:'80px',
                    // margin:'5px',
                    border:'1px solid skyblue',
                    fontSize:'20px'}}>
                    <span>
                        篮球
                    </span>
                </div>

            </div>
            
        </Box>
    )
}