import React, { useState } from 'react';
import InfoListSearch from '../../components/InfoListSearch/InfoListSearch'
import AddInfoBar from '../../components/AddInfoBar/AddInfoBar'
import AdminInfoShowTable from '../../components/AdminInfoShowTable/AdminInfoShowTable'

export default function AdminPageInfoShow() {
    const [batchselection,setBatchselection] = useState([])

    const isBatchselectionChange = (data) =>{
        setBatchselection(data)
    }

    const [quertData,setQuertData] = useState([])
    const takeQuertData = (data) =>{
        setQuertData(data)
    }

    return (
        <div>
           <InfoListSearch takeQuertData={takeQuertData}></InfoListSearch>
           <AddInfoBar batchselection={batchselection}></AddInfoBar>
           <AdminInfoShowTable batchselection={batchselection} isBatchselectionChange={isBatchselectionChange} quertData={quertData}></AdminInfoShowTable>
        </div>
    )
}