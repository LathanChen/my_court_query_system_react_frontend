
import React, { useEffect, useCallback, useState } from 'react';
import PieChart from "../../components/PieChart/PieChart.js"
import BarChart from "../../components/BarChart/BarChart.js"
import axios from 'axios';
import { Select } from 'antd';

export default function Dashboard() {

    const [availableEvents, setAvailableEvents] = useState([1]);

    const [availableEventsOrganizerNameAndMemberNumsByItemId, setAvailableEventsOrganizerNameAndMemberNumsByItemId] = useState({});

    const [itemInfos,setItemInfos] = useState([]);

    const [selectedItemID,setSelectedItemID] = useState(1);

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

    const getAvailableEventsOrganizerNameAndMemberNumsByItemId = useCallback(async () => {
        const responseData = await (axios.get('/eventInfo/availableEventsOrganizerNameAndMemberNumsByItemId', { params: { eventItemId: selectedItemID } }))
        console.log(responseData.data.data);
        // setAvailableEventsOrganizerNameAndMemberNumsByItemId(responseData.data.data.map((item) => {
        //     return {
        //         data:[]
        //     }
        // }));
        const seriesDataList1 =[]
        const seriesDataList2 =[]
        const seriesNameList =['応募済み人数','最大参加人数']
        const xAxisDataLsit =[]
        responseData.data.data.forEach(element => {
            seriesDataList1.push(element.entryCount)
            seriesDataList2.push(element.eventMaxEnrollment)
            xAxisDataLsit.push(element.organizerName)
        });
        const returnValue = [
            {
                data:seriesDataList1,
                type: 'bar',
                stack: seriesNameList[0],
                name: seriesNameList[0]
            },
            {
                data:seriesDataList2,
                type: 'bar',
                stack: seriesNameList[1],
                name: seriesNameList[1]
            },
        ]
        // for(let i = 0;i < responseData.data.data.length;i++) {
        //     returnValue.push({
        //         data:seriesDataList1,
        //         stack:"a",
        //         name:seriesNameList[i]
        //     })
        // }
        setAvailableEventsOrganizerNameAndMemberNumsByItemId({series:returnValue,xAxisDataLsit:xAxisDataLsit})
    }, [selectedItemID])

    useEffect(() => {
        getAvailableEventsOrganizerNameAndMemberNumsByItemId()
    }, [getAvailableEventsOrganizerNameAndMemberNumsByItemId])
    
    const getItemInfo = useCallback(async() => {
        const response = await axios.get('/iteminfo');
        const itemInfos = response.data;
        setItemInfos(itemInfos);
        // setSelectOption(selectOption);
    },[])

    useEffect(() => {
        getItemInfo()
        
    },[getItemInfo])


    const handleSelectChange = (value) => {
        console.log(value)
        setSelectedItemID(value)
    }

    // console.log(selectOption)
    const selectOption = itemInfos.map((item) => {
        return {
            value:item.itemInfoId,
            label:item.itemInfoName
        }
    });

    return (
        <div>
            <div style={{ width: "30rem", height: "30rem" }}>
                <PieChart data={availableEvents} />
            </div>
            <div style={{ width: "30rem", height: "30rem" }}>
                {selectOption.length > 0 && <Select
                    style={{ width: 120 }}
                    defaultValue={selectOption[0].label}
                    options={selectOption}
                    onChange={handleSelectChange}
                >
                </Select>}
                <BarChart data={availableEventsOrganizerNameAndMemberNumsByItemId}/>
            </div>
        </div>

    )
}