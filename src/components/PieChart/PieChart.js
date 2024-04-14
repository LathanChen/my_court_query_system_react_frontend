
import React, { useEffect, useCallback, useState } from 'react';
import ReactEcharts from "echarts-for-react"

export default function PieChart({ data }) {

    // 項目ごと募集中の件数を表示
    const getOption = () => {
        let option = {
            title: {
                text: '今開催中活動',  // 标题文本
                left: 'center',                       // 标题位置：水平居中
                top: 'top',                           // 标题位置：垂直顶部
                textStyle: {                          // 标题文字样式
                    color: '#333',                    // 文字颜色
                    fontSize: 24,                     // 文字大小
                    fontWeight: 'normal'              // 文字粗细
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',   // 设置图例项垂直排列
                left: 'left',         // 图例位于左边
                top: '10%',        // 
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
                    data: data
                }
            ]
        };
        return option;
    };


    return (
        <div>
            <ReactEcharts option={getOption()} />
        </div>
    )
}