import { useState } from "react";
// import './QueryForm.css'
import { InputLabel, FormControl, Select, MenuItem, Box, Typography, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// useSelector 和 useDispatch 是两个Hooks,用于连接redux store
import { useDispatch } from 'react-redux';
// useNavigate用于实现路由跳转
import { useNavigate } from 'react-router-dom';
import './IndexSearch.css'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}



export default function IndexSearch(props) {

    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedDate(null)
        setCourtOpenTimeZone('')
        setCourtOpenItemId('')
        setValue(newValue);
        props.handleSearchParams(null,newValue)
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const [selectedDate, setSelectedDate] = useState(null);

    const [courtOpenWeekday, setCourtOpenWeekday] = useState();

    const [courtOpenWeekNum, setCourtOpenWeekNum] = useState();

    const [showMes, setShowMsg] = useState(false);

    const handleDateChange = (dateString) => {
        const date = new Date(dateString);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;  // getMonth() 返回 0-11，所以我们需要 +1
        let day = date.getDate();

        let formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        calculateWeekDayOfMonth(date)
        setSelectedDate(formattedDate);
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
        selectedDate,
        courtOpenWeekday,
        courtOpenWeekNum,
        courtOpenTimeZone,
        courtOpenItemId
    }

    const dispatch = useDispatch();

    // 创建navigate变量,用于router跳转
    const navigate = useNavigate();

    // const {handleQueryFormData} = useOutletContext()

    const sendAxiosAndGotoShowCourtData = async () => {
        // handleQueryFormData(params)
        // console.log(params)

        if (Object.values(params).every(value =>
            value === null ||
            value === undefined ||
            value === '')) {
            setShowMsg(true)
        }

        else {
            props.handleSearchParams(params, 0)
        }
        let timer
        await new Promise((resolve) => {
            timer = setTimeout(() => {
                setShowMsg(false)
                resolve()
            }, 3000)
        })
        clearTimeout(timer)
        console.log(timer)
    }

    const sendAxiosAndGotoShowEventData = async () => {
        // handleQueryFormData(params)
        // console.log(params)

        if (Object.values(params).every(value =>
            value === null ||
            value === undefined ||
            value === '')) {
            setShowMsg(true)
        }

        else {
            props.handleSearchParams(params, 1)
        }
        let timer
        await new Promise((resolve) => {
            timer = setTimeout(() => {
                setShowMsg(false)
                resolve()
            }, 3000)
        })
        clearTimeout(timer)
        console.log(timer)
    }

    const claerForm = () => {
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
            justifyContent: 'space-between',
            // 交叉轴的对齐方式
            // alignItems: 'center',
            width: '100%',
            // height: 'calc(100% - 2px)',
            // padding: '1vh',
            // marginLeft: '50px',
            // margin:'1rem',
            // marginTop:'3rem',
            border: '1px solid skyblue',
            overflow: 'hidden',
            // backgroundColor:'#fafafa',
            borderRadius: '20px'
        }}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                <Tab label="查询项目" {...a11yProps(0)} />
                <Tab label="查询活动" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <div style={{
                    // display: 'flex',
                    // justifyContent: 'space-between',
                    // padding: '2vh',
                    // alignSelf: 'flex-start',
                    // width: '90%',
                    height: '2rem'
                }}>
                    {showMes && (
                        <Typography variant="subtitle2" color="primary">
                            请至少选择一项查找条件！
                        </Typography>
                    )}
                </div>
                <div id="search">
                    <FormControl id='time'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* <DemoContainer components={['DatePicker']}> */}
                            <DatePicker
                                value={selectedDate}
                                onChange={handleDateChange}
                                label="时间"
                                sx={{ width: '100%' }} />
                            {/* </DemoContainer> */}
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl id='timezone'>
                        <InputLabel id="demo-simple-select-label1">时间段</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select"
                            value={courtOpenTimeZone}
                            label="请选择时间段"
                            onChange={handleCourtOpenTimeZoneChange}
                            sx={{ width: '100%' }}
                        >
                            <MenuItem value={'1'}>上午</MenuItem>
                            <MenuItem value={'2'}>下午</MenuItem>
                            <MenuItem value={'3'}>晚上</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl id='item'>
                        <InputLabel id="demo-simple-select-label2">项目</InputLabel>
                        <Select
                            labelId="courtOpenItemIdChange"
                            id="courtOpenItemIdChange"
                            value={courtOpenItemId}
                            label="请选择项目"
                            onChange={handleCourtOpenItemIdChange}
                            sx={{ width: '100%' }}
                        >
                            <MenuItem value={'1'}>篮球</MenuItem>
                            <MenuItem value={'2'}>排球</MenuItem>
                            <MenuItem value={'3'}>乒乓球</MenuItem>
                            <MenuItem value={'4'}>羽毛球</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Box id='buttondiv'>
                    {/* <Button onClick={sendAxiosAndGotoShowQueryData} variant="contained" sx={{ marginRight: '25vh' }}>确认</Button> */}
                    <div
                        className="spacearea"
                        style={{ flex: "0 1 25%" }}>

                    </div>
                    <div
                        className="spacearea"
                        style={{ flex: "0 1 25%" }}>

                    </div>
                    <div id="buttons">
                        <Button onClick={sendAxiosAndGotoShowCourtData} variant="contained">确认</Button>
                        <Button variant="outlined" onClick={claerForm}>取消</Button>
                    </div>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <div style={{
                    // display: 'flex',
                    // justifyContent: 'space-between',
                    // padding: '2vh',
                    // alignSelf: 'flex-start',
                    // width: '90%',
                    height: '2rem'
                }}>
                    {showMes && (
                        <Typography variant="subtitle2" color="primary">
                            请至少选择一项查找条件！
                        </Typography>
                    )}
                </div>
                <div id="search">
                    <FormControl id='time'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* <DemoContainer components={['DatePicker']}> */}
                            <DatePicker
                                value={selectedDate}
                                onChange={handleDateChange}
                                label="时间"
                                sx={{ width: '100%' }} />
                            {/* </DemoContainer> */}
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl id='timezone'>
                        <InputLabel id="demo-simple-select-label1">时间段</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select"
                            value={courtOpenTimeZone}
                            label="请选择时间段"
                            onChange={handleCourtOpenTimeZoneChange}
                            sx={{ width: '100%' }}
                        >
                            <MenuItem value={'1'}>上午</MenuItem>
                            <MenuItem value={'2'}>下午</MenuItem>
                            <MenuItem value={'3'}>晚上</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl id='item'>
                        <InputLabel id="demo-simple-select-label2">项目</InputLabel>
                        <Select
                            labelId="courtOpenItemIdChange"
                            id="courtOpenItemIdChange"
                            value={courtOpenItemId}
                            label="请选择项目"
                            onChange={handleCourtOpenItemIdChange}
                            sx={{ width: '100%' }}
                        >
                            <MenuItem value={'1'}>篮球</MenuItem>
                            <MenuItem value={'2'}>排球</MenuItem>
                            <MenuItem value={'3'}>乒乓球</MenuItem>
                            <MenuItem value={'4'}>羽毛球</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Box id='buttondiv'>
                    {/* <Button onClick={sendAxiosAndGotoShowQueryData} variant="contained" sx={{ marginRight: '25vh' }}>确认</Button> */}
                    <div
                        className="spacearea"
                        style={{ flex: "0 1 25%" }}>

                    </div>
                    <div
                        className="spacearea"
                        style={{ flex: "0 1 25%" }}>

                    </div>
                    <div id="buttons">
                        <Button onClick={sendAxiosAndGotoShowEventData} variant="contained">确认</Button>
                        <Button variant="outlined" onClick={claerForm}>取消</Button>
                    </div>
                </Box>
            </TabPanel>
        </Box>
    )
}