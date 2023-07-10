import { useState } from "react";
// import './QueryForm.css'
import { InputLabel, FormControl, Select, MenuItem, Box, Typography, Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// useNavigate用于实现路由跳转
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// useSelector 和 useDispatch 是两个Hooks,用于连接redux store
import { useDispatch } from 'react-redux';
// 用于将页面的日期格式转化为后端方便处理的数字格式
import dayjs from 'dayjs';

export default function FindTeam(props) {
    const [teamItemId, setTeamItemId] = useState('')

    const handleChange = (event) => {
        setTeamItemId(event.target.value)
        console.log(event.target.value)
    }
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        const formattedDate = dayjs(date).format('YYYYMMDD');
        console.log(formattedDate)
        setSelectedDate(formattedDate);
    };

    const axiosParam = {
        teamItemId: teamItemId,
        planningDate: selectedDate
    }

    // 显示查询信息方式一:
    // 通过props传递过来的方法,改变父组件中用于控制组件显示的变量值
    // const showData = () =>{
    //     props.changeShowQuertFormOrNot(!(props.showQuertFormOrNot))
    // }

    // 显示查询信息方式二:
    // 通过路由方式跳转
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 踩坑记录：axios发送请求时，携带参数的对象名字不能随便起，最好命名为params，如果是其他名称，需要写成如下的对象形式
    function sendAxiosAndGotoShowTeamData() {
        axios.get('/teamPlanningInfo/getteamplanninginfo', { params:axiosParam })
            .then(response => {
                if (response.data.length >= 0) {
                    console.log(response.data)
                    dispatch({
                        type: "FINDTEAMPLANNINGINFOF",
                        payload: response.data,
                    })
                }
                setTeamItemId("")
                setSelectedDate(null)
                // 使用{ replace: true }，使得本次路由导航不记录到history里               
                navigate('/homepage/ShowTeamData',{ replace: true });
            })
            .catch(error => console.log(error));
    }

    const clearForm = () => {
        setSelectedDate(null)
        setTeamItemId('')
    }

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
                padding: '1vh',
                marginBottom: '1vh'
            }}>
                <Typography variant="h5" color="primary">
                    寻找队伍
                </Typography>
            </div>
            <FormControl sx={{ width: '100%', }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            value={selectedDate}
                            onChange={handleDateChange}
                            label="请选择时间"
                            sx={{ width: '100%' }} />
                    </DemoContainer>
                </LocalizationProvider>
            </FormControl>
            <FormControl sx={{ width: '100%', marginTop: '1vh' }}>
                <InputLabel id="demo-simple-select-label">项目</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={teamItemId}
                    label="请选择项目"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>篮球</MenuItem>
                    <MenuItem value={2}>排球</MenuItem>
                    <MenuItem value={3}>乒乓球</MenuItem>
                    <MenuItem value={4}>羽毛球</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '2vh'
            }}>
                <Button variant="contained" sx={{ marginRight: '3vh' }} onClick={sendAxiosAndGotoShowTeamData}>确认</Button>
                <Button variant="outlined" onClick={clearForm}>取消</Button>
            </Box>
        </Box>
    )
}