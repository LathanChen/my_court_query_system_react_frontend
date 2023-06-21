import { useState } from "react";
// import './QueryForm.css'
import { InputLabel, FormControl, Select, MenuItem, Box, Typography, Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
export default function QueryForm() {
    const [time, setTime] = useState('')

    // const handleChange = (event) => {
    //     setAge(event.target.value)
    // }
    const [selectedDate, setSelectedDate] = useState(null);

    const [courtOpenWeekday, setCourtOpenWeekday] = useState();
    
    const [courtOpenWeekNum, setCourtOpenWeekNum] = useState();

    const handleDateChange = (dateString) => {
        const date = new Date(dateString);
        calculateWeekDayOfMonth(date)
        setSelectedDate(date);
    };

    function calculateWeekDayOfMonth(date) {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const dayOfWeek = firstDayOfMonth.getDay();
        const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 将星期天(0)转换为6，星期一(1)转换为0，以此类推
        const dayOfMonth = date.getDate() - 1;
        const daysSinceStartOfMonth = adjustedDayOfWeek + dayOfMonth;
        const weekNumber = Math.floor(daysSinceStartOfMonth / 7) + 1;
        const dayOfWeekInWeek = (daysSinceStartOfMonth % 7) + 1;
        console.log(weekNumber)
        console.log(dayOfWeekInWeek)
        setCourtOpenWeekday(dayOfWeekInWeek)
        setCourtOpenWeekNum(weekNumber)
    }

    const [courtOpenTimeZone, setCourtOpenTimeZone] = useState('')

    const handleCourtOpenTimeZoneChange = (event) => {
        setCourtOpenTimeZone(event.target.value);
    };

    const [courtOpenItemId, setCourtOpenItemId] = useState('')

    const handleCourtOpenItemIdChange = (event) => {
        setCourtOpenItemId(event.target.value);
    };

    const params = {
        courtOpenWeekday:courtOpenWeekday,
        courtOpenWeekNum:courtOpenWeekNum,
        courtOpenTimeZone:courtOpenTimeZone,
        courtOpenItemId:courtOpenItemId,
    }

    function sendAxios() {
        axios.get('/courtinfo/getcourtinfo',{params})
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
    }

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
            width: '100%',
            height: '100%',
            // padding: '1vh',
            // marginLeft: '50px',
            // marginTop:'50px',
            border: '1px solid skyblue',
            overflow: 'auto'
        }}>
            <div style={{ padding: '2vh', alignSelf: 'flex-start' }}>
                <Typography variant="h5" color="primary">输入数据即可进行查询</Typography>
            </div>
            <div style={{ width: '95%', padding: '5px' }}>
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
                <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                    <InputLabel id="demo-simple-select-label1">时间段</InputLabel>
                    <Select
                        labelId="demo-simple-select-label1"
                        id="demo-simple-select"
                        value={courtOpenTimeZone}
                        label="请选择时间段"
                        onChange={handleCourtOpenTimeZoneChange}
                    >
                        <MenuItem value={1}>上午</MenuItem>
                        <MenuItem value={2}>下午</MenuItem>
                        <MenuItem value={3}>晚上</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                    <InputLabel id="demo-simple-select-label2">项目</InputLabel>
                    <Select
                        labelId="courtOpenItemIdChange"
                        id="courtOpenItemIdChange"
                        value={courtOpenItemId}
                        label="请选择项目"
                        onChange={handleCourtOpenItemIdChange}
                    >
                        <MenuItem value={1}>篮球</MenuItem>
                        <MenuItem value={2}>排球</MenuItem>
                        <MenuItem value={3}>乒乓球</MenuItem>
                        <MenuItem value={4}>羽毛球</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '2vh'
            }}>
                <Button onClick={sendAxios} variant="contained" sx={{ marginRight: '25vh' }}>确认</Button>
                <Button variant="outlined">取消</Button>
            </Box>
            <div style={{ height: '38%', width: '100%', backgroundColor: 'rgb(25, 118, 210)', marginTop: '5vh', }}>

            </div>
        </Box>
    )
}