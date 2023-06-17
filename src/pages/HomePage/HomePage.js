import Header from '../../components/Header/Header'
import QueryForm from '../../components/QueryForm/QueryForm'
import TimeShow from '../../components/TimeShow/TimeShow'
import TodayEvent from '../../components/TodayEvent/TodayEvent'
import TestDiv from '../../components/TestDiv/TestDiv'
import CourtInfo from '../../components/CourtInfo/CourtInfo'
import FindTeam from '../../components/FindTeam/FindTeam'


export default function HomePage() {

    return (
        <div>
            <Header></Header>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
            }}>
                <div style={{
                    display: 'flex',
                    width: '60%',
                    justifyContent: 'space-around',
                    // alignContent: 'space-between',
                    flexWrap: 'wrap',
                    marginTop: '50px'
                }}>
                    <div style={{
                        width: '46%',
                        marginRight: '2%'
                    }}>
                        <TimeShow></TimeShow>
                    </div>
                    <div style={{
                        width: '46%',
                        marginLeft: '2%'
                    }}>
                        <FindTeam></FindTeam>
                    </div>
                    <div style={{
                        width: '46%',
                        marginRight: '2%',
                        marginTop:'2%'
                    }}>
                        <TodayEvent></TodayEvent>
                    </div>
                    <div style={{
                        width: '46%',
                        marginLeft: '2%',
                        marginTop:'2%'
                    }}>
                        <CourtInfo></CourtInfo>
                    </div>

                    {/* <TodayEvent></TodayEvent> */}
                </div>
                <div style={{
                    width: '30%',
                    marginTop: '50px'
                }}>
                    <QueryForm></QueryForm>
                </div>
            </div>

        </div>
    )
}