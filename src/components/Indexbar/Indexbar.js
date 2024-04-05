import React, { useState, useEffect,useCallback } from 'react';
import { useSelector } from 'react-redux';
import api from '../../api';
import { Typography, Button, Box } from '@mui/material';
import { Pagination } from 'antd';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import IconButton from '@mui/material/IconButton';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import axios from 'axios';
import './Indexbar.css'

export default function Indexbar(props) {

    const [courtInfoListIsNull, setCourtInfoListIsNull] = useState(true)

    const [courtInfoList, setCourtInfoList] = useState([])

    // const [courtInfoListForPage, setCourtInfoListForPage] = useState([])

    const [startIndex,setStartIndex] = useState(0)

    const [endIndex,setEndIndex] = useState(9)

    const [totalItems, settotalItems] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const [msg, setMsg] = useState('')
    
    // 路人报名时选择的活动id
    const [eventId, setEventId] = useState()

    // 路人报名时输入的昵称
    const [nickName, setNickName] = useState('')

    // 路人报名时输入的邮箱
    const [mailAddress, setMailAddress] = useState('')

    console.log(props.searchParams)

    // 分页器当前页数
    const [currentPage, setCurrentPage] = useState(1)
    // 分页器中页码被按下时

    const [timerId] = useState(null);

    // const $dateFromProps = props.selectedDate
    const [paramsFromProps, setParamsFromProps] = useState('');

    const findNextPageInfos = (page) => {
        console.log(page)
        setCurrentPage(page)
        const startIndex = (page-1)*9
        const endIndex = startIndex + 9
        setStartIndex(startIndex)
        setEndIndex(endIndex)
    }

    const handleChangeNickName = (e) => {
        setNickName(e.target.value)
    }

    const handleChangeMailAddress = (e) => {
        setMailAddress(e.target.value)
    }
    
    const isLogin = useSelector(state => state.isLogin);

    const getCourtDatas = useCallback(async (newParams) => {
        try {
            // ...params语法,对象的扩展运算符
            let params = newParams ? { ...newParams } : { ...props.searchParams }
            // console.log(params)
            const response = await axios.get('/courtOpenInfo/getInfo',{params})
            console.log(response.data)
            const listLength = response.data.length
            // settotalItems(response.data.total)
            // setResponseData(response.data)
            if (listLength > 0) {
                settotalItems(listLength)
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
                response.data = response.data.map((item) => {
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
                setCourtInfoList(response.data.map((item) => {
                    return (
                        <div className='signup' key={item.id}>
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
                // findNextPageInfos(1)
            }
            else {
                setMsg('暂无数据！')
                setCourtInfoListIsNull(true)
            }
        }
        catch (error) {
            console.log(error)
        }
    },[props.searchParams])

    const getEventDatas = useCallback(async (newParams) => {
        console.log(props.searchParams)
        const entryEvent = async (eventInfoId) => {
            // 登录状态下
            if (isLogin) {
                const params = { eventInfoId }
                const response = await api.post('/eventEntryInfo/setInfo', params)
                // Todo 直接向后台发送请求
                console.log(response)
                console.log("aaaaaaaaaaa")
                getEventDatas()
                // setCurrentPage(1)
            }
            else {
                setOpen(true)
                setEventId(eventInfoId)
            }
            console.log(eventInfoId)
        }

        try {
            console.log(newParams)
            const {courtOpenItemId:eventItemId,courtOpenTimeZone:eventOpenTimeZone,selectedDate:eventOpenDay} = props.searchParams
            let params = newParams ? { ...newParams } : { eventItemId,eventOpenTimeZone,eventOpenDay }
            // ...params语法,对象的扩展运算符
            console.log(props.searchParams)
            const _response = await api.get('/eventInfo/getInfo',{params})
            console.log(_response.data)
            // settotalItems(response.data.total)
            // setResponseData(response.data)

            let response = _response.data.data
            const listLength = response?.length || 0
            console.log(_response)
            console.log(response)
            // 后台查询到有数据
            if (_response.data.code === 200 && listLength > 0) {
                settotalItems(listLength)
                setMsg('')
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
                response = response.map((item) => {
                    const { eventOpenTime, eventInfoId, itemInfo, eventEnrollment, eventMaxEnrollment, eventMaleCost, eventFemaleCost, registered } = item;
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
                        itemName: itemInfo.itemInfoName,
                        registered
                    };
                })
                console.log(response)
                setCourtInfoList(response.map((item) => {
                    return (
                        <div className='signup' key={item.id}>
                            <Typography
                                id="signuptitle"
                                variant="h6"
                                color="primary">
                                报名详情
                            </Typography>
                            <div className='eventdetail'>
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
                                    {item.eventEnrollment === item.eventMaxEnrollment ?
                                        <Button variant="contained" disabled={true}>
                                            满员
                                        </Button> :
                                        item.registered ?
                                            <Button variant="contained" disabled={true}>
                                                已报
                                            </Button> :
                                            <Button variant="contained" onClick={() => entryEvent(item.id)}>
                                                报名
                                            </Button>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }))
                // findNextPageInfos(1)
            }
            else if(_response.data.code === 404){
                setMsg('暂无数据！')
                setCourtInfoListIsNull(true)
            }
        }
        catch (error) {
            console.log(error)
        }
    },[props.searchParams,isLogin])

    function calculateWeekDayOfMonth(paramdate) {
        const date = new Date(paramdate)
        console.log(date)
        // const year = date.getFullYear();
        // const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1，并补零
        // const day = String(date.getDate()).padStart(2, '0'); // 补零
        // 使用 getTime() 方法获取时间戳（以毫秒为单位）
        // const date = paramsDate.getTime();
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const dayOfWeek = firstDayOfMonth.getDay();
        const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 将星期天(0)转换为6，星期一(1)转换为0，以此类推
        const dayOfMonth = date.getDate() - 1;
        const daysSinceStartOfMonth = adjustedDayOfWeek + dayOfMonth;
        const weekNumber = Math.floor(daysSinceStartOfMonth / 7) + 1;
        const dayOfWeekInWeek = (daysSinceStartOfMonth % 7) + 1;
        console.log(`第${weekNumber}周`)
        console.log(`周${dayOfWeekInWeek}`)
        return { weekNumber, dayOfWeekInWeek }
        // console.log(paramsFromProps.selectedDate)
    }

    const getInfoBeforeToday = async () => {
        // 设置分页器页数为1
        setCurrentPage(1)
        setMsg('')

        // 设置载入中动画
        setIsLoading(true)
        // 计算选择框中日期的前一天
        const oneDayInSeconds = 24 * 60 * 60 * 1000; // 一天的秒数
        // 转化为时间戳
        let _dateFromProps = new Date(paramsFromProps).getTime()
        const newSelectDate = _dateFromProps - oneDayInSeconds
        const date = new Date(newSelectDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1，并补零
        const day = String(date.getDate()).padStart(2, '0'); // 补零

        // 拼接成新的日期字符串
        const formattedDate = `${year}-${month}-${day}`;
        setParamsFromProps(formattedDate)

        // console.log(formattedDate)
        console.log(_dateFromProps)
        // 计算第几周、星期几
        const params = calculateWeekDayOfMonth(newSelectDate)

        if (props.searchFlg === 0 && props.searchParams !== null) {
            // setIsLoading(true)
            getCourtDatas({courtOpenWeekNum: params.weekNumber,
                courtOpenWeekday: params.dayOfWeekInWeek,
                courtOpenTimeZone: props.searchParams.courtOpenTimeZone,
                courtOpenItemId: props.searchParams.courtOpenItemId,
            })
        }
        else if (props.searchFlg === 1 && props.searchParams !== null) {
            // setIsLoading(true)
            getEventDatas({eventOpenDay: formattedDate,
                eventOpenTimeZone: props.searchParams?.courtOpenTimeZone,
                eventItemId: props.searchParams?.courtOpenItemId,
            })
        }

        // 设置定时器
        let timer
        await new Promise((resolve) => {
            timer = setTimeout(() => {
                setIsLoading(false)
                resolve()
            }, 500)
        })
        // 关闭定时器
        clearTimeout(timer)
    }

    const getInfoAfterToday = async () => {
        // 设置分页器页数为1
        setCurrentPage(1)
        setMsg('')

        // 设置载入中动画
        setIsLoading(true)
        // 计算选择框中日期的前一天
        const oneDayInSeconds = 24 * 60 * 60 * 1000; // 一天的秒数
        // 转化为时间戳
        let _dateFromProps = new Date(paramsFromProps).getTime()
        const newSelectDate = _dateFromProps + oneDayInSeconds
        const date = new Date(newSelectDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1，并补零
        const day = String(date.getDate()).padStart(2, '0'); // 补零

        // 拼接成新的日期字符串
        const formattedDate = `${year}-${month}-${day}`;
        setParamsFromProps(formattedDate)

        // console.log(formattedDate)
        console.log(_dateFromProps)
        // 计算第几周、星期几
        const params = calculateWeekDayOfMonth(newSelectDate)

        if (props.searchFlg === 0 && props.searchParams != null) {
            // setIsLoading(true)
            getCourtDatas({courtOpenWeekNum: params.weekNumber,
                courtOpenWeekday: params.dayOfWeekInWeek,
                courtOpenTimeZone: props.searchParams.courtOpenTimeZone,
                courtOpenItemId: props.searchParams.courtOpenItemId,
            })
        }
        else if (props.searchFlg === 1 && props.searchParams != null) {
            // setIsLoading(true)
            getEventDatas({eventOpenDay: formattedDate,
                eventOpenTimeZone: props.searchParams?.courtOpenTimeZone,
                eventItemId: props.searchParams?.courtOpenItemId,
            })
        }

        // 设置定时器
        let timer
        await new Promise((resolve) => {
            timer = setTimeout(() => {
                setIsLoading(false)
                resolve()
            }, 500)
        })
        // 关闭定时器
        clearTimeout(timer)
    }

    const entryEventWithNotLoggedIn = async () => {
        console.log(nickName)
        console.log(mailAddress)
        const params = { nickName, mailAddress,eventInfoId:eventId}
        const response = await api.post('/eventEntryInfo/setInfo', params)
        // Todo 直接向后台发送请求
        console.log(response)
        console.log("bbbbbbbbbbbb")
        setOpen(false)
        getEventDatas()
        setCurrentPage(1)
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
        if (props.searchParams != null) {
            setParamsFromProps(props.searchParams.selectedDate)

            // console.log(dateFromProps)
            if (props.searchFlg === 0) {
                setIsLoading(true)
                getCourtDatas()
            }
            else if (props.searchFlg === 1) {
                setIsLoading(true)
                getEventDatas()
            }
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
    }, [props.searchParams, props.searchFlg, currentPage, getCourtDatas, getEventDatas])

    useEffect(() => {
        // setIsLoading(true)
        setCourtInfoListIsNull(true)
        setCurrentPage(1)
    }, [props.searchFlg])

    // 关闭分页器中使用的定时器
    useEffect(() => {
        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, [timerId]);

    const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 400,
    //     bgcolor: 'background.paper',
    //     border: '2px solid #000',
    //     boxShadow: 24,
    //     p: 4,
    // };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box id="entryModal">
                    <Typography id="modal-modal-title" variant="subtitle1" color="primary">
                        请输入报名信息！
                    </Typography>
                    <div>
                        <FormControl>
                            <InputLabel htmlFor="my-input">请输入昵称</InputLabel>
                            <Input
                                id="my-input"
                                aria-describedby="my-helper-text"
                                value={nickName}
                                onChange={handleChangeNickName}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <InputLabel htmlFor="my-input">请输入邮箱号</InputLabel>
                            <Input
                                id="my-input"
                                aria-describedby="my-helper-text"
                                value={mailAddress}
                                onChange={handleChangeMailAddress}
                            />
                        </FormControl>
                    </div>
                    <div id='entryButton'>
                        <Button variant="contained" onClick={entryEventWithNotLoggedIn}>确认</Button>
                        <Button variant="outlined" onClick={handleClose}>取消</Button>
                    </div>
                </Box>
            </Modal>
            <div id='bar'>
                <div id='label'>
                    <Chip label="全部"></Chip>
                </div>
                {paramsFromProps &&
                    <div id='selectday'>
                        <Typography variant="subtitle2" color="primary">前一天</Typography>
                        <IconButton onClick={getInfoBeforeToday}>
                            <ArrowLeftIcon></ArrowLeftIcon>
                        </IconButton>
                        <Typography variant="subtitle2" color="primary">{paramsFromProps}</Typography>
                        <IconButton onClick={getInfoAfterToday}>
                            <ArrowRightIcon></ArrowRightIcon>
                        </IconButton>
                        <Typography variant="subtitle2" color="primary" >后一天</Typography>
                    </div>}
            </div>
            {isLoading ?
                (<div id='signupdiv'>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </div>
                </div>) :
                (<div id='signupdiv'>
                    {!courtInfoListIsNull && courtInfoList.slice(startIndex,endIndex)}
                    {/* {courtInfoList} */}
                </div>)}
            {!courtInfoListIsNull && !isLoading ? <div style={{ width: '93%', padding: '2vh' }}>
                <Pagination
                    defaultCurrent={1}
                    current={currentPage}
                    total={totalItems}
                    pageSize={9}
                    showSizeChanger={false}
                    size="small"
                    onChange={findNextPageInfos}
                />
            </div> :
                courtInfoListIsNull && !isLoading && <Typography variant="subtitle2" color="primary" >{msg}</Typography>}
        </div>
    )
}