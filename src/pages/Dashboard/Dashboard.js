import React, { useEffect, useCallback, useState } from 'react';
import PieChart from "../../components/PieChart/PieChart.js"
import BarChart from "../../components/BarChart/BarChart.js"
import Histogram from "../../components/Histogram/Histogram.js"
import axios from 'axios';
import { Select } from 'antd';
import './Dashboard.css'
import api from '../../api.js';

export default function Dashboard() {

    const [availableEvents, setAvailableEvents] = useState([1]);

    const [availableEventsOrganizerNameAndMemberNumsByItemId, setAvailableEventsOrganizerNameAndMemberNumsByItemId] = useState({});

    const [itemInfos, setItemInfos] = useState([]);

    const [selectedItemID, setSelectedItemID] = useState(1);

    const PieChartTitle = "今開催中活動";

    const BarChartTitle = "開始予定活動の応募状況";

    // 「今開催中活動」データを取得
    useEffect(() => {
        let responseData;
        axios.get('/eventInfo/availableEvents')
            .then((response) => {
                console.log(response.data.data);
                responseData = response.data.data;
                setAvailableEvents(responseData.map((item) => {
                    return {
                        value: item.eventCount,
                        name: item.itemInfoName
                    }
                }));
            })
    }, [])

    // 查找本日及之后开始的指定项目的活动的报名情况
    const getAvailableEventsOrganizerNameAndMemberNumsByItemId = useCallback(async () => {
        const responseData = await (axios.get('/eventInfo/availableEventsOrganizerNameAndMemberNumsByItemId', { params: { eventItemId: selectedItemID } }))
        console.log(responseData.data.data);
        const seriesDataList1 = []
        const seriesDataList2 = []
        const seriesNameList = ['応募済み人数', '最大参加人数']
        const xAxisDataLsit = []
        responseData.data.data.forEach(element => {
            seriesDataList1.push(element.entryCount)
            seriesDataList2.push(element.eventMaxEnrollment)
            xAxisDataLsit.push(element.organizerName)
        });
        const returnValue = [
            {
                data: seriesDataList1,
                type: 'bar',
                stack: seriesNameList[0],
                name: seriesNameList[0]
            },
            {
                data: seriesDataList2,
                type: 'bar',
                stack: seriesNameList[1],
                name: seriesNameList[1]
            },
        ]
        setAvailableEventsOrganizerNameAndMemberNumsByItemId({ series: returnValue, xAxisDataLsit: xAxisDataLsit })
    }, [selectedItemID])

    // 查找所有场馆的各项活动的开放数量
    const getAllCourtOpenInfoWithAllCourts = useCallback(async (itemInfos) => {
        console.log(itemInfos)
        const response = await api.get('/courtOpenInfo/allCourtOpenInfoWithAllCourts');
        const responseData = response.data.data;
        console.log(responseData);

        // 取得所有的场地名
        const yAxisData = responseData.reduce((acc, cur) => {
            if (!acc.includes(cur.courtName)) {
                acc.push(cur.courtName);
            }
            return acc;
        }, []);
        console.log(yAxisData);

        // 按照所有运动项目的数量创建相应长度的数组
        const seriesData = Array(itemInfos.length).fill({}).map((item, index) => {
            return {
                name: itemInfos[index].itemInfoName,
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                // 提前设定好长度为场地数量的data数组
                data: Array(yAxisData.length).fill("")
            }

        })
        console.log(seriesData)

        // 循环所有场地名
        yAxisData.forEach((yAxisItem, i) => {
            // 循环响应中的所有数据
            responseData.forEach(responseItem => {
                // 当响应数组中的元素的场地名和外层循环的场地名相同时
                if (yAxisItem === responseItem.courtName) {
                    // 找出seriesData中对应运动项目的对象
                    const findSeries = seriesData.find((series) => series.name === responseItem.itemInfoName)
                    // 在该对象的data数组的对应位置设定活动数量
                    findSeries.data[i] = responseItem.itemCount
                }
            });
        });

        console.log(seriesData)
    }, [])

    // test

    useEffect(() => {
        getAvailableEventsOrganizerNameAndMemberNumsByItemId()
    }, [getAvailableEventsOrganizerNameAndMemberNumsByItemId])

    const getItemInfo = useCallback(async () => {
        const response = await axios.get('/iteminfo');
        const itemInfos = response.data;
        setItemInfos(itemInfos);
        getAllCourtOpenInfoWithAllCourts(itemInfos);
    }, [getAllCourtOpenInfoWithAllCourts])

    useEffect(() => {
        getItemInfo();
    }, [getItemInfo, getAllCourtOpenInfoWithAllCourts])


    const handleSelectChange = (value) => {
        console.log(value)
        setSelectedItemID(value)
    }

    // console.log(selectOption)
    const selectOption = itemInfos.map((item) => {
        return {
            value: item.itemInfoId,
            label: item.itemInfoName
        }
    });

    return (
        <div id='dashboard-container'>
            <div className='chart-container'>
                <PieChart data={availableEvents} title={PieChartTitle} />
            </div>
            <div className='chart-container'>
                {selectOption.length > 0 && <Select
                    style={{ width: 120 }}
                    defaultValue={selectOption[0].label}
                    options={selectOption}
                    onChange={handleSelectChange}
                >
                </Select>}
                <BarChart data={availableEventsOrganizerNameAndMemberNumsByItemId} title={BarChartTitle} />
            </div>
            <div className='chart-container'>
                <Histogram></Histogram>
            </div>
        </div>

    )
}