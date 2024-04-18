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
        // yAxisData.forEach((courtName) => {
        //     responseData.forEach((item,index) => {
        //         if(courtName === item.courtName) {
        //             // const currentItemInfo = itemInfos.find((itemInfo) => {
        //             //     return itemInfo.itemInfoName === item.itemInfoName
        //             // })

        //             seriesData[item.courtOpenItemId-1].data.push(item.itemCount)
        //         }
        //     })
        // })
        // console.log(seriesData)

        // 创建一个空数组
        const itemListByCourt = Array(itemInfos.length).fill(null)
        // 循环所有场地名
        yAxisData.forEach((yAxisItem, i) => {
            // 暂存数组
            const itemNameList = [];
            responseData.forEach(responseItem => {
                // 将同一场地名的活动名称和活动数量作为一个对象，放入暂存的数组中
                if (yAxisItem === responseItem.courtName) {
                    itemNameList.push({
                        itemInfoName: responseItem.itemInfoName,
                        itemCount: responseItem.itemCount
                    });
                }
            });
            itemListByCourt[i] = itemNameList;
        });
        console.log(itemListByCourt);
        // const itemNamesListByCourt = itemListByCourt.map((item) => item.map(info => info.itemInfoName))
        // console.log(itemNamesListByCourt);

        // 循环场地名和场地信息的数组，每个元素也都是数组，数组元素里是对应的是每个场地开设的活动名称和数量的对象
        itemListByCourt.forEach((itemList,i) => {
            // 数组元素
            itemList.forEach((item,j) => {
                // 和seriesData数组中每个元素的活动名称比较
                seriesData.forEach((data, k) => {
                    // 如果相同，替换seriesData数组中对应活动的data数组中，相应下标的值
                    if (data.name === item.itemInfoName) {
                        data.data[i] = item.itemCount
                    }
                })
            })
            
        })
        // seriesData.forEach((data, i) => {
        //     data.data.push
        //     })

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