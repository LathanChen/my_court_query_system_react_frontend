import Header from '../../components/Header/Header'
import QueryForm from '../../components/QueryForm/QueryForm'
import TimeShow from '../../components/TimeShow/TimeShow'
import TodayEvent from '../../components/TodayEvent/TodayEvent'
// import TestDiv from '../../components/TestDiv/TestDiv'
import CourtInfo from '../../components/CourtInfo/CourtInfo'
import FindTeam from '../../components/FindTeam/FindTeam'
import ShowTeamData from '../../components/ShowTeamData/ShowTeamData'
import { useState } from "react";

export default function HomePage() {

    const [showQuertFormOrNot, SetShowQuertFormOrNot] = useState(false)

    const changeShowQuertFormOrNot = (data) =>{
        SetShowQuertFormOrNot(data)
            console.log(showQuertFormOrNot)
    }



    return (
        <div style={{width:'100%'}}>
            <Header></Header>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
            }}>
                <div style={{
                    display: 'flex',
                    width: '60%',
                    height:'76vh',
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
                        <FindTeam changeShowQuertFormOrNot={changeShowQuertFormOrNot} showQuertFormOrNot={showQuertFormOrNot}></FindTeam>
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
                    height:'76vh'
                }}>
                    {showQuertFormOrNot?<ShowTeamData/>:<QueryForm/>}
                </div>
            </div>

        </div>
    )
}