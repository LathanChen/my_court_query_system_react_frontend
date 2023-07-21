import React, { useState } from 'react';
import InfoListSearch from '../../components/InfoListSearch/InfoListSearch'
import AddInfoBar from '../../components/AddInfoBar/AddInfoBar'
import AdminPageItemInfoShowTable from '../../components/AdminPageItemInfoShowTable/AdminPageItemInfoShowTable'

export default function AdminPageInfoShow() {
    // AdminPageItemInfoShowTable中选择的数据
    const [batchselection,setBatchselection] = useState([])

    // 如果AdminPageItemInfoShowTable中选择了数据，就把数据传递到AdminPageInfoShow组件中
    const isBatchselectionChange = (data) =>{
        setBatchselection(data)
    }

    // InfoListSearch查询到的数据列表，通过共同的父元素传递给AdminPageItemInfoShowTable组件
    const [quertData,setQuertData] = useState([])

    const takeQuertData = (data) =>{
        setQuertData(data)
    }

    const [InfoListSearchShouldRefresh,setInfoListSearchShouldRefresh] = useState(false)

    const InfoListSearchRefresh = (data) =>{
        setInfoListSearchShouldRefresh(data)
    }
    
useState([])
    return (
        <div>
           <InfoListSearch takeQuertData={takeQuertData} InfoListSearchShouldRefresh={InfoListSearchShouldRefresh} InfoListSearchRefresh={InfoListSearchRefresh}></InfoListSearch>
           <AddInfoBar batchselection={batchselection} InfoListSearchRefresh={InfoListSearchRefresh}></AddInfoBar>
           <AdminPageItemInfoShowTable 
           batchselection={batchselection} 
           isBatchselectionChange={isBatchselectionChange} 
           quertData={quertData} 
           InfoListSearchRefresh={InfoListSearchRefresh}
           >
           </AdminPageItemInfoShowTable>
        </div>
    )
}