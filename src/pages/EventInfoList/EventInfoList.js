import { Select, Typography, Button } from 'antd';
import "./EventInfoList.css"
import Item from 'antd/es/list/Item';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import api from '../../api';
import { OtherHouses } from '@mui/icons-material';

const { Title, Text } = Typography;

export default function EventInfoList() {

    const [memberNum, setMemberNum] = useState(null);

    const [teamNum, setTeamNum] = useState(null);

    const [errorMsg, setErrorMsg] = useState("");

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [eventInfoList, setEventInfoList] = useState([]);

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

    const hangdleMemberNumChange = (value) => {
        setMemberNum(value);
    }

    const hangdleTeamNumChange = (value) => {
        setTeamNum(value);
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

    const makeTeams = () => {
        const nameList = [
            "AAA",
            "BBB",
            "CCC",
            "DDD",
            "EEE",
            "FFF",
            "GGG",
            "HHH",
            "III",
            "JJJ",
            "KKK",
            "LLL",
            "MMM",
            "NNN",
            "OOO",
            "PPP",
            "QQQ",
            "RRR",
            "SSS",
            "TTT",
        ];

        let aTeam = Array(5).fill("")
        let bTeam = Array(5).fill("")
        let cTeam = Array(5).fill("")
        let dTeam = Array(5).fill("")

        aTeam = aTeam.map((item) => {
            let index = Math.floor(Math.random() * nameList.length);
            const newItem = nameList[index];
            nameList.splice(index, 1);
            return newItem;
        })

        bTeam = bTeam.map((item) => {
            let index = Math.floor(Math.random() * nameList.length);
            const newItem = nameList[index];
            nameList.splice(index, 1);
            return newItem;
        })

        cTeam = cTeam.map((item) => {
            let index = Math.floor(Math.random() * nameList.length);
            const newItem = nameList[index];
            nameList.splice(index, 1);
            return newItem;
        })

        dTeam = dTeam.map((item) => {
            let index = Math.floor(Math.random() * nameList.length);
            const newItem = nameList[index];
            nameList.splice(index, 1);
            return newItem;
        })


        console.log(aTeam);
        console.log(bTeam);
        console.log(cTeam);
        console.log(dTeam);
    }

    const makeTeams2 = () => {
        getEventInfoList();
        const nameList = [
            "AAA",
            "BBB",
            "CCC",
            "DDD",
            "EEE",
            "FFF",
            "GGG",
            "HHH",
            "III",
            "JJJ",
            "KKK",
            "LLL",
            "MMM",
            "NNN",
            "OOO",
            "PPP",
            "QQQ",
            "RRR",
            "SSS",
            "TTT",
            "UUU",
            "VVV",
            "WWW",
            "XXX",
            "YYY",
        ];

        console.log(memberNum);
        console.log(nameList.length);

        // 取模得出按照队伍平均分配后多余的人数
        const extraNum = memberNum % teamNum;

        let ereryTeamMemberNum;
        // 每个队伍分配的基准人数
        if (memberNum && teamNum) {
            ereryTeamMemberNum = Math.floor(memberNum / teamNum);
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
                                <Title level={5} style={{ margin: "0",textAlign:"left" }}>{formatDate(item.eventOpenDay)}</Title>
                                <div className='event-detail-content-body-timestatus'>
                                    <Text>{item.eventOpenTime}</Text>
                                    <Text>{new Date(`${item.eventOpenDay} ${item.eventOpenTime.split("-")[0]}`) > new Date() ? "開催予定" : "開催済み"}</Text>
                                </div>
                                <div className='event-detail-content-body-placebutton'>
                                    <Text>{item.courtInfo.courtName}</Text>
                                    <Button>詳細</Button>
                                </div>
                            </div>
                        </div>
                    ))
                        : 
                        <div className='event-detail-content-noInfos'>
                            <Title level={1} style={{ margin: "0",color:"gray" }}>情報なし</Title>
                        </div>}
                </div>
                <div className='event-detail-content'>
                    <div className='event-detail-content-header event-detail-content-header-gray'>
                        <Title level={4} style={{ margin: "0" }}>人员名单</Title>
                    </div>
                    <div className="event-detail-content-presonnel-list">
                        <Text style={{ flex: "0 1 25%" }}>AAA</Text>
                        <Text style={{ flex: "0 1 25%" }}>BBB</Text>
                        <Text style={{ flex: "0 1 25%" }}>CCC</Text>
                        <Text style={{ flex: "0 1 25%" }}>DDD</Text>
                    </div>
                    <div className="event-detail-content-presonnel-list">
                        <Text style={{ flex: "0 1 25%" }}>EEE</Text>
                        <Text style={{ flex: "0 1 25%" }}>FFF</Text>
                        <Text style={{ flex: "0 1 25%" }}>GGG</Text>
                        <Text style={{ flex: "0 1 25%" }}>HHH</Text>
                    </div>
                    <div className="event-detail-content-presonnel-list">
                        <Text style={{ flex: "0 1 25%" }}>III</Text>
                        <Text style={{ flex: "0 1 25%" }}>JJJ</Text>
                        <Text style={{ flex: "0 1 25%" }}>KKK</Text>
                        <Text style={{ flex: "0 1 25%" }}>LLL</Text>
                    </div>
                    <div className="event-detail-content-presonnel-list">
                        <Text style={{ flex: "0 1 25%" }}>MMM</Text>
                        <Text style={{ flex: "0 1 25%" }}>NNN</Text>
                        <Text style={{ flex: "0 1 25%" }}>OOO</Text>
                        <Text style={{ flex: "0 1 25%" }}>PPP</Text>
                    </div>
                    <div className="event-detail-content-presonnel-list">
                        <Text style={{ flex: "0 1 25%" }}>QQQ</Text>
                        <Text style={{ flex: "0 1 25%" }}>RRR</Text>
                        <Text style={{ flex: "0 1 25%" }}>SSS</Text>
                        <Text style={{ flex: "0 1 25%" }}>TTT</Text>
                    </div>
                    <Button onClick={makeTeams}>チーム分け</Button>
                    <Select
                        style={{ width: 100 }}
                        options={[
                            { value: '4', label: '4' },
                            { value: '5', label: '5' },
                        ]}
                        value={teamNum}
                        onChange={hangdleTeamNumChange}
                    />
                </div>
                <div className='event-detail-content'>
                    <div className='event-detail-content-header event-detail-content-header-gray'>
                        <Title level={4} style={{ margin: "0" }}>比赛助手</Title>
                    </div>
                    计时区
                    <br />
                    组队表
                    <br />
                    開催済み
                    <br />
                    <Select
                        style={{ width: 200 }}
                        options={[
                            { value: '21', label: '21' },
                            { value: '22', label: '22' },
                            { value: '23', label: '23' },
                            { value: '24', label: '24' },
                            { value: '25', label: '25' },
                        ]}
                        value={memberNum}
                        onChange={hangdleMemberNumChange}
                    />
                    <Button onClick={makeTeams2}>test</Button>
                </div>
            </div>

        </div>
    )
}