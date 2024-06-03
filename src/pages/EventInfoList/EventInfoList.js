import { Select, Typography, Button } from 'antd';
import CircularProgress from '@mui/material/CircularProgress';
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer.js"
import "./EventInfoList.css"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import api from '../../api';
const { Title, Text } = Typography;

export default function EventInfoList() {

    const [teamNum, setTeamNum] = useState(0);

    const [errorMsg, setErrorMsg] = useState("");

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [eventInfoList, setEventInfoList] = useState([]);

    const [selectedEventInfoList, setSelectedEventInfoList] = useState([]);

    const [memberNicknameList, setMemberNicknameList] = useState([]);

    const [teamInfoList, setTeamInfoList] = useState([]);

    const [currentEventInfoId, setCurrentEventInfoId] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [homeTeamScore, setHomeTeamScore] = useState(0);

    const [visitorTeamScore, setVisitorTeamScore] = useState(0);

    const [itemInfos, setItemInfos] = useState([]);

    const [selectedItemId, setSelectedItemId] = useState(-1);

    const [selectedEventStatus, setSelectedEventStatus] = useState("all");

    let itemSelectOptions = itemInfos.map(itemInfo => ({
        value: itemInfo.itemInfoId,
        label: itemInfo.itemInfoName
    }))

    itemSelectOptions = [{
        value: -1,
        label: "ALL"
    }, ...itemSelectOptions]

    const getEventInfoList = useCallback(async () => {
        const response = await api.get('/eventInfo/getEventInfosByUserId');
        console.log(response.data.data);
        setEventInfoList(response.data.data);
        if (response?.data?.data?.[0]) {
            // 默认打开所选择列表的第一条数据的人员详细信息
            setCurrentEventInfoId(response.data.data[0].eventInfoId)
        }
        setSelectedEventInfoList(response.data.data);
    }, [])

    const getItemInfoList = useCallback(async () => {
        const response = await api.get('/iteminfo');
        console.log(response.data);
        setItemInfos(response.data);
    }, [])

    useEffect(() => {
        getItemInfoList();
    }, [getItemInfoList])

    useEffect(() => {
        getEventInfoList();
    }, [getEventInfoList])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const hangdleTeamNumChange = (value) => {
        setTeamNum(value);
    }

    const hangdleItemChange = (value) => {
        setSelectedItemId(value);
    }

    const hangdleEventStatusChange = (eventStatus) => {
        setSelectedEventStatus(eventStatus)
    }

    useEffect(() => {
        const fliterEventListByItemId = () => {
            console.log(eventInfoList);
            console.log(typeof selectedItemId);
            if (selectedItemId === -1) {
                return eventInfoList;
            }
            return eventInfoList.filter(eventInfo => {
                return eventInfo.eventItemId === selectedItemId;
            })
        }

        const fliterEventListByEvenStatus = (newEventInfoListFiterByItemId) => {
            console.log(selectedEventStatus);
            if (selectedEventStatus === "all") {
                return newEventInfoListFiterByItemId;
            }
            else if (selectedEventStatus === "ended") {
                return newEventInfoListFiterByItemId.filter(eventInfo => {
                    return new Date(`${eventInfo.eventOpenDay} ${eventInfo.eventOpenTime.split("-")[0]}`) < new Date()
                })
            }
            else if (selectedEventStatus === "notStart") {
                return newEventInfoListFiterByItemId.filter(eventInfo => {
                    return new Date(`${eventInfo.eventOpenDay} ${eventInfo.eventOpenTime.split("-")[0]}`) >= new Date()
                })
            }
        }

        const newEventInfoListFiterByItemId = fliterEventListByEvenStatus(fliterEventListByItemId());

        setSelectedEventInfoList(newEventInfoListFiterByItemId);
        console.log(newEventInfoListFiterByItemId[0]?.eventInfoId);
        if (newEventInfoListFiterByItemId.length >  0) {
            setCurrentEventInfoId(newEventInfoListFiterByItemId[0]?.eventInfoId);
        }

    }, [selectedItemId,selectedEventStatus,eventInfoList])

    const handleDetailButtonClick = (eventInfoId) => {
        if (eventInfoId === currentEventInfoId) {
            return;
        }
        setIsLoading(true);
        setCurrentEventInfoId(eventInfoId);
        setTeamInfoList([]);
        setMemberNicknameList([]);
    }

    const resetScores = () => {
        setHomeTeamScore(0);
        setVisitorTeamScore(0);
    }

    const formatDate = (dateString) => {
        // 将字符串转换为Date对象
        const date = new Date(dateString);

        // 提取年、月、日
        const year = date.getFullYear();  // 获取年份
        const month = date.getMonth() + 1;  // 获取月份，月份从0开始计算，所以+1
        const day = date.getDate();  // 获取日

        // 拼接成“年月日”格式
        return `${year}年${month}月${day}日`;
    }

    const getEventMemberNicknames = useCallback(async () => {
        console.log(currentEventInfoId);
        if (currentEventInfoId === 0) {
            return;
        }
        setIsLoading(true);
        const params = { eventInfoId: currentEventInfoId };
        const response = await axios.get("/eventEntryInfo/getMemberNicknamesByEventID", { params });
        console.log(response.data.data);
        setMemberNicknameList(response.data.data);
        setIsLoading(false);
    }, [currentEventInfoId])

    useEffect(() => {
        getEventMemberNicknames();
    }, [getEventMemberNicknames])

    const makeTeams = () => {
        const nameList = memberNicknameList.map(item => item.nickName);

        const memberNum = nameList.length;

        // 取模得出按照队伍平均分配后多余的人数
        const extraNum = memberNum % teamNum;

        let ereryTeamMemberNum;
        // 每个队伍分配的基准人数
        if (memberNum && teamNum) {
            ereryTeamMemberNum = Math.floor(memberNum / teamNum);
        }
        else if (!memberNum) {
            setErrorMsg("本次活动暂无人员参加！");
            setOpenSnackbar(true);
            return;
        }
        else {
            setErrorMsg("请选择队伍数量！");
            setOpenSnackbar(true);
            return;
        }

        if (ereryTeamMemberNum < 5) {
            setErrorMsg("每队人数不满足最低要求，无法组队！");
            setOpenSnackbar(true);
        }
        else {
            console.log(ereryTeamMemberNum);

            // 包含所有队伍的数组
            let teamList = []

            // 生成包含所有队伍的数组
            let i = 0
            while (i < teamNum) {
                const team = Array(ereryTeamMemberNum).fill("");
                teamList.push(team);
                i++
            }

            // 每队先分配基准人数
            teamList = teamList.map((team) => team.map(() => {
                let index = Math.floor(Math.random() * nameList.length);
                const newItem = nameList[index];
                nameList.splice(index, 1);
                return newItem;
            }))

            // 从前往后给每个队伍分配多余人数
            let j = 0;
            while (j < extraNum) {
                let index = Math.floor(Math.random() * nameList.length);
                const newItem = nameList[index];
                nameList.splice(index, 1);
                teamList[j].push(newItem);
                j++;
            }

            console.log(teamList);
            setTeamInfoList(teamList);
        }
    }

    return (
        <div>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMsg}
                </Alert>
            </Snackbar>
            <div id="event-select-container">
                <div onClick={() => hangdleEventStatusChange("all")} style={{ cursor: "pointer",backgroundColor:selectedEventStatus === "all" ? "#cceeff":null}}>
                    全部イベント
                </div>
                <div onClick={() => hangdleEventStatusChange("ended")} style={{ cursor: "pointer",backgroundColor:selectedEventStatus === "ended" ? "#cceeff":null}}>
                    開催済み
                </div>
                <div onClick={() => hangdleEventStatusChange("notStart")} style={{ cursor: "pointer",backgroundColor:selectedEventStatus === "notStart" ? "#cceeff":null}}>
                    開催予定
                </div>
                <div>
                    <div>
                        <Select
                            defaultValue={-1}
                            style={{ width: 200 }}
                            options={itemSelectOptions}
                            onChange={hangdleItemChange}
                        />
                    </div>

                </div>
            </div>
            <div id='event-detail-container'>
                <div className='event-detail-content'>
                    <div className='event-detail-content-header'>
                        <Title level={4} style={{ margin: "0", color: "white" }}>情報一覧</Title>
                    </div>
                    {selectedEventInfoList?.length > 0 ? selectedEventInfoList.map((item) => (
                        <div className='event-detail-content-body' key={item.eventInfoId}>
                            <div>
                                <Title level={5} style={{ margin: "0", textAlign: "left" }}>{formatDate(item.eventOpenDay)}</Title>
                                <div className='event-detail-content-body-timestatus'>
                                    <Text>{item.eventOpenTime}</Text>
                                    <Text>{new Date(`${item.eventOpenDay} ${item.eventOpenTime.split("-")[0]}`) > new Date() ? "開催予定" : "開催済み"}</Text>
                                </div>
                                <div className='event-detail-content-body-placebutton'>
                                    <Text>{item.courtInfo.courtName}</Text>
                                    <Button onClick={() => handleDetailButtonClick(item.eventInfoId)} type={currentEventInfoId === item.eventInfoId ? "primary" : "default"}>詳細</Button>
                                </div>
                            </div>
                        </div>
                    ))
                        :
                        <div className='event-detail-content-noInfos'>
                            <Title level={1} style={{ margin: "0", color: "gray" }}>情報なし</Title>
                        </div>}
                </div>
                <div className='event-detail-content'>
                    <div className='event-detail-content-header event-detail-content-header-gray'>
                        <Title level={4} style={{ margin: "0" }}>人员名单</Title>
                    </div>
                    {isLoading ?
                        <div className='event-detail-content-loading'>
                            <CircularProgress></CircularProgress>
                        </div> :
                        teamInfoList?.length > 0 ?
                            teamInfoList.map((teamInfo, index) => (
                                <div key={teamInfo[0]}>
                                    <Title level={5} style={{ margin: "0", marginLeft: '1rem', textAlign: "left", color: "#1976d2" }} >{`チーム${index + 1}`}</Title>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: "2px solid rgba(100, 100, 100, 0.1)" }}>
                                        {teamInfo.map((info) => (
                                            <Text style={{ flex: "0 0 20%" }} key={info}>{info}</Text>
                                        ))}
                                    </div>
                                </div>
                            )) : memberNicknameList?.length > 0 ?
                                <div className="event-detail-content-presonnel-list">
                                    {memberNicknameList.map((item) => (
                                        <Text style={{ flex: "0 0 23%", border: "1px solid skyblue", margin: '1%' }} key={item.infoId}>{item.nickName}</Text>
                                    ))}
                                </div> :
                                <div className='event-detail-content-noMemberInfo'>
                                    <Title level={1} style={{ color: "gray" }}>参加者なし</Title>
                                </div>
                    }
                    <div className='event-detail-content-makeTeamDiv'>
                        <Select
                            style={{ width: 100 }}
                            options={[
                                { value: 0, label: 'チーム数' },
                                { value: 4, label: '4' },
                                { value: 5, label: '5' },
                            ]}
                            value={teamNum}
                            onChange={hangdleTeamNumChange}
                        />
                        <Button onClick={makeTeams}>チーム分け</Button>
                    </div>
                </div>
                <div className='event-detail-content'>
                    <div className='event-detail-content-header event-detail-content-header-gray'>
                        <Title level={4} style={{ margin: "0" }}>比赛助手</Title>
                    </div>
                    <div className='countdown-div'>
                        {/* <Title level={5} style={{ margin: "0", marginLeft: '1rem', textAlign: "left", color: "#1976d2" }} >计时区</Title> */}
                        <CountdownTimer minutes={1}></CountdownTimer>
                    </div>
                    <div className='scoreboard-div'>
                        <div>
                            <div>
                                <Button onClick={() => setHomeTeamScore(homeTeamScore + 1)}>+1</Button>
                                <Button onClick={() => setHomeTeamScore(homeTeamScore + 2)}>+2</Button>
                                <Button onClick={() => setHomeTeamScore(homeTeamScore + 3)}>+3</Button>
                            </div>
                            <div className='scoreboard-hometeam-score-div'>
                                <Text style={{ fontSize: '4rem' }}>{homeTeamScore}</Text>
                            </div>
                        </div>
                        <Text style={{ fontSize: '5rem' }}>:</Text>
                        <div>
                            <div>
                                <Button onClick={() => setVisitorTeamScore(visitorTeamScore + 1)}>+1</Button>
                                <Button onClick={() => setVisitorTeamScore(visitorTeamScore + 2)}>+2</Button>
                                <Button onClick={() => setVisitorTeamScore(visitorTeamScore + 3)}>+3</Button>
                            </div>
                            <div className='scoreboard-visitorteam-score-div'>
                                <Text style={{ fontSize: '4rem' }}>{visitorTeamScore}</Text>
                            </div>
                        </div>
                    </div>
                    <Button onClick={resetScores}>清零</Button>
                </div>
            </div>

        </div>
    )
}