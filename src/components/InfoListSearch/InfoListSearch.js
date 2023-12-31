import React, { useState, useEffect } from 'react';
import { InputLabel, FormControl, Select, MenuItem, Box, Typography, Button } from '@mui/material';
import api from '../../api';
import Icon from '@mui/material/Icon';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

export default function InfoListSearch(props) {
    const [itemnames, setItemnames] = useState([])
    const [courtnames, setCourtnames] = useState([])
    const [courtOpenItemId, setCourtOpenItemId] = useState('')
    const [courtOpenWeekNum, setCourtOpenWeekNum] = useState('')
    const [courtOpenWeekday, setCourtOpenWeekday] = useState('')
    const [courtOpenCourtId, setCourtOpenCourtId] = useState('')
    const [courtOpenTimeZone, setCourtOpenTimeZone] = useState('')

    const changeCourtOpenItemId = (event) => {
        setCourtOpenItemId(event.target.value);
    };
    const changeCourtOpenWeekNum = (event) => {
        setCourtOpenWeekNum(event.target.value);
    };
    const changeCourtOpenWeekday = (event) => {
        setCourtOpenWeekday(event.target.value);
    };
    const changeCourtOpenCourtId = (event) => {
        setCourtOpenCourtId(event.target.value);
    };
    const changeCourtOpenTimeZone = (event) => {
        setCourtOpenTimeZone(event.target.value);
    };

    // 检查完用户是否至少输入一项查询数据后，控制提示信息的出现和关闭
    const [showMes, setShowMsg] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await api.get('/iteminfo')
                const response2 = await api.get('/courtinfo')
                if (response1.data.length !== 0 && response2.data.length !== 0) {
                    setItemnames(response1.data)
                    setCourtnames(response2.data)
                }
            }
            catch (error) {
                setItemnames([])
                setCourtnames([])
                console.error(error);
            }
        }
        fetchData()

        // 如果在明细界面点击了删除按钮，就向后台发送一次查询请求
        if (props.InfoListSearchShouldRefresh === true) {
            props.InfoListSearchRefresh(false)
            sendInfoQuery()
        }

    }, [props.InfoListSearchShouldRefresh])

    const weekDayMap = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
    const weekNumMap = ['第一周','第二周','第三周','第四周','第五周','第六周','每周']

    const sendInfoQuery = () => {
        const fetchData = async () => {
            const params = {
                courtOpenItemId,
                courtOpenWeekNum,
                courtOpenWeekday,
                courtOpenCourtId,
                courtOpenTimeZone,
            }
            if (Object.values(params).every(value =>
                value === null ||
                value === undefined ||
                value === '')) {
                setShowMsg(true)
            }
            else {
                try {
                    console.log(params);
                    const response = await api.get('/courtOpenInfo/getInfoByAdmin', { params });
                    // 请求成功后的操作
                    if (response.data.length !== 0) {
                        console.log(response.data);

                        const queryData = response.data.map((data) => {
                            return {
                                courtOpenInfoId: data.courtOpenInfoId,
                                itemInfoName: data.itemInfo.itemInfoName,
                                courtOpenTimeZone: (data.courtOpenTimeZone === '1' ? '上午' : (data.courtOpenTimeZone === '2' ? '下午' : '晚上')),
                                courtOpenTime: data.courtOpenTime,
                                courtName: data.courtInfo.courtName,
                                courtWeekNum:(weekNumMap[data.courtOpenWeekNum] ? weekNumMap[data.courtOpenWeekNum] : '-'),
                                courtWeekDay:(weekDayMap[data.courtOpenWeekday] ? weekDayMap[data.courtOpenWeekday] : '-')
                            }
                        })
                        console.log(queryData)
                        props.takeQuertData(queryData)
                    }
                    else {

                    }
                } catch (error) {
                    console.error(error);
                }
            }
            let timer
            await new Promise((resolve) => {
                timer = setTimeout(() =>{
                    setShowMsg(false)
                    resolve()
                }, 3000)                         
            })
            console.log(timer)
            clearTimeout(timer)          
        };

        fetchData();
    }

    const clearParams = () => {
        setCourtOpenItemId('')
        setCourtOpenWeekNum('')
        setCourtOpenWeekday('')
        setCourtOpenCourtId('')
        setCourtOpenTimeZone('')
    }
    return (
        <Box sx={{
            height: '25vh',
            // width:'60%',
            padding: '1vh',
            border: '1px solid skyblue',
        }}>
            <Icon>
                <SearchIcon />
            </Icon>
            快速搜索
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap ',
                    paddingLeft: '1vw',
                    paddingRight: '1vw',
                    width: '80%'
                }}>
                    <div style={{
                        // width: '28%',
                        marginRight: '3%',
                        flex:'0 1 28%'
                    }}>
                        <FormControl sx={{ width: '100%', marginTop: '1vh' }}>
                            {/* todo:每个选择框要有一个全项目唯一的id */}
                            <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }}>项目</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={courtOpenItemId}
                                label="请选择项目"
                                // sx={{ height: '6vh' }}
                                onChange={changeCourtOpenItemId}
                            >

                                {(Array.isArray(itemnames)) && (itemnames.map((item) =>
                                    (<MenuItem value={item.itemInfoId} key={item.itemInfoId}>{item.itemInfoName}</MenuItem>)))}
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{
                        // width: '28%',
                        marginRight: '3%',
                        flex:'0 1 28%'
                    }}>
                        <FormControl sx={{ width: '100%', marginTop: '1vh' }}>
                            {/* todo:每个选择框要有一个全项目唯一的id */}
                            <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }}>周数</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={courtOpenWeekNum}
                                label="请选择周数"
                                // sx={{ height: '6vh' }}
                                onChange={changeCourtOpenWeekNum}
                            >
                                <MenuItem value={7}>每周</MenuItem>
                                <MenuItem value={1}>第一周</MenuItem>
                                <MenuItem value={2}>第二周</MenuItem>
                                <MenuItem value={3}>第三周</MenuItem>
                                <MenuItem value={4}>第四周</MenuItem>
                                <MenuItem value={5}>第五周</MenuItem>
                                <MenuItem value={6}>第六周</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{
                        // width: '28%',
                        marginRight: '3%',
                        flex:'0 1 28%'
                    }}>
                        <FormControl sx={{ width: '100%', marginTop: '1vh' }}>
                            {/* todo:每个选择框要有一个全项目唯一的id */}
                            <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }}>星期数</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={courtOpenWeekday}
                                label="请选择项目"
                                // sx={{ height: '6vh' }}
                                onChange={changeCourtOpenWeekday}
                            >
                                <MenuItem value={1}>星期一</MenuItem>
                                <MenuItem value={2}>星期二</MenuItem>
                                <MenuItem value={3}>星期三</MenuItem>
                                <MenuItem value={4}>星期四</MenuItem>
                                <MenuItem value={5}>星期五</MenuItem>
                                <MenuItem value={6}>星期六</MenuItem>
                                <MenuItem value={7}>星期日</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{
                        // width: '28%',
                        // marginRight: '3%',
                        flex:'0 1 28%',
                        marginRight: '3%',
                        marginTop: '1vh'
                    }}>
                        <FormControl sx={{ width: '100%', marginTop: '1vh' }}>
                            {/* todo:每个选择框要有一个全项目唯一的id */}
                            <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }}>场地</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={courtOpenCourtId}
                                label="请选择场地"
                                // sx={{ height: '6vh' }}
                                onChange={changeCourtOpenCourtId}
                            >
                                {(Array.isArray(courtnames)) && courtnames.map((item) =>
                                    (<MenuItem value={item.courtId} key={item.courtId}>{item.courtName}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{
                        // width: '28%',
                        // marginRight: '3%',
                        flex:'0 1 28%',
                        marginRight: '3%',
                        marginTop: '1vh'
                    }}>
                        <FormControl sx={{ width: '100%', marginTop: '1vh' }}>
                            {/* todo:每个选择框要有一个全项目唯一的id */}
                            <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }}>时间段</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={courtOpenTimeZone}
                                label="请选择时间段"
                                // sx={{ height: '6vh' }}
                                onChange={changeCourtOpenTimeZone}
                            >
                                <MenuItem value={1}>上午</MenuItem>
                                <MenuItem value={2}>下午</MenuItem>
                                <MenuItem value={3}>晚上</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {showMes && (
                        <Typography variant="subtitle2" color="primary" sx={{ alignSelf: 'center' }}>
                            请至少选择一项查找条件！
                        </Typography>
                    )}
                    {/* <div style={{
                        width: '28%',
                        marginTop: '1vh'
                    }}>
                        <FormControl sx={{ width: '100%' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="请选择日期"  sx={{ width: '100%' }}/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </FormControl>
                    </div> */}
                </div>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    // height: '7vh',
                    marginRight: '5vw',
                    padding: '1vh'
                }}>
                    <Button
                        variant="contained"
                        onClick={sendInfoQuery}
                        sx={{ marginRight: '3vh' }}>确认</Button>
                    <Button variant="outlined" onClick={clearParams}>取消</Button>
                </Box>
            </div>
        </Box>
    );
}