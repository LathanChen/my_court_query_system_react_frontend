import React, { useState, useEffect } from 'react';
// import './QueryForm.css'
import { InputLabel, FormControl, Select, MenuItem, Box, Typography, Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import axios from 'axios'; //部署用

export default function AdminPageAddItempage(props) {

    const [itemnames, setItemnames] = useState([])
    const [courtnames, setCourtnames] = useState([])
    const [courtOpenItemId, setCourtOpenItemId] = useState('')
    const [courtOpenWeekNum, setCourtOpenWeekNum] = useState('')
    const [courtOpenWeekday, setCourtOpenWeekday] = useState('')
    const [courtOpenCourtId, setCourtOpenCourtId] = useState('')
    const [courtOpenTimeZone, setCourtOpenTimeZone] = useState('')
    const [courtOpenBeginTime, setCourtOpenBeginTime] = useState(null)
    const [courtOpenEndTime, setCourtOpenEndTime] = useState(null)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const changeCourtOpenItemId = (event) => {
        console.log(event.target.value)
        setCourtOpenItemId(event.target.value);
    };
    const changeCourtOpenWeekNum = (event) => {
        console.log(event.target.value)
        setCourtOpenWeekNum(event.target.value);
    };
    const changeCourtOpenWeekday = (event) => {
        console.log(event.target.value)
        setCourtOpenWeekday(event.target.value);
    };
    const changeCourtOpenCourtId = (event) => {
        console.log(event.target.value)
        setCourtOpenCourtId(event.target.value);
    };
    const changeCourtOpenTimeZone = (event) => {
        console.log(event.target.value)
        setCourtOpenTimeZone(event.target.value);
    };
    const changeCourtOpenBeginTime = (data) => {
        console.log(data)
        setCourtOpenBeginTime(data);
    };
    const changeCourtOpenEndTime = (data) => {
        console.log(data)
        setCourtOpenEndTime(data);
    };

    const clearForm = () => {
        setCourtOpenItemId('')
        setCourtOpenWeekNum('')
        setCourtOpenWeekday('')
        setCourtOpenCourtId('')
        setCourtOpenTimeZone('')
        setCourtOpenBeginTime(null)
        setCourtOpenEndTime(null)
    }
    
    const setTimetoString = timedata => {
        return dayjs(timedata).format('HH:mm');
    };

    // 使用useNavigate回到上一页
    const navigate  = useNavigate();

    // todo:按取消后回到上一页
    const backToLastPage = () => {
        navigate(-1)
    }

    const params = {
        courtOpenItemId,
        courtOpenCourtId,
        courtOpenWeekNum,
        courtOpenWeekday,
        courtOpenTimeZone,
        courtOpenTime: `${setTimetoString(courtOpenBeginTime)}-${setTimetoString(courtOpenEndTime)}`
    }

    const checkParamsNull = (params) => {
        for (const value of Object.values(params)) {
          if (value === '' || value === null) {
            console.log('true')
            return true;
          }
        }
        return false;
      };

    const insertNewOpenInfo = () => {

        const fetchData = async () => {
            if (courtOpenBeginTime && 
                courtOpenEndTime && 
                courtOpenBeginTime.isAfter(courtOpenEndTime)) {
                // todo:出现"开始时间不能晚于结束时间"提示框
                setErrorMsg('开始时间不能晚于结束时间！')
            }
            else if (checkParamsNull(params)) {
                // todo:出现"开始时间不能晚于结束时间"提示框
                setErrorMsg('请将信息填写完整！')
            }
            else{
                try {
                    //   console.log(setTimetoString(courtOpenBeginTime))
                    const response = await api.post('/courtOpenInfo/setInfo', params)
                    // console.log(response.data)
                    if (response.data.code === 200 && response.data.data === true) {
                        // todo:出现“添加成功”提示框
                        console.log('成功了')
                        setShowSuccessAlert(true)                        
                        let timer
                        await new Promise((resolve) => {
                            timer = setTimeout(() => {                                
                                resolve()
                            }, 2000);
                          });
                          console.log(timer)
                          clearTimeout(timer)
                          backToLastPage()
                    }
                }
                catch (error) {
                    console.error(error)
                    setErrorMsg(error)
                }
            }
        }
        fetchData()
    }
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
                console.error(error);
            }
        }
        if (showSuccessAlert) {
            const timer = setTimeout(() => {
                setShowSuccessAlert(false);
            }, 2000); // 2秒后自动隐藏
            return () => clearTimeout(timer);
        }
        if (errorMsg) {
            const timer = setTimeout(() => {
                setErrorMsg('');
            }, 2000); // 2秒后自动隐藏
            return () => clearTimeout(timer);
        }
        fetchData()
    }, [showSuccessAlert, errorMsg])

    return (
            <Box sx={{
                // 开启flex布局
                display: 'flex',
                // 改变felx主轴方向
                flexDirection: 'column',
                // 主轴的对齐方式
                // justifyContent: 'center',
                // 交叉轴的对齐方式
                alignItems: 'center',
                width: '32vw',
                height: '90vh',
                margin: 'auto',
                // padding: '1vh',
                // marginLeft: '50px',
                // marginTop:'50px',
                border: '1px solid skyblue',
                overflow: 'auto'
            }}>
                <div style={{ marginTop: '3vh' }}>
                    <Typography variant="h5" color="primary">填写完成后点击确认即可添加信息</Typography>
                </div>
                <div>
                    <div style={{ height:'6vh' }}>
                    {showSuccessAlert && (
                   <Alert severity="success" sx={{opacity:'0.8'}}>添加信息成功!</Alert>
                )}
                {errorMsg && (
                    <Alert severity="warning" sx={{opacity:'0.8'}}>{errorMsg}</Alert>
                )}
                    </div>

                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30vw',
                    padding: '5px',
                    height: '8vh'
                }}>
                    <div style={{ width: '5vw', display: 'flex', alignItems: 'center' }}>
                    {/* <div style={{ flex:'0 0 5vw',textAlign:'right' }}> */}
                        <Typography variant="subtitle2" color="primary">项目：</Typography>
                    </div>
                    <FormControl sx={{ width: '50%' }}>
                        <InputLabel id="demo-simple-select-label1" sx={{ fontSize: "10px", textAlign: 'center' }}>请选择项目</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select"
                            value={courtOpenItemId}
                            label="请选择项目"
                            onChange={changeCourtOpenItemId}
                            sx={{ height: '42px' }}
                        >
                            {(Array.isArray(itemnames)) && (itemnames.map((item) =>
                                (<MenuItem value={item.itemInfoId} key={item.itemInfoId}>{item.itemInfoName}</MenuItem>)))}
                        </Select>
                    </FormControl>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30vw',
                    padding: '5px',
                    height: '8vh'
                }}>
                    <div style={{ width: '5vw', display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" color="primary">地点：</Typography>
                    </div>
                    <FormControl sx={{ width: '50%' }}>
                        <InputLabel id="demo-simple-select-label1" sx={{ fontSize: "10px", textAlign: 'center' }}>请选择地点</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select"
                            value={courtOpenCourtId}
                            label="请选择时间段"
                            onChange={changeCourtOpenCourtId}
                            sx={{ height: '42px' }}
                        >
                            {(Array.isArray(courtnames)) && courtnames.map((item) =>
                                (<MenuItem value={item.courtId} key={item.courtId}>{item.courtName}</MenuItem>))}
                        </Select>
                    </FormControl>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30vw',
                    padding: '5px',
                    height: '8vh'
                }}>
                    <div style={{ width: '5vw', display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" color="primary">周数：</Typography>
                    </div>
                    <FormControl sx={{ width: '50%' }}>
                        <InputLabel id="demo-simple-select-label1" sx={{ fontSize: "10px", textAlign: 'center' }}>请选择周数</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select"
                            value={courtOpenWeekNum}
                            label="请选择时间段"
                            onChange={changeCourtOpenWeekNum}
                            sx={{ height: '42px' }}
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30vw',
                    padding: '5px',
                    height: '8vh'
                }}>
                    <div style={{ width: '5vw', display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" color="primary">星期：</Typography>
                    </div>
                    <FormControl sx={{ width: '50%' }}>
                        <InputLabel id="demo-simple-select-label1" sx={{ fontSize: "10px", textAlign: 'center' }}>请选择星期</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select"
                            value={courtOpenWeekday}
                            label="请选择时间段"
                            onChange={changeCourtOpenWeekday}
                            sx={{ height: '42px' }}
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30vw',
                    padding: '5px',
                    height: '8vh'
                }}>
                    <div style={{ width: '5vw', display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" color="primary">时间段：</Typography>
                    </div>
                    <FormControl sx={{ width: '50%' }}>
                        <InputLabel id="demo-simple-select-label1" sx={{ fontSize: "10px", textAlign: 'center' }}>请选择时间段</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select"
                            value={courtOpenTimeZone}
                            label="请选择时间段"
                            onChange={changeCourtOpenTimeZone}
                            sx={{ height: '42px' }}
                        >
                            <MenuItem value={'1'}>上午</MenuItem>
                            <MenuItem value={'2'}>下午</MenuItem>
                            <MenuItem value={'3'}>晚上</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30vw',
                    padding: '5px',
                    height: '8vh'
                }}>
                    <div style={{ width: '5vw', display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" color="primary">开始时间：</Typography>
                    </div>
                    <FormControl sx={{ width: '50%', }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <TimePicker
                                    value={courtOpenBeginTime}
                                    onChange={changeCourtOpenBeginTime}
                                    label={<Typography sx={{ fontSize: '12px' }}>请选择开始时间</Typography>}
                                    slotProps={{ textField: { size: 'small' } }} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30vw',
                    padding: '5px',
                    height: '8vh'
                }}>
                    <div style={{ width: '5vw', display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" color="primary">结束时间：</Typography>
                    </div>
                    <FormControl sx={{ width: '50%', }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <TimePicker
                                    value={courtOpenEndTime}
                                    onChange={changeCourtOpenEndTime}
                                    label={<Typography sx={{ fontSize: '12px' }}>请选择结束时间</Typography>}
                                    slotProps={{ textField: { size: 'small' } }} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                </div>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '2vh'
                }}>
                    <Button variant="contained" sx={{ marginRight: '25vh' }} onClick={insertNewOpenInfo}>确认</Button>
                    <Button variant="outlined" onClick={clearForm}>取消</Button>
                </Box>
            </Box>
    )
}