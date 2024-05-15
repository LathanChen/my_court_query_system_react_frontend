import { Select, Typography, Button } from 'antd';
import CircularProgress from '@mui/material/CircularProgress';
import "./EventInfoList.css"
import Item from 'antd/es/list/Item';
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

    const [memberNicknameList, setMemberNicknameList] = useState([]);

    const [teamInfoList, setTeamInfoList] = useState([]);

    const [currentEventInfoId, setCurrentEventInfoId] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const getEventInfoList = useCallback(async () => {
        const response = await api.get('/eventInfo/getEventInfosByUserId');
        console.log(response.data.data);
        setEventInfoList(response.data.data);;
    }, [])

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

    const handleDetailButtonClick = (eventInfoId) => {
        if (eventInfoId === currentEventInfoId) {
            return;
        }
        setIsLoading(true);
        setCurrentEventInfoId(eventInfoId);
        setTeamInfoList([]);
        setMemberNicknameList([]);
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
        if (currentEventInfoId === 0) {
            return;
        }
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
        else if (!memberNum){
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
                <div>
                    全部イベント
                </div>
                <div>
                    開催済み
                </div>
                <div>
                    開催中
                </div>
                <div>
                    <div>
                        <Select
                            defaultValue="lucy"
                            style={{ width: 200 }}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'yiminghe' },
                                { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />
                    </div>

                </div>
            </div>
            <div id='event-detail-container'>
                <div className='event-detail-content'>
                    <div className='event-detail-content-header'>
                        <Title level={4} style={{ margin: "0", color: "white" }}>情報一覧</Title>
                    </div>
                    {eventInfoList?.length > 0 ? eventInfoList.map((item) => (
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
                                    <Title level={5} style={{ margin: "0", marginLeft: '1rem', textAlign: "left" }} >{`チーム${index + 1}`}</Title>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {teamInfo.map((info, index) => (
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

                    计时区
                    <br />

                    <br />
                </div>
            </div>

        </div>
    )
}