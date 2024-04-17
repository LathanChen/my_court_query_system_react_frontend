
import React from 'react';
import ReactEcharts from "echarts-for-react"

export default function Histogram( ) {

    // const data = {
    //     data:[[20,21,22,23,24,25,26],[7,6,5,4,3,2,1]],
    //     stack:["a","b"],
    //     name:["a","b"]
    // }

    const getOption = () => {
        //     const series = data.data.forEach((element,index) => {
        //         return {
        //             data:element[index],
        //             type:"bar",
        //             stack:data.stack[0],

        //         }
        //     });
        // if (data?.series?.length > 0) {
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // Use axis to trigger tooltip
                        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [320, 302, 301, 334, 390, 330, 320]
                    },
                    {
                        name: 'Mail Ad',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: 'Affiliate Ad',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: 'Video Ad',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [150, 212, 201, 154, 190, 330, 410]
                    },
                    {
                        name: 'Search Engine',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [820, 832, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };
            return option;
        // }
        // return
    };


    return (
        <div>
            {/* {data?.series?.length > 0 && <ReactEcharts option={getOption()} />} */}
            <ReactEcharts option={getOption()} />
        </div>
    )
}