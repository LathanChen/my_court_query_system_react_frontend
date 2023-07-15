import { useState } from "react";
// import './QueryForm.css'
import { InputLabel, FormControl, Select, MenuItem, Box, Typography, Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
// useSelector 和 useDispatch 是两个Hooks,用于连接redux store
import { useDispatch } from 'react-redux';
// useNavigate用于实现路由跳转
import { useNavigate } from 'react-router-dom';

export default function QueryForm(props) {
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
        console.log(`第${weekNumber}周`)
        console.log(`周${dayOfWeekInWeek}`)
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
        courtOpenWeekday,
        courtOpenWeekNum,
        courtOpenTimeZone,
        courtOpenItemId
    }

    // 使用 useSelector hook 来获取 Redux store 中的状态，并返回给组件使用
    // const storeMSg = useSelector(state => state.courtInfoList)

    // 使用 useDispatch hook 来获取一个 dispatch 函数，用于分发 action
    const dispatch = useDispatch();

    // 创建navigate变量,用于router跳转
    const navigate = useNavigate();
    // 传递数据的方式一：
    // 使用父组件传递过来的函数，改变父组件中判断组件是否显示的变量，将查询到的数据返回给父组件，并切换到明细显示的页面
    // function sendAxiosAndGotoShowQueryData() {
    //     axios.get('/courtinfo/getcourtinfo',{params})
    //         .then(response => {
    //             if (response.data.length >0){
    //                 props.setShowFlag(response.data,true)
    //             }
    //             })
    //         .catch(error => console.log(error));
    // }

    // 传递数据的方式二：
    // 发送axios请求后，将接收到的数据保存到store中，通过router导航到数据展示页面
    function sendAxiosAndGotoShowQueryData() {
        console.log(params)
        axios.get('/courtOpenInfo/getInfo', {params})
            .then(response => {
                if (response.data.length >= 0) {
                    dispatch({
                        type:"FINDCOURTINFOLIST",
                        payload:response.data,
                    })
                }
                // 使用{ replace: true }，使得本次路由导航不记录到history里  
                navigate('/homepage/ShowQueryData',{ replace: true });
            })
            .catch(error => console.log(error));
    }

    const claerForm = () =>{
        setSelectedDate(null)
        setCourtOpenTimeZone('')
        setCourtOpenItemId('')
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
                        <MenuItem value={'1'}>上午</MenuItem>
                        <MenuItem value={'2'}>下午</MenuItem>
                        <MenuItem value={'3'}>晚上</MenuItem>
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
                        <MenuItem value={'1'}>篮球</MenuItem>
                        <MenuItem value={'2'}>排球</MenuItem>
                        <MenuItem value={'3'}>乒乓球</MenuItem>
                        <MenuItem value={'4'}>羽毛球</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '2vh'
            }}>
                <Button onClick={sendAxiosAndGotoShowQueryData} variant="contained" sx={{ marginRight: '25vh' }}>确认</Button>
                <Button variant="outlined" onClick={claerForm}>取消</Button>
            </Box>
            <div style={{ height: '38%', width: '100%', backgroundColor: 'rgb(25, 118, 210)', marginTop: '5vh', }}>

            </div>
        </Box>
    )
}