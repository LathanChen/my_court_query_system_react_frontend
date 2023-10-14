import React, { useState, useEffect } from 'react';
import { InputLabel, FormControl, Select, MenuItem, Box, Typography, Button } from '@mui/material';
import { Pagination } from 'antd';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import IconButton from '@mui/material/IconButton';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import axios from 'axios';
import './Indexbar.css'

export default function Indexbar(props) {

    const [courtInfoListIsNull, setCourtInfoListIsNull] = useState(true)

    const [courtInfoList, setCourtInfoList] = useState([])

    const [totalItems, settotalItems] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    console.log(props.searchParams)

    // 分页器当前页数
    const [currentPage, setCurrentPage] = useState(1)
    // 分页器中页码被按下时

    const [timerId, setTimerId] = useState(null);

    const findNextPageEventInfos = (page) => {
        setCurrentPage(page)
        if (props.searchFlg === 0) {
            setIsLoading(true)
            getCourtDatas(page)
        }
        else if (props.searchFlg === 1) {
            setIsLoading(true)
            getEventDatas(page)
        }
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)

        setTimerId(timer);
    }


    const getCourtDatas = async (page) => {
        try {
            // ...params语法,对象的扩展运算符
            console.log(props.searchParams)
            const response = await axios.get('/courtOpenInfo/getInfo', { params: { ...props.searchParams, PageNum: page, PageSize: 9 } })
            console.log(response.data)
            settotalItems(response.data.total)
            // setResponseData(response.data)
            if (response.data.list.length > 0) {
                setCourtInfoListIsNull(false)
                // response.data.list = response.data.list.map((item) => {
                //     const { courtOpenTime, courtOpenInfoId } = item;
                //     const { courtName, courtAdress } = item.courtInfo;

                //     // 创建新的对象
                //     return {
                //         id: courtOpenInfoId,
                //         courtOpenTime,
                //         courtName,
                //         courtAdress
                //     };
                // })
                response.data.list = response.data.list.map((item) => {
                    const { courtOpenTime, courtOpenInfoId, itemInfo } = item;
                    const { courtName, courtAdress } = item.courtInfo;

                    // 创建新的对象
                    return {
                        id: courtOpenInfoId,
                        courtOpenTime,
                        courtName,
                        courtAdress,
                        itemName: itemInfo.itemInfoName
                    };
                })
                console.log(response.data.list)
                setCourtInfoList(response.data.list.map((item) => {
                    return (
                        <div className='signup'>
                            <Typography
                                id="signuptitle"
                                variant="h6"
                                color="primary">
                                日程详情
                            </Typography>
                            <div className='detail'>
                                <div>
                                    <Typography variant="subtitle1" color="primary">{`名称：${item.courtName}`}</Typography>
                                    <Typography variant="subtitle2" color="secondary">{`时间：${item.courtOpenTime}`}</Typography>
                                    <Typography variant="subtitle2" color="primary">{`项目：${item.itemName}`}</Typography>
                                    <Typography variant="subtitle2" color="black">{`地址：${item.courtAdress}`}</Typography>
                                </div>
                            </div>
                        </div>
                    )
                }))
            }
            else {
                setCourtInfoListIsNull(true)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const getEventDatas = async (page) => {
        try {
            // ...params语法,对象的扩展运算符
            console.log(props.searchParams)
            const response = await axios.get('/eventInfo/getInfo', { params: { 
                eventOpenDay:props.searchParams?.selectedDate, 
                eventOpenTimeZone:props.searchParams?.courtOpenTimeZone,
                eventItemId:props.searchParams?.courtOpenItemId,
                PageNum: page, 
                PageSize: 9 } })
            console.log(response.data)
            settotalItems(response.data.total)
            // setResponseData(response.data)
            if (response.data.list.length > 0) {
                setCourtInfoListIsNull(false)
                // response.data.list = response.data.list.map((item) => {
                //     const { courtOpenTime, courtOpenInfoId } = item;
                //     const { courtName, courtAdress } = item.courtInfo;

                //     // 创建新的对象
                //     return {
                //         id: courtOpenInfoId,
                //         courtOpenTime,
                //         courtName,
                //         courtAdress
                //     };
                // })
                response.data.list = response.data.list.map((item) => {
                    const { eventOpenTime, eventInfoId, itemInfo,eventEnrollment,eventMaxEnrollment,eventMaleCost,eventFemaleCost } = item;
                    const { courtName, courtAdress } = item.courtInfo;

                    // 创建新的对象
                    return {
                        id: eventInfoId,
                        eventOpenTime,
                        courtName,
                        courtAdress,
                        eventEnrollment,
                        eventMaxEnrollment,
                        eventMaleCost,
                        eventFemaleCost,
                        itemName: itemInfo.itemInfoName
                    };
                })
                console.log(response.data.list)
                setCourtInfoList(response.data.list.map((item) => {
                    return (
                        <div className='signup'>
                            <Typography
                                id="signuptitle"
                                variant="h6"
                                color="primary">
                                报名详情
                            </Typography>
                            <div className='detail'>
                                <div>
                                    <Typography variant="subtitle1" color="primary">{item.courtName}</Typography>
                                    <Typography variant="subtitle2" color="primary">{item.eventOpenTime}</Typography>
                                    <Typography variant="subtitle2" color="primary">{item.itemName}</Typography>
                                </div>
                                <div>
                                    <Typography variant="subtitle1" color="primary">{`${item.eventEnrollment}/${item.eventMaxEnrollment}`}</Typography>
                                    <div>
                                        <FaceIcon></FaceIcon> {`${item.eventMaleCost}円/人`}
                                    </div>
                                    <div>
                                        <Face3Icon></Face3Icon> {`${item.eventFemaleCost}円/人`}
                                    </div>
                                </div>
                                <div>
                                    <Button variant="contained">报名</Button>
                                </div>
                            </div>
                        </div>
                    )
                }))
            }
            else {
                setCourtInfoListIsNull(true)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    // let courtInfoDetail = courtInfoList.map((item) => {
    //     return (
    //         <div className='signup'>
    //             <Typography
    //                 id="signuptitle"
    //                 variant="h6"
    //                 color="primary">
    //                 日程详情
    //             </Typography>
    //             <div className='detail'>
    //                 <div>
    //                     <Typography variant="subtitle1" color="primary">{`名称：${item.courtName}`}</Typography>
    //                     <Typography variant="subtitle2" color="secondary">{`时间：${item.courtOpenTime}`}</Typography>
    //                     <Typography variant="subtitle2" color="primary">{`项目：${item.itemName}`}</Typography>
    //                     <Typography variant="subtitle2" color="black">{`地址：${item.courtAdress}`}</Typography>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // })

    // let eventInfoDetail = courtInfoList.map((item) => {
    //     return (
    //         <div className='signup'>
    //             <Typography
    //                 id="signuptitle"
    //                 variant="h6"
    //                 color="primary">
    //                 报名详情
    //             </Typography>
    //             <div className='detail'>
    //                 <div>
    //                     <Typography variant="subtitle1" color="primary">{item.courtName}</Typography>
    //                     <Typography variant="subtitle2" color="primary">{item.eventOpenTime}</Typography>
    //                     <Typography variant="subtitle2" color="primary">{item.itemName}</Typography>
    //                 </div>
    //                 <div>
    //                     <Typography variant="subtitle1" color="primary">{`${item.eventEnrollment}/${item.eventMaxEnrollment}`}</Typography>
    //                     <div>
    //                         <FaceIcon></FaceIcon> {`${item.eventMaleCost}円/人`}
    //                     </div>
    //                     <div>
    //                         <Face3Icon></Face3Icon> {`${item.eventFemaleCost}円/人`}
    //                     </div>
    //                 </div>
    //                 <div>
    //                     <Button variant="contained">报名</Button>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // })

    useEffect(() => {
        if (props.searchFlg === 0 && props.searchParams != null) {
            setIsLoading(true)
            getCourtDatas(currentPage)
        }
        else if (props.searchFlg === 1 && props.searchParams != null) {
            setIsLoading(true)
            getEventDatas(currentPage)
        }
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)
        return () => {
            // 组件卸载时清除定时器
            if (timer) {
                console.log(timer)
                clearTimeout(timer);
            }
        };
    }, [props.searchParams])

    useEffect(() => {
        // setIsLoading(true)
        setCourtInfoListIsNull(true)
        setCurrentPage(1)
    },[props.searchFlg])
    
    // 关闭分页器中使用的定时器
    useEffect(() => {
        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, [timerId]);

    return (
        <div>
            <div id='bar'>
                <div id='label'>
                    <Chip label="全部"></Chip>
                </div>
                <div id='selectday'>
                    <Typography variant="subtitle2" color="primary">前一天</Typography>
                    <IconButton onClick={''}>
                        <ArrowLeftIcon></ArrowLeftIcon>
                    </IconButton>
                    <Typography variant="subtitle2" color="primary">XX年XX月XX日</Typography>
                    <IconButton>
                        <ArrowRightIcon></ArrowRightIcon>
                    </IconButton>
                    <Typography variant="subtitle2" color="primary">后一天</Typography>
                </div>
            </div>
            {isLoading ? 
            (<div id='signupdiv'>
                <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                    <CircularProgress/>
                </div> 
            </div>): 
            (<div id='signupdiv'>
                {!courtInfoListIsNull && courtInfoList}
                {/* {courtInfoList} */}
            </div>)}
            {!courtInfoListIsNull && <div style={{ width: '93%', padding: '2vh' }}>
                <Pagination
                    defaultCurrent={1}
                    current={currentPage}
                    total={totalItems}
                    pageSize={9}
                    size="small"
                    onChange={findNextPageEventInfos}
                />
            </div>}
        </div>
    )
}