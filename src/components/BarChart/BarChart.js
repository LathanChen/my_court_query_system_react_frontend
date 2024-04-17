
import React from 'react';
import ReactEcharts from "echarts-for-react"

export default function BarChart({ data, title }) {

    // const data = {
    //     data:[[20,21,22,23,24,25,26],[7,6,5,4,3,2,1]],
    //     stack:["a","b"],
    //     name:["a","b"]
    // }

    console.log(data.series)

    const getOption = () => {
        //     const series = data.data.forEach((element,index) => {
        //         return {
        //             data:element[index],
        //             type:"bar",
        //             stack:data.stack[0],

        //         }
        //     });
        if (data?.series?.length > 0) {
            const series = data.series
            const stackInfo = {};
            for (let i = 0; i < series[0].data.length; ++i) {
                for (let j = 0; j < series.length; ++j) {
                    const stackName = series[j].stack;
                    if (!stackName) {
                        continue;
                    }
                    if (!stackInfo[stackName]) {
                        stackInfo[stackName] = {
                            stackStart: [],
                            stackEnd: []
                        };
                    }
                    const info = stackInfo[stackName];
                    const data = series[j].data[i];
                    if (data && data !== '-') {
                        if (info.stackStart[i] == null) {
                            info.stackStart[i] = j;
                        }
                        info.stackEnd[i] = j;
                    }
                }
            }
            for (let i = 0; i < series.length; ++i) {
                const data = series[i].data;
                const info = stackInfo[series[i].stack];
                for (let j = 0; j < series[i].data.length; ++j) {
                    // const isStart = info.stackStart[j] === i;
                    const isEnd = info.stackEnd[j] === i;
                    const topBorder = isEnd ? 20 : 0;
                    const bottomBorder = 0;
                    data[j] = {
                        value: data[j],
                        itemStyle: {
                            borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
                        }
                    };
                }
            }
            const option = {
                title: {
                    text: title,
                    left: 'center', // 让标题居中
                    textStyle: {     // 设置标题字体样式
                        fontSize: 14 // 设置字体大小
                    }
                },
                xAxis: {
                    type: 'category',
                    data: data.xAxisDataLsit
                },
                yAxis: {
                    type: 'value'
                },
                series: series,
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 100
                    },
                    {
                        start: 0,
                        end: 100,
                        handleIcon: 'M10.7,11.4V2c0-0.6-0.4-1-1-1s-1,0.4-1,1v9.4c0,0.3-0.1,0.6-0.3,0.9L6,15.9c-0.2,0.2-0.5,0.3-0.9,0.3c-0.8,0-1.4-0.7-1.4-1.5c0-0.3,0.1-0.6,0.3-0.8l1.4-1.3c0.4-0.4,0.4-1,0-1.4c-0.2-0.2-0.5-0.3-0.8-0.3c-0.3,0-0.6,0.1-0.8,0.3L2.3,12.1C2.1,12.3,2,12.6,2,12.9c0,0.8,0.7,1.5,1.5,1.5c0.4,0,0.7-0.2,0.9-0.4l1.4-1.3c0.1-0.1,0.2-0.1,0.3-0.1s0.2,0.1,0.3,0.1l1.4,1.3c0.2,0.2,0.5,0.4,0.9,0.4c0.8,0,1.5-0.7,1.5-1.5c0-0.3-0.1-0.6-0.3-0.8L9.3,12c-0.4-0.4-1-0.4-1.4,0c-0.2,0.2-0.3,0.5-0.3,0.8c0,0.4,0.2,0.6,0.5,0.8l1.8,1.7c0.4,0.4,0.4,1,0,1.4c-0.2,0.2-0.5,0.3-0.8,0.3c-0.4,0-0.6-0.1-0.8-0.3l-1.8-1.7C6.1,14.6,6,14.5,6,14.3c0-0.8-0.7-1.5-1.5-1.5c-0.3,0-0.6,0.1-0.8,0.3L2.3,14.9c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.8,0.3c0.3,0,0.6-0.1,0.8-0.3l1.4-1.3c0.4-0.4,1-0.4,1.4,0c0.2,0.2,0.3,0.5,0.3,0.8c0,0.4-0.1,0.6-0.3,0.8l-1.4,1.3C4.1,17.9,4,18,3.9,18c-0.1,0-0.2-0.1-0.3-0.1c-0.1-0.1-0.2-0.1-0.3-0.1L2,18c-0.6,0-1-0.4-1-1v-9.4c0-0.6,0.4-1,1-1s1,0.4,1,1V11.4c0.4-0.2,0.8-0.4,1.3-0.4c1.2,0,2.1,1,2.1,2.2c0,0.5-0.2,1-0.5,1.4c0.3,0.4,0.5,0.9,0.5,1.4c0,1.6-1.3,2.9-2.9,2.9s-2.9-1.3-2.9-2.9c0-0.5,0.2-1,0.5-1.4c-0.3-0.4-0.5-0.9-0.5-1.4c0-1.2,1-2.2,2.1-2.2c0.5,0,0.9,0.1,1.3,0.4z',
                        handleSize: '60%'
                    }
                ],
                tooltip: {
                    trigger: 'axis'
                }
            };
            return option;
        }
        return
    };


    return (
        <div>
            {data?.series?.length > 0 && <ReactEcharts option={getOption()} />}
        </div>
    )
}