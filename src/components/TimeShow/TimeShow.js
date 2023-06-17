import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function TimeShow() {
    const [time, setTime] = useState(new Date());
    // 创建一个表示当前日期的 Date 对象
    const currentDate = new Date();
    console.log(currentDate)
    // 获取当前日期是本月的第几天
    const currentDay = currentDate.getDate();

    // 获取当前日期是本周的第几天 (0 表示周日，1 表示周一，依次类推)
    const currentWeekDay = currentDate.getDay();

    // 计算当前日期是本月的第几周
    const currentWeekOfMonth = Math.ceil((currentDay + currentWeekDay) / 7);
    const weekMap = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
    };
    const [weekNum, setWeekNum] = useState(weekMap[currentWeekOfMonth]);

    const dayMap = {
        0: '星期日',
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六',
    };
    const [dayNum, setDayNum] = useState(dayMap[currentWeekDay]);


    const monthMap = {
        0: '一',
        1: '二',
        2: '三',
        3: '四',
        4: '五',
        5: '六',
        6: '七',
        7: '八',
        8: '九',
        9: '十',
        10: '十一',
        11: '十二',
    };
    const [monthNum, setMonthNum] = useState(monthMap[currentDate.getMonth()]);

    const textStyle = {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        textDecoration: 'underline',
        textTransform: 'uppercase',
        lineHeight: '1.5',
        letterSpacing: '1px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    };
    // useEffect函数接受两个参数：一个是副作用函数（Effect Function），另一个是依赖数组（Dependency Array）。
    // 副作用函数会在每次组件渲染完成后执行。它可以执行各种副作用操作，比如添加订阅、发送网络请求、修改DOM等。在函数组件中，
    // 副作用函数是无法直接使用async/await语法的，但可以通过在函数内部定义一个异步函数来达到相同的效果。
    // 依赖数组是一个可选的参数，用于指定副作用函数的依赖项。只有当依赖项发生变化时，副作用函数才会被执行。如果省略了依赖数组，副作用函数将在每次组件渲染后都会被执行
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        // useEffect函数还可以返回一个清理函数，用于清除副作用产生的资源，比如取消订阅、清除定时器等。当组件被卸载时，React会自动调用清理函数。
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Box sx={{
           
            // flexWrap: 'wrap',
            // width: '100%',
            height: '260px',
            padding: '10px',
            // marginLeft: '50px',
            // marginTop: '50px',
            border: '1px solid skyblue'
        }}>

                    <div>
                        {time.getFullYear()}年{time.getMonth()+1}月{time.getDate()}日
                    </div>
                    <div>
                        {time.toLocaleTimeString()}
                    </div>
            
            <div style={{
                width: '100%',
                display: 'flex',
                marginTop:'50px',
                justifyContent:'flex-start',
                alignItems:'center',
                color: 'rgb(25, 118, 210)',
            }}>
                                <div>
                    <CalendarMonthIcon style={{ fontSize: '140px', color: 'rgb(25, 118, 210)' }}></CalendarMonthIcon>
                </div>
                <div style={{marginLeft:'80px',fontSize: '40px',}}>
                    <div>
                        第{weekNum}周
                    </div>
                    <div>
                        {dayNum}
                    </div>
                </div>


            </div>


        </Box>
    )
}