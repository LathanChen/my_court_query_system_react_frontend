import React, { useState } from 'react';
import IndexSearch from '../../components/IndexSearch/IndexSearch'
import Indexbar from '../../components/Indexbar/Indexbar'
import CourtInfo from '../../components/CourtInfo/CourtInfo'
import Header from '../../components/Header/Header'
import axios from 'axios';
import './IndexPage.css'

export default function IndexPage() {
    
    const [searchParams,setSearchParams] = useState({})

    const [searchFlg,setSearchFlg] = useState(undefined)

    // @param 
    // searchFlg
    // 0 -->  查询项目
    // 1 -->  查询活动
    const handleSearchParams = (data,searchFlg) => {
        setSearchParams(data)
        setSearchFlg(searchFlg)
    }

    return (
        <div id='container'>
            <div id='left'>

            </div>
            <div id='content'>
                <Header></Header>
                <div id='indexsearch'>
                    <IndexSearch handleSearchParams={handleSearchParams}></IndexSearch>
                </div>
                <Indexbar searchParams={searchParams} searchFlg={searchFlg}></Indexbar>
                <div id='courtlist'>
                    <CourtInfo></CourtInfo>
                </div>
            </div>
            <div id='right'>

            </div>
        </div>
    )
}