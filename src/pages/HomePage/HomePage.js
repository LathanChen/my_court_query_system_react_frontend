import Header from '../../components/Header/Header'
import QueryForm from '../../components/QueryForm/QueryForm'
import TimeShow from '../../components/TimeShow/TimeShow'
import TodayEvent from '../../components/TodayEvent/TodayEvent'
// import TestDiv from '../../components/TestDiv/TestDiv'
import CourtInfo from '../../components/CourtInfo/CourtInfo'
import FindTeam from '../../components/FindTeam/FindTeam'
import { Outlet } from 'react-router-dom';
import { useState } from "react";

export default function HomePage() {

    const [showQuertFormOrNot, SetShowQuertFormOrNot] = useState(false)

    const [showQueryData, SetShowQueryData] = useState([])

    const [showQueryDataFlg, SetShowQueryDataFlg] = useState(false)

    function changeShowQuertFormOrNot(data, flg) {
        SetShowQueryData(data)
        SetShowQueryDataFlg(flg)
    }

    const [shouldShowLogin, setShouldShowLogin] = useState(false)

    function changeShouldShowLogin(showFlg) {
        setShouldShowLogin(showFlg)
    }

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <Header showLogin={changeShouldShowLogin} loginFlg={shouldShowLogin}></Header>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
            }}>
                <div style={{
                    display: 'flex',
                    width: '60%',
                    height: '76vh',
                    justifyContent: 'space-between',
                    alignContent: 'space-between',
                    flexWrap: 'wrap',
                    marginTop: '8vh',
                    // border: '1px solid skyblue',
                }}>
                    <div style={{
                        width: '46%',
                        // marginRight: '2%'
                    }}>
                        <TimeShow></TimeShow>
                    </div>
                    <div style={{
                        width: '46%',
                        // marginLeft: '2%'
                    }}>
                        <FindTeam showQuertFormOrNot={showQuertFormOrNot}></FindTeam>
                    </div>
                    <div style={{
                        width: '46%',
                        // marginRight: '2%',
                        // marginTop:'20px'
                    }}>
                        <TodayEvent></TodayEvent>
                    </div>
                    <div style={{
                        width: '46%',
                        // marginLeft: '2%',
                        // marginTop:'20px'
                    }}>
                        <CourtInfo></CourtInfo>
                    </div>

                    {/* <TodayEvent></TodayEvent> */}
                </div>
                <div style={{
                    width: '30%',
                    marginTop: '8vh',
                    height: '76vh'
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
                    <Outlet />
                </div>
            </div>
        </div>
    )
}