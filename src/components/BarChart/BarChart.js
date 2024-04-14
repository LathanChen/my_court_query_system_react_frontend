
import React, { useEffect, useCallback, useState } from 'react';
import ReactEcharts from "echarts-for-react"

export default function BarChart({ data }) {

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
                xAxis: {
                    type: 'category',
                    data: data.xAxisDataLsit
                },
                yAxis: {
                    type: 'value'
                },
                series: series
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