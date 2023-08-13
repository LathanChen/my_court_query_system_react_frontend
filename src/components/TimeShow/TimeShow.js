import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import IconButton from '@mui/material/IconButton';

export default function TimeShow(props) {
    const [time, setTime] = useState(new Date());
    // 创建一个表示当前日期的 Date 对象
    // const currentDate = new Date();
    // console.log(currentDate)

    const weekMap = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
    };
    const [weekNum, setWeekNum] = useState(null);

    const dayMap = {
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六',
        7: '星期日',
    };
    const [dayNum, setDayNum] = useState(null);

    const changeDatePlus = () => {
        // getTime()获取的是Date对象的时间戳
        const newTimestamp = time.getTime() + 24 * 60 * 60 * 1000; // 增加24小时的毫秒数
        const newDate = new Date(newTimestamp);
        setTime(newDate);
        console.log(newDate);


        // const newDate = new Date();
        // console.log(time.getDate())
        // newDate.setDate(time.getDate() + 1);
        // setTime(newDate)
        // console.log(newDate)
    }

    const changeDateMinus = () => {
        // 正确的方法，直接使用时间戳进行加减
        const newTimestamp = time.getTime() - 24 * 60 * 60 * 1000; // 增加24小时的毫秒数
        const newDate = new Date(newTimestamp);
        setTime(newDate);
        console.log(newDate);

        // 错误的方法：当使用 setDate() 方法改变日期的天数时，如果新的日期值超出了当前月份的范围，Date 对象会自动调整日期以适应合法的日期。
        // 首先要明确,getDate()获得的是当前Date对象月份的某一天,只返回天数,而不涉及月份,范围 (1 ~ 31).参考:https://www.runoob.com/jsref/jsref-obj-date.html
        // 当newDate被new出来,如8月,当time.getDate()不断减少,直至到1,再减1的时候会触发js对日期的处理机制,自动将日期处理为上个月的最后一天,即7月31日
        // 这时,getDate()获取到的值为31,由于newDate每次都是通过new Date()方法创建的对象,所以月份永远等于当前月(8月)
        // 当再次设置时间时,就会显示8月30日
        // 导致画面出现8月1日(减1)=>7月31日(减1)=>8月30日的bug
        // const newDate = new Date();
        // console.log(time.getDate())
        // newDate.setDate(time.getDate() - 1);
        // setTime(newDate)
        // console.log(newDate)

    }

    // const monthMap = {
    //     0: '一',
    //     1: '二',
    //     2: '三',
    //     3: '四',
    //     4: '五',
    //     5: '六',
    //     6: '七',
    //     7: '八',
    //     8: '九',
    //     9: '十',
    //     10: '十一',
    //     11: '十二',
    // };
    // const [monthNum, setMonthNum] = useState(monthMap[currentDate.getMonth()]);

    // const textStyle = {
    //     fontFamily: 'Arial, sans-serif',
    //     fontSize: '16px',
    //     fontWeight: 'bold',
    //     color: '#333',
    //     textAlign: 'center',
    //     textDecoration: 'underline',
    //     textTransform: 'uppercase',
    //     lineHeight: '1.5',
    //     letterSpacing: '1px',
    //     textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    // };
    // useEffect函数接受两个参数：一个是副作用函数（Effect Function），另一个是依赖数组（Dependency Array）。
    // 副作用函数会在每次组件渲染完成后执行。它可以执行各种副作用操作，比如添加订阅、发送网络请求、修改DOM等。在函数组件中，
    // 副作用函数是无法直接使用async/await语法的，但可以通过在函数内部定义一个异步函数来达到相同的效果。
    // 依赖数组是一个可选的参数，用于指定副作用函数的依赖项。只有当依赖项发生变化时，副作用函数才会被执行。如果省略了依赖数组，副作用函数将在每次组件渲染后都会被执行
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setTime(new Date());
    //     }, 1000);
    //     // useEffect函数还可以返回一个清理函数，用于清除副作用产生的资源，比如取消订阅、清除定时器等。当组件被卸载时，React会自动调用清理函数。
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, []);
    useEffect(() => {
        const firstDayOfMonth = new Date(time.getFullYear(), time.getMonth(), 1);
        const dayOfWeek = firstDayOfMonth.getDay(); //getDay()返回一周中的某一天
        const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 将星期天(0)转换为6，星期一(1)转换为0，以此类推
        const dayOfMonth = time.getDate() - 1;
        const daysSinceStartOfMonth = adjustedDayOfWeek + dayOfMonth;
        // 获取当前日期是本月的第几天
        const weekNumber = Math.floor(daysSinceStartOfMonth / 7) + 1;
        // 获取当前日期是本周的第几天
        const dayOfWeekInWeek = (daysSinceStartOfMonth % 7) + 1;
        setWeekNum(weekMap[weekNumber])
        setDayNum(dayMap[dayOfWeekInWeek])
        props.handleWeekNumber(weekNumber)
        props.handleDayOfWeekInWeek(dayOfWeekInWeek)

    }, [time]);


    return (
        <Box sx={{
            // display:'flex',
            // flexDirection:'column',
            // justifyContent:'center',
            // flexWrap: 'wrap',
            // width: '100%',
            height: '32vh',
            padding: '1vh',
            // marginLeft: '50px',
            // marginTop: '50px',
            border: '1px solid skyblue',
            overflow: 'hidden'
        }}>
            {/* <div>
                {time.toLocaleTimeString()}
            </div> */}

            <div style={{
                width: '100%',
                display: 'flex',
                // flexWrap: 'wrap',
                marginTop: '6vh',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                color: 'rgb(25, 118, 210)'
            }}>

                <div>
                    <div style={{ textAlign: 'center', fontSize: '3vh', marginBottom: '2vh' }}>
                        {time.getFullYear()}年{time.getMonth() + 1}月{time.getDate()}日
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <IconButton onClick={changeDateMinus}>
                            <ArrowLeftIcon style={{ fontSize: '8vh', color: 'rgb(25, 118, 210)' }}></ArrowLeftIcon>
                        </IconButton>
                        <CalendarMonthIcon style={{ fontSize: '15vh', color: 'rgb(25, 118, 210)' }}></CalendarMonthIcon>
                        <IconButton onClick={changeDatePlus}>
                            <ArrowRightIcon style={{ fontSize: '8vh', color: 'rgb(25, 118, 210)' }}></ArrowRightIcon>
                        </IconButton>
                    </div>

                </div>
                <div style={{ marginLeft: '5%', fontSize: '5vh' }}>
                    {/* inline-block 或 block，可以控制它在垂直方向上的对齐。然后，通过将 vertical-align 设置为 text-bottom，你可以让文字与容器底部对齐。 */}
                    <div style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}>
                        第{weekNum}周
                    </div>
                    <div style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}>
                        {dayNum}
                    </div>
                </div>


            </div>


        </Box>
    )
}