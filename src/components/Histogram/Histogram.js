
import React from 'react';
import ReactEcharts from "echarts-for-react"

export default function Histogram({data}) {

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
                    data: data.yAxisData,
                    axisLabel: {
                        formatter: function(value) {
                            // 只显示前四位字符
                            return value.slice(0, 4);
                        }
                    }
                },
                series: data.seriesData
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