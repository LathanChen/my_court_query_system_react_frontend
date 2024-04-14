
import React, { useEffect,useCallback,useState } from 'react';
import ReactEcharts from "echarts-for-react"
import axios from 'axios';

export default function Dashboard() {

    const [availableEvents,setAvailableEvents] = useState([]);

    useEffect(()=> {
        let responseData;
        axios.get('/eventInfo/availableEvents')
        .then((response)=>{
            console.log(response.data.data);
            responseData = response.data.data;
            setAvailableEvents(responseData.map((item) => {
                return {
                    value:item.eventCount,
                    name:item.itemInfoName
                }
            }));
        })
    },[])

    // 項目ごと募集中の件数
    const getOption = () => {
        let option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    padAngle: 5,
                    itemStyle: {
                        borderRadius: 10
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: availableEvents
                }
            ]
        };
        return option;
    };


    return (
        <div style={{width:"100%",height:"500px"}}>
            <ReactEcharts option={getOption()} style={{ height: "100%", width: "100%" }}/>;
        </div>
    )
}