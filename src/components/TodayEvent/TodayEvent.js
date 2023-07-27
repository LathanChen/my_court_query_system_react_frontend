import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export default function TodayEvent(props) {
    const [ tadayEventInfos ,setTadayEventCountInfos ] = 
    useState({basketballNotStart:[],
        basketballEnded:[],
        tableTennisNotStart:[],
        tableTennisEnded:[],
        badmintonNotStart:[],
        badmintonEnded:[],
        volleyballNotStart:[],
        volleyballEnded:[]
    })
    
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log({weekNumber:props.weekNumber,dayOfWeekInWeek:props.dayOfWeekInWeek});
            console.log(props.dayOfWeekInWeek);
            const params = {weekNumber:props.weekNumber,dayOfWeekInWeek:props.dayOfWeekInWeek}
            const response = await axios.get('/courtOpenInfo/getTodayinfo',{params});
            // 处理响应数据
            setTadayEventCountInfos(response.data);
            dispatch({
                type:'SETTODAYEVENTS',
                payload:response.data
            })
            console.log(response.data)
          } catch (error) {
            // 处理错误
            console.error(error);
          }
        };
    
        fetchData(); // 调用发送请求的函数
    
        // 清除副作用的函数
        return () => {
          // 可选的清除逻辑
        };
      }, [props.weekNumber,props.dayOfWeekInWeek]);

    return (
        <Box sx={{
            height: '32vh',
            padding: '1vh',
            // marginLeft: '50px',
            // marginTop: '50px',
            border: '1px solid skyblue',
            overflow: 'hidden'
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


                <div style={{ padding: '1vh' }}>
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
                    display: 'flex',
                    // flexDirection: 'column',
                    width: '65%',
                    flexWrap: 'wrap',
                    marginTop: '1vh'
                    // justifySelf: 'center'
                }}>
                    <div style={{
                        width: '40%',
                        height: '12vh',
                        margin: '3%',
                        padding: '1%',
                        border: '1px solid skyblue',
                        fontSize: '3vh'
                    }}>
                        <div>
                            <span>
                                篮球
                            </span>
                        </div>
                        <div>
                            <span style={{ fontSize: '2vh' }}>
                                未开始
                                <Link
                                 style={{fontSize:'2vh'}}
                                 to='/homepage/ShowTodayEvent/basketballNotStart'
                                
                                >
                                    {tadayEventInfos.basketballNotStart.length}
                                    </Link>
                            </span>
                        </div>
                        <div>
                            <span style={{ fontSize: '2vh' }}>
                                已结束
                                <Link
                                 style={{fontSize:'2vh'}}
                                 to='/homepage/ShowTodayEvent/basketballEnded'
                                 >
                                    {tadayEventInfos.basketballEnded.length}
                                    </Link>
                            </span>
                        </div>
                    </div>
                    <div style={{
                        width: '40%',
                        height: '12vh',
                        margin: '3%',
                        padding: '1%',
                        border: '1px solid skyblue',
                        fontSize: '3vh'
                    }}>
                        <div>
                            <span>
                                乒乓球
                            </span>
                        </div>
                        <div>
                            <span style={{ fontSize: '2vh' }}>
                                未开始
                                <Link
                                 style={{fontSize:'2vh'}}
                                 to='/homepage/ShowTodayEvent/tableTennisNotStart'
                                 >
                                 {tadayEventInfos.tableTennisNotStart.length}
                                 </Link>
                            </span>
                        </div>
                        <div>
                            <span style={{ fontSize: '2vh' }}>
                                已结束
                                <Link
                                 style={{fontSize:'2vh'}}
                                 to='/homepage/ShowTodayEvent/tableTennisEnded'
                                 >{tadayEventInfos.tableTennisEnded.length}
                                 </Link>
                            </span>
                        </div>
                    </div>
                    <div style={{
                        width: '40%',
                        height: '12vh',
                        margin: '3%',
                        padding: '1%',
                        border: '1px solid skyblue',
                        fontSize: '3vh'
                    }}>
                        <div>
                            <span>
                                羽毛球
                            </span>
                        </div>
                        <div>
                            <span style={{ fontSize: '2vh' }}>
                                未开始
                                <Link
                                 style={{fontSize:'2vh'}}
                                 to='/homepage/ShowTodayEvent/badmintonNotStart'
                                 >{tadayEventInfos.badmintonNotStart.length}
                                 </Link>
                            </span>
                        </div>
                        <div>
                            <span style={{ fontSize: '2vh' }}>
                                已结束
                                <Link
                                 style={{fontSize:'2vh'}}
                                 to='/homepage/ShowTodayEvent/badmintonEnded'
                                 >
                                    {tadayEventInfos.badmintonEnded.length}
                                    </Link>
                            </span>
                        </div>
                    </div>
                    <div style={{
                        width: '40%',
                        height: '12vh',
                        margin: '3%',
                        padding: '1%',
                        border: '1px solid skyblue',
                        fontSize: '3vh'
                    }}>
                        <div>
                            <span>
                                排球
                            </span>
                        </div>
                        <div>
                            <span style={{ fontSize: '2vh' }}>
                                未开始
                                <Link
                                 style={{fontSize:'2vh'}}
                                 to='/homepage/ShowTodayEvent/volleyballNotStart'
                                 >{tadayEventInfos.volleyballNotStart.length}
                                 </Link>
                            </span>
                        </div>
                        <div>
                            <span style={{ fontSize: '2vh' }}>
                                已结束
                                <Link
                                 style={{fontSize:'2vh'}}
                                 to='/homepage/ShowTodayEvent/volleyballEnded'
                                 >{tadayEventInfos.volleyballEnded.length}
                                 </Link>
                            </span>
                        </div>
                    </div>

                </div>

            </div>
        </Box>
    )
}