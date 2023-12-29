import Header from '../../components/Header/Header'
import TimeShow from '../../components/TimeShow/TimeShow'
import TodayEvent from '../../components/TodayEvent/TodayEvent'
// import TestDiv from '../../components/TestDiv/TestDiv'
import CourtInfo from '../../components/CourtInfo/CourtInfo'
// CssBaseline 是 Material-UI 中的一个组件，它的作用是提供一个基础的 CSS 样式重置或规范，确保应用程序在不同浏览器和环境下具有一致的外观和行为。
// import CssBaseline from '@mui/material/CssBaseline';
// 引入高阶组件函数
// import MakeDateParameter from '../../highOrderComponent/MakeDateParameter'
import FindTeam from '../../components/FindTeam/FindTeam'
import { Outlet } from 'react-router-dom';
import { useState } from "react";
import './HomePage.css'


// 使用高阶组件函数，实现代码复用，将高阶组件函数中生成的参数传递到TodayEvent组件中，形成新的组件
// const TodayEventComponent = MakeDateParameter(TodayEvent)

export default function HomePage() {

    const [showQueryFormOrNot] = useState(false)

    const [queryFormData,setQueryFormData] = useState([])

    // const [showQueryData, SetShowQueryData] = useState([])

    // const [showQueryDataFlg, SetShowQueryDataFlg] = useState(false)

    // function changeShowQuertFormOrNot(data, flg) {
    //     SetShowQueryData(data)
    //     SetShowQueryDataFlg(flg)
    // }

    // const [shouldShowLogin, setShouldShowLogin] = useState(false)

    // function changeShouldShowLogin(showFlg) {
    //     setShouldShowLogin(showFlg)
    // }

    // 先计算当日是星期几和第几周，为weekNumber和dayOfWeekInWeek赋值，避免初次渲染出现weekNumber和dayOfWeekInWeek为null的情况
    // 这样会导致TodayEvent渲染两次，且第一次渲染会报请求无参数的错误
    const currentTime = new Date()
    const currentFirstDayOfMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
    const currentDayOfWeek = currentFirstDayOfMonth.getDay(); //getDay()返回一周中的某一天
    const currentAdjustedDayOfWeek = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1; // 将星期天(0)转换为6，星期一(1)转换为0，以此类推
    const currentDayOfMonth = currentTime.getDate() - 1;
    const currentDaysSinceStartOfMonth = currentAdjustedDayOfWeek + currentDayOfMonth;
    const currentWeekNumber = Math.floor(currentDaysSinceStartOfMonth / 7) + 1;
    const currentDayOfWeekInWeek = (currentDaysSinceStartOfMonth % 7) + 1;

    const [weekNumber,setWeekNumber] = useState(currentWeekNumber)

    const [dayOfWeekInWeek,setDayOfWeekInWeek] = useState(currentDayOfWeekInWeek)

    const handleWeekNumber = (data) => {
        setWeekNumber(data)
    }

    const handleDayOfWeekInWeek = (data) => {
        setDayOfWeekInWeek(data)
    }

    const handleQueryFormData = (data) => {
        console.log(data)
        setQueryFormData(data)
    }

    return (
        <div style={{ width: '100%', height:'100vh',position: 'relative' }}>
            {/* <CssBaseline/> */}
            <Header></Header>
            <div id='container'
                style={{
                width: '100%',
                // display: 'flex',
                // justifyContent: 'space-around',
                // marginTop:'5vh'
            }}>
                <div id='widgets' 
                //     style={{
                //     display: 'flex',
                //     width: '60%',
                //     height: '76vh',
                //     justifyContent: 'space-between',
                //     alignContent: 'space-between',
                //     flexWrap: 'wrap',
                //     marginTop: '8vh',
                //     border: '1px solid skyblue',
                // }}
                >
                    <div id='timeshow' 
                        style={{
                        // width: '46%',
                        // marginRight: '2%'
                    }}>
                        <TimeShow handleWeekNumber={handleWeekNumber} handleDayOfWeekInWeek={handleDayOfWeekInWeek}></TimeShow>
                    </div>
                    <div id='findteam'
                        style={{
                        // width: '46%',
                        // marginLeft: '2%'
                    }}>
                        <FindTeam showQueryFormOrNot={showQueryFormOrNot}></FindTeam>
                    </div>
                    <div id='todayevent'
                        style={{
                        // width: '46%',
                        // marginRight: '2%',
                        // marginTop:'20px'
                    }}>
                        {/* <TodayEventComponent></TodayEventComponent> */}
                        <TodayEvent weekNumber={weekNumber} dayOfWeekInWeek={dayOfWeekInWeek}></TodayEvent>
                    </div>
                    <div id='courtinfo'
                        style={{
                        // width: '46%',
                        // marginLeft: '2%',
                        // marginTop:'20px'
                    }}>
                        <CourtInfo></CourtInfo>
                    </div>

                    {/* <TodayEvent></TodayEvent> */}
                </div>
                <div id='outlet'
                    style={{
                    // width: '30%',
                    // marginTop: '8vh',
                    // height: '76vh'
                }}>
                    {/* {showQueryDataFlg?(
                    <ShowQueryData 
                    showQueryData={showQueryData} 
                    showQueryDataFlg={showQueryDataFlg} 
                    setShowFlag={changeShowQuertFormOrNot}/>
                    )
                    :(<QueryForm 
                    setShowFlag={changeShowQuertFormOrNot}/>
                    )} */}
                    {/* 如果context想传递多个参数,就要写成一个对象 */}
                    <Outlet context={{handleQueryFormData,queryFormData}}/>
                </div>
            </div>
        </div>
    )
}