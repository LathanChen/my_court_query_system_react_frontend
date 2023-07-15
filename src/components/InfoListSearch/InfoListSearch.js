import * as React from 'react';
import { InputLabel, FormControl, Select, MenuItem, Box, Typography, Button } from '@mui/material';
import Icon from '@mui/material/Icon';
import SearchIcon from '@mui/icons-material/Search';

export default function InfoListSearch(props) {


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
                alignItems:'flex-start'
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
                        width: '28%',
                        marginRight: '3vw'
                    }}>
                        <FormControl sx={{ width: '100%', marginTop: '1vh' }}>
                            {/* todo:每个选择框要有一个全项目唯一的id */}
                            <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }}>项目</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={''}
                                label="请选择项目"
                                sx={{ height: '6vh' }}
                            // onChange={}
                            >
                                <MenuItem value={1}>篮球</MenuItem>
                                <MenuItem value={2}>排球</MenuItem>
                                <MenuItem value={3}>乒乓球</MenuItem>
                                <MenuItem value={4}>羽毛球</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{
                        width: '28%',
                        marginRight: '3vw'
                    }}>
                        <FormControl sx={{ width: '100%', marginTop: '1vh' }}>
                            {/* todo:每个选择框要有一个全项目唯一的id */}
                            <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }}>场地</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={''}
                                label="请选择项目"
                                sx={{ height: '6vh' }}
                            // onChange={}
                            >
                                <MenuItem value={1}>篮球</MenuItem>
                                <MenuItem value={2}>排球</MenuItem>
                                <MenuItem value={3}>乒乓球</MenuItem>
                                <MenuItem value={4}>羽毛球</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{
                        width: '28%',
                        marginRight: '3vw',
                    }}>
                        <FormControl sx={{ width: '100%', marginTop: '1vh' }}>
                            {/* todo:每个选择框要有一个全项目唯一的id */}
                            <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }}>周数</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={''}
                                label="请选择项目"
                                sx={{ height: '6vh' }}
                            // onChange={}
                            >
                                <MenuItem value={1}>篮球</MenuItem>
                                <MenuItem value={2}>排球</MenuItem>
                                <MenuItem value={3}>乒乓球</MenuItem>
                                <MenuItem value={4}>羽毛球</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{
                        width: '28%',
                        marginRight: '3vw',
                        marginTop: '1vh'
                    }}>
                        <FormControl sx={{ width: '100%', marginTop: '1vh' }}>
                            {/* todo:每个选择框要有一个全项目唯一的id */}
                            <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }}>星期数</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={''}
                                label="请选择项目"
                                sx={{ height: '6vh' }}
                            // onChange={}
                            >
                                <MenuItem value={1}>篮球</MenuItem>
                                <MenuItem value={2}>排球</MenuItem>
                                <MenuItem value={3}>乒乓球</MenuItem>
                                <MenuItem value={4}>羽毛球</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{
                        width: '28%',
                        marginTop: '1vh'
                    }}>
                        <FormControl sx={{ width: '100%', marginTop: '1vh' }}>
                            {/* todo:每个选择框要有一个全项目唯一的id */}
                            <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }}>时间</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={''}
                                label="请选择项目"
                                sx={{ height: '6vh' }}
                            // onChange={}
                            >
                                <MenuItem value={1}>篮球</MenuItem>
                                <MenuItem value={2}>排球</MenuItem>
                                <MenuItem value={3}>乒乓球</MenuItem>
                                <MenuItem value={4}>羽毛球</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    height:'7vh',
                    marginRight:'5vw',
                    padding:'1vh'
                }}>
                    <Button variant="contained" sx={{ marginRight: '3vh' }}>确认</Button>
                    <Button variant="outlined">取消</Button>
                </Box>
            </div>
        </Box>
    );
}