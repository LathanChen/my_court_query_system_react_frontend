import { useState } from "react";
// import './QueryForm.css'
import { InputLabel, FormControl, Select, MenuItem, Box, Typography,Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FindTeam() {
    const [age, setAge] = useState('')

    const handleChange = (event) => {
        setAge(event.target.value)
    }
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const [ages, setAges] = useState([1, 2, 3])
    return (
        <Box sx={{
            height: '260px',
            padding: '10px',
            // marginLeft: '50px',
            // marginTop: '50px',
            border: '1px solid skyblue'
        }}>
            <div style={{ 
                marginBottom: '10px'
                 }}>
                <Typography variant="h5" color="primary">
                    寻找队伍
                    </Typography>
            </div>
            <FormControl sx={{ width: '100%', }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="请选择时间" sx={{ width: '100%' }} />
                    </DemoContainer>
                </LocalizationProvider>
            </FormControl>
            <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                <InputLabel id="demo-simple-select-label">项目</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="请选择时间段"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>{ages[0]}</MenuItem>
                    <MenuItem value={20}>{ages[1]}</MenuItem>
                    <MenuItem value={30}>{ages[2]}</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '20px'
            }}>
                <Button variant="contained" sx={{ marginRight: '60px' }}>确认</Button>
                <Button variant="outlined">取消</Button>
            </Box>
        </Box>
    )
}